package br.com.igorgpdev.backend.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.igorgpdev.backend.entity.Cidade;
import br.com.igorgpdev.backend.repository.CidadeRepository;

@Service
public class CidadeService {

    @Autowired
    private CidadeRepository cidadeRepository;

    public List<Cidade> findAll() {
        return cidadeRepository.findAll();
    }

    public Cidade insert(Cidade cidade) {
        cidade.setDataCriacao(new Date());
        Cidade novaCidade = cidadeRepository.saveAndFlush(cidade);
        return novaCidade;
    }

    public Cidade change(Cidade cidade) {
        cidade.setDataAtualizacao(new Date());
        return cidadeRepository.saveAndFlush(cidade);
    }

    public void delete(Long id) {
        Cidade cidade = cidadeRepository.findById(id).orElseThrow();
        cidadeRepository.delete(cidade);
    }
}
