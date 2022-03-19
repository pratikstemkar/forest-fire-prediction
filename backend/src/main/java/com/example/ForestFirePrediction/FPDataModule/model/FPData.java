package com.example.ForestFirePrediction.FPDataModule.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
@Table(name = "firepoint_data")
public class FPData {

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
    private Double latitude;

    @Column(
            name="longitude",
            nullable = false
    )
    private Double longitude;

    @Column(
            name = "source_system_type"
    )
    private String source_system_type;

    @Column(
            name = "source_system"
    )
    private String source_system;

    @Column(
            name = "nwcg_reporting_agency"
    )
    private String nwcg_reporting_agency;

    @Column(
            name = "discovery_date"
    )
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy", timezone = "IST") private LocalDate discovery_date;

    @Column(
            name = "discovery_time"
    )
    private String discovery_time;

    @Column(
            name = "cont_date"
    )
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy", timezone = "IST") private LocalDate cont_date;

    @Column(
            name = "cont_time"
    )
    private String cont_time;

    @Column(
            name = "stat_cause_code"
    )
    private String stat_cause_code;

    @Column(
            name = "fire_size"
    )
    private String fire_size;

    @Column(
            name = "fire_size_class"
    )
    private String fire_size_class;

    @Column(
            name = "owner_code"
    )
    private String owner_code;

    @Column(
            name = "state"
    )
    private String state;
}
