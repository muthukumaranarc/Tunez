package com.muthu.Tunez.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JWTService {

    private final String securitykey = "Muthu/Create/A/Secure/Platform+=";

    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();

        return Jwts
                .builder()
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000L * 60 * 60 * 24 * 365))
                .signWith(getKey())
                .compact();
    }

    private SecretKey getKey() {
        return Keys.hmacShaKeyFor(securitykey.getBytes(StandardCharsets.UTF_8));
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject); // Extract username with Claims
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token); // Extract all Claims with our token
        return claimResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()  // Extraction all Claims with jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String userName = extractUsername(token);  // Getting username with our extractUsername method
        return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));  // Verifying the token with username and Expire time
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());  //Validation the Expiration with comparing expatriation and current date
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);  // Extraction the Expiration time
    }

    public String getCurrentUsername(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return extractUsername(bearerToken.substring(7)); // Remove "Bearer "
        }
        return null;
    }

}
