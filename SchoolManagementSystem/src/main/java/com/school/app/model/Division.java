package com.school.app.model;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Entity
public class Division 
{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(length = 2,updatable = false)
	private int divisionId;
	
	@ManyToMany(mappedBy = "division",fetch = FetchType.EAGER)
	private List<Standard> standard;
	
	@OneToMany(mappedBy = "division")
	private List<Student> student;
	
	@OneToMany(mappedBy = "division")
	private List<ResultFile> resultFile;
	
	@OneToMany(mappedBy = "division")
	private List<Meeting> meeting;
	
	@NotNull
	@Size(max = 10)
	@Column(length = 10,nullable = false)
	private String divisionName;
	

	//default Constructor
	public Division() 
	{
		super();
	}


	public Division(int divisionId, List<Standard> standard, List<Student> student,
			List<ResultFile> resultFile, List<Meeting> meeting, @NotNull @Size(max = 10) String divisionName) {
		super();
		this.divisionId = divisionId;
		this.standard = standard;
		this.student = student;
		this.resultFile = resultFile;
		this.meeting = meeting;
		this.divisionName = divisionName;
	}

	public int getDivisionId() {
		return divisionId;
	}


	public void setDivisionId(int divisionId) {
		this.divisionId = divisionId;
	}


	/*public List<Standard> getStandard() {
		return standard;
	}


	public void setStandard(List<Standard> standard) {
		this.standard = standard;
	}
	
	public List<Student> getStudent() {
		return student;
	}


	public void setStudent(List<Student> student) {
		this.student = student;
	}

	
	public List<ResultFile> getResultFile() {
		return resultFile;
	}


	public void setResultFile(List<ResultFile> resultFile) {
		this.resultFile = resultFile;
	}


	public Meeting getMeeting() {
		return meeting;
	}


	public void setMeeting(Meeting meeting) {
		this.meeting = meeting;
	}*/


	public String getDivisionName() {
		return divisionName;
	}


	public void setDivisionName(String divisionName) {
		this.divisionName = divisionName;
	}


	@Override
	public String toString() {
		return "Division [divisionId=" + divisionId + ", standard=" + standard + ", student=" + student
				+ ", resultFile=" + resultFile + ", meeting=" + meeting + ", divisionName=" + divisionName + "]";
	}
		
}
