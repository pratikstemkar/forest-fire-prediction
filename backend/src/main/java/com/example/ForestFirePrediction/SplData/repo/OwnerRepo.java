package com.example.ForestFirePrediction.SplData.repo;

import com.example.ForestFirePrediction.SplData.model.Owner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OwnerRepo extends JpaRepository<Owner, Long> {

    Owner findOwnerByName(String name);
    Owner findOwnerById(Long id);
}
