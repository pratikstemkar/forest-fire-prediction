package com.example.ForestFireSimulation.SplData.repo;

import com.example.ForestFireSimulation.SplData.model.Wildlife;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WildlifeRepo extends JpaRepository<Wildlife, Long> {
    Wildlife findWildlifeById(Long id);
    Wildlife findWildlifeByName(String name);
}
