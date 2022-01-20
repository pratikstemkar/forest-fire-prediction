package com.example.ForestFireSimulation;

import com.example.ForestFireSimulation.Security.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;

@SpringBootApplication
@RestController
public class ForestFireSimulationApplication {

	public static void main(String[] args) {
		SpringApplication.run(ForestFireSimulationApplication.class, args);
	}

	@GetMapping
	public String hello() {
		return "Hello World";
	}

	@Bean
	PasswordEncoder passwordEncoder(){
		return new BCryptPasswordEncoder();
	}

//	@Bean
//	CommandLineRunner run(UserService userService){
//		return args -> {
//			userService.saveRole(new AppRole(null, "ROLE_RO"));
//			userService.saveRole(new AppRole(null, "ROLE_DO"));
//			userService.saveRole(new AppRole(null, "ROLE_ADMIN"));
//
//			userService.saveUser(new AppUser(null, "1234", "Gangtok", "Gangtok", "East Territorial", "RO", new ArrayList<>()));
//			userService.saveUser(new AppUser(null, "1234", "Ranipool", "Ranipool", "East Territorial", "RO", new ArrayList<>()));
//			userService.saveUser(new AppUser(null, "1234", "Lanchung", "Lanchung", "North Territorial", "RO", new ArrayList<>()));
//			userService.saveUser(new AppUser(null, "1234", "Lachen", "Lachen", "North Territorial", "RO", new ArrayList<>()));
//			userService.saveUser("Admin", "1234", "ADMIN", "East Territorial", "Gangtok",  "", new ArrayList<>(Arrays.asList("ROLE_RO", "ROLE_ADMIN")));
//
//			userService.addRoleToUser("Gangtok", "ROLE_RO");
//			userService.addRoleToUser("Ranipool", "ROLE_RO");
//			userService.addRoleToUser("Lanchung", "ROLE_RO");
//			userService.addRoleToUser("Lachen", "ROLE_RO");
//			userService.addRoleToUser("Admin", "ROLE_RO");
//		};
//	}

}
