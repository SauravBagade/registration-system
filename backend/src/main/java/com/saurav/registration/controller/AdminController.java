package com.saurav.registration.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.saurav.registration.dto.AdminStats;
import com.saurav.registration.entity.User;
import com.saurav.registration.service.AdminService;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping
    public String adminDashboard() {
        return "Welcome Admin";
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return adminService.getAllUsers();
    }

    @GetMapping("/user/{id}")
    public User getUserById(
            @PathVariable Long id) {

        return adminService.getUserById(id);
    }

    @DeleteMapping("/user/{id}")
    public String deleteUser(
            @PathVariable Long id) {

        adminService.deleteUser(id);

        return "User Deleted Successfully";
    }

    @GetMapping("/analytics")
    public AdminStats analytics() {

        return adminService.getAnalytics();
    }
}