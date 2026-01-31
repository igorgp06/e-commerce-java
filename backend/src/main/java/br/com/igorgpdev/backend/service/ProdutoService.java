package br.com.igorgpdev.backend.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.igorgpdev.backend.entity.Produto;
import br.com.igorgpdev.backend.repository.ProdutoRepository;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Produto> findAll() {
        return produtoRepository.findAll();
    }

    public Produto findById(Long id) {
        Produto produto = produtoRepository.findById(id).get();
        return produto;
    }

    public Produto insert(Produto produto) {
        produto.setDataCriacao(new Date());
        Produto produtoNovo = produtoRepository.saveAndFlush(produto);
        return produtoNovo;
    }

    public Produto change(Produto produto) {
        produto.setDataAtualizacao(new Date());
        return produtoRepository.saveAndFlush(produto);
    }

    public void delete(Long id) {
        Produto produto = produtoRepository.findById(id).get();
        produtoRepository.delete(produto);
    }
}
