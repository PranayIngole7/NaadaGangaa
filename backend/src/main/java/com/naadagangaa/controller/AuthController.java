package com.naadagangaa.controller;

import com.naadagangaa.dto.ApiResponse;
import com.naadagangaa.dto.LoginRequest;
import com.naadagangaa.dto.RegisterRequest;
import com.naadagangaa.entity.User;
import com.naadagangaa.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<User>> register(@RequestBody RegisterRequest request) {
        try {
            if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.fail("Username is required"));
            }
            if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.fail("Password is required"));
            }
            if (userRepository.existsByUsername(request.getUsername())) {
                return ResponseEntity.badRequest().body(ApiResponse.fail("Username already exists!"));
            }

            User user = new User();
            user.setUsername(request.getUsername());
            user.setEmail(request.getEmail());
            user.setPassword(request.getPassword());

            User savedUser = userRepository.save(user);
            savedUser.setPassword(null); // Keep password safe

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success(savedUser, "User registered successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.fail("Registration error: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<User>> login(@RequestBody LoginRequest request) {
        try {
            Optional<User> userOpt = userRepository.findByUsername(request.getUsername());

            if (userOpt.isPresent() && userOpt.get().getPassword().equals(request.getPassword())) {
                User user = userOpt.get();
                user.setPassword(null);
                return ResponseEntity.ok(ApiResponse.success(user, "Login successful"));
            }

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.fail("Invalid username or password"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.fail("Login error: " + e.getMessage()));
        }
    }
}