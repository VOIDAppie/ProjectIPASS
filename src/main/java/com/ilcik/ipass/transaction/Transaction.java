package com.ilcik.ipass.transaction;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
    private String username;
    private String id;
    private List<TransactionPurchase> purchases;
    private String timestamp;
    private Double totalPrice;
}
