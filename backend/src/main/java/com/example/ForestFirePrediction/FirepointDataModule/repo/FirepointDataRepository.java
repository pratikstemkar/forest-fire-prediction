package com.example.ForestFirePrediction.FirepointDataModule.repo;

import com.example.ForestFirePrediction.FirepointDataModule.model.FirepointData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface FirepointDataRepository extends JpaRepository<FirepointData, Long> {

    FirepointData findFirepointDataByID(Long ID);
}
