package com.example.ForestFireSimulation.FirepointDataModule.repo;

import com.example.ForestFireSimulation.FirepointDataModule.model.FirepointSpeciesDamaged;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FirepointSpeciesDamagedRepo extends JpaRepository<FirepointSpeciesDamaged, Long> {

    @Query(value = "SELECT f from FirepointSpeciesDamaged f where f.firepoint_species_id = :n")
    FirepointSpeciesDamaged findFirepointSpeciesDamagedByFirepoint_species_id(@Param("n") Long id);

    @Query(value = "SELECT f.firepoint_species_id from FirepointSpeciesDamaged f where f.firepoint_data_id = :a and f.species_damaged_id = :b")
    Long findFSDId(@Param("a") Long firepoint_data_id, @Param("b") Long species_damaged_id);

    @Query(value = "SELECT f from FirepointSpeciesDamaged f where f.firepoint_data_id = :a")
    List<FirepointSpeciesDamaged> findFSDById(@Param("a") Long id);
}
