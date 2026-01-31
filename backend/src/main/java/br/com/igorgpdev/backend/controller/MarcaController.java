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

import br.com.igorgpdev.backend.entity.Marca;
import br.com.igorgpdev.backend.service.MarcaService;

@RestController
@RequestMapping("/api/marcas")
public class MarcaController {

    @Autowired
    private MarcaService marcaService;

    @GetMapping("/")
    public List<Marca> findAll() {
        return marcaService.findAll();
    }

    @PostMapping("/")
    public Marca insert(@RequestBody Marca marca) {
        return marcaService.insert(marca);
    }

    @PutMapping("/{id}")
    public Marca change(@PathVariable("id") Long id, @RequestBody Marca marca) {
        return marcaService.changeById(id, marca);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        marcaService.delete(id);
        return ResponseEntity.ok().build();
    }

}
