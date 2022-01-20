package com.example.ForestFireSimulation.Security.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.ForestFireSimulation.Security.filter.CustomUserDetails;
import com.example.ForestFireSimulation.Security.model.AppRole;
import com.example.ForestFireSimulation.Security.model.AppUser;
import com.example.ForestFireSimulation.SplData.model.Division;
import com.example.ForestFireSimulation.SplData.model.Range;
import com.example.ForestFireSimulation.SplData.repo.DivisionRepo;
import com.example.ForestFireSimulation.SplData.repo.RangeRepo;
import com.example.ForestFireSimulation.Security.repo.RoleRepo;
import com.example.ForestFireSimulation.Security.repo.UserRepo;
import com.example.ForestFireSimulation.Utility.Utility;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.*;

@Service @RequiredArgsConstructor @Transactional @Slf4j
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepo userRepo;
    private final RoleRepo  roleRepo;
    private final DivisionRepo  divisionRepo;
    private final RangeRepo  rangeRepo;

    private final PasswordEncoder passwordEncoder;

//    ---------------------------------------------- USER --------------------------------------------------------------

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser user = userRepo.findUserByUsername(username);
        if(user == null){
            log.error("User not found.");
            throw new UsernameNotFoundException("User not found.");
        } else{
            log.info("User {} found.", username);
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role -> {
                authorities.add(new SimpleGrantedAuthority(role.getName()));
            });

        CustomUserDetails customUserDetails = new CustomUserDetails(user.getUsername(), user.getPassword(), authorities);
        customUserDetails.setDivision(user.getDivision().getName());
        customUserDetails.setPfp(user.getPfp());
        return customUserDetails;
    }

   @Override
    public List<AppUser> getUserList() {
        log.info("Fetching all Users...");
        return userRepo.findAll();
    }

    @Override
    public AppUser getUser(String username) {
        Optional<AppUser> userByUsername = Optional.ofNullable(userRepo.findUserByUsername(username));
        if(!userByUsername.isPresent()){
            throw new IllegalStateException("User with username: "+ username +" not found.");
        }else{
            log.info("Fetching User {}...", username);
            AppUser user = userRepo.findUserByUsername(username);
            return user;
        }
    }

    @Override
    public AppUser saveUser(String username, String password, String designation, String division, String range, String pfp, List<String> roles) throws IOException {
        Optional<AppUser> userByUsername = Optional.ofNullable(userRepo.findUserByUsername(username));
        if(userByUsername.isPresent()){
            throw new IllegalStateException("Username Already Present.");
        }else if(!new Utility().checkUsername(username)){
            throw new IllegalStateException("Username not Valid.");
        }else{
            log.info("Saving new User: {}...", username);
            AppUser user = new AppUser(null, username, password, designation, null, null, pfp, new ArrayList<>());
            user.setUsername(username);
            user.setPassword(passwordEncoder.encode(password));
            Division appDivision = divisionRepo.findDivisionByName(division);
            user.setDivision(appDivision);
            Range appRange = rangeRepo.findRangeByName(range);
            user.setRange(appRange);
            if(pfp.isEmpty()){
                user.setPfp("https://pathwayactivities.co.uk/wp-content/uploads/2016/04/Profile_avatar_placeholder_large-circle.png");
            }else{
                if(new Utility().getUrlStatus(pfp) != 404){
                    if(new Utility().checkImage(pfp)){
                        log.info("Adding PFP of user {}", username);
                        user.setPfp(pfp);
                    }else{
                        user.setPfp("https://pathwayactivities.co.uk/wp-content/uploads/2016/04/Profile_avatar_placeholder_large-circle.png");
                    }
                }else{
                    user.setPfp("https://pathwayactivities.co.uk/wp-content/uploads/2016/04/Profile_avatar_placeholder_large-circle.png");
                }
            }
            roles.forEach(role -> {
                AppRole appRole = roleRepo.findRoleByName(role);
                user.getRoles().add(appRole);
            });
            log.info(user.toString());

            return userRepo.save(user);
        }
    }

    @Transactional @Override
    public void updateUser(String username, String designation, String division, String range, String pfp, List<String> roles) throws IOException {
        Optional<AppUser> userByUsername = Optional.ofNullable(userRepo.findUserByUsername(username));
        if(userByUsername.isPresent()){
            log.info("Updating User: {}...", username);
            AppUser appUser = userRepo.findUserByUsername(username);
            appUser.setDesignation(designation);
            Division appDivision = divisionRepo.findDivisionByName(division);
            appUser.setDivision(appDivision);
            Range appRange = rangeRepo.findRangeByName(range);
            appUser.setRange(appRange);
            if(pfp.isEmpty()){
                appUser.setPfp("https://pathwayactivities.co.uk/wp-content/uploads/2016/04/Profile_avatar_placeholder_large-circle.png");
            }else{
                if(new Utility().getUrlStatus(pfp) != 404){
                    if(new Utility().checkImage(pfp)){
                        log.info("Updating PFP of user {}", username);
                        appUser.setPfp(pfp);
                    }
                }
            }
            appUser.getRoles().clear();
            roles.forEach(role -> {
                AppRole appRole = roleRepo.findRoleByName(role);
                appUser.getRoles().add(appRole);
            });
        }else{
            throw new IllegalStateException("User with username "+ username +" not found.");
        }
    }

    @Transactional @Override
    public void updateUsername(String access_token, String newUsername) {
        if(access_token != null){
            try {
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(access_token);
                String currentUsername = decodedJWT.getSubject();  // Get the Username

                Optional<AppUser> userByUsername = Optional.ofNullable(userRepo.findUserByUsername(currentUsername));
                if(!userByUsername.isPresent()){
                    throw new IllegalStateException("User with username "+currentUsername+" does not exist.");
                }else{
                    log.info("Updating username from {} to {} ...", currentUsername, newUsername);
                    AppUser appUser = userRepo.findUserByUsername(currentUsername);

                    if(newUsername != null && !Objects.equals(newUsername, appUser.getUsername())){
                        Optional<AppUser> userOptional = Optional.ofNullable(userRepo.findUserByUsername(newUsername));
                        if(userOptional.isPresent()){
                            throw new IllegalStateException("Username Already Taken.");
                        }else{
                            appUser.setUsername(newUsername);
                        }
                    }
                }

            } catch(Exception exception){
                log.error("Error Logging in: {}...", exception.getMessage());
                throw new IllegalStateException("Exception while verifying Access Token.");
            }
        } else {
            throw new IllegalStateException("access_token Invalid");
        }
    }

    @Transactional @Override
    public void updatePassword(String username, String currentPassword, String newPassword) {
        Optional<AppUser> userByUsername = Optional.ofNullable(userRepo.findUserByUsername(username));
        if(!userByUsername.isPresent()){
            throw new IllegalStateException("User does not exist.");
        }else{
            if(passwordEncoder.matches(currentPassword, userRepo.findUserByUsername(username).getPassword())){
                log.info("Updating Password of user {}", username);
                AppUser appUser = userRepo.findUserByUsername(username);

                if(!newPassword.isEmpty()){
                    appUser.setPassword(passwordEncoder.encode(newPassword));
                }else{
                    throw new IllegalStateException("New Password is not valid.");
                }
            }else{
                throw new IllegalStateException("Current Password does not match.");
            }
        }
    }

    @Transactional @Override
    public void updatePfp(String username, String pfp) throws IOException {
        Optional<AppUser> userByUsername = Optional.ofNullable(userRepo.findUserByUsername(username));
        if(!userByUsername.isPresent()){
            throw new IllegalStateException("User does not exist.");
        }else{
            if(new Utility().getUrlStatus(pfp) != 404){
                if(new Utility().checkImage(pfp)){
                    log.info("Updating PFP of user {}", username);
                    AppUser appUser = userRepo.findUserByUsername(username);
                    appUser.setPfp(pfp);
                }else{
                    throw new IllegalStateException("URL does not return an Image.");
                }
            }else{
                throw new IllegalStateException("URL returns status 404!");
            }
        }
    }

    @Override
    public void deleteUser(String username) {
        Optional<AppUser> userByUsername = Optional.ofNullable(userRepo.findUserByUsername(username));
        if(!userByUsername.isPresent()){
            throw new IllegalStateException("User with username: " + username + " does not exist.");
        }else{
            log.info("Deleting User: {}", username);
            AppUser user = userRepo.findUserByUsername(username);
            userRepo.delete(user);
        }
    }

