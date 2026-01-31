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

import br.com.igorgpdev.backend.entity.Produto;
import br.com.igorgpdev.backend.service.ProdutoService;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @GetMapping("/")
    public List<Produto> findAll() {
        return produtoService.findAll();
    }

    @GetMapping("/{id}")
    public Produto findById(@PathVariable("id") Long id) { 
        return produtoService.findById(id);
    }

    @PostMapping("/")
    public Produto insert(@RequestBody Produto produto) {
        return produtoService.insert(produto);
    }

    @PutMapping("/{id}") // TODO: descobrir pq quando altero pelo id ele cria um novo objeto no banco ao inves de alterar o existente
    public Produto change(@PathVariable("id") Long id, @RequestBody Produto produto) {
        return produtoService.change(produto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        produtoService.delete(id);
        return ResponseEntity.ok().build();
    }
}
