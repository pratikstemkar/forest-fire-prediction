package com.example.ForestFirePrediction.FirepointDataModule.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collection;

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
            name = "ID",
            updatable = false
    )
    private Long ID;

    @Column(
            name="LATITUDE",
            nullable = false
    )
    private Double LATITUDE;

    @Column(
            name="LONGITUDE",
            nullable = false
    )
    private Double LONGITUDE;

    @Column(
            name = "SOURCE_SYSTEM_TYPE"
    )
    private String SOURCE_SYSTEM_TYPE;

    @Column(
            name = "SOURCE_SYSTEM"
    )
    private String SOURCE_SYSTEM;

    @Column(
            name = "NWCG_REPORTING_AGENCY"
    )
    private String NWCG_REPORTING_AGENCY;

    @Column(
            name = "NWCG_REPORTING_UNIT_ID"
    )
    private String NWCG_REPORTING_UNIT_ID;

    @Column(
            name = "NWCG_REPORTING_UNIT_NAME"
    )
    private String NWCG_REPORTING_UNIT_NAME;

    @Column(
            name = "FIRE_YEAR"
    )
    private Integer FIRE_YEAR;

    @Column(
            name = "DISCOVERY_DATE"
    )
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy", timezone = "IST") private LocalDate DISCOVERY_DATE;

    @Column(
            name = "DISCOVERY_DOY"
    )
    private Integer DISCOVERY_DOY;

    @Column(
            name = "DISCOVERY_TIME"
    )
    private Integer DISCOVERY_TIME;

    @Column(
            name = "STAT_CAUSE_CODE"
    )
    private Integer STAT_CAUSE_CODE;

    @Column(
            name = "STAT_CAUSE_DESCR"
    )
    private String STAT_CAUSE_DESCR;

    @Column(
            name = "CONT_DATE"
    )
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy", timezone = "IST") private LocalDate CONT_DATE;

    @Column(
            name = "CONT_DOY"
    )
    private Integer CONT_DOY;

    @Column(
            name = "CONT_TIME"
    )
    private Integer CONT_TIME;

    @Column(
            name = "FIRE_SIZE"
    )
    private Double FIRE_SIZE;

    @Column(
            name = "FIRE_SIZE_CLASS"
    )
    private String FIRE_SIZE_CLASS;

    @Column(
            name = "OWNER_CODE"
    )
    private Integer OWNER_CODE;

    @Column(
            name = "OWNER_DESCR"
    )
    private String OWNER_DESCR;

    @Column(
            name = "STATE"
    )
    private String STATE;

    @Column(
            name = "COUNTY"
    )
    private String COUNTY;

}
