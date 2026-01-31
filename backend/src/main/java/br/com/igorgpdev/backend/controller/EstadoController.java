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

import br.com.igorgpdev.backend.entity.Estado;
import br.com.igorgpdev.backend.service.EstadoService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/estados")
public class EstadoController {

    @Autowired
    private EstadoService estadoService;

    @GetMapping("/")
    public List<Estado> findAll() {
        return estadoService.findAll();
    }

    @PostMapping("/")
    public Estado insert(@Valid @RequestBody Estado estado) {
        return estadoService.insert(estado);
    }

    @PutMapping("/{id}")
    public Estado change(@PathVariable("id") Long id, @Valid @RequestBody Estado estado) {
        return estadoService.changeById(id, estado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        estadoService.delete(id);
        return ResponseEntity.ok().build();
    }
}
