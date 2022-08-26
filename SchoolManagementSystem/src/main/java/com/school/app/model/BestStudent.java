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
public class BestStudent 
{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,generator = "native")
	@GenericGenerator(name="native",strategy = "native")
	@Column(length = 3,updatable = false)
	private int bestStudentId;
	
	@NotNull
	@Size(max = 8)
	@Column(length = 8,nullable = false)
	private String medium;
	
	@NotNull
	@Size(max = 50)
	@Column(length = 50,nullable = false)
	private String name;
	
	@NotNull
	@Size(max = 15)
	@Column(length = 15,nullable = false)
	private String standardName;
	
	@NotNull
	@Size(max = 10)
	@Column(length = 10,nullable = false)
	private String divisionName;
	
	@Size(max = 255)
	@Column(length = 255)
	private String image;
	
	@NotNull
	@Column(nullable = false,columnDefinition = "DATE")
	@CreatedDate
	@JsonFormat(pattern = "MM-dd-yyyy")
	private Calendar uploadDate;

	public BestStudent() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public BestStudent(int bestStudentId, @NotNull @Size(max = 8) String medium, @NotNull @Size(max = 50) String name,
			@NotNull @Size(max = 15) String standardName, @NotNull @Size(max = 10) String divisionName,
			@Size(max = 255) String image, @NotNull Calendar uploadDate) {
		super();
		this.bestStudentId = bestStudentId;
		this.medium = medium;
		this.name = name;
		this.standardName = standardName;
		this.divisionName = divisionName;
		this.image = image;
		this.uploadDate = uploadDate;
	}

	public int getBestStudentId() {
		return bestStudentId;
	}

	public void setBestStudentId(int bestStudentId) {
		this.bestStudentId = bestStudentId;
	}

	public String getMedium() {
		return medium;
	}

	public void setMedium(String medium) {
		this.medium = medium;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getStandardName() {
		return standardName;
	}

	public void setStandardName(String standardName) {
		this.standardName = standardName;
	}

	public String getDivisionName() {
		return divisionName;
	}

	public void setDivisionName(String divisionName) {
		this.divisionName = divisionName;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Calendar getUploadDate() {
		return uploadDate;
	}

	public void setUploadDate(Calendar uploadDate) {
		this.uploadDate = uploadDate;
	}

	@Override
	public String toString() {
		return "BestStudent [bestStudentId=" + bestStudentId + ", medium=" + medium + ", name=" + name
				+ ", standardName=" + standardName + ", divisionName=" + divisionName + ", image=" + image
				+ ", uploadDate=" + uploadDate + "]";
	}
	
}
