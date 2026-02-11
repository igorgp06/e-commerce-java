package br.com.igorgpdev.backend.dto.auth;

import jakarta.validation.constraints.NotBlank;

public record AdminAuthRequestDTO(@NotBlank(message = "Usuário é obrigatório")
        String username,
        @NotBlank(message = "Senha é obrigatória")
        String password) {

}