//    ---------------------------------------------- ROLE --------------------------------------------------------------

    @Override
    public List<AppRole> getRoleList() {
        log.info("Fetching all Roles");
        return roleRepo.findAll();
    }

    @Override
    public AppRole getRole(String roleName) {
        Optional<AppRole> roleByName = Optional.ofNullable(roleRepo.findRoleByName(roleName));
        if(!roleByName.isPresent()){
            throw new IllegalStateException("Role with name: "+ roleName +" not found.");
        }else{
            log.info("Fetching role {}", roleName);
            AppRole role = roleRepo.findRoleByName(roleName);
            return role;
        }
    }

    @Override
    public AppRole saveRole(AppRole role) {
        Optional<AppRole> roleByName = Optional.ofNullable(roleRepo.findRoleByName(role.getName()));
        if(roleByName.isPresent()){
            throw new IllegalStateException("Role Already Present.");
        }else{
            log.info("Saving new role {}", role.getName());
            return roleRepo.save(role);
        }
    }

    @Transactional @Override
    public void updateRole(AppRole role) {
        Optional<AppRole> roleById = roleRepo.findById(role.getId());
        if(!roleById.isPresent()){
            throw new IllegalStateException("Role does not exist.");
        }else{
            log.info("Updating role {}", role.getId());
            AppRole appRole = roleRepo.findRoleById(role.getId());

            if(role.getName() != null && !Objects.equals(role.getName(), appRole.getName())){
                appRole.setName(role.getName());
            }
            if(role.getDescription() != null && !Objects.equals(role.getDescription(), appRole.getDescription())){
                appRole.setDescription(role.getDescription());
            }
            if(role.getImg() != null && !Objects.equals(role.getImg(), appRole.getImg())){
                appRole.setImg(role.getImg());
            }
        }
    }

    @Override
    public void deleteRole(String roleName) {
        Optional<AppRole> roleByName = Optional.ofNullable(roleRepo.findRoleByName(roleName));
        if(!roleByName.isPresent()){
            throw new IllegalStateException("Role with name: " + roleName + " does not exist.");
        }else{
            log.info("Deleting Role: {}...", roleName);
            AppRole role = roleRepo.findRoleByName(roleName);
            roleRepo.delete(role);
        }
    }

    @Override
    public void addRoleToUser(String username, String roleName) {
        Optional<AppRole> roleByName = Optional.ofNullable(roleRepo.findRoleByName(roleName));
        Optional<AppUser> userByUsername = Optional.ofNullable(userRepo.findUserByUsername(username));
        if(!userByUsername.isPresent()){
            throw new IllegalStateException("User with username: "+ username +" not found.");
        }else if(!roleByName.isPresent()){
            throw new IllegalStateException("Role with name: "+ roleName +" not found.");
        }else{
            log.info("Adding Role {} to user {}...", roleName, username);
            AppUser appUser = userRepo.findUserByUsername(username);
            Boolean flag = false;
            for (AppRole role : appUser.getRoles()) {
                if(role.getName().equals(roleName)){
                    flag = true;
                }
            }
            if(flag){
                log.info("Role {} already present in User.", roleName);
                throw new IllegalStateException("Role "+ roleName +" already present in User.");
            }else{
                AppRole appRole = roleRepo.findRoleByName(roleName);
                appUser.getRoles().add(appRole);
            }
        }
    }

    @Override
    public void removeRoleFromUser(String username, String roleName) {
        Optional<AppRole> roleByName = Optional.ofNullable(roleRepo.findRoleByName(roleName));
        Optional<AppUser> userByUsername = Optional.ofNullable(userRepo.findUserByUsername(username));
        if(!userByUsername.isPresent()){
            throw new IllegalStateException("User with username: "+ username +" not found.");
        }else if(!roleByName.isPresent()){
            throw new IllegalStateException("Role with name: "+ roleName +" not found.");
        }else{
            log.info("Removing Role {} from user {}", roleName, username);
            AppUser user = userRepo.findUserByUsername(username);
            AppRole role = roleRepo.findRoleByName(roleName);
            if(user.getRoles().contains(role)){
                user.getRoles().remove(role);
            }else{
                log.info("Role {} not present in User.", role.getName());
                throw new IllegalStateException("Role "+ roleName +" not present in User.");
            }
        }
    }
}
