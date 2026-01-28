package br.com.igorgpdev.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.igorgpdev.backend.entity.Cidade;

public interface CidadeRepository extends JpaRepository<Cidade, Long>{

}
