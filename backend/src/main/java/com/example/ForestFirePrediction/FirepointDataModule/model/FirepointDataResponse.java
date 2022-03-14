package com.example.ForestFirePrediction.FirepointDataModule.model;

import com.example.ForestFirePrediction.FirepointDataModule.forms.ExtraForm;
//import com.example.ForestFirePrediction.SplData.repo.SpeciesRepo;
//import com.example.ForestFirePrediction.SplData.repo.WildlifeRepo;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

@Data @NoArgsConstructor @AllArgsConstructor @Slf4j
public class FirepointDataResponse {

    private Long id;
    private double latitude;
    private double longitude;
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
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd") private LocalDate date_of_fire;
//    private LocalTime fire_start_time;
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd") private LocalDate fire_control_date;
//    private LocalTime fire_control_time;
//    private String record_type;
//    private double area_damaged;
//    private List<ExtraForm> species_damaged;
//    private List<ExtraForm> wildlife_affected;
//    private String photo_path;
//    private String other_info;
//    private String username;
//    private String division;
//    private Boolean submitted;
//    private Boolean reconsider;
//    private Boolean accepted;

    public FirepointDataResponse(FirepointData firepointData){
        this.id = firepointData.getID();
        this.latitude = firepointData.getLATITUDE();
        this.longitude = firepointData.getLONGITUDE();
        this.SOURCE_SYSTEM = firepointData.getSOURCE_SYSTEM();
        this.SOURCE_SYSTEM_TYPE = firepointData.getSOURCE_SYSTEM_TYPE();
        this.NWCG_REPORTING_AGENCY = firepointData.getNWCG_REPORTING_AGENCY();
        this.NWCG_REPORTING_UNIT_ID = firepointData.getNWCG_REPORTING_UNIT_ID();
        this.NWCG_REPORTING_UNIT_NAME = firepointData.getNWCG_REPORTING_UNIT_NAME();
        this.FIRE_YEAR = firepointData.getFIRE_YEAR();
        this.DISCOVERY_DATE = firepointData.getDISCOVERY_DATE();
        this.DISCOVERY_DOY = firepointData.getDISCOVERY_DOY();
        this.DISCOVERY_TIME = firepointData.getDISCOVERY_TIME();
        this.STAT_CAUSE_CODE = firepointData.getSTAT_CAUSE_CODE();
        this.STAT_CAUSE_DESCR = firepointData.getSTAT_CAUSE_DESCR();
        this.CONT_DATE = firepointData.getCONT_DATE();
        this.CONT_DOY = firepointData.getCONT_DOY();
        this.CONT_TIME = firepointData.getCONT_TIME();
        this.OWNER_CODE = firepointData.getOWNER_CODE();
        this.OWNER_DESCR = firepointData.getOWNER_DESCR();
        this.STATE = firepointData.getSTATE();
        this.COUNTY = firepointData.getCOUNTY();
//        this.date_of_fire = firepointData.getDate_of_fire();
//        this.fire_start_time = firepointData.getFire_start_time();
//        this.fire_control_date = firepointData.getFire_control_date();
//        this.fire_control_time = firepointData.getFire_control_time();
//        this.record_type = firepointData.getRecord_type();
//        this.area_damaged = firepointData.getArea_damaged();
//        List<ExtraForm> newList = new ArrayList<>();
//        firepointSpeciesDamaged.forEach(fsd -> {
//            newList.add(new ExtraForm(speciesRepo.findSpeciesById(fsd.getSpecies_damaged_id()).getId(), speciesRepo.findSpeciesById(fsd.getSpecies_damaged_id()).getName(), speciesRepo.findSpeciesById(fsd.getSpecies_damaged_id()).getAlias(), fsd.getTotal_num()));
//        });
//        this.species_damaged = newList;
//        List<ExtraForm> nextList = new ArrayList<>();
//        firepointWildlifeAffected.forEach(fwa -> {
//            nextList.add(new ExtraForm(wildlifeRepo.findWildlifeById(fwa.getWildlife_affected_id()).getId(), wildlifeRepo.findWildlifeById(fwa.getWildlife_affected_id()).getName(), wildlifeRepo.findWildlifeById(fwa.getWildlife_affected_id()).getAlias(), fwa.getTotal_num()));
//        });
//        this.wildlife_affected = nextList;
//        this.photo_path = firepointData.getPhoto_path();
//        this.other_info = firepointData.getOther_info();
//        this.username = firepointData.getUsername();
//        this.division = firepointData.getDivision();
//        this.submitted = firepointData.getSubmitted();
//        this.reconsider = firepointData.getReconsider();
//        this.accepted = firepointData.getAccepted();
    }
}
