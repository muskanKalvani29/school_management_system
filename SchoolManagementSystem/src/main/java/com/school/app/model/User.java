package com.school.app.model;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;



@Entity
//use for making unique column named user name
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"userName"}))
public class User 
{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,generator = "native")
	@GenericGenerator(name="native",strategy = "native")
	@Column(length = 10,updatable = false)
	private int userId;
	
	@ManyToOne
	private UserType userType;
	
	@OneToOne(mappedBy = "user")
	private Parent parent;
	
	@OneToOne(mappedBy = "user")
	private Admin admin;
	
	@OneToOne(mappedBy = "user")
	private Teacher teacher;
	
	@NotNull
	@Size(max = 20)
	@Column(length = 20,unique = true,nullable = false)
	private String userName;
	
	@NotNull
	//@Size(min = 8,max = 30)
	@Column(length = 100,nullable = false)
	private String password;
	
	@NotNull
	@Size(max = 50)
	@Column(length = 50,nullable = false)
	private String name;
	
	@NotNull
	@Size(max = 10)
	@Column(length = 10,nullable = false)
	private String contactNo1;
	
	@NotNull
	@Column(length = 40,nullable = false)
	@Size(max = 40)
	private String emailId;

	
	@Column(length = 10)
	private String userOTP;
	
	
	
	//default Constructor
	public User() 
	{
		super();
	}
	
	public User(int userId, UserType userType, Parent parent, Admin admin, Teacher teacher,
			@NotNull @Size(max = 20) String userName, @NotNull String password, @NotNull @Size(max = 50) String name,
			@NotNull @Size(max = 10) String contactNo1, @NotNull @Size(max = 40) String emailId, String userOTP
			) {
		super();
		this.userId = userId;
		this.userType = userType;
		this.parent = parent;
		this.admin = admin;
		this.teacher = teacher;
		this.userName = userName;
		this.password = password;
		this.name = name;
		this.contactNo1 = contactNo1;
		this.emailId = emailId;
		this.userOTP = userOTP;
		
	}



	/*public Parent getParent() {
		return parent;
	}

	public void setParent(Parent parent) {
		this.parent = parent;
	}

	public Admin getAdmin() {
		return admin;
	}


	public void setAdmin(Admin admin) {
		this.admin = admin;
	}

	public Teacher getTeacher() {
		return teacher;
	}
	
	public void setTeacher(Teacher teacher) {
		this.teacher = teacher;
	}*/


	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public UserType getUserType() {
		return userType;
	}

	public void setUserType(UserType userType) {
		this.userType = userType;
	}
	
	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getContactNo1() {
		return contactNo1;
	}

	public void setContactNo1(String contactNo1) {
		this.contactNo1 = contactNo1;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getUserOTP() {
		return userOTP;
	}
	
	public void setUserOTP(String userOTP) {
		this.userOTP = userOTP;
	}

	

	@Override
	public String toString() {
		return "User [userId=" + userId + ", userType=" + userType + ", parent=" + parent + ", admin=" + admin
				+ ", teacher=" + teacher + ", userName=" + userName + ", password=" + password + ", name=" + name
				+ ", contactNo1=" + contactNo1 + ", emailId=" + emailId + ", userOTP=" + userOTP 
				 + "]";
	}
}
