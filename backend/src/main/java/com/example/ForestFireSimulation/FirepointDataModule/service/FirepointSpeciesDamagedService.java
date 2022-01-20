package com.example.ForestFireSimulation.FirepointDataModule.service;

import com.example.ForestFireSimulation.FirepointDataModule.model.FirepointSpeciesDamaged;
import com.example.ForestFireSimulation.FirepointDataModule.repo.FirepointSpeciesDamagedRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service @RequiredArgsConstructor @Slf4j
public class FirepointSpeciesDamagedService {

    private final FirepointSpeciesDamagedRepo firepointSpeciesDamagedRepo;

    @Transactional
    public void addTotalNum(Long firepoint_species_id, Integer total_num){
        log.info(firepoint_species_id + "");
        FirepointSpeciesDamaged appFSD = firepointSpeciesDamagedRepo.findFirepointSpeciesDamagedByFirepoint_species_id(firepoint_species_id);
        log.info(appFSD.toString());
        appFSD.setTotal_num(total_num);
    }
}
