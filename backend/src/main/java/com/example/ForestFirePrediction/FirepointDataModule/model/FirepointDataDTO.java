package com.example.ForestFirePrediction.FirepointDataModule.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Data @NoArgsConstructor @AllArgsConstructor
public class FirepointDataDTO {
    private long id;
    private String latitude;
    private String longitude;
    private String source_system_type;
    private String source_system;
    private String nwcg_reporting_agency;
    private String nwcg_reporting_unit_id;
    private String nwcg_reporting_unit_name;
    private int fire_year;
    private String discovery_date;
    private int discovery_doy;
    private int discovery_time;
    private int stat_cause_code;
    private String stat_cause_desc;
    private LocalDate cont_date;
    private int cont_doy;
    private int cont_time;
    private double fire_size;
    private String fire_size_class;
    private int owner_code;
    private String owner_desc;
    private String state;
    private String county;

}
