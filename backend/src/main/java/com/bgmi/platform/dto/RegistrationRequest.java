package com.bgmi.platform.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RegistrationRequest {

    private String ign; // Optional

    @NotBlank(message = "BGMI UID is mandatory")
    private String uid;

    @NotNull(message = "BGMI Level is mandatory")
    private String level;

    @NotBlank(message = "Match mode ID is required")
    private String matchModeId;

    private String mode;
    private String map;
    private Double entryFee;
}
