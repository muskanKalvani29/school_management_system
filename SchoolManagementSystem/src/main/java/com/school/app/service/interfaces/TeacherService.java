package com.school.app.service.interfaces;

import org.springframework.http.ResponseEntity;
import com.school.app.model.Teacher;
import com.school.app.model.TeacherRequest;

public interface TeacherService
{
	public ResponseEntity<Object> saveTeacher(Teacher teacher);
	
	
	//filetrs
	public ResponseEntity<Object> getAllTeachers();
	
	public ResponseEntity<Object> getAllTeachers(int page);
	
	public ResponseEntity<Object> getTeacherById(int id);
	
	ResponseEntity<Object> getTeacherByName(String name, int page);
	
	public ResponseEntity<Object> deleteTeacherById(int id);
	
	//teacher request
	public ResponseEntity<Object> saveTeacherRequest(TeacherRequest teacherRequest);
	
	public ResponseEntity<Object> getAllTeacherRequests(int page);
	
	public ResponseEntity<Object> deleteTeacherRequestById(int id);
	
	//add this service
	public ResponseEntity<Object> getTeacherRequestById(int id);
	
	public ResponseEntity<Object> getTeacherByUserName(String username);
	
	public ResponseEntity<Object> UpdateTeacherByUserName( String username,Teacher teacher);
}
