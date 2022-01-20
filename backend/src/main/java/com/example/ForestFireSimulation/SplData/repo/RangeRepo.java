package com.example.ForestFireSimulation.SplData.repo;

import com.example.ForestFireSimulation.SplData.model.Range;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RangeRepo extends JpaRepository<Range, Long> {

    Range findRangeByName(String name);
    Range findRangeById(Long id);
}
