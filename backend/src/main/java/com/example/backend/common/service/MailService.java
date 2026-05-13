package com.example.backend.common.service;

import jakarta.mail.Message;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Properties;

@Service
public class MailService {
    @Value("${mail.smtp.host:smtp.qq.com}")
    private String host;
    @Value("${mail.smtp.port:465}")
    private int port;
    @Value("${mail.smtp.username:}")
    private String username;
    @Value("${mail.smtp.password:}")
    private String password;
    @Value("${mail.smtp.ssl:true}")
    private boolean ssl;

    public void send(String to, String subject, String content) {
        try {
            Properties props = new Properties();
            props.put("mail.transport.protocol", "smtp");
            props.put("mail.smtp.host", host);
            props.put("mail.smtp.auth", "true");
            if (ssl) {
                props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
                props.put("mail.smtp.socketFactory.port", String.valueOf(port));
                props.put("mail.smtp.socketFactory.fallback", "false");
            }
            props.put("mail.smtp.port", String.valueOf(port));
            Session session = Session.getInstance(props);
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
            message.setSubject(subject, "UTF-8");
            message.setContent(content, "text/html;charset=UTF-8");
            Transport transport = session.getTransport();
            transport.connect(host, port, username, password);
            transport.sendMessage(message, message.getAllRecipients());
            transport.close();
        } catch (Exception e) {
            // swallow mail errors to avoid breaking flow
        }
    }
}
