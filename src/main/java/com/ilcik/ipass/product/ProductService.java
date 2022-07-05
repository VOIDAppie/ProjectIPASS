package com.ilcik.ipass.product;

import com.azure.storage.blob.BlobContainerClient;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final BlobContainerClient client;
    private final ObjectMapper mapper = new ObjectMapper();

    public List<Product> getProducts() throws IOException {
        return mapper.readValue(StreamUtils.copyToString(
                client.getBlobClient("products").openInputStream(),
                Charset.defaultCharset()), new TypeReference<>() {
        });
    }
}
