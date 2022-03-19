package com.example.ForestFirePrediction.FPDataModule.service;

import com.example.ForestFirePrediction.FPDataModule.model.FPData;
import com.example.ForestFirePrediction.FPDataModule.repo.FPDataRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service @RequiredArgsConstructor @Slf4j
public class FPDataService {

    private final FPDataRepo fpDataRepo;

    public Long getFPDataCount(){
        return fpDataRepo.count();
    }

    public List<FPData> getAllData(){
        log.info("Fetching all data...");
        System.out.println(fpDataRepo.findAll());
        return fpDataRepo.findAll();
    }

    public FPData getData(Long Id){
        FPData fpData = fpDataRepo.findFPDataById(Id);
        if(fpData != null){
            log.info("Firepoint Data found for ID: " + Id);
            return fpData;
        }else{
            throw new IllegalStateException("Firepoint Data not Found for ID: " + Id);
        }
    }

    public FPData saveData(Double latitude, Double longitude, String source_system_type, String source_system, String nwcg_reporting_agency, LocalDate discovery_date, String discovery_time, LocalDate cont_date, String cont_time, String state, String stat_cause_code, String owner_code){
        log.info("Saving new FP Data...");
        FPData fpData = new FPData(null, latitude, longitude, source_system_type, source_system, nwcg_reporting_agency, discovery_date, discovery_time, cont_date, cont_time, stat_cause_code, null, null, owner_code, state);
        log.info(fpData.toString());
        return fpDataRepo.save(fpData);
    }

    @Transactional
    public void updateData(Long id, String fire_size, String fire_size_class){
        Optional<FPData> fpDataOptional = Optional.ofNullable(fpDataRepo.findFPDataById(id));
        if(!fpDataOptional.isPresent()){
            throw new IllegalStateException("FP Data with ID "+id+" does not exist.");
        }else{
            log.info("Updating FP Data...");
            FPData fpData = fpDataRepo.findFPDataById(id);
            fpData.setFire_size(fire_size);
            fpData.setFire_size_class(fire_size_class);
        }
    }

    public void deleteData(Long id) {
        Optional<FPData> fpDataOptional = Optional.ofNullable(fpDataRepo.findFPDataById(id));
        if(!fpDataOptional.isPresent()){
            throw new IllegalStateException("FP Data with ID: " + id + " does not exist.");
        }else{
            log.info("Deleting FP Data of ID: {}", id);
            FPData fpData = fpDataRepo.findFPDataById(id);
            fpDataRepo.delete(fpData);
        }
    }
}
