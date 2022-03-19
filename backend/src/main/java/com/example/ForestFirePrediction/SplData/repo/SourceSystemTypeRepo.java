package com.example.ForestFirePrediction.SplData.repo;

import com.example.ForestFirePrediction.SplData.model.SourceSystemType;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.xml.transform.Source;

public interface SourceSystemTypeRepo extends JpaRepository<SourceSystemType, Long> {

    SourceSystemType findSourceSystemTypeByName(String name);
    SourceSystemType findSourceSystemTypeById(Long id);
}
