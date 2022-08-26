package com.school.app.config.Configuration;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class ConfigurationClass {

	@Autowired
	private Environment Environment;
	
	@Bean
	public JavaMailSender javaMailSender() {
		
		JavaMailSenderImpl mailSender =new JavaMailSenderImpl();
		mailSender.setHost(Environment.getProperty("spring.mail.host"));
		mailSender.setPort(Integer.valueOf(Environment.getProperty("spring.mail.port")));
		
		 mailSender.setUsername(Environment.getProperty("spring.mail.username"));
		    mailSender.setPassword(Environment.getProperty("spring.mail.password"));
		    Properties props = mailSender.getJavaMailProperties();
		    props.put("mail.transport.protocol", "smtp");
		    props.put("mail.smtp.auth", "true");
		    props.put("mail.smtp.starttls.enable", "true");
		    props.put("mail.debug", "true");
		    
		    return mailSender;
	}
}
