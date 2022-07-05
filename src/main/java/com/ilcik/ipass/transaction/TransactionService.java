package com.ilcik.ipass.transaction;

import com.azure.storage.blob.BlobContainerClient;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.charset.Charset;
import java.security.Principal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final BlobContainerClient client;
    private final ObjectMapper mapper = new ObjectMapper();

    public List<Transaction> getTransactions() throws IOException {
        return mapper.readValue(StreamUtils.copyToString(
                client.getBlobClient("transaction").openInputStream(),
                Charset.defaultCharset()), new TypeReference<>() {
        });
    }

    public void uploadTransaction(TransactionDto transaction) throws IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();

        List<Transaction> transactions = getTransactions();
        transactions.add(transaction.toTransaction(currentPrincipalName));
        String deserializedTransaction = mapper.writeValueAsString(transactions);

        ByteArrayInputStream dataStream = new ByteArrayInputStream(deserializedTransaction.getBytes());

        client.getBlobClient("transaction").upload(dataStream, deserializedTransaction.length(), true /* overwrite */);
    }
}
