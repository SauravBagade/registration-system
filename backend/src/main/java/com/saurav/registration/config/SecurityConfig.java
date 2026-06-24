package com.saurav.registration.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.saurav.registration.jwt.JwtFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
            .cors(cors -> {})
            .csrf(csrf -> csrf.disable())

            .authorizeHttpRequests(auth -> auth

                .requestMatchers(
                    "/api/user/register",
                    "/api/user/login",
                    "/api/user/verify-otp",
                    "/api/user/forgot-password",
                    "/api/user/reset-password",
                    "/api/user/refresh-token",
                    "/swagger-ui/**",
                    "/v3/api-docs/**"
                ).permitAll()

                // ADMIN APIs
                .requestMatchers("/admin/**")
                .hasRole("ADMIN")

                // USER APIs
                .requestMatchers(
                    "/profile",
                    "/api/user/**"
                )
                .hasAnyRole("USER", "ADMIN")

                .anyRequest()
                .authenticated()
            )

            .addFilterBefore(
                jwtFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}
