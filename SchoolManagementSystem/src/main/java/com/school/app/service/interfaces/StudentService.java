package com.school.app.service.interfaces;

import org.springframework.http.ResponseEntity;
import com.school.app.model.Student;

public interface StudentService 
{
	//filters
	public ResponseEntity<Object> getallStudents();
	
	public ResponseEntity<Object> getStudentByStandardId(String standardName, int page);

	public ResponseEntity<Object> getStrudentByStandardAndDivision(String standardName, int division, int page);
	
	public ResponseEntity<Object> getAllStudentByFeeStatus(int page);
	
	public ResponseEntity<Object> getAllStudents(int page);
	
	public ResponseEntity<Object> getStudentByGrNo(int grNo);
	
	public ResponseEntity<Object> updateStudent(Student student,int grNo);
	
	public ResponseEntity<Object> deleteStudentByGrNo(int grNo);
	
	public ResponseEntity<Object> saveStudent(Student student);
	
	//user side
	public int getStudentBySAndT(int id);
	
	//parent (student info&about me)
	public ResponseEntity<Object> getStudentByParentId(int id);
	
	//change standard and fee status
	public ResponseEntity<Object> updateStudentByStandard(String from_standard,String to_standard);
	
	public ResponseEntity<Object> updateStudentFeeStatus(String status);

	public ResponseEntity<Object> getAllStudentByFeeStatusAndStandard(String StandardName, int page);

	public ResponseEntity<Object> getAllStudentByFeeStatusAndSAndD(String StandardName,int dId,int  page);

	
	
}
