package com.school.app.model;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class StudyMaterial {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,generator = "native")
	@GenericGenerator(name="native",strategy = "native")
	@Column(updatable = false,length=5)
	private int studymaterialId;
	
	@ManyToOne
	private Standard standard;
	
	@ManyToOne
	private StudyMaterialType studyMaterialType;
	
	@Column(length = 300)
	@Size(max = 300)
	private String description;
	
	@NotNull
	@Column(name = "file", length = 255)
	@Size(max = 255)
	private String studymaterialFile;
	
	@NotNull
	@Column(nullable = false,columnDefinition = "DATE")
	@CreatedDate
	@JsonFormat(pattern = "MM-dd-yyyy")
	private Calendar uploadDate;

	//default Constructor
	public StudyMaterial()
	{
		super();
		// TODO Auto-generated constructor stub
	}

	//Parameterized Constructor
	public StudyMaterial(int studymaterialId, Standard standard, StudyMaterialType studyMaterialType,
			@Size(max = 300) String description, @NotNull @Size(max = 255) String studymaterialFile,
			@NotNull Calendar uploadDate) {
		super();
		this.studymaterialId = studymaterialId;
		this.standard = standard;
		this.studyMaterialType = studyMaterialType;
		this.description = description;
		this.studymaterialFile = studymaterialFile;
		this.uploadDate = uploadDate;
	}


	//getters and setters
	public int getStudymaterialId()
	{
		return studymaterialId;
	}

	public void setStudymaterialId(int studymaterialId)
	{
		this.studymaterialId = studymaterialId;
	}

	public Standard getStandard() 
	{
		return standard;
	}

	public void setStandard(Standard standard)
	{
		this.standard = standard;
	}

	public StudyMaterialType getStudyMaterialType() 
	{
		return studyMaterialType;
	}

	public void setStudyMaterialType(StudyMaterialType studyMaterialType)
	{
		this.studyMaterialType = studyMaterialType;
	}

	public String getDescription()
	{
		return description;
	}

	public void setDescription(String description) 
	{
		this.description = description;
	}

	public String getStudymaterialFile() 
	{
		return studymaterialFile;
	}

	public void setStudymaterialFile(String studymaterialFile)
	{
		this.studymaterialFile = studymaterialFile;
	}

	public Calendar getUploadDate() {
		return uploadDate;
	}

	public void setUploadDate(Calendar uploadDate) {
		this.uploadDate = uploadDate;
	}

	@Override
	public String toString() {
		return "StudyMaterial [studymaterialId=" + studymaterialId + ", standard=" + standard + ", studyMaterialType="
				+ studyMaterialType + ", description=" + description + ", studymaterialFile=" + studymaterialFile
				+ ", uploadDate=" + uploadDate + "]";
	}

}
