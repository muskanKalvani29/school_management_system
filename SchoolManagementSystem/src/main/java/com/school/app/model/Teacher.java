package com.school.app.model;

import java.util.Calendar;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;


import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Teacher 
{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,generator = "native")
	@GenericGenerator(name="native",strategy = "native")
	@Column(length = 2,updatable = false)
	private int teacherId;
	
	@ManyToMany
	private List<Standard> standard;
	
	@OneToOne
	private User user;
	 
	@NotNull
	@Size(max = 6)
	@Column(length = 6,nullable = false)
	private String gender;
	
	@NotNull
	@Column(nullable = false,columnDefinition = "DATE")
	@CreatedDate
	@JsonFormat(pattern = "MM-dd-yyyy")
	private Calendar joiningDate;
	
	@NotNull
	@Size(max = 40)
	@Column(length = 40,nullable = false)
	private String qualification;
	
	
	@NotNull
	@Size(max = 100)
	@Column(length = 100,nullable = false)
	private String address1;
	
	@NotNull
	@Size(max = 100)
	@Column(length = 100,nullable = false)
	private String address2;
	
	@NotNull
	@Column(length = 6,nullable = false)
	private int pincode;
	
	@Size(max = 255)
	@Column(length = 255)
	private String image;

	//default Constructor
	public Teacher() 
	{
		super();
	}

	//Parameterized Constructor
	public Teacher(int teacherId, List<Standard> standard, User user, @NotNull @Size(max = 6) String gender,
			@NotNull Calendar joiningDate, @NotNull @Size(max = 40) String qualification,
			@NotNull @Size(max = 100) String address1, @NotNull @Size(max = 100) String address2, @NotNull int pincode,
			@Size(max = 255) String image) {
		super();
		this.teacherId = teacherId;
		this.standard = standard;
		this.user = user;
		this.gender = gender;
		this.joiningDate = joiningDate;
		this.qualification = qualification;
		this.address1 = address1;
		this.address2 = address2;
		this.pincode = pincode;
		this.image = image;
	}
	
	//getters and setters

	public int getTeacherId() {
		return teacherId;
	}

	
	public void setTeacherId(int teacherId) {
		this.teacherId = teacherId;
	}

	
	public List<Standard> getStandard() {
		return standard;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	
	public void setStandard(List<Standard> standard) {
		this.standard = standard;
	}


	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Calendar getJoiningDate() {
		return joiningDate;
	}

	public void setJoiningDate(Calendar joiningDate) {
		this.joiningDate = joiningDate;
	}

	public String getQualification() {
		return qualification;
	}

	public void setQualification(String qualification) {
		this.qualification = qualification;
	}


	public String getAddress1() {
		return address1;
	}

	public void setAddress1(String address1) {
		this.address1 = address1;
	}

	public String getAddress2() {
		return address2;
	}

	public void setAddress2(String address2) {
		this.address2 = address2;
	}

	public int getPincode() {
		return pincode;
	}

	public void setPincode(int pincode) {
		this.pincode = pincode;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	@Override
	public String toString() {
		return "Teacher [teacherId=" + teacherId + ", standard=" + standard + ", gender="
				+ gender + ", joiningDate=" + joiningDate + ", qualification=" + qualification  + ", address1=" + address1 + ", address2=" + address2 + ", pincode=" + pincode + ", image="
				+ image + "]";
	}

}
