package com.bgmi.platform.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "match_modes")
@Data
public class MatchMode {

    @Id
    private String id;

    private String modeName;
    private String map;
    private Double entryFee;
    private String imageUrl;
    private Boolean isActive;
}
