package com.ve3.demo.controller;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ve3.demo.model.Admin;
import com.ve3.demo.model.Events;
import com.ve3.demo.model.User;
import com.ve3.demo.service.AdminService;
import com.ve3.demo.service.EventService;
import com.ve3.demo.service.UserService;

import java.util.List;

@CrossOrigin
@RestController
public class AdminController {

	@Autowired
	private AdminService adminService;

	@Autowired
	private UserService userService;

	@Autowired
	private EventService eventService;

	// Check password with encrypted password
	private static boolean checkPass(String plainPassword, String hashedPassword) {
		if (BCrypt.checkpw(plainPassword, hashedPassword)) {
			System.out.println("The password matches.");
			return true;
		} else {
			System.out.println("The password does not match.");
			return false;
		}
	}

	// Admin login check by email and password
	public Admin adminCheck(String email, String plainPassword) {
		Admin admin = adminService.getById(email);
		if (admin != null) {
			String hashedPassword = admin.getAdminPassword();
			if (checkPass(plainPassword, hashedPassword)) {
				return admin;
			}
		}
		return null;
	}

	// User login check by email and password
	public User userCheck(String email, String plainPassword) {
		User user = userService.getByEmail(email);
		if (user != null) {
			String hashedPassword = user.getUserPassword();
			if (checkPass(plainPassword, hashedPassword)) {
				return user;
			}
		}
		return null;
	}

	@PostMapping("/login")
	public String login(@RequestBody User loginObj) {
	    String email = loginObj.getUserEmail();
	    String plainPassword = loginObj.getUserPassword();

	    // Check if admin exists
	    Admin admin = adminCheck(email, plainPassword);
	    if (admin != null) {
	        return "Admin login successful"; // Send confirmation message instead of admin object
	    }

	    // Check if user exists
	    User user = userCheck(email, plainPassword);
	    if (user != null) {
	        return "User login successful"; // Send confirmation message instead of user object
	    }

	    return "Invalid credentials"; // Login failed for both admin and user
	}

	// Password update for both admin and user
	@PostMapping("/updatePassword")
	public String updatePassword(@RequestBody User passwordUpdateObj) {
		String email = passwordUpdateObj.getUserEmail();
		String newPassword = passwordUpdateObj.getUserPassword();
		String hashedPassword = BCrypt.hashpw(newPassword, BCrypt.gensalt());

		// Update admin password if email belongs to admin
		Admin admin = adminService.getById(email);
		if (admin != null) {
			admin.setAdminPassword(hashedPassword);
			adminService.save(admin); // Assuming adminService has a save method
			return "Admin password updated successfully";
		}

		// Update user password if email belongs to user
		User user = userService.getByEmail(email);
		if (user != null) {
			user.setUserPassword(hashedPassword);
			userService.save(user); // Assuming userService has a save method
			return "User password updated successfully";
		}

		return "Email not found";
	}
	
	// Fetch user by ID (for admin)
    @GetMapping("/fetchUser/{userId}")
    public User fetchUserById(@PathVariable int userId) {
        User user = userService.getById(userId);
        if (user != null) {
            return user; // Return the user details
        }
        return null; // Or throw a custom exception if preferred
    }

	// Create a new event (for admin only)
	@PostMapping("/createEvent")
	public String createEvent(@RequestBody Events event) {
		// Logic for admin to create an event
		// You can add additional checks to ensure the user is an admin if needed
		eventService.createEvent(event);
		return "Event created successfully";
	}
	
	// Update an event by ID
    @PutMapping("/updateEvent/{eventId}")
    public String updateEvent(@PathVariable int eventId, @RequestBody Events event) {
        // Retrieve the existing event by ID
        Events existingEvent = eventService.getEventById(eventId);
        if (existingEvent != null) {
            // Update the event fields
            existingEvent.setName(event.getName());
            existingEvent.setDatetime(event.getDatetime());
            existingEvent.setLocation(event.getLocation());
            existingEvent.setDescription(event.getDescription());
            
            // Save the updated event
            eventService.createEvent(existingEvent);
            return "Event updated successfully";
        }
        return "Event not found";
    }

    // Delete an event by ID
    @DeleteMapping("/deleteEvent/{eventId}")
    public String deleteEvent(@PathVariable int eventId) {
        // Check if the event exists
        Events existingEvent = eventService.getEventById(eventId);
        if (existingEvent != null) {
            // Delete the event
            eventService.deleteEventById(eventId);
            return "Event deleted successfully";
        }
        return "Event not found";
    }


	// Custom response object for Admin login
	public static class AdminLoginResponse {
		private Admin admin;
		private List<User> users;

		public AdminLoginResponse(Admin admin, List<User> users) {
			this.admin = admin;
			this.users = users;
		}

		public Admin getAdmin() {
			return admin;
		}

		public void setAdmin(Admin admin) {
			this.admin = admin;
		}

		public List<User> getUsers() {
			return users;
		}

		public void setUsers(List<User> users) {
			this.users = users;
		}
	}
}
