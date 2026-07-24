package com.bgmi.platform.controller;

import com.bgmi.platform.dto.RegistrationRequest;
import com.bgmi.platform.model.Registration;
import com.bgmi.platform.service.RegistrationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registrations")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class RegistrationController {

    private final RegistrationService registrationService;

    @PostMapping
    public ResponseEntity<Registration> createRegistration(
            Authentication authentication,
            @Valid @RequestBody RegistrationRequest request
    ) {
        if (authentication == null || authentication.getPrincipal() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String userId = (String) authentication.getPrincipal();
        Registration registration = registrationService.createRegistration(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(registration);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Registration> getRegistrationById(@PathVariable String id) {
        Registration registration = registrationService.getRegistrationById(id);
        return ResponseEntity.ok(registration);
    }

    @PostMapping("/{id}/pay")
    public ResponseEntity<Registration> confirmPayment(
            Authentication authentication,
            @PathVariable String id
    ) {
        if (authentication == null || authentication.getPrincipal() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String userId = (String) authentication.getPrincipal();
        Registration updated = registrationService.confirmPayment(id, userId);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/my")
    public ResponseEntity<List<Registration>> getMyRegistrations(Authentication authentication) {
        if (authentication == null || authentication.getPrincipal() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String userId = (String) authentication.getPrincipal();
        List<Registration> list = registrationService.getRegistrationsByUserId(userId);
        return ResponseEntity.ok(list);
    }
}
