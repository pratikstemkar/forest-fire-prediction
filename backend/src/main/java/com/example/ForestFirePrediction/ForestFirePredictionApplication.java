package com.example.ForestFirePrediction;

import com.example.ForestFirePrediction.Security.service.UserService;
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
public class ForestFirePredictionApplication {

	public static void main(String[] args) {
		SpringApplication.run(ForestFirePredictionApplication.class, args);
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
//
//			userService.saveUser("Sam", "1234", "ADMIN", "", new ArrayList<>(Arrays.asList("ROLE_ADMIN")));
//
//		};
//	}

}
