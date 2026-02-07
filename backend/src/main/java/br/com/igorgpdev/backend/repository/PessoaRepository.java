package br.com.igorgpdev.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.igorgpdev.backend.entity.Pessoa;

public interface PessoaRepository extends JpaRepository<Pessoa, Long>{
        
    boolean existsByCpf(String cpf);
    boolean existsByEmail(String email);
    
    boolean existsByCpfAndIdNot(String cpf, Long id);
    boolean existsByEmailAndIdNot(String email, Long id);

    Pessoa findByEmail(String email);

    Pessoa findByEmailAndCodigoRecSenha(String email, String codigoRecSenha);
}
