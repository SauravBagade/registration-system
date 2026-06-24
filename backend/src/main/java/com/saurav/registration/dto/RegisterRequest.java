package com.saurav.registration.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class RegisterRequest {

    @NotBlank(message = "Full Name Required")
    private String fullName;

    @Email(message = "Invalid Email")
    @NotBlank(message = "Email Required")
    private String email;

    @Pattern(
            regexp = "^[0-9]{10}$",
            message = "Mobile Number Must Be 10 Digits")
    private String mobileNumber;

    @Size(
            min = 6,
            message = "Password Must Be At Least 6 Characters")
    private String password;

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}