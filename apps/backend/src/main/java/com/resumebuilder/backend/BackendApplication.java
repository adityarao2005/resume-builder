package com.resumebuilder.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		// TODO: Update the JWT keys set and configuration wiht the service account from firebase
		// TODO: Add test controllers to see if the spring security stuff is working or not
		SpringApplication.run(BackendApplication.class, args);
	}

}
