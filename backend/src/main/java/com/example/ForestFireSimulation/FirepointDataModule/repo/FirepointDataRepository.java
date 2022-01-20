package com.example.ForestFireSimulation.FirepointDataModule.repo;

import com.example.ForestFireSimulation.FirepointDataModule.model.FirepointData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface FirepointDataRepository extends JpaRepository<FirepointData, Long> {

    FirepointData findFirepointDataById(Long id);
    ArrayList<FirepointData> findDataEntriesByDivision(String division);
    ArrayList<FirepointData> findDataEntriesByUsername(String username);
    Long countFirepointDataByAcceptedEquals(Boolean value);
}
