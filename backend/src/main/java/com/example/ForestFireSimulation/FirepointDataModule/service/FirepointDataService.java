package com.example.ForestFireSimulation.FirepointDataModule.service;

import com.example.ForestFireSimulation.FirepointDataModule.model.FirepointDataDTO;
import com.example.ForestFireSimulation.FirepointDataModule.model.FirepointDataResponse;
import com.example.ForestFireSimulation.FirepointDataModule.model.FirepointData;
import com.example.ForestFireSimulation.FirepointDataModule.repo.FirepointDataRepository;
import com.example.ForestFireSimulation.FirepointDataModule.repo.FirepointSpeciesDamagedRepo;
import com.example.ForestFireSimulation.FirepointDataModule.repo.FirepointWildlifeAffectedRepo;
import com.example.ForestFireSimulation.SplData.model.Species;
import com.example.ForestFireSimulation.SplData.model.Wildlife;
import com.example.ForestFireSimulation.SplData.repo.SpeciesRepo;
import com.example.ForestFireSimulation.SplData.repo.WildlifeRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.logging.Log;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service @RequiredArgsConstructor @Slf4j
public class FirepointDataService {

    private final FirepointSpeciesDamagedService firepointSpeciesDamagedService;
    private final FirepointWildlifeAffectedService firepointWildlifeAffectedService;

    private final FirepointDataRepository firepointDataRepository;
    private final FirepointSpeciesDamagedRepo firepointSpeciesDamagedRepo;
    private final FirepointWildlifeAffectedRepo firepointWildlifeAffectedRepo;
    private final SpeciesRepo speciesRepo;
    private final WildlifeRepo wildlifeRepo;

    public Long getDataCount(){
        return firepointDataRepository.countFirepointDataByAcceptedEquals(true);
    }

    public List<FirepointData> getData() {
        System.out.println(firepointDataRepository.findAll());
        return firepointDataRepository.findAll();
    }

    public FirepointDataResponse getResData(Long id){
        FirepointData firepointData = firepointDataRepository.findFirepointDataById(id);
        if(firepointData != null){
            FirepointDataResponse firepointDataResponse = new FirepointDataResponse(firepointData, firepointSpeciesDamagedRepo.findFSDById(firepointData.getId()), firepointWildlifeAffectedRepo.findFWAById(firepointData.getId()), speciesRepo, wildlifeRepo);
            return firepointDataResponse;
        }else{
            throw new IllegalStateException("Firepoint Data not Found for ID: " + id);
        }
    }

    public List<FirepointDataResponse> getRoResDataList(String username){
        List<FirepointData> firepointDataList = firepointDataRepository.findDataEntriesByUsername(username);
        List<Long> firepointDataIds = new ArrayList<>();
        firepointDataList.forEach(fd -> {
            firepointDataIds.add(fd.getId());
        });
        List<FirepointDataResponse> firepointDataResponseList = new ArrayList<>();
        firepointDataIds.forEach(fdid -> {
            firepointDataResponseList.add(getResData(fdid));
        });
        return firepointDataResponseList;
    }

    public List<FirepointDataResponse> getDoResDataList(String division){
        List<FirepointData> firepointDataList = firepointDataRepository.findDataEntriesByDivision(division);
        List<Long> firepointDataIds = new ArrayList<>();
        firepointDataList.forEach(fd -> {
            firepointDataIds.add(fd.getId());
        });
        List<FirepointDataResponse> firepointDataResponseList = new ArrayList<>();
        firepointDataIds.forEach(fdid -> {
            firepointDataResponseList.add(getResData(fdid));
        });
        return firepointDataResponseList;
    }

    public ArrayList<FirepointData> getRoData(String username) {
        return firepointDataRepository.findDataEntriesByUsername(username);
    }

    public List<FirepointData> getDoDataEntries(String division){
        ArrayList<FirepointData> dataEntries =  firepointDataRepository.findDataEntriesByDivision(division);
        return dataEntries.stream() .filter(entry -> entry.getSubmitted() == true).collect(Collectors.toList());
    }

    @Transactional
    public FirepointData updateData(FirepointDataDTO firepointDataDTO, Long id) {
        FirepointData firepointData = firepointDataRepository.findById(id).orElseThrow(() -> new Error("Data not found for id: " + id));
        firepointData.setLatitude(Double.parseDouble(firepointDataDTO.getLatitude()));
        firepointData.setLongitude(Double.parseDouble(firepointDataDTO.getLongitude()));
        firepointData.setRecord_type(firepointDataDTO.getRecord_type());
        firepointData.setDate_of_fire(firepointDataDTO.getDate_of_fire());
        LocalTime time = LocalTime.parse(firepointDataDTO.getFire_start_time());
        firepointData.setFire_start_time(time);
        firepointData.setFire_control_date(firepointDataDTO.getFire_control_date());
        LocalTime time1 = LocalTime.parse(firepointDataDTO.getFire_control_time());
        firepointData.setFire_control_time(time1);
        firepointData.setArea_damaged(firepointDataDTO.getArea_damaged());
        firepointData.getSpecies_damaged().clear();
        firepointDataDTO.getSpecies_damaged().forEach(species -> {
            Species appSpecies = speciesRepo.findSpeciesByName(species.get("name"));
            firepointData.getSpecies_damaged().add(appSpecies);
        });
        firepointData.getWildlife_affected().clear();
        firepointDataDTO.getWildlife_affected().forEach(wildlife -> {
            Wildlife appWildlife = wildlifeRepo.findWildlifeByName(wildlife.get("name"));
            firepointData.getWildlife_affected().add(appWildlife);
        });
        firepointData.setPhoto_path(firepointDataDTO.getPhoto_path());
        firepointData.setOther_info(firepointDataDTO.getOther_info());
        firepointData.setSubmitted(firepointDataDTO.getSubmitted());
        firepointData.setAccepted(firepointDataDTO.getAccepted());
        firepointData.setReconsider(firepointDataDTO.getReconsider());
        firepointData.setDivision(firepointDataDTO.getDivision());
        firepointData.setUsername(firepointDataDTO.getUsername());

//        firepointDataRepository.save(firepointData);

        firepointDataDTO.getSpecies_damaged().forEach(species -> {
            Species appSpecies = speciesRepo.findSpeciesByName(species.get("name"));
            firepointSpeciesDamagedService.addTotalNum(firepointSpeciesDamagedRepo.findFSDId(firepointDataDTO.getId(), appSpecies.getId()), Integer.parseInt(species.get("total_num")));
        });
        firepointDataDTO.getWildlife_affected().forEach(wildlife -> {
            Wildlife appWildlife = wildlifeRepo.findWildlifeByName(wildlife.get("name"));
            firepointWildlifeAffectedService.addTotalNum(firepointWildlifeAffectedRepo.findFWAId(firepointDataDTO.getId(), appWildlife.getId()), Integer.parseInt(wildlife.get("total_num")));
        });

        return firepointData;
    }
}
