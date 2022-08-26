package com.school.app.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.hibernate.annotations.GenericGenerator;



@Entity
public class Attendance {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,generator = "native")
	@GenericGenerator(name="native",strategy = "native")
	@Column(updatable = false,length = 5)
	private int attendanceId;
	
	@ManyToOne
	private Student student;
	
	@NotNull
	@Column(length = 2,nullable = false)
	private int totalDays;
	
	@NotNull
	@Column(length = 2,nullable = false)
	private int presentDays;
	
	@NotNull
	@Column(length = 2,nullable = false)
	private int absentDays;
	
	@NotNull
	@Column(length = 10,nullable = false)
	@Size(max = 10)
	private String month;
	
	@NotNull
	@Size(max = 4)
	@Column(length = 4,nullable = false)
	private String year;

	//default Constructor
	public Attendance()
	{
		super();
	}

	//Parameterized Constructor
	public Attendance(int attendanceId, Student student, @NotNull int totalDays, @NotNull int presentDays,
			@NotNull int absentDays, @NotNull @Size(max = 10) String month, @NotNull @Size(max = 4) String year) {
		super();
		this.attendanceId = attendanceId;
		this.student = student;
		this.totalDays = totalDays;
		this.presentDays = presentDays;
		this.absentDays = absentDays;
		this.month = month;
		this.year = year;
	}

	//getters and setters
	public int getAttendanceId() {
		return attendanceId;
	}


	public void setAttendanceId(int attendanceId) {
		this.attendanceId = attendanceId;
	}


	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	public int getTotalDays() {
		return totalDays;
	}

	public void setTotalDays(int totalDays) {
		this.totalDays = totalDays;
	}

	public int getPresentDays() {
		return presentDays;
	}

	public void setPresentDays(int presentDays) {
		this.presentDays = presentDays;
	}

	public int getAbsentDays() {
		return absentDays;
	}

	public void setAbsentDays(int absentDays) {
		this.absentDays = absentDays;
	}

	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	@Override
	public String toString() {
		return "Attendance [attendanceId=" + attendanceId + ", student=" + student + ", totalDays=" + totalDays
				+ ", presentDays=" + presentDays + ", absentDays=" + absentDays + ", month=" + month + ", year=" + year
				+ "]";
	}

	
}