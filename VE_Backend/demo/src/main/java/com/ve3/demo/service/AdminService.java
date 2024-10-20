package com.ve3.demo.service;

import java.util.List;

import com.ve3.demo.model.Admin;

public interface AdminService {
	
	public Admin  getById(String adminEmail);

	void save(Admin admin);  // Save or update method for admins

    // Get all admins (if needed)
    List<Admin> getAll();

    // Optionally, delete an admin by email or ID (depending on your use case)
    void deleteByEmail(String adminEmail);
}
