
package io.grits.backend;

import io.grits.backend.config.FileStorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
@EnableTransactionManagement
@EnableConfigurationProperties({FileStorageProperties.class})
public class BackendApplication {
	public BackendApplication() {
	}

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
}