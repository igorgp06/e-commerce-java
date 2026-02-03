package br.com.igorgpdev.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.igorgpdev.backend.dto.PessoaClienteRequestDTO;
import br.com.igorgpdev.backend.entity.Pessoa;
import br.com.igorgpdev.backend.service.PessoaClienteService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/clientes")
public class PessoaClienteController {

    @Autowired
    private PessoaClienteService pessoaClienteService;

    @PostMapping("/")
    public Pessoa register(@Valid @RequestBody PessoaClienteRequestDTO pessoaDTO) {
        return pessoaClienteService.register(pessoaDTO);
    }
}
