package com.ilcik.ipass.user;

import com.azure.storage.blob.BlobContainerClient;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final BlobContainerClient client;
    private final ObjectMapper mapper = new ObjectMapper();

    public List<User> getUsers() throws IOException {
        return mapper.readValue(StreamUtils.copyToString(
                client.getBlobClient("users").openInputStream(),
                Charset.defaultCharset()), new TypeReference<>() {
        });
    }

    public Optional<User> getUserByUsername(String username) throws IOException {
        return getUsers().stream()
                .filter(item -> Objects.equals(item.getUsername(), username))
                .findFirst();
    }
}
