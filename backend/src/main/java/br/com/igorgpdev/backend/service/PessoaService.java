package br.com.igorgpdev.backend.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.igorgpdev.backend.entity.Pessoa;
import br.com.igorgpdev.backend.repository.PessoaRepository;

@Service
public class PessoaService {

    @Autowired
    private PessoaRepository pessoaRepository;

    public List<Pessoa> findAll() {
        return pessoaRepository.findAll();
    }

    public Pessoa insert(Pessoa pessoa) {

        if (pessoaRepository.existsByCpf(pessoa.getCpf())) {
            throw new RuntimeException("CPF já cadastrado");
        }

        if (pessoaRepository.existsByEmail(pessoa.getEmail())) {
            throw new RuntimeException("Email já cadastrado.");
        }

        pessoa.setDataCriacao(new Date());
        Pessoa novaPessoa = pessoaRepository.saveAndFlush(pessoa);
        return novaPessoa;
    }

    public Pessoa change(Pessoa pessoa) {

        Pessoa pessoaAtual = pessoaRepository.findById(pessoa.getId()).orElseThrow();

        if (pessoa.getCpf() != null && !pessoa.getCpf().equals(pessoaAtual.getCpf())) {
            if (pessoaRepository.existsByCpfAndIdNot(pessoa.getCpf(), pessoa.getId())) {
                throw new RuntimeException("CPF já cadastrado");
            }
        }

        if (pessoa.getEmail() != null && !pessoa.getEmail().equals(pessoaAtual.getEmail())) {
            if (pessoaRepository.existsByEmailAndIdNot(pessoa.getEmail(), pessoa.getId())) {
                throw new RuntimeException("Email já cadastrado.");
            }
        }

        pessoaAtual.setNome(pessoa.getNome());
        pessoaAtual.setCpf(pessoa.getCpf());
        pessoaAtual.setEmail(pessoa.getEmail());
        pessoaAtual.setDataAtualizacao(new Date());
        
        return pessoaRepository.saveAndFlush(pessoaAtual);
    }

    public void delete(Long id) {
        Pessoa pessoa = pessoaRepository.findById(id).orElseThrow();
        pessoaRepository.delete(pessoa);
    }
}
