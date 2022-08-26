package com.school.app.service.interfaces;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.school.app.model.Inquiry;

public interface EmailService {

	public boolean sendMail(String mail,String otp,String name);

	public ResponseEntity<Object> sendOTP(String email);

	public boolean verifyOTP(String OTP,int userId);

	public ResponseEntity<Object> updatePassword(String newPassword,int userId);

	boolean AuthenticateOldPassword(String oldPassword, int userId);
	
	public boolean sendRequestAcceptanceMail(String mail,String name);

	boolean sendFeePaymentMail(int grNo);

	public ResponseEntity<Object> getUserByEmailId(String email);

	public boolean sendInquiryResponse(Inquiry inquiry);
	
}
