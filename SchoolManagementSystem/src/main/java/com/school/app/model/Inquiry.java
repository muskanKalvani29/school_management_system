package com.school.app.model;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonFormat;


@Entity
public class Inquiry {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,generator = "native")
	@GenericGenerator(name="native",strategy = "native")
	@Column(updatable = false,length = 4)
	private int inquiryId;
	
	@NotNull
	@Column(length = 40,nullable = false)
	@Size(max = 40)
	private String emailId;
	
	@NotNull
	@Column(length = 300,nullable = false)
	@Size(max = 300)
	private String inquiryMessage;
	
	@Column(length = 300)
	@Size(max = 300)
	private String inquiryResponse;
	
	@NotNull
	@Column(nullable = false,columnDefinition = "DATE")
	@CreatedDate
	@JsonFormat(pattern = "MM-dd-yyyy")
	private Calendar uploadDate;

	//default Constructor
	public Inquiry() 
	{
		super();
	}

	//Parameterized Constructor
	public Inquiry(int inquiryId, @NotNull @Size(max = 40) String emailId,
			@NotNull @Size(max = 300) String inquiryMessage, @Size(max = 300) String inquiryResponse,
			@NotNull Calendar uploadDate) {
		super();
		this.inquiryId = inquiryId;
		this.emailId = emailId;
		this.inquiryMessage = inquiryMessage;
		this.inquiryResponse = inquiryResponse;
		this.uploadDate = uploadDate;
	}

	//getters and setters
	public int getInquiryId() 
	{
		return inquiryId;
	}
	
	public void setInquiryId(int inquiryId)
	{
		this.inquiryId = inquiryId;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getInquiryMessage() 
	{
		return inquiryMessage;
	}

	public void setInquiryMessage(String inquiryMessage)
	{
		this.inquiryMessage = inquiryMessage;
	}

	public String getInquiryResponse() 
	{
		return inquiryResponse;
	}

	public void setInquiryResponse(String inquiryResponse) 
	{
		this.inquiryResponse = inquiryResponse;
	}

	public Calendar getUploadDate() {
		return uploadDate;
	}

	public void setUploadDate(Calendar uploadDate) {
		this.uploadDate = uploadDate;
	}

	@Override
	public String toString() {
		return "Inquiry [inquiryId=" + inquiryId + ", emailId=" + emailId + ", inquiryMessage=" + inquiryMessage
				+ ", inquiryResponse=" + inquiryResponse + ", uploadDate=" + uploadDate + "]";
	}

	
}
