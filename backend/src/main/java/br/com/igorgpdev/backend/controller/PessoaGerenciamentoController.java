package br.com.igorgpdev.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.igorgpdev.backend.service.PessoaGerenciamentoService;

@RestController
@RequestMapping("/api/pessoas-gerenciamento")
public class PessoaGerenciamentoController {

    @Autowired
    private PessoaGerenciamentoService pessoaGerenciamentoService;

    @PostMapping("/")
    public String recuperarCodigo(@RequestParam("email") String email) {

        return pessoaGerenciamentoService.solicitarCodigo(email);
    }
}
