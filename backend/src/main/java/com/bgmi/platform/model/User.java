package com.bgmi.platform.model;

import java.time.LocalDateTime;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Data
public class User {

    @Id
    private String id;

    private String fullName;

    @Indexed(unique = true)
    private String mobileNumber;

    private String email;
    private String password;
    private LocalDateTime createdAt;
}
