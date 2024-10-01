package com.resumebuilder.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Import;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;

import com.resumebuilder.backend.BackendApplicationTestConfiguration.Identity;

import jakarta.annotation.PostConstruct;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@Import(BackendApplicationTestConfiguration.class)
class BackendApplicationTests {
	@Value("http://localhost:${local.server.port}")
	private String rootUrl;

	@Test
	void contextLoads() {
	}

	@Autowired
	private Identity identity;

	@Autowired
	private TestRestTemplate template;

	@Test
	void testUnauthSampleController() {
		// Test unauthenticated access
		ResponseEntity<String> response = template.exchange(
				RequestEntity
						.post(rootUrl + "/sample")
						.build(),
				String.class);
		// Expecting 401 Unauthorized
		assertThat(response.getStatusCode().is4xxClientError()).isTrue();
		assertThat(response.getStatusCode().value()).isEqualTo(401);
	}

	@Test
	void testSampleController() {
		// Test unauthenticated access
		ResponseEntity<String> response = template.exchange(
				RequestEntity
						.post(rootUrl + "/sample")
						.header("Authorization", "Bearer " + identity.idToken())
						.build(),
				String.class);
		// Expecting 401 Unauthorized
		assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
		assertThat(response.getBody()).isEqualTo("Hello, World!");
	}

	@Value("${spring.data.mongodb.uri}")
	private String mongoUri;

	@PostConstruct
	void testMongoUri() {
		System.out.printf("Mongo URI: %s%n", mongoUri);
		System.out.println();
		System.out.println();
		System.out.println();
		System.out.println();
		System.out.println();
		System.out.println();
		System.out.println();
		System.out.println();
		System.out.println();
		System.out.println();
	}
}
