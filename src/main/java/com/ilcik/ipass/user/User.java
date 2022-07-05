package com.ilcik.ipass.user;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class User {
    private String username;
    private String password;
    private List<String> roles;
}
