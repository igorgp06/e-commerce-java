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

import br.com.igorgpdev.backend.entity.Cidade;
import br.com.igorgpdev.backend.service.CidadeService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/cidades")
public class CidadeController {

    @Autowired
    private CidadeService cidadeService;

    @GetMapping("/")
    public List<Cidade> findAll() {
        return cidadeService.findAll();
    }

    @PostMapping("/")
    public Cidade insert(@Valid @RequestBody Cidade cidade) {
        return cidadeService.insert(cidade);
    }

    @PutMapping("/")
    public Cidade change(@Valid @RequestBody Cidade cidade) {
        return cidadeService.change(cidade);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        cidadeService.delete(id);
        return ResponseEntity.ok().build();
    }

}
