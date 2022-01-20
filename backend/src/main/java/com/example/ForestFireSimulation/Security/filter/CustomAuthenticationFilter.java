package com.example.ForestFireSimulation.Security.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.ForestFireSimulation.Security.forms.Form;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

// CustomAuthenticationFilter for LOGIN
@Slf4j
public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    public CustomAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        String username = null;
        String password = null;

        try{
//            ObjectMapper to get Data from JSON request
            ObjectMapper mapper = new ObjectMapper();
            Form.LoginForm loginForm = mapper.readValue(request.getInputStream(), Form.LoginForm.class);
            username = loginForm.getUsername();
            password = loginForm.getPassword();

//            Create Authentication Token from Username & Password
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
            return authenticationManager.authenticate(authenticationToken);

        } catch (IOException e){
            e.printStackTrace();
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
            return authenticationManager.authenticate(authenticationToken);
        }
    }

//    Stuff to do when Auth is Successful
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {
        CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());

//        Create Access Token
        String access_token = JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date((new Date()).getTime() + 1 * 4 * 60 * 60 * 1000))
                .withIssuer(request.getRequestURL().toString())
                .withClaim("roles", user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(algorithm);

//        Create Refresh Token
        String refresh_token = JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + (7 * 24 * 60 * 60 * 1000)))
                .withIssuer(request.getRequestURL().toString())
                .sign(algorithm);

//        HashMap to send Data to JSON Response
        Map<String, String> tokens = new HashMap<>();
        tokens.put("access_token", access_token);
        tokens.put("refresh_token", refresh_token);
        tokens.put("username", user.getUsername());
        tokens.put("division", user.getDivision());
        tokens.put("pfp", user.getPfp());
        tokens.put("roles", String.valueOf(user.getAuthorities()));
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), tokens);  // Write Data to Response
    }
}


