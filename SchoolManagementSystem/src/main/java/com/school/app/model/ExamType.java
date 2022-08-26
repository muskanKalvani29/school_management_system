package com.school.app.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.GenericGenerator;


@Entity
public class ExamType {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,generator = "native")
	@GenericGenerator(name="native",strategy = "native")
	@Column(updatable = false,length = 1 , columnDefinition = "TinyInt")
	private int examtypeId;
	
	@OneToMany(mappedBy = "examType")
	private List<Result> result;
	
	@OneToMany(mappedBy = "examType")
	private List<ResultFile> resultFile;
	
	@NotNull
	@Column(length = 15,nullable = false)
	@Size(max = 15)
	private String examtypeName;
	

	//default Constructor
	public ExamType() 
	{
		super();
	}

	public ExamType(int examtypeId, List<Result> result, List<ResultFile> resultFile,
			@NotNull @Size(max = 15) String examtypeName) {
		super();
		this.examtypeId = examtypeId;
		this.result = result;
		this.resultFile = resultFile;
		this.examtypeName = examtypeName;
		
	}

	public int getExamtypeId() {
		return examtypeId;
	}

	public void setExamtypeId(int examtypeId) {
		this.examtypeId = examtypeId;
	}

	/*public List<Result> getResult() {
		return result;
	}

	public void setResult(List<Result> result) {
		this.result = result;
	}

	public List<ResultFile> getResultFile() {
		return resultFile;
	}

	public void setResultFile(List<ResultFile> resultFile) {
		this.resultFile = resultFile;
	}*/

	public String getExamtypeName() {
		return examtypeName;
	}

	public void setExamtypeName(String examtypeName) {
		this.examtypeName = examtypeName;
	}


	@Override
	public String toString() {
		return "ExamType [examtypeId=" + examtypeId + ", result=" + result + ", resultFile=" + resultFile
				+ ", examtypeName=" + examtypeName + "]";
	}

}
