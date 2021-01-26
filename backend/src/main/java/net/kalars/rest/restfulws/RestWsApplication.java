package net.kalars.rest.restfulws;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RestWsApplication {

	public static void main(String[] args) {
		System.out.println("starting...");
		SpringApplication.run(RestWsApplication.class, args);
	}

}