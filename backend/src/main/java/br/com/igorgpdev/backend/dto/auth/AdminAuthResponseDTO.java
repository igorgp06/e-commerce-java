package br.com.igorgpdev.backend.dto.auth;

public record AdminAuthResponseDTO(String token, long expiresAt) {

}
