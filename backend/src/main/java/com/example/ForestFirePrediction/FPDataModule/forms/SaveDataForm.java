package com.example.ForestFirePrediction.FPDataModule.forms;

import lombok.Data;

import java.time.LocalDate;

@Data
public class SaveDataForm {

    private Double latitude;
    private Double longitude;
    private String source_system_type;
    private String source_system;
    private String nwcg_reporting_agency;
    private LocalDate discovery_date;
    private String discovery_time;
    private LocalDate cont_date;
    private String cont_time;
    private String state;
    private String stat_cause_code;
    private String owner_code;
}
