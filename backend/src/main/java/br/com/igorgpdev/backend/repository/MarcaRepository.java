package br.com.igorgpdev.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.igorgpdev.backend.entity.Marca;

public interface MarcaRepository extends JpaRepository<Marca, Long> {

}
