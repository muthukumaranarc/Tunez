package com.muthu.Tunez.controller;

import com.muthu.Tunez.model.PassUpdate;
import com.muthu.Tunez.model.Users;
import com.muthu.Tunez.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping("/get/all")
    public List<Users> getAllUsers() {
        return service.getUsers();
    }

    @GetMapping("/get/user")
    public Users getUser() {
        return service.getUser();
    }

    @PostMapping("/create")
    public String createUser(@RequestBody Users user, HttpServletResponse response) {
        return service.createUser(user, response);
    }

    @PostMapping("/loginUser")
    public String Login(@RequestBody Users user, HttpServletResponse response) {
        return service.login(user, response);
    }

    @GetMapping("/token")
    public String getToken(@RequestBody Users user) {
        return service.getToken(user);
    }

    @DeleteMapping("/delete")
    public Boolean deleteUser() {
        return service.deleteUser();
    }

    @DeleteMapping("/delete/username/{username}")
    public boolean deleteByUsername(@PathVariable("username") String username) {
        return service.deleteByUsername(username);
    }

    @PostMapping("/updatePass")
    public Boolean updatePass(@RequestBody String newPass) {
        return service.updatePassword(newPass);
    }

    @DeleteMapping("/delete/cookie")
    public boolean deleteCookie(HttpServletResponse response) {
        return service.deleteCookie(response);
    }

    @GetMapping("/profile-pic")
    public String getUserProfilePic() {
        return service.getProfilePictureUrl();
    }

    @DeleteMapping("/deleteUsers")
    public boolean deleteUsers() {
        return service.deleteAllUsers();
    }
}
