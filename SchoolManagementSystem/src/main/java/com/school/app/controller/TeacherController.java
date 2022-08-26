package com.school.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.school.app.model.Teacher;
import com.school.app.model.TeacherRequest;
import com.school.app.service.interfaces.TeacherService;

@RestController
@RequestMapping("/sms")
@CrossOrigin(origins = "http://localhost:4200")
public class TeacherController
{
	@Autowired
	private TeacherService teacherservice;
	
	//ni call thy
	@PostMapping("/teacher")
	public ResponseEntity<Object> addTeacher(@RequestBody Teacher teacher)
	{
			return teacherservice.saveTeacher(teacher);
	}

	//filters
	@GetMapping("/count-teachers")
	public ResponseEntity<Object> getTeacherList()
	{
		return teacherservice.getAllTeachers();
	}
		
	@GetMapping("/teacher-requests")
	public ResponseEntity<Object> getTeacherRequestList(@RequestParam("page") int page)
	{
		return teacherservice.getAllTeacherRequests(page);
	}
	
	@DeleteMapping("/teacher-request/{id}")
	public ResponseEntity<Object> deleteTeacherRequestById(@PathVariable int id)
	{
		return teacherservice.deleteTeacherRequestById(id);
	}
	
	//teacher
	@GetMapping("/teachers")
	public ResponseEntity<Object> getTeacherList(@RequestParam("page") int page)
	{
		return teacherservice.getAllTeachers(page);
	}
	
	@GetMapping("/teacher/{id}")
	public ResponseEntity<Object> getTeacher(@PathVariable int id)
	{
		return teacherservice.getTeacherById(id);
	}
	
	@DeleteMapping("/teacher/{id}")
	public ResponseEntity<Object> deleteTeacher(@PathVariable int id)
	{
		return teacherservice.deleteTeacherById(id);
	}
	
	@GetMapping("/teacher-name")
	public ResponseEntity<Object> getTeacherByName(@RequestParam("name") String name,@RequestParam("page")int page)
	{
		return teacherservice.getTeacherByName(name, page);
	}
	
	//user side(teacher)
	//teacher request
	@PostMapping("/teacher-request")
	public ResponseEntity<Object> addTeacherRequest(@RequestBody TeacherRequest teacherRequest)
	{
		return teacherservice.saveTeacherRequest(teacherRequest);
	}
	
	@PutMapping("/update-teacher-profile")
	public ResponseEntity<Object> updateTeacherByUserName (@RequestParam("username") String username,@RequestBody Teacher teacher)
	{
		return teacherservice.UpdateTeacherByUserName(username,teacher);
	}
	
	//filters
	@GetMapping("/aboutMe-teacher")
	public ResponseEntity<Object> getTeacherByUserName(@RequestParam("username") String username)
	{
		return teacherservice.getTeacherByUserName(username);
	}
	
	// add this 
	@GetMapping("teacher-request/{id}")
	public ResponseEntity<Object> getTeacherRequest(@PathVariable int id)
	{
		return teacherservice.getTeacherRequestById(id);
	}
}
