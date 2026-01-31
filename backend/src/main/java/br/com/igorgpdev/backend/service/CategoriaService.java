package br.com.igorgpdev.backend.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.igorgpdev.backend.entity.Categoria;
import br.com.igorgpdev.backend.repository.CategoriaRepository;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<Categoria> findAll() {
        return categoriaRepository.findAll();
    }

    public Categoria insert(Categoria categoria) {
        categoria.setDataCriacao(new Date());
        Categoria categoriaSalva = categoriaRepository.saveAndFlush(categoria);
        return categoriaSalva;
    }

    public Categoria changeById(Long id, Categoria categoria) {
        Categoria categoriaExistente = categoriaRepository.findById(id).orElseThrow();

        categoriaExistente.setNome(categoria.getNome());
        categoriaExistente.setDataAtualizacao(new Date());

        return categoriaRepository.saveAndFlush(categoriaExistente);
    }

    public void delete(Long id) {
        Categoria categoria = categoriaRepository.findById(id).get();
        categoriaRepository.delete(categoria);
    }
}
