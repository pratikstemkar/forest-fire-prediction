package com.example.ForestFireSimulation.FirepointDataModule.model;

import com.example.ForestFireSimulation.SplData.model.Species;
import com.example.ForestFireSimulation.SplData.model.Wildlife;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collection;
import java.util.Date;

@Entity @Data @NoArgsConstructor @AllArgsConstructor
@Table(name="firepoint_data")
public class FirepointData {

    @Id
    @SequenceGenerator(
            name = "firepoint_id_seq",
            sequenceName = "firepoint_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "firepoint_id_seq")
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;

    @Column(
            name="latitude",
            nullable = false
    )
    private double latitude;

    @Column(
            name="longitude",
            nullable = false
    )
    private double longitude;

    @Column(
            name="date_of_fire"
    )
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy", timezone = "IST") private LocalDate date_of_fire;

    @Column(
            name = "fire_start_time"
    )
    private LocalTime fire_start_time;

    @Column(
            name = "fire_control_date"
    )
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy", timezone = "IST") private LocalDate fire_control_date;

    @Column(
            name = "fire_control_time"
    )
    private LocalTime fire_control_time;

    @Column(
            name = "area_damaged"
    )
    private double area_damaged;

    @Column(
            name = "record_type"
    )
    private String record_type;

    @ManyToMany
    @JoinColumn(
            name = "species_damaged"
    )
    private Collection<Species> species_damaged;

    @ManyToMany
    @JoinColumn(
            name = "wildlife_affected"
    )
    private Collection<Wildlife> wildlife_affected;

    @Column(
            name = "photo_path"
    )
    private String photo_path;

    @Column(
            name = "other_info"
    )
    private String other_info;

    @Column(
            name = "username"
    )
    private String username;

    @Column(
            name = "division"
    )
    private String division;

    @Column(
            name = "submitted"
    )
    private Boolean submitted;

    @Column(
            name = "reconsider"
    )
    private Boolean reconsider;

    @Column(
            name = "accepted"
    )
    private Boolean accepted;
}
