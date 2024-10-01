package com.resumebuilder.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.context.annotation.Import;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.resumebuilder.backend.BackendApplicationTestConfiguration.Identity;

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
	private RestTemplate template;

	@Test
	void testUnauthSampleController() {
		// Test unauthenticated access
		ResponseEntity<String> response = template.getForEntity("", String.class);
		
	}

	@Test
	void testSampleController() {

	}

}
