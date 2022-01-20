package com.example.ForestFireSimulation.Security.repo;

import com.example.ForestFireSimulation.Security.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<AppUser, Long> {

    AppUser findUserByUsername(String username);
}
