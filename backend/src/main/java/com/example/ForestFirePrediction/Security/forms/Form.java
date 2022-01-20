package com.example.ForestFirePrediction.Security.forms;

import lombok.Data;

import java.util.List;

public class Form {

    // Read Data from Request JSON
    @Data
    public static
    class LoginForm{
        private String username;
        private String password;
    }

    // Class to get New User from JSON request.
    @Data
    public static
    class SaveUserForm {
        private String username;
        private String password;
        private String designation;
        private String pfp;
        private List<String> roles;
    }

    // Class to Update User from JSON request.
    @Data
    public static
    class UpdateUserForm {
        private String username;
        private String designation;
        private String pfp;
        private List<String> roles;
    }

    // Class to Update PFP from JSON request.
    @Data
    public static
    class UpdatePfpForm {
        private String username;
        private String pfp;
    }

    // Class to get Data from JSON request.
    @Data
    public static
    class RoleToUserForm {
        private String username;
        private String roleName;
    }

    // Class to get New Username from JSON request.
    @Data
    public static
    class UpdateUsernameForm {
        private String accesstoken;
        private String newusername;
    }

    // Class to get New Password from JSON request.
    @Data
    public static
    class NewPasswordForm {
        private String username;
        private String currentpassword;
        private String newpassword;
    }
}
