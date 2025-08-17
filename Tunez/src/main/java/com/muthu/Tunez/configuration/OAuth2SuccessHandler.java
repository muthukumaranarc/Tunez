package com.muthu.Tunez.configuration;

import com.muthu.Tunez.Repo.UsersRepo;
import com.muthu.Tunez.model.Users;
import com.muthu.Tunez.service.JWTService;
import com.muthu.Tunez.service.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Duration;

@Component
public class OAuth2SuccessHandler implements org.springframework.security.web.authentication.AuthenticationSuccessHandler {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private UsersRepo users;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String registrationId = "";
        if (authentication instanceof OAuth2AuthenticationToken) {
            registrationId = ((OAuth2AuthenticationToken) authentication).getAuthorizedClientRegistrationId();
        }

        String email = oAuth2User.getAttribute("email");
        String login = oAuth2User.getAttribute("login");

        String username = (email != null) ? email : login;

        // Create user if not exists
        Users user = users.findByUsername(username);
        if (user == null) {
            user = new Users();
            user.setUsername(username);
            // no password for OAuth2 users
            users.save(user);
        }

        // Generate JWT
        String token = jwtService.generateToken(username);

        // Create HttpOnly cookie
        ResponseCookie cookie = ResponseCookie.from("jwt", token)
                .httpOnly(true)
                .secure(false) // true for HTTPS
                .path("/")
                .maxAge(Duration.ofDays(365))
                .sameSite("Lax")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        // Redirect back to frontend
        response.sendRedirect("http://10.63.112.41:5173");
    }
}
