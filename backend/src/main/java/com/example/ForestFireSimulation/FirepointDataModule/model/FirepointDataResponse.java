package com.example.ForestFireSimulation.FirepointDataModule.model;

import com.example.ForestFireSimulation.FirepointDataModule.forms.ExtraForm;
import com.example.ForestFireSimulation.SplData.repo.SpeciesRepo;
import com.example.ForestFireSimulation.SplData.repo.WildlifeRepo;
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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd") private LocalDate date_of_fire;
    private LocalTime fire_start_time;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd") private LocalDate fire_control_date;
    private LocalTime fire_control_time;
    private String record_type;
    private double area_damaged;
    private List<ExtraForm> species_damaged;
    private List<ExtraForm> wildlife_affected;
    private String photo_path;
    private String other_info;
    private String username;
    private String division;
    private Boolean submitted;
    private Boolean reconsider;
    private Boolean accepted;

    public FirepointDataResponse(FirepointData firepointData, List<FirepointSpeciesDamaged> firepointSpeciesDamaged, List<FirepointWildlifeAffected> firepointWildlifeAffected, SpeciesRepo speciesRepo, WildlifeRepo wildlifeRepo){
        this.id = firepointData.getId();
        this.latitude = firepointData.getLatitude();
        this.longitude = firepointData.getLongitude();
        this.date_of_fire = firepointData.getDate_of_fire();
        this.fire_start_time = firepointData.getFire_start_time();
        this.fire_control_date = firepointData.getFire_control_date();
        this.fire_control_time = firepointData.getFire_control_time();
        this.record_type = firepointData.getRecord_type();
        this.area_damaged = firepointData.getArea_damaged();
        List<ExtraForm> newList = new ArrayList<>();
        firepointSpeciesDamaged.forEach(fsd -> {
            newList.add(new ExtraForm(speciesRepo.findSpeciesById(fsd.getSpecies_damaged_id()).getId(), speciesRepo.findSpeciesById(fsd.getSpecies_damaged_id()).getName(), speciesRepo.findSpeciesById(fsd.getSpecies_damaged_id()).getAlias(), fsd.getTotal_num()));
        });
        this.species_damaged = newList;
        List<ExtraForm> nextList = new ArrayList<>();
        firepointWildlifeAffected.forEach(fwa -> {
            nextList.add(new ExtraForm(wildlifeRepo.findWildlifeById(fwa.getWildlife_affected_id()).getId(), wildlifeRepo.findWildlifeById(fwa.getWildlife_affected_id()).getName(), wildlifeRepo.findWildlifeById(fwa.getWildlife_affected_id()).getAlias(), fwa.getTotal_num()));
        });
        this.wildlife_affected = nextList;
        this.photo_path = firepointData.getPhoto_path();
        this.other_info = firepointData.getOther_info();
        this.username = firepointData.getUsername();
        this.division = firepointData.getDivision();
        this.submitted = firepointData.getSubmitted();
        this.reconsider = firepointData.getReconsider();
        this.accepted = firepointData.getAccepted();
    }
}
