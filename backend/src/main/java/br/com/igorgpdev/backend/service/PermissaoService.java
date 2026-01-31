package br.com.igorgpdev.backend.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.igorgpdev.backend.entity.Permissao;
import br.com.igorgpdev.backend.repository.PermissaoRepository;

@Service
public class PermissaoService {

    @Autowired
    private PermissaoRepository permissaoRepository;

    public List<Permissao> findAll() {
        return permissaoRepository.findAll();
    }

    public Permissao insert(Permissao permissao) {
        permissao.setDataCriacao(new Date());
        Permissao permissaoNova = permissaoRepository.saveAndFlush(permissao);
        return permissaoNova;
    }

    public Permissao change(Permissao permissao) {
        permissao.setDataAtualizacao(new Date());
        return  permissaoRepository.saveAndFlush(permissao);
    }

    public void delete(Long id) {
        Permissao permissao = permissaoRepository.findById(id).get();
        permissaoRepository.delete(permissao);
    }
}
