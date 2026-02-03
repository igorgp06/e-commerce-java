package br.com.igorgpdev.backend.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.igorgpdev.backend.dto.PessoaClienteRequestDTO;
import br.com.igorgpdev.backend.entity.Pessoa;
import br.com.igorgpdev.backend.repository.PessoaClienteRepository;

@Service
public class PessoaClienteService {

    @Autowired
    private PessoaClienteRepository pessoaClienteRepository;

    @Autowired
    private PermissaoPessoaService permissaoPessoaService;

    public Pessoa register(PessoaClienteRequestDTO pessoaDTO) {

        Pessoa pessoa = new PessoaClienteRequestDTO().converter(pessoaDTO);

        if (pessoaClienteRepository.existsByCpf(pessoa.getCpf())) {
            throw new IllegalArgumentException("CPF ja cadastrado no sistema.");
        }

        if (pessoaClienteRepository.existsByEmail(pessoa.getEmail())) {
            throw new IllegalArgumentException("Email ja cadastrado no sistema.");
        }

        pessoa.setDataCriacao(new Date());

        Pessoa novaPessoa = pessoaClienteRepository.saveAndFlush(pessoa);

        permissaoPessoaService.vincularPermissaoPessoaCliente(novaPessoa);
        return novaPessoa;
    }
}
