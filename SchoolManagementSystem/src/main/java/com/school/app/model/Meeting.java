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
public class Meeting {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,generator = "native")
	@GenericGenerator(name="native",strategy = "native")
	@Column(updatable = false,length = 4)
	private int meetingId;
	
	@ManyToOne
	private UserType usertype;
	
	@ManyToOne
	private Standard standard;
	
	@ManyToOne
	private Division division;
	
	@NotNull
	@Column(length = 60,nullable = false)
	@Size(max = 60)
	private String meetingName;
	
	@NotNull
	@Column(nullable = false,columnDefinition = "DATE")
	@CreatedDate
	@JsonFormat(pattern ="MM-dd-yyyy")
	private Calendar meetingDate;
	
	@NotNull()
	@Column(nullable = false,columnDefinition = "TIME")
	@JsonFormat(pattern = "HH:mm:ss")
	private Calendar meetingStartTime;
	
	@NotNull
	@Column(nullable = false,columnDefinition = "TIME")
	@JsonFormat(pattern = "HH:mm:ss")
	private Calendar meetingEndTime;
	
	@Column(length = 300)
	@Size(max = 300)
	private String meetingDescription;

	//default Constructor
	public Meeting() 
	{
		super();
	}

	//Parameterized Constructor
	public Meeting(int meetingId, UserType usertype, Standard standard, Division division,
			@NotNull @Size(max = 60) String meetingName, @NotNull Calendar meetingDate,
			@NotNull Calendar meetingStartTime, @NotNull Calendar meetingEndTime,
			@Size(max = 300) String meetingDescription) {
		super();
		this.meetingId = meetingId;
		this.usertype = usertype;
		this.standard = standard;
		this.division = division;
		this.meetingName = meetingName;
		this.meetingDate = meetingDate;
		this.meetingStartTime = meetingStartTime;
		this.meetingEndTime = meetingEndTime;
		this.meetingDescription = meetingDescription;
	}

	public int getMeetingId() {
		return meetingId;
	}

	public void setMeetingId(int meetingId) {
		this.meetingId = meetingId;
	}

	public UserType getUsertype() {
		return usertype;
	}

	public void setUsertype(UserType usertype) {
		this.usertype = usertype;
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

	public String getMeetingName() {
		return meetingName;
	}

	public void setMeetingName(String meetingName) {
		this.meetingName = meetingName;
	}

	public Calendar getMeetingDate() {
		return meetingDate;
	}

	public void setMeetingDate(Calendar meetingDate) {
		this.meetingDate = meetingDate;
	}

	public Calendar getMeetingStartTime() {
		return meetingStartTime;
	}

	public void setMeetingStartTime(Calendar meetingStartTime) {
		this.meetingStartTime = meetingStartTime;
	}

	public Calendar getMeetingEndTime() {
		return meetingEndTime;
	}

	public void setMeetingEndTime(Calendar meetingEndTime) {
		this.meetingEndTime = meetingEndTime;
	}

	public String getMeetingDescription() {
		return meetingDescription;
	}

	public void setMeetingDescription(String meetingDescription) {
		this.meetingDescription = meetingDescription;
	}

	@Override
	public String toString() {
		return "Meeting [meetingId=" + meetingId + ", usertype=" + usertype + ", standard=" + standard + ", division="
				+ division + ", meetingName=" + meetingName + ", meetingDate=" + meetingDate + ", meetingStartTime="
				+ meetingStartTime + ", meetingEndTime=" + meetingEndTime + ", meetingDescription=" + meetingDescription
				+ "]";
	}
}
