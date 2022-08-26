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
public class TimeTable {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,generator = "native")
	@GenericGenerator(name="native",strategy = "native")
	@Column(updatable = false,length = 3)
	private int timetableId; 
	
	@ManyToOne
	private Standard standard;
	
	@ManyToOne
	private Division division;
	
	@NotNull
	@Size(max = 255)
	@Column(name = "file",length = 255 ,nullable = false)
	private String timetableFile;
	
	@NotNull
	@Column(length = 60 ,nullable = false)
	private String name;
	
	@NotNull
	@Column(nullable = false,columnDefinition = "DATE")
	@CreatedDate
	@JsonFormat(pattern = "MM-dd-yyyy")
	private Calendar uploadDate;

	//default Constructor
	public TimeTable()
	{
		super();
	}

	//Parameterized Constructor
	public TimeTable(int timetableId, Standard standard, Division division,
			@NotNull @Size(max = 255) String timetableFile, @NotNull String name, @NotNull Calendar uploadDate) {
		super();
		this.timetableId = timetableId;
		this.standard = standard;
		this.division = division;
		this.timetableFile = timetableFile;
		this.name = name;
		this.uploadDate = uploadDate;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getTimetableId() {
		return timetableId;
	}


	public void setTimetableId(int timetableId) {
		this.timetableId = timetableId;
	}

	public Standard getStandard() {
		return standard;
	}

	public void setStandard(Standard standard) {
		this.standard = standard;
	}

	public Division getDivision() {
		return division;
	}

	public void setDivision(Division division) {
		this.division = division;
	}

	public String getTimetableFile() {
		return timetableFile;
	}

	public void setTimetableFile(String timetableFile) {
		this.timetableFile = timetableFile;
	}
	
	public Calendar getUploadDate() {
		return uploadDate;
	}

	public void setUploadDate(Calendar uploadDate) {
		this.uploadDate = uploadDate;
	}

	@Override
	public String toString() {
		return "TimeTable [timetableId=" + timetableId + ", standard=" + standard + ", division=" + division
				+ ", timetableFile=" + timetableFile + ", name=" + name + ", uploadDate=" + uploadDate + "]";
	}

	
}
