package com.example.ForestFirePrediction.SplData.repo;

import com.example.ForestFirePrediction.SplData.model.FireCause;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FireCauseRepo extends JpaRepository<FireCause, Long> {

    FireCause findFireCauseByName(String name);
    FireCause findFireCauseById(Long id);
}
