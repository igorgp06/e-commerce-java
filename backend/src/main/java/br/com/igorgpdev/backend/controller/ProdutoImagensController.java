package br.com.igorgpdev.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.com.igorgpdev.backend.entity.ProdutoImagens;
import br.com.igorgpdev.backend.service.ProdutoImagensService;

@RestController
@RequestMapping("/api/produto-imagens")
@CrossOrigin
public class ProdutoImagensController {

    @Autowired
    private ProdutoImagensService produtoImagensService;

    @GetMapping("/")
    public List<ProdutoImagens> findAll() {
        return produtoImagensService.findAll();
    }

    @GetMapping("/produto/{id}")
    public List<ProdutoImagens> findByProdutoId(@PathVariable("id") Long id_produto) {
        return produtoImagensService.findByProdutoId(id_produto);
    }

    @PostMapping(consumes = {"multipart/form-data"}, path = "/")
    public ProdutoImagens insert(@RequestParam("id_produto") Long id_produto, @RequestParam("file") MultipartFile file) {
        return produtoImagensService.insert(id_produto, file);
    }

    @PutMapping("/{id}")
    public ProdutoImagens changeById(@PathVariable("id") Long id, @RequestBody ProdutoImagens produtoImagens) {
        return produtoImagensService.changeById(id, produtoImagens);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        produtoImagensService.delete(id);
        return ResponseEntity.ok().build(); // TODO quando apagar a imagem do banco, apagar do sistema de arquivos tambem
    }
}
