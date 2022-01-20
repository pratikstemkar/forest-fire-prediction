package com.example.ForestFirePrediction.SplData.repo;

import com.example.ForestFirePrediction.SplData.model.NWCGReporting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NWCGReportingRepo extends JpaRepository<NWCGReporting, Long> {

    NWCGReporting findNWCGReportingByName(String name);
    NWCGReporting findNWCGReportingById(Long id);
}
