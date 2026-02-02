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

import br.com.igorgpdev.backend.entity.Categoria;
import br.com.igorgpdev.backend.service.CategoriaService;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @GetMapping("/")
    public List<Categoria> findAll() {
        return categoriaService.findAll();
    }

    @PostMapping("/")
    public Categoria insert(@RequestBody Categoria categoria) {
        return categoriaService.insert(categoria);
    }

    @PutMapping("/{id}")
    public Categoria change(@PathVariable("id") Long id, @RequestBody Categoria categoria) {
        return categoriaService.changeById(id, categoria);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        categoriaService.delete(id);
        return ResponseEntity.ok().build();
    }
}
