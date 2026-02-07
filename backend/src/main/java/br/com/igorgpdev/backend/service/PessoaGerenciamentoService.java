package br.com.igorgpdev.backend.service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.igorgpdev.backend.entity.Pessoa;
import br.com.igorgpdev.backend.repository.PessoaRepository;

@Service
public class PessoaGerenciamentoService {

    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private EmailService emailService;

    public String solicitarCodigo(String email) {

        Pessoa pessoa = pessoaRepository.findByEmail(email);
        pessoa.setCodigoRecSenha(gerarCodigoRecSenha(pessoa.getId()));
        pessoa.setDataEnvioCodigo(new Date());
        pessoaRepository.saveAndFlush(pessoa);

        emailService.enviarEmailTexto(pessoa.getEmail(), "Seu código de recuperação de senha", "Olá " + pessoa.getNome() + ",\n\nSeu código de recuperação de senha é: " + pessoa.getCodigoRecSenha() + "\n\nEste código é válido por 15 minutos.\n\nAtenciosamente,\nEquipe de Suporte.\n Favor não responder este email.");

        return "Código Enviado"; //senhaGerada;
    }

    public String alterarSenha(Pessoa pessoa) {

        Pessoa pessoaExistente = pessoaRepository.findByEmailAndCodigoRecSenha(pessoa.getEmail(), pessoa.getCodigoRecSenha());
        Date diferenca = new Date(new Date().getTime() - pessoaExistente.getDataEnvioCodigo().getTime());

        if (diferenca.getTime() / 1000 < 900) {
            pessoaExistente.setSenha(pessoa.getSenha()); //TODO implmentar o spring security para encriptar a senha
            pessoaExistente.setCodigoRecSenha(null);
            pessoaExistente.setDataEnvioCodigo(null);
            pessoaRepository.saveAndFlush(pessoaExistente);
            return "Senha Alterada com Sucesso.";
        } else {
            return "Código Expirado. Por favor, solicite um novo código.";
        }
    }

    private String gerarCodigoRecSenha(Long id) {
        DateFormat dateFormat = new SimpleDateFormat("ddMMyyyyHHmmssmm");

        return dateFormat.format(new Date()) + id;
    }
}
