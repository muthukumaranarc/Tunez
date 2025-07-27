package com.muthu.Tunez.service;

import com.muthu.Tunez.Repo.UsersRepo;
import com.muthu.Tunez.model.PassUpdate;
import com.muthu.Tunez.model.Users;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UsersRepo data;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private HttpServletRequest request;

    private final AuthenticationManager authenticationManager;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public UserService(@Lazy AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    public List<Users> getUsers(){
        return data.findAll();
    }

    public String createUser(Users user) {
            if(data.findByUsername(user.getUsername()) == null) {
                String token = jwtService.generateToken(user.getUsername());
                user.setPassword(encoder.encode(user.getPassword()));
                System.out.println(user);
                data.save(user);
                return token;
            }
            else return "Error: Username already exists";
    }

    public String createUser(String username){
            if(data.findByUsername(username) == null) {
                Users user = new Users(username, null);
                data.save(user);
            }
            return jwtService.generateToken(username);
    }

    public String getToken(Users user) {
        if(user.getPassword()  == null) return getToken(user.getUsername());
        Authentication authentication = authenticationManager
                .authenticate(
                        new UsernamePasswordAuthenticationToken(
                                user.getUsername(),
                                user.getPassword()
                        )
                );

        if(authentication.isAuthenticated()) {
            return jwtService.generateToken(user.getUsername());
        }
        else return "false";
    }

    public String getToken(String email) {
        return jwtService.generateToken(email);
    }

    public boolean deleteUser() {
        try{
            data.deleteById(jwtService.getCurrentUsername(request));
            return true;
        }
        catch (Exception e) {
            return false;
        }
    }


    public boolean updatePassword(String  newPassword) {
        try{
            String username = jwtService.getCurrentUsername(request);
            Users user = data.findByUsername(username);
            user.setPassword(encoder.encode(newPassword));
            data.save(user);
            return true;
        }
        catch (Exception e) {
            System.out.println("Error: " + e);
            return false;
        }

    }

}
