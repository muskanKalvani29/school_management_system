package com.school.app.model;

import java.util.Calendar;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Activity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,generator = "native")
	@GenericGenerator(name="native",strategy = "native")
	@Column(updatable = false,length = 5)
	private int activityId;
	
	@ManyToOne
	private Student student;
	
	@NotNull
	@Size(max = 60)
	@Column(length = 60,nullable = false)
	private String activityName;
	
	@Size(max=100)
	@Column(length = 100)
	private String achievementName;
	
	@Size(max=300)
	@Column(length = 300)
	private String achievementDescription;
	
	@NotNull
	@Column(nullable = false,columnDefinition = "DATE")
	@CreatedDate
	@JsonFormat(pattern = "MM-dd-yyyy")
	private Calendar uploadDate;

	//default Constructor
	public Activity() 
	{
		super();
		// TODO Auto-generated constructor stub
	}

	//Parameterized Constructor
	public Activity(int activityId, Student student, @NotNull @Size(max = 60) String activityName,
			 @Size(max = 100) String achievementName, @Size(max = 300) String achievementDescription,
			@NotNull Calendar uploadDate) {
		super();
		this.activityId = activityId;
		this.student = student;
		this.activityName = activityName;
		this.achievementName = achievementName;
		this.achievementDescription = achievementDescription;
		this.uploadDate = uploadDate;
	}
	
	//getters and setters
	public int getActivityId() 
	{
		return activityId;
	}

	
	public void setActivityId(int activityId) 
	{
		this.activityId = activityId;
	}

	public Student getStudent() 
	{
		return student;
	}

	public void setStudent(Student student)
	{
		this.student = student;
	}

	public String getActivityName()
	{
		return activityName;
	}

	public void setActivityName(String activityName)
	{
		this.activityName = activityName;
	}

	public String getAchievementName() 
	{
		return achievementName;
	}

	public void setAchievementName(String achievementName)
	{
		this.achievementName = achievementName;
	}

	public String getAchievementDescription()
	{
		return achievementDescription;
	}

	public void setAchievementDescription(String achievementDescription)
	{
		this.achievementDescription = achievementDescription;
	}
	

	public Calendar getUploadDate() {
		return uploadDate;
	}

	public void setUploadDate(Calendar uploadDate) {
		this.uploadDate = uploadDate;
	}

	@Override
	public String toString() {
		return "Activity [activityId=" + activityId + ", student=" + student + ", activityName=" + activityName
				+ ", achievementName=" + achievementName + ", achievementDescription=" + achievementDescription
				+ ", uploadDate=" + uploadDate + "]";
	}

}
