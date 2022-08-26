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
public class StudyMaterialType {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,generator = "native")
	@GenericGenerator(name="native",strategy = "native")
	@Column(updatable = false,length = 1)
	private int studymaterialTypeId;
	
	@NotNull
	@Column(length = 30,nullable = false)
	@Size(max = 30)
	private String studymaterialType;
	
	@OneToMany(mappedBy = "studyMaterialType")
	private List<StudyMaterial> studyMaterial;

	//default Constructor
	public StudyMaterialType()
	{
		super();
		// TODO Auto-generated constructor stub
	}

	//Parameterized Constructor
	public StudyMaterialType(int studymaterialTypeId, @NotNull @Size(max = 15) String studymaterialType,
			List<StudyMaterial> studyMaterial) 
	{
		super();
		this.studymaterialTypeId = studymaterialTypeId;
		this.studymaterialType = studymaterialType;
		this.studyMaterial = studyMaterial;
	}

	//getters and setters
	public int getStudymaterialTypeId()
	{
		return studymaterialTypeId;
	}

	public void setStudymaterialTypeId(int studymaterialTypeId) 
	{
		this.studymaterialTypeId = studymaterialTypeId;
	}

	public String getStudymaterialType() 
	{
		return studymaterialType;
	}

	public void setStudymaterialType(String studymaterialType)
	{
		this.studymaterialType = studymaterialType;
	}

	/*public List<StudyMaterial> getStudyMaterial()
	{
		return studyMaterial;
	}

	public void setStudyMaterial(List<StudyMaterial> studyMaterial) 
	{
		this.studyMaterial = studyMaterial;
	}*/


	@Override
	public String toString() {
		return "StudyMaterialType [studymaterialTypeId=" + studymaterialTypeId + ", studymaterialType="
				+ studymaterialType + ", studyMaterial=" + studyMaterial + "]";
	}
	
}
