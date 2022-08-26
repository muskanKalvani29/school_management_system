package com.school.app.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.GenericGenerator;


@Entity
public class Parent 
{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,generator = "native")
	@GenericGenerator(name="native",strategy = "native")
	@Column(length = 4 , updatable = false)
	private int parentId;
	
	@OneToOne
	private Student student;
	
	@OneToOne 
	private User user;
	
	@OneToMany(mappedBy = "parent",cascade = CascadeType.ALL)
	private List<Query> query;
	
	@Size(max = 10)
	@Column(length = 10)
	private String contactNo2;
	
	@NotNull
	@Size(max = 20)
	@Column(length = 20,nullable = false)
	private String qualification;
	
	@NotNull
	@Size(max = 15)
	@Column(length = 15,nullable = false)
	private String occupation;
	
	//default Constructor
	public Parent() 
	{
		super();
	}

	//Parameterized Constructor
	public Parent(int parentId, Student student, User user, List<Query> query, @Size(max = 10) String contactNo2,
			@NotNull @Size(max = 20) String qualification, @NotNull @Size(max = 15) String occupation) {
		super();
		this.parentId = parentId;
		this.student = student;
		this.user = user;
		this.query = query;
		this.contactNo2 = contactNo2;
		this.qualification = qualification;
		this.occupation = occupation;
	}
	
	//getters and setters
	public int getParentId() {
		return parentId;
	}

	public void setParentId(int parentId) {
		this.parentId = parentId;
	}

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	/*public List<Query> getQuery() {
		return query;
	}

	public void setQuery(List<Query> query) {
		this.query = query;
	}*/
	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	public String getContactNo2() {
		return contactNo2;
	}

	public void setContactNo2(String contactNo2) {
		this.contactNo2 = contactNo2;
	}

	public String getQualification() {
		return qualification;
	}

	public void setQualification(String qualification) {
		this.qualification = qualification;
	}

	public String getOccupation() {
		return occupation;
	}

	public void setOccupation(String occupation) {
		this.occupation = occupation;
	}

	@Override
	public String toString() {
		return "Parent [parentId=" + parentId + ", student=" + student + ", query=" + query + ", contactNo2="
				+ contactNo2 + ", qualification=" + qualification + ", occupation=" + occupation + "]";
	}
	
}
