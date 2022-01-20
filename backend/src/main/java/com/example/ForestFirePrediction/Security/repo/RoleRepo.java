package com.example.ForestFirePrediction.Security.repo;

import com.example.ForestFirePrediction.Security.model.AppRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepo extends JpaRepository<AppRole, Long> {

    AppRole findRoleByName(String name);
    AppRole findRoleById(Long id);
}
