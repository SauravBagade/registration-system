package com.saurav.registration.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.saurav.registration.dto.AdminStats;
import com.saurav.registration.entity.User;
import com.saurav.registration.repository.UserRepository;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    public User getUserById(Long id) {

        return userRepository.findById(id)
                .orElseThrow();
    }

    public void deleteUser(Long id) {

        userRepository.deleteById(id);
    }

    public AdminStats getAnalytics() {

        long totalUsers =
                userRepository.count();

        long verifiedUsers =
                userRepository
                        .findAll()
                        .stream()
                        .filter(User::isVerified)
                        .count();

        long adminUsers =
                userRepository
                        .findAll()
                        .stream()
                        .filter(u ->
                                "ADMIN".equals(
                                        u.getRole()))
                        .count();

        return new AdminStats(
                totalUsers,
                verifiedUsers,
                adminUsers);
    }
}