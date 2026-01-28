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

    public Estado insert(Estado estado) {
        estado.setDataCriacao(new Date());
        Estado novoEstado = estadoRepository.saveAndFlush(estado);
        return novoEstado;
    }

    public Estado change(Estado estado) {
        estado.setDataAtualizacao(new Date());
        return estadoRepository.saveAndFlush(estado);
    }

    public void delete(Long id) {
        Estado estado = estadoRepository.findById(id).orElseThrow();
        estadoRepository.delete(estado);
    }
}
