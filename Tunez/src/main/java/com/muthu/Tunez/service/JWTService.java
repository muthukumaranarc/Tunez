package com.muthu.Tunez.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
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

    // keep your key here (make sure it's long enough for HS256, >= 32 bytes)
    private final String securitykey = "Muthu/Create/A/Secure/Platform+=";

    // ------------------- Token Creation -------------------
    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000L * 60 * 60 * 24 * 365))
                .signWith(getKey())   // sign with SecretKey
                .compact();
    }

    private SecretKey getKey() {
        return Keys.hmacShaKeyFor(securitykey.getBytes(StandardCharsets.UTF_8));
    }

    // ------------------- Extract / Parse -------------------
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        try {
            // Correct parser usage for JJWT 0.11.x+
            return Jwts.parser()
                    .setSigningKey(getKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            // Bubble up a clear runtime exception; your filter/controller can catch it as needed
            throw new RuntimeException("Failed to parse/validate JWT token: " + e.getMessage(), e);
        }
    }

    // ------------------- Validation -------------------
    public boolean validateToken(String token, UserDetails userDetails) {
        final String userName = extractUsername(token);
        return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // ------------------- Request helpers (header + cookie) -------------------
    /**
     * Look for token in Authorization header first (Bearer ...),
     * then fallback to cookie named 'jwt' or 'jwtToken' (HttpOnly).
     */
    public String getTokenFromRequest(HttpServletRequest request) {
        // 1) Authorization header
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }

        // 2) HttpOnly Cookie
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie c : cookies) {
                if ("jwt".equals(c.getName()) || "jwtToken".equals(c.getName())) {
                    return c.getValue();
                }
            }
        }

        return null;
    }

    /**
     * Convenience: return current username by reading token from request (header or cookie).
     */
    public String getCurrentUsername(HttpServletRequest request) {
        String token = getTokenFromRequest(request);
        if (token != null) {
            return extractUsername(token);
        }
        return null;
    }
}
