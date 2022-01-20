package com.example.ForestFireSimulation.SplData.repo;

import com.example.ForestFireSimulation.SplData.model.Division;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DivisionRepo extends JpaRepository<Division, Long> {

    Division findDivisionByName(String name);
    Division findDivisionById(Long id);
}
