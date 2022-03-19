package com.example.ForestFirePrediction.FPDataModule.repo;

import com.example.ForestFirePrediction.FPDataModule.model.FPData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FPDataRepo extends JpaRepository<FPData, Long> {

    FPData findFPDataById(Long Id);
}
