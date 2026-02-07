package br.com.igorgpdev.backend.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

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

    @Autowired
    private EmailService emailService;

    public Pessoa register(PessoaClienteRequestDTO pessoaDTO) {

        Pessoa pessoa = new PessoaClienteRequestDTO().converter(pessoaDTO);

        if (pessoaClienteRepository.existsByCpf(pessoa.getCpf())) {
            throw new IllegalArgumentException("CPF ja cadastrado no sistema.");
        }

        if (pessoaClienteRepository.existsByEmail(pessoa.getEmail())) {
            throw new IllegalArgumentException("Email ja cadastrado no sistema.");
        }

        String senhaGerada = gerarSenhaTemp(10);
        pessoa.setSenha(senhaGerada);

        pessoa.setDataCriacao(new Date());

        Pessoa novaPessoa = pessoaClienteRepository.saveAndFlush(pessoa);

        permissaoPessoaService.vincularPermissaoPessoaCliente(novaPessoa);

        Map<String, Object> propriedades = new HashMap<>();
        propriedades.put("nome", novaPessoa.getNome());
        propriedades.put("message", "O cadastro foi realizado com sucesso. Por favor, solicite a alteração da senha temporária.");
        emailService.enviarEmailTemplate(novaPessoa.getEmail(), "Cadastro realizado com sucesso.", propriedades);

        return novaPessoa;
    }

    private String gerarSenhaTemp(int tamanho) {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!";
        StringBuilder sb = new StringBuilder();

        java.util.Random r = new java.util.Random();
        for (int i = 0; i < tamanho; i++) sb.append(chars.charAt(r.nextInt(chars.length())));
        return sb.toString();
    }
}
