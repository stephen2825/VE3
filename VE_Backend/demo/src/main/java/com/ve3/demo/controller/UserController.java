package com.ve3.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ve3.demo.service.EnrollmentService;
import com.ve3.demo.service.UserService;
import com.ve3.demo.model.User;

@RestController
@CrossOrigin(origins = "http://localhost:3000")  // Allow CORS only from the React front-end
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private EnrollmentService enrollmentService;  // Inject EnrollmentService

    // Adding user to database
    @PostMapping("userRegister")
    public void userPost(@RequestBody User user) {
        userService.add(user);
    }

    // Registering a user for an event
    @PostMapping("/registerForEvent")
    public ResponseEntity<String> registerForEvent(@RequestParam int userId, @RequestParam int eventId) {
        try {
            enrollmentService.registerForEvent(userId, eventId);
            return ResponseEntity.ok("User successfully registered for the event!");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User is already registered for this event.");
        }
    }

    // Other existing endpoints
    @GetMapping("/listOfUser")
    public List<User> productList() {
        return userService.getAll();
    }

    // Fetching user profile based on userId
    @GetMapping("/userProfile/{userId}")
    public ResponseEntity<User> getUser(@PathVariable int userId) {
        User user = userService.getById(userId);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    // Updating user details
    @PutMapping("/userProfile/{userId}")
    public ResponseEntity<String> updateUser(@PathVariable int userId, @RequestBody User user) {
        try {
            // Ensure the user exists
            User existingUser = userService.getById(userId);
            if (existingUser != null) {
                // Update the existing user details
                user.setUserId(userId);  // Ensure the user ID matches for the update
                userService.update(user);  // Update the user in the service layer
                return ResponseEntity.ok("User updated successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during the update.");
        }
    }
}
