package com.school.app.service.interfaces;

import org.springframework.http.ResponseEntity;
import com.school.app.model.Result;
import com.school.app.model.ResultFile;

public interface ResultService
{		
	//teacher
	public ResponseEntity<Object> saveResult(Result result);
			
	public ResponseEntity<Object> getResultById(int id);
				
	public ResponseEntity<Object> updateResult(Result result,int id);		
		
	public ResponseEntity<Object> delteResultById(int id);
	
	public ResponseEntity<Object> getResultByStudent(int grNo,int page);
	
	//examtype
	public ResponseEntity<Object> getAllExamTypes();
	
	//parent and teacher
	//result file
	public ResponseEntity<Object> getResultFileByStudentAndStandard(int id,int page);
	
	public ResponseEntity<Object> getResultFileById(int id);
	 
	public ResponseEntity<Object> saveResultFile(ResultFile resultfile);
	
	public ResponseEntity<Object> updateResultFile(ResultFile resultfile,int id);
	
	public ResponseEntity<Object> deleteResultFileById(int id);
	
	// for generate pdf
	public ResponseEntity<Object> getResultByStandardAndDivisionAndExamTypeAndYear(String StandardName,int d_id,int e_id,String year);
	
}
