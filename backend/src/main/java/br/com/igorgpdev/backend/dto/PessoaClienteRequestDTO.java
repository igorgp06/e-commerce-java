package br.com.igorgpdev.backend.dto;

import org.hibernate.validator.constraints.br.CPF;
import org.springframework.beans.BeanUtils;

import br.com.igorgpdev.backend.entity.Cidade;
import br.com.igorgpdev.backend.entity.Pessoa;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PessoaClienteRequestDTO {

    @NotBlank(message = "O nome não deve estar em branco.")
    @Size(max = 120, message="O nome deve ter no máximo 120 caracteres.")
    private String nome;

    @NotBlank(message = "O CPF não deve estar em branco.")
    @CPF(message = "O CPF informado é inválido.")
    private String cpf;

    @NotBlank(message = "O email não deve estar em branco.")
    @Email(message = "O email informado é inválido.")
    private String email;

    @NotBlank(message = "O endereço não deve estar em branco.")
    private String endereco;

    @NotBlank(message = "O CEP não deve estar em branco.")
    private String cep;

    @NotNull(message = "A cidade não deve ser nula.")
    private Cidade cidade;

    public Pessoa converter(PessoaClienteRequestDTO dto) {
        Pessoa pessoa = new Pessoa();
        BeanUtils.copyProperties(dto, pessoa);
        return pessoa;
    }
}
