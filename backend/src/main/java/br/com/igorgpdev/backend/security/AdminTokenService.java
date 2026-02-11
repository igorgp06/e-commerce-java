package br.com.igorgpdev.backend.security;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Instant;
import java.util.Base64;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class AdminTokenService {

    private static final String HMAC_ALGORITHM = "HmacSHA256";

    @Value("${app.security.admin.username}")
    private String adminUsername;

    @Value("${app.security.admin.password}")
    private String adminPassword;

    @Value("${app.security.admin.token-secret}")
    private String tokenSecret;

    @Value("${app.security.admin.token-expiration-seconds}")
    private long tokenExpirationSeconds;

    public String generateToken(String username, String password) {
        validateCredentials(username, password);

        long expiresAt = Instant.now().plusSeconds(tokenExpirationSeconds).getEpochSecond();
        String payload = username + ":" + expiresAt;
        String signature = sign(payload);

        return Base64.getUrlEncoder().withoutPadding().encodeToString(payload.getBytes(StandardCharsets.UTF_8)) + "."
                + signature;
    }

    public long extractExpiration(String token) {
        String payload = decodePayload(token);
        String[] parts = payload.split(":");
        if (parts.length != 2) {
            throw new IllegalArgumentException("Token inválido");
        }
        return Long.parseLong(parts[1]);
    }

    public boolean isValid(String token) {
        try {
            if (!StringUtils.hasText(token)) {
                return false;
            }

            String[] tokenParts = token.split("\\.");
            if (tokenParts.length != 2) {
                return false;
            }

            String payload = decodePayload(token);
            String expectedSignature = sign(payload);

            if (!MessageDigest.isEqual(expectedSignature.getBytes(StandardCharsets.UTF_8),
                    tokenParts[1].getBytes(StandardCharsets.UTF_8))) {
                return false;
            }

            String[] payloadParts = payload.split(":");
            if (payloadParts.length != 2) {
                return false;
            }

            if (!adminUsername.equals(payloadParts[0])) {
                return false;
            }

            long expiration = Long.parseLong(payloadParts[1]);
            return Instant.now().getEpochSecond() < expiration;
        } catch (Exception ex) {
            return false;
        }
    }

    private void validateCredentials(String username, String password) {
        if (!adminUsername.equals(username) || !adminPassword.equals(password)) {
            throw new IllegalArgumentException("Credenciais inválidas");
        }
    }

    private String decodePayload(String token) {
        String encodedPayload = token.split("\\.")[0];
        return new String(Base64.getUrlDecoder().decode(encodedPayload), StandardCharsets.UTF_8);
    }

    private String sign(String payload) {
        try {
            Mac mac = Mac.getInstance(HMAC_ALGORITHM);
            SecretKeySpec keySpec = new SecretKeySpec(tokenSecret.getBytes(StandardCharsets.UTF_8), HMAC_ALGORITHM);
            mac.init(keySpec);
            byte[] signedBytes = mac.doFinal(payload.getBytes(StandardCharsets.UTF_8));
            return Base64.getUrlEncoder().withoutPadding().encodeToString(signedBytes);
        } catch (Exception ex) {
            throw new IllegalStateException("Erro ao assinar token", ex);
        }
    }
}
