package com.school.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.school.app.model.Inquiry;
import com.school.app.service.interfaces.EmailService;

@RestController
@RequestMapping("/sms")
@CrossOrigin(origins = "http://localhost:4200")
public class EmailController {

	@Autowired
	private EmailService emailService;
	
	@GetMapping("/send-otp")
	public ResponseEntity<Object> SendOtp(@RequestParam("email") String email)
	{
		return emailService.sendOTP(email);
	}
	
	@GetMapping("/verify-otp")
	public boolean VerifyOtp(@RequestParam("otp") String OTP,@RequestParam("user_id")int userId)
	{
		return emailService.verifyOTP(OTP, userId);
	}
	
	@GetMapping("/update-password")
	public ResponseEntity<Object> UpdateUserPassword(@RequestParam("password") String newPassword,@RequestParam("user_id")int userId)
	{
		return emailService.updatePassword(newPassword, userId);
	}
	
	@GetMapping("/authenticate-oldPassword")
	public boolean ResetPassword(@RequestParam("password") String oldPassword,@RequestParam("user_id")int userId)
	{
		return emailService.AuthenticateOldPassword(oldPassword, userId);
	}
	
	@GetMapping("/accept-teacherRequest")
	public boolean AcceptTeacherRequest(@RequestParam("email")String email,@RequestParam("name")String name)
	{
		return emailService.sendRequestAcceptanceMail(email, name);
	}
	
	@GetMapping("/feePayment-email")
	public boolean FeePaymentMail(@RequestParam("grNo")int grNo)
	{
		return emailService.sendFeePaymentMail(grNo);
	}
	
	@GetMapping("/email-user")
	public ResponseEntity<Object> getUserByEmail(@RequestParam("email")String email)
	{
		return emailService.getUserByEmailId(email);
	}
	
	@PostMapping("/email-inquiry")
	public boolean sendInquiryResponseEmail(@RequestBody Inquiry inquiry)
	{
		return emailService.sendInquiryResponse(inquiry);
	}
	
	
}

