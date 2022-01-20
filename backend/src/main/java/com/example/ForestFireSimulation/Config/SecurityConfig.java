package com.example.ForestFireSimulation.Config;

import com.example.ForestFireSimulation.Security.filter.CustomAuthenticationFilter;
import com.example.ForestFireSimulation.Security.filter.CustomAuthorizationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration @EnableWebSecurity @RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

//    Add Password Encoder to AuthenticationManager
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }

//    Configure HTTP requests
    @Override
    protected void configure(HttpSecurity http) throws Exception {

//        Custom Authentication Filter for LOGIN
        CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(authenticationManagerBean());
        customAuthenticationFilter.setFilterProcessesUrl("/api/security/login");

        http.csrf().disable();  // Disable CSRF
        http.cors();    // Enable CORS
        http.sessionManagement().sessionCreationPolicy(STATELESS);  // Set Session Management of Spring Security to STATELESS
        http.authorizeRequests().antMatchers("/api/security/login/**", "/api/security/token/refresh/**").permitAll();   // Allow some paths without AUTH
        http.authorizeRequests().antMatchers("/api/data").permitAll();
        http.authorizeRequests().antMatchers("/**").permitAll();
        http.authorizeRequests().antMatchers(GET, "/api/security/users/**").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN");     // Allow some paths to some ROles
        http.authorizeRequests().antMatchers(POST, "/api/security/user/save/**", "/api/security/role/save/**").hasAnyAuthority("ROLE_ADMIN");   // Allow Secure Paths to ADMIN
        http.authorizeRequests().anyRequest().authenticated();  // Need for Authentication for All Paths
        http.addFilter(customAuthenticationFilter);     // customAuthenticationFilter for LOGIN
        http.addFilterBefore(new CustomAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);  // CustomAuthorizationFilter for Token Verification
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception{
        return super.authenticationManagerBean();
    }
}
