package com.example.ForestFirePrediction.FirepointDataModule.repo;

import com.example.ForestFirePrediction.FirepointDataModule.model.FirepointWildlifeAffected;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FirepointWildlifeAffectedRepo extends JpaRepository<FirepointWildlifeAffected, Long> {

    @Query(value = "SELECT f from FirepointWildlifeAffected f where f.firepoint_wildlife_id = :n")
    FirepointWildlifeAffected findFirepointWildlifeAffectedByFirepoint_data_id(@Param("n") Long id);

    @Query(value = "SELECT f.firepoint_wildlife_id from FirepointWildlifeAffected f where f.firepoint_data_id = :a and f.wildlife_affected_id = :b")
    Long findFWAId(@Param("a") Long firepoint_data_id, @Param("b") Long wildlife_affected_id);

    @Query(value = "SELECT f from FirepointWildlifeAffected f where f.firepoint_data_id = :a")
    List<FirepointWildlifeAffected> findFWAById(@Param("a") Long id);
}
