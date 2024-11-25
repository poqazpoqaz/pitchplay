package kosmo.pitchplay.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;


@Configuration
public class WebClientConfig {

    // WebClient.Builder를 빈으로 등록하여 주입받을 수 있게 합니다.
    @Bean
    public WebClient.Builder webClientBuilder() {
        return WebClient.builder();
    }
}
