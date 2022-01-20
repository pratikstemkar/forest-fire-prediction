package com.example.ForestFirePrediction.Security.repo;

import com.example.ForestFirePrediction.Security.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<AppUser, Long> {

    AppUser findUserByUsername(String username);
}
