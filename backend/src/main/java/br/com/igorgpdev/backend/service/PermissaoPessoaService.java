package br.com.igorgpdev.backend.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.igorgpdev.backend.entity.Permissao;
import br.com.igorgpdev.backend.entity.PermissaoPessoa;
import br.com.igorgpdev.backend.entity.Pessoa;
import br.com.igorgpdev.backend.repository.PermissaoPessoaRepository;
import br.com.igorgpdev.backend.repository.PermissaoRepository;


@Service
public class PermissaoPessoaService {

    @Autowired
    private PermissaoPessoaRepository permissaoPessoaRepository;

    @Autowired
    private PermissaoRepository permissaoRepository;


    public void vincularPermissaoPessoaCliente(Pessoa pessoa) {
        List<Permissao> permissoes = permissaoRepository.findByNome("cliente");

        if (!permissoes.isEmpty()) {
            PermissaoPessoa permissaoPessoa = new PermissaoPessoa();

            permissaoPessoa.setPessoa(pessoa);
            permissaoPessoa.setPermissao(permissoes.get(0));
            permissaoPessoa.setDataCriacao(new Date());

            permissaoPessoaRepository.saveAndFlush(permissaoPessoa);
        }
    }
}
