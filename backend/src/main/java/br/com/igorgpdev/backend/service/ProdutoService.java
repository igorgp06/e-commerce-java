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

    public Produto changeById(Long id, Produto produto) {
        Produto produtoExistente = produtoRepository.findById(id).get();

        produtoExistente.setNome(produto.getNome());
        produtoExistente.setDescricaoCurta(produto.getDescricaoCurta());
        produtoExistente.setDescricaoLonga(produto.getDescricaoLonga());
        produtoExistente.setPrecoCusto(produto.getPrecoCusto());
        produtoExistente.setPrecoVenda(produto.getPrecoVenda());
        produtoExistente.setMarca(produto.getMarca());
        produtoExistente.setCategoria(produto.getCategoria());
        produtoExistente.setDataAtualizacao(new Date());
        
        return produtoRepository.saveAndFlush(produtoExistente);
    }

    public void delete(Long id) {
        Produto produto = produtoRepository.findById(id).get();
        produtoRepository.delete(produto);
    }
}
