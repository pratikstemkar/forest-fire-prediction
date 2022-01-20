package com.example.ForestFirePrediction.SplData.repo;

import com.example.ForestFirePrediction.SplData.model.FireSize;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FireSizeRepo extends JpaRepository<FireSize, Long> {

    FireSize findFireSizeByGrade(String grade);
    FireSize findFireSizeById(Long id);
}
