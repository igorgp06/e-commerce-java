package br.com.igorgpdev.backend.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import br.com.igorgpdev.backend.entity.Produto;
import br.com.igorgpdev.backend.entity.ProdutoImagens;
import br.com.igorgpdev.backend.repository.ProdutoImagensRepository;
import br.com.igorgpdev.backend.repository.ProdutoRepository;

@Service
public class ProdutoImagensService {

    @Autowired
    private ProdutoImagensRepository produtoImagensRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    public List<ProdutoImagens> findAll() {
        return produtoImagensRepository.findAll();
    }

    public List<ProdutoImagens> findByProdutoId(Long id_produto) {
        return produtoImagensRepository.findByProdutoId(id_produto);
    }   

    public ProdutoImagens insert(Long id_produto, MultipartFile file) {
        Produto produto = produtoRepository.findById(id_produto).get();
        ProdutoImagens produtoImagens = new ProdutoImagens();

        try {
            if (!file.isEmpty()) {
                byte[] bytes = file.getBytes();
                String nomeImagem = String.valueOf(produto.getId()) + file.getOriginalFilename();
                Path caminho = Paths
                        .get("C:/igdeveloper/e-commerce-Java/imagens-produtos/" + nomeImagem);
                Files.write(caminho, bytes);

                produtoImagens.setNome(nomeImagem);

            }
        } catch (IOException e) {
            // e.printStackTrace();
        }

        produtoImagens.setProduto(produto);
        produtoImagens.setDataCriacao(new Date());

        return produtoImagensRepository.saveAndFlush(produtoImagens);
    }

    public ProdutoImagens changeById(Long id, ProdutoImagens produtoImagens) {
        ProdutoImagens produtoImagensExistente = produtoImagensRepository.findById(id).orElseThrow();

        produtoImagensExistente.setNome(produtoImagens.getNome());
        produtoImagensExistente.setDataAtualizacao(new Date());

        return produtoImagensRepository.saveAndFlush(produtoImagensExistente);
    }

    public void delete(Long id) {
        ProdutoImagens produtoImagens = produtoImagensRepository.findById(id).orElseThrow();
        produtoImagensRepository.delete(produtoImagens);
    }
}
