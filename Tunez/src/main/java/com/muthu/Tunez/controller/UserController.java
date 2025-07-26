package com.muthu.Tunez.controller;

import com.muthu.Tunez.model.PassUpdate;
import com.muthu.Tunez.model.Users;
import com.muthu.Tunez.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping("/create")
    public String createUser(@RequestBody Users user) {
        return service.createUser(user);
    }

    @GetMapping("/token")
    public String getToken(@RequestBody Users user) {
        return service.getToken(user);
    }

    @GetMapping("/greet")
    public String greet () {
        return "Welcome you to our websight";
    }

    @DeleteMapping("/delete")
    public Boolean deleteUser(@RequestBody Users user) {
        return service.deleteUser(user);
    }

    @PostMapping("/updatePass")
    public Boolean updatePass(@RequestBody PassUpdate data) {
        return service.updatePassword(data);
    }

}
