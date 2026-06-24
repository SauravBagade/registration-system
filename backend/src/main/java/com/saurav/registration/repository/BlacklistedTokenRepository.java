package com.saurav.registration.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.saurav.registration.entity.BlacklistedToken;

public interface BlacklistedTokenRepository
        extends JpaRepository<BlacklistedToken, Long> {

    boolean existsByToken(String token);
}