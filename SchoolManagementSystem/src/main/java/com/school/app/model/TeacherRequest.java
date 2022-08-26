package com.school.app.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.hibernate.annotations.GenericGenerator;

@Entity
public class TeacherRequest 
{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,generator = "native")
	@GenericGenerator(name="native",strategy = "native")
	@Column(length = 10,updatable = false)
	private int TeacherRequestId;
	
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
	
	@NotNull
	@Size(max = 20)
	@Column(length = 20,unique = true,nullable = false)
	private String userName;
	
	@NotNull
	//@Size(min = 8,max = 30)
	@Column(length = 100,nullable = false)
	private String password;
	
	public TeacherRequest() {
		super();
	}

	public TeacherRequest(int teacherRequestId, @NotNull @Size(max = 50) String name,
			@NotNull @Size(max = 10) String contactNo1, @NotNull @Size(max = 40) String emailId,
			@NotNull @Size(max = 20) String userName, @NotNull String password) {
		super();
		TeacherRequestId = teacherRequestId;
		this.name = name;
		this.contactNo1 = contactNo1;
		this.emailId = emailId;
		this.userName = userName;
		this.password = password;
	}

	public int getTeacherRequestId() {
		return TeacherRequestId;
	}

	public void setTeacherRequestId(int teacherRequestId) {
		TeacherRequestId = teacherRequestId;
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

	@Override
	public String toString() {
		return "TeacherRequest [TeacherRequestId=" + TeacherRequestId + ", name=" + name + ", contactNo1=" + contactNo1
				+ ", emailId=" + emailId + ", userName=" + userName + ", password=" + password + "]";
	}
}
