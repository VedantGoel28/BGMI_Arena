package com.bgmi.platform.model;

import java.time.LocalDateTime;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "registrations")
@Data
public class Registration {

    @Id
    private String id;

    private String userId;
    private String name;
    private String email;
    private String mobileNumber;
    private String ign;
    private String uid;
    private String level;
    private String matchModeId;
    private String mode;
    private String map;
    private Double entryFee;
    private String paymentId;
    private String paymentStatus;
    private MatchStatus matchStatus;
    private String roomId;
    private String roomPassword;
    private LocalDateTime matchTime;
    private LocalDateTime registeredAt;

    public enum MatchStatus {
        WAITING_FOR_SLOT,
        SLOT_ASSIGNED,
        COMPLETED
    }
}
