package br.com.igorgpdev.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;
@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		loadDotenvIntoSystemProperties();
		SpringApplication.run(BackendApplication.class, args);
	}

	private static void loadDotenvIntoSystemProperties() {
		Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();

		dotenv.entries().forEach(entry -> {
			String key = entry.getKey();
			String currentValue = System.getProperty(key);

			if (currentValue == null && System.getenv(key) == null) {
				System.setProperty(key, entry.getValue());
			}
		});
	}
}
