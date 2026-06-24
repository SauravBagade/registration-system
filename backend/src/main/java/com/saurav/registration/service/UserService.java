package com.saurav.registration.service;

import java.util.Random;
import com.saurav.registration.jwt.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.saurav.registration.dto.RegisterRequest;
import com.saurav.registration.entity.BlacklistedToken;
import com.saurav.registration.entity.User;
import com.saurav.registration.repository.BlacklistedTokenRepository;
import com.saurav.registration.repository.UserRepository;
import com.saurav.registration.dto.LoginRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import com.saurav.registration.dto.UpdateProfileRequest;
import com.saurav.registration.dto.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class UserService {

    @Autowired
    
    private UserRepository userRepository;
    
    @Autowired
    
    private BCryptPasswordEncoder passwordEncoder;
    
    @Autowired
    
    private JavaMailSender mailSender;
    
    @Autowired
    private BlacklistedTokenRepository tokenRepository;

    public String registerUser(RegisterRequest request) {
        
    	if(userRepository.findByMobileNumber(request.getMobileNumber()).isPresent()) {
    	    return "Email Already Registered";
    	}

    	if(userRepository.findByEmail(request.getEmail()).isPresent()) {
    	    return "Email Already Registered";
    	} 
        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setMobileNumber(request.getMobileNumber());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        String otp = generateOtp();

        user.setOtp(otp);
        user.setVerified(false);

        userRepository.save(user);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("OTP Verification");
        message.setText("Your OTP is: " + otp);

        mailSender.send(message);

        return "OTP Sent Successfully";
    }
    private String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }
    private void sendOtpEmail(String toEmail, String otp) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(toEmail);
        message.setSubject("OTP Verification");
        message.setText("Your OTP is: " + otp);

        mailSender.send(message);
    }
    public String verifyOtp(String email, String otp) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        if(user.getOtp().equals(otp)) {
            user.setVerified(true);
            userRepository.save(user);
            return "OTP Verified Successfully";
        }

        return "Invalid OTP";
    }
    public ApiResponse<String> loginUser(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        if (!user.isVerified()) {
            return new ApiResponse<>(false,
                    "Please Verify OTP First",
                    null);
        }

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            return new ApiResponse<>(false,
                    "Invalid Password",
                    null);
        }

        String accessToken =
                JwtUtil.generateToken(
                        user.getEmail(),
                        user.getRole());

        return new ApiResponse<>(
                true,
                "Login Successful",
                accessToken);
    }
    public String forgotPassword(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User Not Found"));

        String otp = generateOtp();

        user.setOtp(otp);

        userRepository.save(user);

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(user.getEmail());
        message.setSubject("Password Reset OTP");
        message.setText("Your OTP is: " + otp);

        mailSender.send(message);

        return "Password Reset OTP Sent";
    }
    public String resetPassword(String email,String otp,String newPassword) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User Not Found"));

         if (!user.getOtp().equals(otp)) {
        return "Invalid OTP";
     }

        user.setPassword(
        passwordEncoder.encode(newPassword));

        userRepository.save(user);

       return "Password Reset Successful";
  }
    public String changePassword(
            String email,
            String oldPassword,
            String newPassword) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User Not Found"));

        if (!passwordEncoder.matches(
                oldPassword,
                user.getPassword())) {

            return "Old Password Incorrect";
        }

        user.setPassword(
                passwordEncoder.encode(newPassword));

        userRepository.save(user);

        return "Password Changed Successfully";
    }
    public String logout(String authHeader) {

        String token =
                authHeader.substring(7);

        BlacklistedToken blacklisted =
                new BlacklistedToken();

        blacklisted.setToken(token);

        tokenRepository.save(blacklisted);

        return "Logout Successful";
    }
    public String refreshToken(
            String refreshToken) {

        String email =
                JwtUtil.extractEmail(refreshToken);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User Not Found"));

        return JwtUtil.generateToken(
                user.getEmail(),
                user.getRole());
    }
    public User getProfile(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User Not Found"));
    }
    public User updateProfile(
            String email,
            String fullName,
            String mobileNumber) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User Not Found"));

        user.setFullName(fullName);
        user.setMobileNumber(mobileNumber);

        return userRepository.save(user);
    }
    public String deleteUser(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User Not Found"));

        userRepository.delete(user);

        return "User Deleted Successfully";
    }
    
}