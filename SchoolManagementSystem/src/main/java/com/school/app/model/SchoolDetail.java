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

import com.fasterxml.jackson.annotation.JsonFormat;


@Entity
public class SchoolDetail {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,generator = "native")
	@GenericGenerator(name="native",strategy = "native")
	@Column(updatable = false,length = 1)
	private int schoolDetailId;
	
	@NotNull
	@Column(length = 40,nullable = false)
	@Size(max = 40)
	private String emailId;
	
	@NotNull
	@Column(length = 10,nullable = false)
	@Size(max = 10)
	private String landlineNo;
	
	@NotNull
	@Column(length = 10,nullable = false)
	@Size(max = 10)
	private String MobileNo;
	
	
	@NotNull
	@Column(nullable = false,columnDefinition = "TIME")
	@JsonFormat(pattern = "HH:mm:ss")
	private Calendar officeOpenTime;
	
	@NotNull
	@Column(nullable = false,columnDefinition = "TIME")
	@JsonFormat(pattern = "HH:mm:ss")
	private Calendar officeCloseTime;

	//default Constructor
	public SchoolDetail()
	{
		super();
	}

	//Parameterized Constructor
	public SchoolDetail(int schoolDetailId, @NotNull @Size(max = 40) String emailId,
			@NotNull @Size(max = 10) String landlineNo, @NotNull @Size(max = 10) String mobileNo,
			 @NotNull Calendar officeOpenTime, @NotNull Calendar officeCloseTime) {
		super();
		this.schoolDetailId = schoolDetailId;
		this.emailId = emailId;
		this.landlineNo = landlineNo;
		MobileNo = mobileNo;
		
		this.officeOpenTime = officeOpenTime;
		this.officeCloseTime = officeCloseTime;
	}

	//getters and setters
	public int getSchoolDetailId() {
		return schoolDetailId;
	}

	public void setSchoolDetailId(int schoolDetailId) {
		this.schoolDetailId = schoolDetailId;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getLandlineNo() {
		return landlineNo;
	}

	public void setLandlineNo(String landlineNo) {
		this.landlineNo = landlineNo;
	}

	public String getMobileNo() {
		return MobileNo;
	}

	public void setMobileNo(String mobileNo) {
		MobileNo = mobileNo;
	}

	public Calendar getOfficeOpenTime() {
		return officeOpenTime;
	}

	public void setOfficeOpenTime(Calendar officeOpenTime) {
		this.officeOpenTime = officeOpenTime;
	}

	public Calendar getOfficeCloseTime() {
		return officeCloseTime;
	}

	public void setOfficeCloseTime(Calendar officeCloseTime) {
		this.officeCloseTime = officeCloseTime;
	}

	@Override
	public String toString() {
		return "SchoolDetail [schoolDetailId=" + schoolDetailId + ", emailId=" + emailId + ", landlineNo=" + landlineNo
				+ ", MobileNo=" + MobileNo + ", officeOpenTime=" + officeOpenTime + ", officeCloseTime="
				+ officeCloseTime + "]";
	}
	
}
