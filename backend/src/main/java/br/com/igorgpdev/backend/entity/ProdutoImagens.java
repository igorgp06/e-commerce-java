package br.com.igorgpdev.backend.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Table(name = "produto_imagens")
@Data
public class ProdutoImagens {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    @Size(min = 5, max = 60)
    private String nome;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_produto", nullable = false)
    private Produto produto;

    private Date dataCriacao;
    private Date dataAtualizacao;
}
