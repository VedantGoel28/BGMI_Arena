package com.bgmi.platform.model;

import java.time.LocalDateTime;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "payments")
@Data
public class Payment {

    @Id
    private String id;

    private String registrationId;
    private String userId;
    private String razorpayOrderId;
    private String razorpayPaymentId;
    private Double amount;
    private String status;
    private LocalDateTime createdAt;
}
