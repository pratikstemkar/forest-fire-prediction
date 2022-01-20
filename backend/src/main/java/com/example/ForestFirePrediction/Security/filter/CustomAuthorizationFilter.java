package com.example.ForestFirePrediction.Security.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import static java.util.Arrays.stream;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

// To Check ALl the Token for Authorization to API Endpoints
@Slf4j
public class CustomAuthorizationFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        If route is Login OR Refresh, then no need to Check Token
        if(request.getServletPath().equals("/api/security/login") || request.getServletPath().equals("/api/security/token/refresh")){
            filterChain.doFilter(request, response);
        } else {
//            Get the Token from Header
            String authorizationHeader = request.getHeader(AUTHORIZATION);
//            IF Token is VALID
            if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")){
                try {
                    String token = authorizationHeader.substring("Bearer ".length());
                    Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                    JWTVerifier verifier = JWT.require(algorithm).build();
                    DecodedJWT decodedJWT = verifier.verify(token);
                    String username = decodedJWT.getSubject();  // Get the Username
                    String[] roles = decodedJWT.getClaim("roles").asArray(String.class);    // Get the Roles
                    Collection<SimpleGrantedAuthority> authorities = new ArrayList<>(); // Collection to Store Roles
                    stream(roles).forEach(role -> {
                        authorities.add(new SimpleGrantedAuthority(role));  // All Roles to authorities
                    });
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, null, authorities); // Create Auth Token
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);  // Save user to Context
                    filterChain.doFilter(request, response);
                } catch(Exception exception){
                    log.error("Error Loggin in: {}", exception.getMessage());
                    response.setHeader("error", exception.getMessage());
                    response.setStatus(FORBIDDEN.value());
                    Map<String, String> error = new HashMap<>();
                    error.put("error_message", exception.getMessage());
                    response.setContentType(APPLICATION_JSON_VALUE);
                    new ObjectMapper().writeValue(response.getOutputStream(), error);
                }
            } else{
                filterChain.doFilter(request, response);
            }
        }
    }
}
