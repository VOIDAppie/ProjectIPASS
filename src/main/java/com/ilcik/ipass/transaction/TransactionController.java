package com.ilcik.ipass.transaction;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@Controller
@RequestMapping("/transactions")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;
    Logger logger = LoggerFactory.getLogger(TransactionController.class);

    @PostMapping
    public ResponseEntity<Void> postTransaction(@RequestBody TransactionDto transaction) {
        try {
            logger.info("Executing post transaction request with payload: " + transaction.toString());
            transactionService.uploadTransaction(transaction);
            return ResponseEntity.ok().build();
        } catch(IOException ex) {
            logger.error("Error during executing post transaction request: ", ex);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Transaction>> getTransactions() {
        try {
            logger.info("Executing get transactions request.");
            return ResponseEntity.ok(transactionService.getTransactions());
        } catch (IOException ex) {
            logger.error("Error during executing get transaction request:", ex);
            return ResponseEntity.internalServerError().build();
        }
    }
}
