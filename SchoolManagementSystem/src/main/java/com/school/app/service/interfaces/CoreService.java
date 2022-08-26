package com.school.app.service.interfaces;

import org.springframework.http.ResponseEntity;

public interface CoreService 
{
	public ResponseEntity<Object> getAllDivisions();
	
	public ResponseEntity<Object> getAllStandards();
	
	public ResponseEntity<Object> getAllSubjects();

	public ResponseEntity<Object> getAllStandardByTeacher(int id);
	
	public ResponseEntity<Object> getAllSubjectByStandard(String StandardName);
	
	public ResponseEntity<Object> getStandardId(String standard);
	
	public ResponseEntity<Object> getDivisionId(String division);

	public ResponseEntity<Object> saveTeacherStandards(String[] standardNames, String id);

	public ResponseEntity<Object> deleteTeacherStandardsById(int id);

	
	
}
