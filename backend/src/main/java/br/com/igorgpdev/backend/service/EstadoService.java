package br.com.igorgpdev.backend.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.igorgpdev.backend.entity.Estado;
import br.com.igorgpdev.backend.repository.EstadoRepository;

@Service
public class EstadoService {

    @Autowired
    private EstadoRepository estadoRepository;

    public List<Estado> findAll() {
        return estadoRepository.findAll();
    }

    public Estado findById(Long id) {
        return estadoRepository.findById(id).orElseThrow();
    }

    public Estado insert(Estado estado) {
        estado.setDataCriacao(new Date());
        Estado novoEstado = estadoRepository.saveAndFlush(estado);
        return novoEstado;
    }

    public Estado changeById(Long id, Estado estado) {
        Estado estadoExistente = estadoRepository.findById(id).orElseThrow();

        estadoExistente.setNome(estado.getNome());
        estadoExistente.setSigla(estado.getSigla());
        estadoExistente.setDataAtualizacao(new Date());

        return estadoRepository.saveAndFlush(estadoExistente);
    }

    public void delete(Long id) {
        Estado estado = estadoRepository.findById(id).orElseThrow();
        estadoRepository.delete(estado);
    }
}
