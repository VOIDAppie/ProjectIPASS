package com.ilcik.ipass.azure;

import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobContainerClientBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class AzureBlobClient {

    @Bean
    @Primary
    BlobContainerClient blobServiceClient(AzureConfiguration configuration) {
        return new BlobContainerClientBuilder()
                .endpoint(configuration.endpoint)
                .sasToken(configuration.sasToken)
                .containerName(configuration.container)
                .buildClient();
    }
}
