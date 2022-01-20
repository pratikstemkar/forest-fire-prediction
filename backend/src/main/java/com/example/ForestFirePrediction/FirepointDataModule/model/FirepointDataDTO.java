package com.example.ForestFirePrediction.FirepointDataModule.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Data @NoArgsConstructor @AllArgsConstructor
public class FirepointDataDTO {
    private Long ID;
    private String LATITUDE;
    private String LONGITUDE;
    private String SOURCE_SYSTEM_TYPE;
    private String SOURCE_SYSTEM;
    private String NWCG_REPORTING_AGENCY;
    private String NWCG_REPORTING_UNIT_ID;
    private String NWCG_REPORTING_UNIT_NAME;
    private Integer FIRE_YEAR;
    private LocalDate DISCOVERY_DATE;
    private Integer DISCOVERY_DOY;
    private Integer DISCOVERY_TIME;
    private Integer STAT_CAUSE_CODE;
    private String STAT_CAUSE_DESCR;
    private LocalDate CONT_DATE;
    private Integer CONT_DOY;
    private Integer CONT_TIME;
    private Double FIRE_SIZE;
    private String FIRE_SIZE_CLASS;
    private Integer OWNER_CODE;
    private String OWNER_DESCR;
    private String STATE;
    private String COUNTY;
}
