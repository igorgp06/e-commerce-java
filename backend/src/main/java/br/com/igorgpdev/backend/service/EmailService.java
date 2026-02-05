package br.com.igorgpdev.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${app.email.from}")
    private String remetente;

    @SuppressWarnings({"UseSpecificCatch", "CallToPrintStackTrace"}) // corrigir dps
    public String enviarEmailTexto(String destinatario, String titulo, String mensgem) { // TODO criar classes para os atributos

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(remetente);
            message.setTo(destinatario);
            message.setSubject(titulo);
            message.setText(mensgem);
            mailSender.send(message);

            return "Email enviado com sucesso!";

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
}
