package com.ilcik.ipass.transaction;

import com.ilcik.ipass.product.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionPurchase {
    private int amount;
    private Product product;
}
