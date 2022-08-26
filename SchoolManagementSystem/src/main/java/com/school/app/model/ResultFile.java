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
public class ResultFile 
{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,generator = "native")
	@GenericGenerator(name="native",strategy = "native")
	@Column(length = 5,updatable = false)
	private int resultFileId;
	
	@ManyToOne
	private Division division;
	
	@ManyToOne
	private Standard standard;
	
	@ManyToOne
	private ExamType examType;
	
	@NotNull
	@Column(nullable = false,columnDefinition = "DATE")
	@CreatedDate
	@JsonFormat(pattern = "MM-dd-yyyy")
	private Calendar uploadDate;
	
	@NotNull 
	@Size(max = 300)
	@Column(length = 300, nullable = false)
	private String description;
	
	@NotNull
	@Size(max = 255)
	@Column(length = 255,nullable = false)
	private String resultFile;

	public ResultFile() 
	{
		super();
	}

	
	public ResultFile(int resultFileId, Division division, Standard standard, ExamType examType,
			@NotNull Calendar uploadDate, @NotNull @Size(max = 300) String description,
			@NotNull @Size(max = 255) String resultFile) {
		super();
		this.resultFileId = resultFileId;
		this.division = division;
		this.standard = standard;
		this.examType = examType;
		this.uploadDate = uploadDate;
		this.description = description;
		this.resultFile = resultFile;
	}

	public int getResultFileId() {
		return resultFileId;
	}


	public void setResultFileId(int resultFileId) {
		this.resultFileId = resultFileId;
	}


	public Calendar getUploadDate() {
		return uploadDate;
	}


	public void setUploadDate(Calendar uploadDate) {
		this.uploadDate = uploadDate;
	}


	public Division getDivision() {
		return division;
	}

	public void setDivision(Division division) {
		this.division = division;
	}

	public Standard getStandard() {
		return standard;
	}

	public void setStandard(Standard standard) {
		this.standard = standard;
	}

	public ExamType getExamType() {
		return examType;
	}

	public void setExamType(ExamType examType) {
		this.examType = examType;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getResultFile() {
		return resultFile;
	}

	public void setResultFile(String resultFile) {
		this.resultFile = resultFile;
	}
	
	@Override
	public String toString() {
		return "ResultFile [resultFileId=" + resultFileId + ", division=" + division + ", standard=" + standard
				+ ", examType=" + examType + ", uploadDate=" + uploadDate + ", description=" + description
				+ ", resultFile=" + resultFile + "]";
	}
}
