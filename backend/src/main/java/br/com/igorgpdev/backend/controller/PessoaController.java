package br.com.igorgpdev.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.igorgpdev.backend.entity.Pessoa;
import br.com.igorgpdev.backend.service.PessoaService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/pessoas")
public class PessoaController {

    @Autowired
    private PessoaService pessoaService;

    @GetMapping("/")
    public List<Pessoa> findAll() {
        return pessoaService.findAll();
    }

    @PostMapping("/")
    public Pessoa insert(@Valid @RequestBody Pessoa pessoa) {
        return pessoaService.insert(pessoa);
    }

    @PutMapping("/")
    public Pessoa change(@Valid @RequestBody Pessoa pessoa) {
        return pessoaService.change(pessoa);
    }

    @PutMapping("/{id}")
    public Pessoa changeById(@PathVariable Long id, @Valid @RequestBody Pessoa pessoa) {
        pessoa.setId(id);
        return pessoaService.change(pessoa);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        pessoaService.delete(id);
        return ResponseEntity.ok().build();
    }
}
