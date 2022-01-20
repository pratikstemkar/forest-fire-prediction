package com.example.ForestFireSimulation.SplData.repo;

import com.example.ForestFireSimulation.SplData.model.Species;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpeciesRepo extends JpaRepository<Species, Long> {
    Species findSpeciesById(Long id);
    Species findSpeciesByName(String name);
}
