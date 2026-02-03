package br.com.igorgpdev.backend.dto;

import org.springframework.beans.BeanUtils;

import br.com.igorgpdev.backend.entity.Cidade;
import br.com.igorgpdev.backend.entity.Pessoa;
import lombok.Data;


@Data
public class PessoaClienteRequestDTO {

    private String nome;
    private String cpf;
    private String email;
    private String endereco;
    private String cep;
    private Cidade cidade;

    public Pessoa converter(PessoaClienteRequestDTO dto) {
        Pessoa pessoa = new Pessoa();
        BeanUtils.copyProperties(dto, pessoa);
        return pessoa;
    }
}
