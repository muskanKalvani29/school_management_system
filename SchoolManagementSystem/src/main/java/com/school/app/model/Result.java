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
public class Result 
{
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,generator = "native")
	@GenericGenerator(name="native",strategy = "native")
	@Column(length = 5,updatable = false)
	private int resultId;
	
	@ManyToOne
	private Student student;
	
	@ManyToOne
	private ExamType examType;
	
	@NotNull
	@Size(max = 4)
	@Column(length = 4,nullable = false)
	private String year;

	@Column(length = 3)
	private Integer gujarati;
	
	@Column(length = 3)
	private Integer english;
	
	@Column(length = 3)
	private Integer environment;
	
	@Column(length = 3)
	private Integer science;
	
	@Column(length = 3)
	private Integer socialscience;
	
	@Column(length = 3)
	private Integer maths;
	
	@Column(length = 3)
	private Integer hindi;
	
	@Column(length = 3)
	private Integer sanskrit;
	
	@Column(length = 3)
	private Integer pt;
	
	@Column(length = 3)
	private Integer drawing;
	
	@Column(length = 3)
	private Integer pathmala;
	
	@NotNull
	@Column(length = 3,nullable = false)
	private int obtainedMarks;
	
	@NotNull
	@Column(length = 2,nullable = false)
	private int passingmMarks;
	
	@NotNull
	@Column(length = 3,nullable = false)
	private int totalMarks;
	
	@NotNull
	@Size(max = 2)
	@Column(length = 2,nullable = false)
	private String grade;

	//default Constructor
	public Result() 
	{
		super();
	}

	//Parameterized Constructor
	public Result(int resultId, Student student, ExamType examType,
			@NotNull @Size(max = 4) String year, Integer gujarati, Integer english, Integer environment,
			Integer science, Integer socialscience, Integer maths, Integer hindi, Integer sanskrit, Integer pt,
			Integer drawing, Integer pathmala, @NotNull int obtainedMarks, @NotNull int passingmMarks,
			@NotNull int totalMarks, @NotNull @Size(max = 2) String grade) {
		super();
		this.resultId = resultId;
		this.student = student;
		this.examType = examType;
		this.year = year;
		this.gujarati = gujarati;
		this.english = english;
		this.environment = environment;
		this.science = science;
		this.socialscience = socialscience;
		this.maths = maths;
		this.hindi = hindi;
		this.sanskrit = sanskrit;
		this.pt = pt;
		this.drawing = drawing;
		this.pathmala = pathmala;
		this.obtainedMarks = obtainedMarks;
		this.passingmMarks = passingmMarks;
		this.totalMarks = totalMarks;
		this.grade = grade;
	}
	
	public int getResultId() {
		return resultId;
	}


	public void setResultId(int resultId) {
		this.resultId = resultId;
	}

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	public ExamType getExamType() {
		return examType;
	}

	public void setExamType(ExamType examType) {
		this.examType = examType;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public Integer getGujarati() {
		return gujarati;
	}

	public void setGujarati(Integer gujarati) {
		this.gujarati = gujarati;
	}

	public Integer getEnglish() {
		return english;
	}

	public void setEnglish(Integer english) {
		this.english = english;
	}

	public Integer getEnvironment() {
		return environment;
	}

	public void setEnvironment(Integer environment) {
		this.environment = environment;
	}

	public Integer getScience() {
		return science;
	}

	public void setScience(Integer science) {
		this.science = science;
	}

	public Integer getSocialscience() {
		return socialscience;
	}

	public void setSocialscience(Integer socialscience) {
		this.socialscience = socialscience;
	}

	public Integer getMaths() {
		return maths;
	}

	public void setMaths(Integer maths) {
		this.maths = maths;
	}

	public Integer getHindi() {
		return hindi;
	}

	public void setHindi(Integer hindi) {
		this.hindi = hindi;
	}

	public Integer getSanskrit() {
		return sanskrit;
	}

	public void setSanskrit(Integer sanskrit) {
		this.sanskrit = sanskrit;
	}

	public Integer getPt() {
		return pt;
	}

	public void setPt(Integer pt) {
		this.pt = pt;
	}

	public Integer getDrawing() {
		return drawing;
	}

	public void setDrawing(Integer drawing) {
		this.drawing = drawing;
	}

	public Integer getPathmala() {
		return pathmala;
	}

	public void setPathmala(Integer pathmala) {
		this.pathmala = pathmala;
	}

	public int getObtainedMarks() {
		return obtainedMarks;
	}

	public void setObtainedMarks(int obtainedMarks) {
		this.obtainedMarks = obtainedMarks;
	}

	public int getPassingmMarks() {
		return passingmMarks;
	}

	public void setPassingmMarks(int passingmMarks) {
		this.passingmMarks = passingmMarks;
	}

	public int getTotalMarks() {
		return totalMarks;
	}

	public void setTotalMarks(int totalMarks) {
		this.totalMarks = totalMarks;
	}

	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	@Override
	public String toString() {
		return "Result [resultId=" + resultId + ", student=" + student + ", examType=" + examType + ", year=" + year
				+ ", gujarati=" + gujarati + ", english=" + english + ", environment=" + environment + ", science="
				+ science + ", socialscience=" + socialscience + ", maths=" + maths + ", hindi=" + hindi + ", sanskrit="
				+ sanskrit + ", pt=" + pt + ", drawing=" + drawing + ", pathmala=" + pathmala + ", obtainedMarks="
				+ obtainedMarks + ", passingmMarks=" + passingmMarks + ", totalMarks=" + totalMarks + ", grade=" + grade
				+ "]";
	}

}