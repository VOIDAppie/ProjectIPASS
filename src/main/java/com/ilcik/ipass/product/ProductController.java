package com.ilcik.ipass.product;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@Controller
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {
    Logger logger = LoggerFactory.getLogger(ProductController.class);
    private final ProductService productService;

    @GetMapping
    public ResponseEntity <List<Product>> getProducts(){
        try {
            logger.info("Executing get products request.");
            return ResponseEntity.ok(productService.getProducts());
        }catch (IOException ex) {
            logger.error("Error during get products request execution: ", ex);
            return ResponseEntity.internalServerError().build();
        }
    }
}
