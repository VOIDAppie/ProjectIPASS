package com.ilcik.ipass.azure;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix="spring.cloud.azure.storage.blob")
@Data
public class AzureConfiguration {
    String endpoint;
    String container;
    String sasToken;
}
