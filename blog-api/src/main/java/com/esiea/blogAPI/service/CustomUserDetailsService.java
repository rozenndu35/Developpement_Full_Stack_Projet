package com.esiea.blogAPI.service;

import com.esiea.blogAPI.exception.UserAlreadyExist;
import com.esiea.blogAPI.model.InternalUser;
import com.esiea.blogAPI.repository.InternalUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private InternalUserRepository internalUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        InternalUser user = internalUserRepository.findByUsername(username);

        User userDetails = new User(user.getUsername(), user.getPassword(), getGrantedAuthorities());
        return userDetails;
    }

    private List<GrantedAuthority> getGrantedAuthorities(){
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        return authorities;
    }

    public void saveUser(InternalUser user) throws UserAlreadyExist {
        if(internalUserRepository.count(user.getUsername()) > 0)
            throw new UserAlreadyExist();
        String hash = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
        user.setPassword(hash);
        internalUserRepository.save(user);
    }
}
