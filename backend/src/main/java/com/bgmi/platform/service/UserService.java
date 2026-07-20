package com.bgmi.platform.service;

import com.bgmi.platform.dto.AuthResponse;
import com.bgmi.platform.dto.LoginRequest;
import com.bgmi.platform.dto.RegisterRequest;
import com.bgmi.platform.exception.ResourceNotFoundException;
import com.bgmi.platform.model.User;
import com.bgmi.platform.repository.UserRepository;
import com.bgmi.platform.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthResponse register(RegisterRequest request) {
        // Check if mobile number already exists
        if (userRepository.existsByMobileNumber(request.getMobileNumber())) {
            throw new RuntimeException("Mobile number already registered");
        }

        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // Create new user
        User user = new User();
        user.setFullName(request.getFullName());
        user.setMobileNumber(request.getMobileNumber());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setCreatedAt(LocalDateTime.now());

        // Save user
        User savedUser = userRepository.save(user);

        // Generate token
        String token = jwtUtil.generateToken(
                savedUser.getId(),
                savedUser.getFullName(),
                savedUser.getMobileNumber()
        );

        return new AuthResponse(
                token,
                "Registration successful",
                savedUser.getId(),
                savedUser.getFullName(),
                savedUser.getMobileNumber()
        );
    }

    public AuthResponse login(LoginRequest request) {
        // Find user by mobile number
        User user = userRepository.findByMobileNumber(request.getMobileNumber())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with mobile number: " + request.getMobileNumber()));

        // Check password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // Generate token
        String token = jwtUtil.generateToken(
                user.getId(),
                user.getFullName(),
                user.getMobileNumber()
        );

        return new AuthResponse(
                token,
                "Login successful",
                user.getId(),
                user.getFullName(),
                user.getMobileNumber()
        );
    }

    public User getUserById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    public User getUserByMobileNumber(String mobileNumber) {
        return userRepository.findByMobileNumber(mobileNumber)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with mobile number: " + mobileNumber));
    }
}
