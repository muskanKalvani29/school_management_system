package com.school.app.service.interfaces;

import org.springframework.http.ResponseEntity;
import com.school.app.model.StudyMaterial;

public interface StudyMaterialService 
{
	//studymatrialType
	
	public  ResponseEntity<Object> saveStudyMaterial(StudyMaterial studyMaterial);
	
	public 	ResponseEntity<Object> getAllStudyMaterials(int page);
	
	public  ResponseEntity<Object> getStudyMaterialById(int id);
	
 	public  ResponseEntity<Object> updateStudyMaterial(StudyMaterial studyMaterial,int id);
 	
 	public 	ResponseEntity<Object> deleteStudyMaterialById(int id);
 	
 	//StudyMaterialType
 	public 	ResponseEntity<Object> getAllStudyMaterialTypes();
 	
 	//userside
 	public int getStudyMaterialBySAndT(int id);
 	
 	public ResponseEntity<Object> getAllStudyMaterialsByStandard(String StandardName,int page);
 	
 	//student-document
 	public ResponseEntity<Object> getStudyMaterialByParent(int id,int page);
 	 	
}
