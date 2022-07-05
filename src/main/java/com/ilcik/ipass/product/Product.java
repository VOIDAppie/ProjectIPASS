package com.ilcik.ipass.product;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Product {
    private int id;
    private String name;
    private double price;
    private String displayName;
    private String imgUrl;
}
