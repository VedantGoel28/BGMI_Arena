package com.bgmi.platform.service;

import com.bgmi.platform.dto.RegistrationRequest;
import com.bgmi.platform.exception.ResourceNotFoundException;
import com.bgmi.platform.model.Registration;
import com.bgmi.platform.model.User;
import com.bgmi.platform.repository.RegistrationRepository;
import com.bgmi.platform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final UserRepository userRepository;

    public Registration createRegistration(String userId, RegistrationRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        if (request.getUid() == null || request.getUid().trim().isEmpty()) {
            throw new IllegalArgumentException("BGMI UID is mandatory");
        }

        if (request.getLevel() == null || request.getLevel().trim().isEmpty()) {
            throw new IllegalArgumentException("BGMI Level is mandatory");
        }

        Registration registration = new Registration();
        registration.setUserId(user.getId());
        registration.setName(user.getFullName());
        registration.setEmail(user.getEmail());
        registration.setMobileNumber(user.getMobileNumber());
        registration.setIgn(request.getIgn() != null ? request.getIgn().trim() : "");
        registration.setUid(request.getUid().trim());
        registration.setLevel(request.getLevel().trim());
        registration.setMatchModeId(request.getMatchModeId());
        registration.setMode(request.getMode());
        registration.setMap(request.getMap());
        registration.setEntryFee(request.getEntryFee() != null ? request.getEntryFee() : 0.0);
        registration.setPaymentStatus("PENDING");
        registration.setMatchStatus(Registration.MatchStatus.WAITING_FOR_SLOT);
        registration.setRegisteredAt(LocalDateTime.now());

        return registrationRepository.save(registration);
    }

    public Registration getRegistrationById(String registrationId) {
        return registrationRepository.findById(registrationId)
                .orElseThrow(() -> new ResourceNotFoundException("Registration not found with id: " + registrationId));
    }

    public List<Registration> getRegistrationsByUserId(String userId) {
        return registrationRepository.findByUserId(userId);
    }

    public Registration confirmPayment(String registrationId, String userId) {
        Registration registration = getRegistrationById(registrationId);

        if (!registration.getUserId().equals(userId)) {
            throw new IllegalArgumentException("Unauthorized action for registration ID: " + registrationId);
        }

        registration.setPaymentStatus("COMPLETED");
        registration.setPaymentId("PAY_" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        registration.setMatchStatus(Registration.MatchStatus.WAITING_FOR_SLOT);

        return registrationRepository.save(registration);
    }
}
