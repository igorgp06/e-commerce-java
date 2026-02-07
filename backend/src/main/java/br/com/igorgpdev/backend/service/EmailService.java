package br.com.igorgpdev.backend.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import freemarker.template.Configuration;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private Configuration fmConfiguration;

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

    public void enviarEmailTemplate(String destinatario, String titulo, Map<String, Object> propriedades) {
        MimeMessage message = mailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setSubject(titulo);
            helper.setFrom(remetente);
            helper.setTo(destinatario);
            String flth = getConteudoTemplate(propriedades);
            helper.setText(flth, true);

            mailSender.send(helper.getMimeMessage());

        } catch (MessagingException e) {
            throw new RuntimeException("Erro ao enviar email: " + e.getMessage());
        }
    }

    @SuppressWarnings("UseSpecificCatch") // corrigir dps
    public String getConteudoTemplate(Map<String, Object> model) {
        try {
            return FreeMarkerTemplateUtils.processTemplateIntoString(
                    fmConfiguration.getTemplate("email-rec-codigo.flth"),
                    model
            );
        } catch (Exception e) {
            throw new RuntimeException("Erro ao processar template: " + e.getMessage(), e);
        }
    }

}
