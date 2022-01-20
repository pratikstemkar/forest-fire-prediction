package com.example.ForestFireSimulation.Security.api;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.ForestFireSimulation.Security.forms.Form;
import com.example.ForestFireSimulation.Security.model.AppRole;
import com.example.ForestFireSimulation.Security.model.AppUser;
import com.example.ForestFireSimulation.Security.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.*;
import java.util.stream.Collectors;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;

// REST API for Security
@RestController @RequestMapping("/api/security")
@RequiredArgsConstructor @Slf4j
public class UserController {

    private final UserService userService;

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleException(Exception e) throws IOException {
        Map<String, String > errorResponse = new HashMap<>();
        errorResponse.put("message", e.getLocalizedMessage());
        errorResponse.put("status", HttpStatus.INTERNAL_SERVER_ERROR.toString());

        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

//    ----------------------------------------------- USER -------------------------------------------------------------

//    Get all Users
    @GetMapping("/users")
    public ResponseEntity<List<AppUser>> getUserList(){
        return ResponseEntity.ok().body(userService.getUserList());
    }

//    Get specific User
    @GetMapping("/user/{username}")
    public ResponseEntity<AppUser> getUser(@PathVariable("username") String username){
        return ResponseEntity.ok().body(userService.getUser(username));
    }

//    Save a new User to Database
    @PostMapping("/user/save")
    public ResponseEntity<AppUser> saveUser(@RequestBody Form.SaveUserForm form) throws IOException {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/security/user/save").toUriString());
        return ResponseEntity.created(uri).body(userService.saveUser(form.getUsername(), form.getPassword(), form.getDesignation(), form.getDivision(), form.getRange(), form.getPfp(), form.getRoles()));
    }

//    Update User
    @PutMapping("/user/update")
    public ResponseEntity<String> updateUser(@RequestBody Form.UpdateUserForm form) throws IOException {
        userService.updateUser(form.getUsername(), form.getDesignation(), form.getDivision(), form.getRange(), form.getPfp(), form.getRoles());
        return ResponseEntity.ok().body("User " + form.getUsername() + " updated.");
    }

//    Update Username of a User
    @PutMapping("/user/username/update")
    public ResponseEntity<String> updateUsername(@RequestBody Form.UpdateUsernameForm form){
        userService.updateUsername(form.getAccesstoken(), form.getNewusername());
        return ResponseEntity.ok().body("Username Changed to " + form.getNewusername());
    }

//    Change Password of a User
    @PutMapping("/user/password/update")
    public ResponseEntity<String> updatePassword(@RequestBody Form.NewPasswordForm form){
        userService.updatePassword(form.getUsername(), form.getCurrentpassword(), form.getNewpassword());
        return ResponseEntity.ok().body("Password of user "+ form.getUsername() +" updated." );
    }

    //    Change Password of a User
    @PutMapping("/user/pfp/update")
    public ResponseEntity<String> updatePfp(@RequestBody Form.UpdatePfpForm form) throws IOException {
        userService.updatePfp(form.getUsername(), form.getPfp());
        return ResponseEntity.ok().body("Profile Picture of user "+ form.getUsername() +" updated." );
    }

//    Delete a User
    @DeleteMapping("/user/delete/{username}")
    public ResponseEntity<?> deleteUser(@PathVariable("username") String username){
        userService.deleteUser(username);
        return ResponseEntity.ok().body("User deleted with username: " + username);
    }

//    --------------------------------------------- ROLE ---------------------------------------------------------------

//    Get all Roles
    @GetMapping("/roles")
    public ResponseEntity<List<AppRole>> getRoleList(){
        return ResponseEntity.ok().body(userService.getRoleList());
    }

//    Get a specific Role
    @GetMapping("/role/{roleName}")
    public ResponseEntity<AppRole> getRole(@PathVariable("roleName") String roleName){
        return ResponseEntity.ok().body(userService.getRole(roleName.toUpperCase()));
    }

//    Save a new Role
    @PostMapping("/role/save")
    public ResponseEntity<AppRole> saveRole(@RequestBody AppRole role){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/security/role/save").toUriString());
        return ResponseEntity.created(uri).body(userService.saveRole(role));
    }

//    Update details of a Role
    @PutMapping("/role/update")
    public ResponseEntity<?> updateRole(@RequestBody AppRole role){
        userService.updateRole(role);
        return ResponseEntity.ok().body("Role updated." );
    }

//    Delete a role
    @DeleteMapping("/role/delete/{roleName}")
    public ResponseEntity<?> deleteRole(@PathVariable("roleName") String roleName){
        userService.deleteRole(roleName.toUpperCase());
        return ResponseEntity.ok().body("Role deleted with name: " + roleName);
    }

//    Add a Role to User
    @PostMapping("/role/addtouser")
    public ResponseEntity<?> addRoleToUser(@RequestBody Form.RoleToUserForm form){
        userService.addRoleToUser(form.getUsername(), form.getRoleName());
        return ResponseEntity.ok().body("Role "+ form.getRoleName() +" added to user " + form.getUsername());
    }

//    Remove a Role from User
    @PostMapping("/role/removefromuser")
    public ResponseEntity<?> removeRoleFromUser(@RequestBody Form.RoleToUserForm form){
        userService.removeRoleFromUser(form.getUsername(), form.getRoleName());
        return ResponseEntity.ok().body("Role "+ form.getRoleName() +" removed from user " + form.getUsername());
    }

//    ---------------------------------------------- MISC --------------------------------------------------------------

    //    Get Me
    @GetMapping("/user/me")
    public void getMe(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException{
        // Get the Access Token from Header
        String authorizationHeader = request.getHeader(AUTHORIZATION);

        //        Check if Refresh Token is Valid
        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
//                Get Refresh Token from the String
                String token = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());   // Assign the Algorithm for Encryption
                JWTVerifier verifier = JWT.require(algorithm).build();  // Build a Verifier
                DecodedJWT decodedJWT = verifier.verify(token); // Get the Decoded Token
                String username = decodedJWT.getSubject();  // Get the Subject(username) from Token

                AppUser user = userService.getUser(username);   // Get User from the username

//                Create new Access Token
//                String access_token = JWT.create()
//                        .withSubject(user.getUsername())
//                        .withExpiresAt(new Date(System.currentTimeMillis() + 1 * 4 * 60 * 60 * 1000))
//                        .withIssuer(request.getRequestURL().toString())
//                        .withClaim("roles", user.getRoles().stream().map(AppRole::getName).collect(Collectors.toList()))
//                        .sign(algorithm);

//                  Create Refresh Token
//                String refresh_token = JWT.create()
//                        .withSubject(user.getUsername())
//                        .withExpiresAt(new Date(System.currentTimeMillis() + 7 * 24 * 60 * 60 * 1000))
//                        .withIssuer(request.getRequestURL().toString())
//                        .sign(algorithm);

//                Create a HashMap to send in Response
                Map<String, String> tokens = new HashMap<>();
//                tokens.put("access_token", access_token);
//                tokens.put("refresh_token", refresh_token);
                tokens.put("username", user.getUsername());
                tokens.put("division", user.getDivision().getName());
                tokens.put("pfp", user.getPfp());
                tokens.put("roles", String.valueOf(user.getRoles().stream().map(AppRole::getName).collect(Collectors.toList())));

                response.setContentType(MediaType.APPLICATION_JSON_VALUE);  // Set the Content Type
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);  // Write Data to response object
            }catch (Exception exception) {
//                Add error to Response
                response.setHeader("error", exception.getMessage());
                response.setStatus(FORBIDDEN.value());

//                Create HashMap for Error Body
                Map<String, String> error = new HashMap<>();
                error.put("message", exception.getMessage());

                response.setContentType(MediaType.APPLICATION_JSON_VALUE);  // Set the Content Type
                new ObjectMapper().writeValue(response.getOutputStream(), error);   // Write Data to response object
            }
        } else {
//            Throw Exception if Header is Empty
            throw new RuntimeException("Access Token not found.");
        }
    }

