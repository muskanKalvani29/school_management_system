package com.school.app.service.classes;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Iterator;
import java.util.List;
import java.util.Random;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.school.app.model.Inquiry;
import com.school.app.model.Student;
import com.school.app.model.User;
import com.school.app.repository.StudentRepository;
import com.school.app.repository.UserRepository;
import com.school.app.service.interfaces.EmailService;
import com.school.app.exception.EmailNotFoundException;
import com.school.app.exception.ResourceNotFoundException;

@Service
public class EmailServiceImpl implements EmailService{
	
	@Autowired 
	private JavaMailSender javaMailSender;

	@Autowired
	private BCryptPasswordEncoder passwordEncoder; 
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private StudentRepository StudentRepository;

	@Override
	public boolean sendMail(String mail, String otp, String name) {
		
			try {
				MimeMessage mimeMessage = javaMailSender.createMimeMessage();
				MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage,true);
				mimeMessageHelper.setSubject("Password Reset Requests");
				mimeMessage.setContent("<h2>Hello  	" + name +"</h2><br>"
						+ "<span style='color:gray;'>We received a request to reset the password on your D.P. High School Account.</span>"
						+"<br><br>"
						+ "Your OTP - <h2><strong>" + otp +"</strong></h2></center><br>"
						+ "<span style='color:gray;'>Enter OTP to complete Your Reset Password Step.</span><br><br>"
						+"<span style='color:gray;'> If you didin't request for reset password, you can ignore this email. your password will not be changed.</span><br><br>"
						+"<span style='color:gray;'> Please Keep Your Account Secure ! </span><br><br>"
						+"<strong>D.P. High School Team</strong>","text/html");
				mimeMessageHelper.setFrom("2021mscproject@gmail.com");
				mimeMessageHelper.setTo(mail);
				System.out.println(mimeMessage);
				
				javaMailSender.send(mimeMessage);
				return true; 
				
			} catch (Exception e) {
				System.out.println(e);
				return false;
			}
	}

	@Override
	public ResponseEntity<Object> sendOTP(String email) {
		User user =userRepository.findByEmailId(email);
		if(user.equals(null))
		{
			throw new EmailNotFoundException("Sorry EmailId Not Exit Please Enter the Valid Email Id");
		}
		try {
			String userOTP = createOTP().trim();
			user.setUserOTP(userOTP);
			Calendar calendar = Calendar.getInstance();
			calendar.set(Calendar.HOUR,12);
			calendar.set(Calendar.MINUTE,05);
			calendar.set(Calendar.SECOND,10);
			
			boolean value = this.sendMail(email, userOTP, user.getUserName());
			if(value==true){
				userRepository.save(user);
				return ResponseEntity.status(HttpStatus.OK).body(user);
			}
			else {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error Ocuured on sending OTP"
						+ " please Enter Your Email Id Again. ");
			}
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error Ocuured on sending OTP");
		}
		
	}

	public static String createOTP()
	{
		Random random =new Random();
		String capitalLetters ="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		String smallLetters  =  "abcdefghijklmnopqrstuvwxyz";
		String digits ="0123456789";
		String value = capitalLetters+smallLetters+digits;
		int OTPSize = 6;
		String otp = "";
		char []values = value.toCharArray();
		
		for(int i=0;i<OTPSize;i++)
		{
			//get one by one random value
			otp += values[random.nextInt(values.length)];
		}
		System.out.println(otp);
		return otp;
	}
	
	//here we send the request user user id
	@Override
	public boolean verifyOTP(String OTP, int userId) {
		User user =	userRepository.findByUserId(userId);
		if(user==null) {
			throw new UsernameNotFoundException("User Not Found.");
		}
		try {
			if(user.getUserOTP().equals(OTP.trim()))
			{
				System.out.println("user enter valid otp");
				return true;
			}
			return false;
		} catch (Exception e) {
			return false;
		}	
	}

	@Override
	public ResponseEntity<Object> updatePassword(String newPassword, int userId) {
		User user =	userRepository.findByUserId(userId);
		if(user==null) {
			throw new UsernameNotFoundException("User Not Found.");
		}
		try {	
			String encodePasswordString = passwordEncoder.encode(newPassword);
			user.setPassword(encodePasswordString);
			User update_user = userRepository.save(user);
			
			return ResponseEntity.status(HttpStatus.CREATED).body(update_user);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error Ocuured on Changing Password");
		}
	}
	
	@Override
	public boolean AuthenticateOldPassword(String oldPassword, int userId) {
		User user =	userRepository.findByUserId(userId);
		if(user==null) {
			throw new UsernameNotFoundException("User Not Found.");
		}
		try {
			if(passwordEncoder.matches(oldPassword, user.getPassword())) {
				return true;
			}
			return false;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	@Override
	public boolean sendRequestAcceptanceMail(String mail,String name) {
		try {
			MimeMessage mimeMessage=javaMailSender.createMimeMessage();
			MimeMessageHelper mimeMessageHelper=new MimeMessageHelper(mimeMessage, true);
			
			mimeMessageHelper.setSubject("Request Acceptance");
			mimeMessage.setContent("<h2>  Hello "+name+",</h2><br>"
					+"<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We inform you that Your Request was approved.</span>"
					+"<span>You are now Member of the System."
					+"To login to your account, use the Username and Password you signed up with."
					+"If you recieved this email by mistake? Just ignore it!</span><br><br>"
					+"<span>Regards,</span><br>"
					+"<span>Team D.P. High School</span> ", "text/html");
			mimeMessageHelper.setFrom("2021mscproject@gmail.com");
			mimeMessageHelper.setTo(mail);
			System.out.println(mimeMessage);
			
			javaMailSender.send(mimeMessage);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	@Override
	public boolean sendFeePaymentMail(int grNo) {
		
			Student student = StudentRepository.findById(grNo).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for : " + grNo));
			try {
				MimeMessage mimeMessage=javaMailSender.createMimeMessage();
				MimeMessageHelper mimeMessageHelper=new MimeMessageHelper(mimeMessage, true);
				
				mimeMessageHelper.setSubject("Reminder for payment of fees");
				mimeMessage.setContent("<span>Respected Sir/Madam,\r\n <br><br>"
						+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This email is to inform you that we have not received last installment fees of your child."
						+ "It is requested to kindly make the payment by this week in order to prevent any fines to be levied.\r\n <br><br>"
						+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In case of inquiry, you may contact us at 9898011967 .</span>"
						+"<br><br>"
						+"<span>Regards,</span><br>"
						+"<span>Team D.P. High School</span> ", "text/html");
				mimeMessageHelper.setFrom("2021mscproject@gmail.com");
				mimeMessageHelper.setTo(student.getEmailId());
				System.out.println(mimeMessage);
				
				javaMailSender.send(mimeMessage);
				return true;
			} catch (Exception e) {
				e.printStackTrace();
				return false;
			}		
	}

	@Override
	public ResponseEntity<Object> getUserByEmailId(String email) {
		User user = userRepository.findByEmailId(email);
		if(user==null) {
			throw new UsernameNotFoundException("User Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(user);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public boolean sendInquiryResponse(Inquiry inquiry) {
		String mail_id = inquiry.getEmailId();
		String response=inquiry.getInquiryResponse();
		try {
			MimeMessage mimeMessage=javaMailSender.createMimeMessage();
			MimeMessageHelper mimeMessageHelper=new MimeMessageHelper(mimeMessage, true);
			
			mimeMessageHelper.setSubject("Inquiry Response");
			mimeMessage.setContent("<span>Respected Sir/Madam,\r\n <br><br>"
					+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+"Your Inquiry Response : "+response
					+"<br><br>"
					+"Thank You For Visiting Our Web Application. "+"<br><br>"
					+"<span>Regards,</span><br>"
					+"<span>Team D.P. High School</span> ", "text/html");
			mimeMessageHelper.setFrom("2021mscproject@gmail.com");
			mimeMessageHelper.setTo(mail_id);
			System.out.println(mimeMessage);
			
			javaMailSender.send(mimeMessage);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}		
	}
}
