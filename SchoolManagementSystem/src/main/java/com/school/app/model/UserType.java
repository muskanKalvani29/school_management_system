package com.school.app.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class UserType {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,generator = "native")
	@GenericGenerator(name="native",strategy = "native")
	@Column(length = 1, columnDefinition = "TinyInt")
	private int usertypeId;

	
	@OneToMany(mappedBy = "usertype")
	private List<Meeting> meeting;
	
	
	@OneToMany(mappedBy = "userType")
	private List<User> user;
	
	@Column(length = 7 ,nullable = false)
	@Size(max = 7)
	@NotNull
	private String userType;
	
	//default Constructor
	public UserType() 
	{
		super();
	}
	
	//Parameterized Constructor
	public UserType(int usertypeId, List<Meeting> meeting, List<User> user, @Size(max = 7) @NotNull String userType) {
		super();
		this.usertypeId = usertypeId;
		this.meeting = meeting;
		this.user = user;
		this.userType = userType;
	}

	public int getUsertypeId() {
		return usertypeId;
	}

	public void setUsertypeId(int usertypeId) {
		this.usertypeId = usertypeId;
	}

	
	
	/*public List<Meeting> getMeeting() {
		return meeting;
	}

	public void setMeeting(List<Meeting> meeting) {
		this.meeting = meeting;
	}
	
	
	public List<User> getUser() {
		return user;
	}

	public void setUser(List<User> user) {
		this.user = user;
	}*/

	public String getUserType() {
		return userType;
	}

	

	public void setUserType(String userType) {
		this.userType = userType;
	}

	@Override
	public String toString() {
		return "UserType [usertypeId=" + usertypeId + ", meeting=" + meeting + ", user=" + user + ", userType="
				+ userType + "]";
	}
}