package com.ve3.demo.service;

import java.util.List;

import com.ve3.demo.model.User;



public interface UserService {
	
	User getById(int userId);
	void add(User user);
	List<User> getAll();
	User getByEmail(String userEmail);
	// Add or update user
    void save(User user);
    
 // Method to update user details
    void update(User user);

}
