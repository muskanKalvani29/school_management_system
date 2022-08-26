package com.school.app.model;

import java.util.Calendar;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import com.fasterxml.jackson.annotation.JsonFormat;


@Entity
public class Admin 
{	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,generator = "native")
	@GenericGenerator(name="native",strategy = "native")
	@Column(length = 1,updatable = false , columnDefinition = "TinyInt")
	private int adminId;
	
	@OneToOne
	private User user;
	
	@NotNull
	@Size(max = 6)
	@Column(length = 6,nullable = false)
	private String gender;
	
	@NotNull
	@Size(max = 100)
	@Column(length = 100,nullable = false)
	private String address1;
	
	@NotNull
	@Size(max=100)
	@Column(length = 100,nullable = false)
	private String address2;
	
	@NotNull
	@Column(length = 6,nullable = false)
	private int pincode;
	
	@NotNull
	@Column(nullable = false,columnDefinition = "DATE")
	@CreatedDate
	@JsonFormat(pattern = "MM-dd-yyyy")
	private Calendar joiningDate;
	
	//i have change constraint of below field
	@Size(max = 255)
	@Column(length = 255)
	private String image;
	
	//default Constructor
	public Admin() 
	{
		super();
	}
	
	public Admin(int adminId, User user, @NotNull @Size(max = 6) String gender,
			@NotNull @Size(max = 100) String address1, @NotNull @Size(max = 100) String address2, @NotNull int pincode,
			@NotNull Calendar joiningDate, @Size(max = 255) String image) {
		super();
		this.adminId = adminId;
		this.user = user;
		this.gender = gender;
		this.address1 = address1;
		this.address2 = address2;
		this.pincode = pincode;
		this.joiningDate = joiningDate;
		this.image = image;
	}


	//getters and setters
	
	public int getAdminId() {
		return adminId;
	}

	public void setAdminId(int adminId) {
		this.adminId = adminId;
	}

	public User getUser() {
		return user;
	}
	
	public void setUser(User user) {
		this.user = user;
	}
	
	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
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

	public Calendar getJoiningDate() {
		return joiningDate;
	}

	public void setJoiningDate(Calendar joiningDate) {
		this.joiningDate = joiningDate;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	@Override
	public String toString() {
		return "Admin [adminId=" + adminId + ", gender=" + gender + ", address1=" + address1 + ", address2=" + address2
				+ ", pincode=" + pincode + ", joiningDate=" + joiningDate + ", image=" + image + "]";
	}
}
