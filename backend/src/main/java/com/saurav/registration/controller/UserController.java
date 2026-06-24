package com.saurav.registration.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.saurav.registration.dto.RegisterRequest;
import com.saurav.registration.service.UserService;
import com.saurav.registration.dto.VerifyOtpRequest;
import com.saurav.registration.entity.User;
import com.saurav.registration.jwt.JwtUtil;
import com.saurav.registration.dto.LoginRequest;
import com.saurav.registration.dto.RefreshTokenRequest;
import com.saurav.registration.dto.ForgotPasswordRequest;
import com.saurav.registration.dto.ResetPasswordRequest;
import com.saurav.registration.dto.ApiResponse;
import com.saurav.registration.dto.ChangePasswordRequest;
import org.springframework.web.bind.annotation.RequestHeader;
import com.saurav.registration.dto.UpdateProfileRequest;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String registerUser(
            @Valid
            @RequestBody RegisterRequest request) {

        return userService.registerUser(request);
    }
    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestBody VerifyOtpRequest request) {

        return userService.verifyOtp(
                request.getEmail(),
                request.getOtp());
    }
    @PostMapping("/login")
    public ApiResponse<String> loginUser(
            @RequestBody LoginRequest request) {

        return userService.loginUser(request);
    }
    @PostMapping("/forgot-password")
    public String forgotPassword(
            @RequestBody ForgotPasswordRequest request) {

        return userService.forgotPassword(
                request.getEmail());
    }
    @PostMapping("/reset-password")
    public String resetPassword(
            @RequestBody ResetPasswordRequest request) {

        return userService.resetPassword(
                request.getEmail(),
                request.getOtp(),
                request.getNewPassword());
    }
    @PostMapping("/change-password")
    public String changePassword(
            @RequestBody ChangePasswordRequest request) {

        return userService.changePassword(
                request.getEmail(),
                request.getOldPassword(),
                request.getNewPassword());
    }
    @PostMapping("/logout")
    public String logout(
            @RequestHeader("Authorization")
            String authHeader) {

        return userService.logout(authHeader);
    }
    @GetMapping("/profile")
    public String profile() {

        return "Welcome User";
    }
    @PostMapping("/refresh-token")
    public String refreshToken(
            @RequestBody RefreshTokenRequest request) {

        return userService.refreshToken(
                request.getRefreshToken());
    }
    @GetMapping("/my-profile")
    public User getProfile(
            @RequestHeader("Authorization")
            String authHeader) {

        String token =
                authHeader.substring(7);

        String email =
                JwtUtil.extractEmail(token);

        return userService.getProfile(email);
    }
    @PutMapping("/update-profile")
    public User updateProfile(
            @RequestHeader("Authorization")
            String authHeader,

            @RequestBody
            UpdateProfileRequest request) {

        String token =
                authHeader.substring(7);

        String email =
                JwtUtil.extractEmail(token);

        return userService.updateProfile(
                email,
                request.getFullName(),
                request.getMobileNumber());
    }
    @DeleteMapping("/delete-account")
    public String deleteAccount(
            @RequestHeader("Authorization")
            String authHeader) {

        String token =
                authHeader.substring(7);

        String email =
                JwtUtil.extractEmail(token);

        return userService.deleteUser(email);
    }
    
}