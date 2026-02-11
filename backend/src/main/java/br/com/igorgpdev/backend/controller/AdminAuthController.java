package br.com.igorgpdev.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.igorgpdev.backend.dto.auth.AdminAuthRequestDTO;
import br.com.igorgpdev.backend.dto.auth.AdminAuthResponseDTO;
import br.com.igorgpdev.backend.security.AdminTokenService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin/auth")
@Validated
public class AdminAuthController {

    private final AdminTokenService adminTokenService;

    public AdminAuthController(AdminTokenService adminTokenService) {
        this.adminTokenService = adminTokenService;
    }

    @PostMapping("/token")
    public ResponseEntity<AdminAuthResponseDTO> createToken(@Valid @RequestBody AdminAuthRequestDTO request) {
        try {
            String token = adminTokenService.generateToken(request.username(), request.password());
            long expiresAt = adminTokenService.extractExpiration(token);

            return ResponseEntity.ok(new AdminAuthResponseDTO(token, expiresAt));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(401).build();
        }
    }
}
