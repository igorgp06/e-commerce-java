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

import br.com.igorgpdev.backend.entity.Permissao;
import br.com.igorgpdev.backend.service.PermissaoService;

@RestController
@RequestMapping("/api/permissoes")
public class PermissaoController {

    @Autowired
    private PermissaoService permissaoService;

    @GetMapping("/")
    public List<Permissao> findAll() {
        return permissaoService.findAll();
    }

    @PostMapping("/")
    public Permissao insert(@RequestBody Permissao permissao) {
        return permissaoService.insert(permissao);
    }

    @PutMapping("/{id}")
    public Permissao change(@PathVariable("id") Long id, @RequestBody Permissao permissao) {
        return permissaoService.changeById(id, permissao);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        permissaoService.delete(id);
        return ResponseEntity.ok().build();
    }
}
