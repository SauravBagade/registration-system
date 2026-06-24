package com.saurav.registration.dto;

public class AdminStats {

    private long totalUsers;
    private long verifiedUsers;
    private long adminUsers;

    public AdminStats(
            long totalUsers,
            long verifiedUsers,
            long adminUsers) {

        this.totalUsers = totalUsers;
        this.verifiedUsers = verifiedUsers;
        this.adminUsers = adminUsers;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public long getVerifiedUsers() {
        return verifiedUsers;
    }

    public long getAdminUsers() {
        return adminUsers;
    }
}