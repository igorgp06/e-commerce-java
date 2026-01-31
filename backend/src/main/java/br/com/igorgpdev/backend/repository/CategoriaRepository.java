package br.com.igorgpdev.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.igorgpdev.backend.entity.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

}
