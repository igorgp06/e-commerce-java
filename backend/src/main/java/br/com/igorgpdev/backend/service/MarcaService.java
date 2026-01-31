package br.com.igorgpdev.backend.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.igorgpdev.backend.entity.Marca;
import br.com.igorgpdev.backend.repository.MarcaRepository;

@Service
public class MarcaService {

    @Autowired
    private MarcaRepository marcaRepository;

    public List<Marca> findAll() {
        return marcaRepository.findAll();
    }

    public Marca insert(Marca marca) {
        marca.setDataCriacao(new Date());
        Marca marcaNova = marcaRepository.saveAndFlush(marca);
        return marcaNova;
    }

    public Marca changeById(Long id, Marca marca) {
        Marca marcaExistente = marcaRepository.findById(id).orElseThrow();

        marcaExistente.setNome(marca.getNome());
        marcaExistente.setDataAtualizacao(new Date());

        return marcaRepository.saveAndFlush(marcaExistente);
    }

    public void delete(Long id) {
        Marca marca = marcaRepository.findById(id).orElseThrow();
        marcaRepository.delete(marca);
    }
}
