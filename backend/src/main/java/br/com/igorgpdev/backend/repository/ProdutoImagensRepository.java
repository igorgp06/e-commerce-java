package br.com.igorgpdev.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.igorgpdev.backend.entity.ProdutoImagens;

public interface ProdutoImagensRepository extends JpaRepository<ProdutoImagens, Long> {

    List<ProdutoImagens> findByProdutoId(Long produtoId);

}
