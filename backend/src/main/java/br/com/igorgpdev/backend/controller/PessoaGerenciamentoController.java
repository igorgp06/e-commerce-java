package br.com.igorgpdev.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.igorgpdev.backend.entity.Pessoa;
import br.com.igorgpdev.backend.service.PessoaGerenciamentoService;

@RestController
@RequestMapping("/api/pessoas-gerenciamento")
public class PessoaGerenciamentoController {

    @Autowired
    private PessoaGerenciamentoService pessoaGerenciamentoService;

    @PostMapping("/senha-recuperacao")
    public String recuperarCodigo(@RequestBody Pessoa pessoa) {
        return pessoaGerenciamentoService.solicitarCodigo(pessoa.getEmail());
    }

    @PostMapping("/senha-alterar")
    public String alterarSenha(@RequestBody Pessoa pessoa) {
        return pessoaGerenciamentoService.alterarSenha(pessoa);
    }
}
