package com.example.ForestFireSimulation.FirepointDataModule.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Data @NoArgsConstructor @AllArgsConstructor
public class FirepointDataDTO {
    private Long id;
    private String latitude;
    private String longitude;
    private LocalDate date_of_fire;
    private String fire_start_time;
    private LocalDate fire_control_date;
    private String fire_control_time;
    private String record_type;
    private double area_damaged;
    private List<Map<String, String>> species_damaged;
    private List<Map<String, String>> wildlife_affected;
    private String photo_path;
    private String other_info;
    private String username;
    private String division;
    private Boolean submitted;
    private Boolean reconsider;
    private Boolean accepted;
}
