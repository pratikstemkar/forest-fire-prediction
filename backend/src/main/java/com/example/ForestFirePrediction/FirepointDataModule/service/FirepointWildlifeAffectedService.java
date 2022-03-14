package com.example.ForestFirePrediction.FirepointDataModule.service;

import com.example.ForestFirePrediction.FirepointDataModule.model.FirepointWildlifeAffected;
import com.example.ForestFirePrediction.FirepointDataModule.repo.FirepointWildlifeAffectedRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service @RequiredArgsConstructor
public class FirepointWildlifeAffectedService {

    private final FirepointWildlifeAffectedRepo firepointWildlifeAffectedRepo;

    @Transactional
    public void addTotalNum(Long firepoint_wildlife_id, Integer total_num){
        FirepointWildlifeAffected appFWA = firepointWildlifeAffectedRepo.findFirepointWildlifeAffectedByFirepoint_data_id(firepoint_wildlife_id);
        appFWA.setTotal_num(total_num);
    }
}
