package com.ilcik.ipass.security;

import com.ilcik.ipass.user.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class JwtUserDetailsService implements UserDetailsService {
    Logger logger = LoggerFactory.getLogger(JwtUserDetailsService.class);
    private final UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        com.ilcik.ipass.user.User user;
        try {
            user = userService
                    .getUserByUsername(username)
                    .orElseThrow(() -> {
                        logger.error("User not found with username: " + username);
                        throw new UsernameNotFoundException("User not found with username: " + username);
                    });
        } catch (IOException e) {
            logger.error("Error during fetching list", e);
            throw new RuntimeException("Error during fetching list", e);
        }
        return new User(user.getUsername(), user.getPassword(), new ArrayList<>());
    }
}
