package com.example.ForestFireSimulation.Security.service;

import com.example.ForestFireSimulation.Security.model.AppRole;
import com.example.ForestFireSimulation.Security.model.AppUser;

import java.io.IOException;
import java.util.List;

public interface UserService {

    //    USER
    AppUser getUser(String username);
    List<AppUser> getUserList();
    AppUser saveUser(String username, String password, String designation, String division, String range, String pfp, List<String> roles) throws IOException;
    void updateUser(String username, String designation, String division, String range, String pfp, List<String> roles) throws IOException;
    void deleteUser(String username);
    void updateUsername(String access_token, String newUsername);
    void updatePassword(String username, String currentPassword, String newPassword);
    void updatePfp(String username, String pfp) throws IOException;

    //    ROLE
    AppRole getRole(String roleName);
    List<AppRole> getRoleList();
    AppRole saveRole(AppRole role);
    void updateRole(AppRole role);
    void deleteRole(String roleName);
    void addRoleToUser(String username, String roleName);
    void removeRoleFromUser(String username, String roleName);
}
