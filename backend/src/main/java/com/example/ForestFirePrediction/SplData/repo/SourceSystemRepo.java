package com.example.ForestFirePrediction.SplData.repo;

import com.example.ForestFirePrediction.SplData.model.SourceSystem;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.xml.transform.Source;

public interface SourceSystemRepo extends JpaRepository<SourceSystem, Long> {

    SourceSystem findSourceSystemByName(String name);
    SourceSystem findSourceSystemById(Long id);
}
