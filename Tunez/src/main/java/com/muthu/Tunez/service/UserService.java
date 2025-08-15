package com.muthu.Tunez.service;

import com.muthu.Tunez.Repo.UsersRepo;
import com.muthu.Tunez.model.Users;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UsersRepo data;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private PrivateCollectionService privateCollectionService;

    private final AuthenticationManager authenticationManager;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public UserService(@Lazy AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    public List<Users> getUsers(){
        return data.findAll();
    }

    public boolean getCookie(Users user, HttpServletResponse response) {
        Users existingUser = data.findByUsername(user.getUsername());
        if (existingUser == null) {
            return createUser(user, response);
        }
        if (!encoder.matches(user.getPassword(), existingUser.getPassword())) {
            return false;
        }
        String token = jwtService.generateToken(existingUser.getUsername());
        ResponseCookie cookie = giveCookie(token, response);
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return true;
    }

    public boolean createUser(Users user, HttpServletResponse response) {
        if(data.findByUsername(user.getUsername()) != null) return false;

        String token = jwtService.generateToken(user.getUsername());
        user.setPassword(encoder.encode(user.getPassword()));
        data.save(user);

        ResponseCookie cookie = giveCookie(token, response);
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return true;
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
            String username = jwtService.getCurrentUsername(request);
            data.deleteById(username);
            privateCollectionService.deleteCollectionByUserName(username);
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

    public Users getUser() {
        try{
            return data.findByUsername(jwtService.getCurrentUsername(request));
        }
        catch (Exception e) {
            return null;
        }
    }

    public ResponseCookie giveCookie(String token, HttpServletResponse request) {
        return ResponseCookie.from("jwt", token)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(Duration.ofDays(365))
                .sameSite("Lax")
                .build();
    }

    public boolean deleteCookie(HttpServletResponse response) {
        try {
            Cookie cookie = new Cookie("jwt", null);
            cookie.setPath("/");
            cookie.setHttpOnly(true);
            cookie.setMaxAge(0);
            response.addCookie(cookie);
            return true;
        }
        catch (Exception e) {
            return false;
        }

    }

    public String getProfilePictureUrl() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof OAuth2User oAuth2User) {
            // Get the user attributes from OAuth2
            String googlePic = (String) oAuth2User.getAttributes().get("picture");
            String githubPic = (String) oAuth2User.getAttributes().get("avatar_url");

            if (googlePic != null) return googlePic;
            if (githubPic != null) return githubPic;
        }

        return "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    }

    public boolean deleteByUsername(String username) {
        try{
            data.deleteById(username);
            return true;
        }
        catch (Exception e) {
            return false;
        }

    }
}