//    Get a new Access Token from the Refresh Token
    @GetMapping("/token/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
//        Get the Refresh Token from Header
        String authorizationHeader = request.getHeader(AUTHORIZATION);

//        Check if the Refresh Token is Valid
        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
//                Get the Refresh Token from the String
                String refresh_token = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());   // Assign the Algorithm for Encryption
                JWTVerifier verifier = JWT.require(algorithm).build();  // Build a Verifier
                DecodedJWT decodedJWT = verifier.verify(refresh_token); // Get the Decoded Token
                String username = decodedJWT.getSubject();  // Get the Subject(username) from Token

                AppUser user = userService.getUser(username);   // Get User from the username

//                Create a new Access Token
                String access_token = JWT.create()
                        .withSubject(user.getUsername())
                        .withExpiresAt(new Date(System.currentTimeMillis() + 1 * 24 * 60 * 60 * 1000))
                        .withIssuer(request.getRequestURL().toString())
                        .withClaim("roles", user.getRoles().stream().map(AppRole::getName).collect(Collectors.toList()))
                        .sign(algorithm);

//                Create a HashMap to send in Response
                Map<String, String> tokens = new HashMap<>();
                tokens.put("access_token", access_token);
                tokens.put("refresh_token", refresh_token);

                response.setContentType(MediaType.APPLICATION_JSON_VALUE);  // Set the Content Type
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);  // Write Data to response object
            }catch (Exception exception) {
//                Add error to Response
                response.setHeader("error", exception.getMessage());
                response.setStatus(FORBIDDEN.value());

//                Create HashMap for Error Body
                Map<String, String> error = new HashMap<>();
                error.put("error_message", exception.getMessage());

                response.setContentType(MediaType.APPLICATION_JSON_VALUE);  // Set the Content Type
                new ObjectMapper().writeValue(response.getOutputStream(), error);   // Write Data to response object
            }
        } else {
//            Throw Exception if Header is Empty
            throw new RuntimeException("Refresh token is missing");
        }
    }
}

