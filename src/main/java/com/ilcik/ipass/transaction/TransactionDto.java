package com.ilcik.ipass.transaction;

import com.ilcik.ipass.product.Product;
import io.jsonwebtoken.Jwts;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import static java.security.KeyRep.Type.SECRET;

@Data
@NoArgsConstructor
public class TransactionDto {
    private List<TransactionPurchase> purchases;
    private String timestamp;
    private Double totalPrice;

    public Transaction toTransaction(String username) {
        return new Transaction(
                username,
                UUID.randomUUID().toString(),
                purchases,
                timestamp,
                totalPrice
        );
    }
}
