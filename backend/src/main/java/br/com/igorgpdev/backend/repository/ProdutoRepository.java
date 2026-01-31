package br.com.igorgpdev.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.igorgpdev.backend.entity.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long>{

}
