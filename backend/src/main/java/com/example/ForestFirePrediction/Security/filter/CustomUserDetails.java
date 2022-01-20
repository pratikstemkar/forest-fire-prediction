package com.example.ForestFirePrediction.Security.filter;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

public class CustomUserDetails extends User {

    public CustomUserDetails(String username, String password,
                             Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
    }

    //for example lets add some person data
    private String pfp;

    //getters and setters
    public String getPfp() {
        return pfp;
    }
    public void setPfp(String pfp) {
        this.pfp = pfp;
    }
}
