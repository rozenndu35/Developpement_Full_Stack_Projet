package com.esiea.blogAPI.controller;


import com.esiea.blogAPI.configuration.JwtTokenFilter;
import com.esiea.blogAPI.configuration.JwtTokenUtil;
import com.esiea.blogAPI.exception.UserAlreadyExist;
import com.esiea.blogAPI.model.Article;
import com.esiea.blogAPI.model.InternalUser;
import com.esiea.blogAPI.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;

import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins= "*", allowedHeaders = "*")
@RestController
@RequestMapping("api/public")
public class LoginController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody InternalUser user){
        try {
            UsernamePasswordAuthenticationToken uapt = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
            Authentication auth = authenticationManager.authenticate(uapt);
            User authenticationUser = (User) auth.getPrincipal();

            String token = jwtTokenUtil.generateAccessToken(authenticationUser);
            System.out.println("Generated token is" + token);

            ResponseEntity<String> response = ResponseEntity.ok()
                    .header(HttpHeaders.AUTHORIZATION, token)
                    .body("{ token : " +token + " }");
            return response;
        }catch (AuthenticationException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/registration")
    public ResponseEntity<String> Register(@RequestBody InternalUser user){
        try {
            customUserDetailsService.saveUser(user);
            return new ResponseEntity<String>(user.getUsername(), HttpStatus.OK);
        } catch (UserAlreadyExist e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

    }

}
