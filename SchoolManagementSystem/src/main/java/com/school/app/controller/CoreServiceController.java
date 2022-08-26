package com.school.app.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.school.app.service.interfaces.CoreService;
@RestController
@RequestMapping("/sms")
@CrossOrigin(origins = "http://localhost:4200")

public class CoreServiceController
{
	@Autowired
	private CoreService coreservice;
	
	@GetMapping("/divisions")
	public ResponseEntity<Object> getDivisionList()
	{
		
		return coreservice.getAllDivisions();
	}
	
	@GetMapping("/standards")
	public ResponseEntity<Object> getStandardList()
	{
		return coreservice.getAllStandards();
	}
	
	@GetMapping("/subjects")
	public ResponseEntity<Object> getSubjectList()
	{
		return coreservice.getAllSubjects();
	}
	
	@GetMapping("/standard-teacher/{id}")
	public ResponseEntity<Object> getStandardListByTeacher(@PathVariable int id)
	{
		return coreservice.getAllStandardByTeacher(id);
	}
	
	//subject by standard
	@GetMapping("/subject-standard")
	public ResponseEntity<Object> getSubjectByStandard(@RequestParam("sname")String StandardName)
	{
		return coreservice.getAllSubjectByStandard(StandardName);
	}
	
	@GetMapping("/standard")
	public ResponseEntity<Object> getStandardId(@RequestParam("standard") String standard)
	{
		return coreservice.getStandardId(standard);
	}
	
	@GetMapping("/division")
	public ResponseEntity<Object> getDivisionId(@RequestParam("division") String division)
	{
		return coreservice.getDivisionId(division);
	}
	
	@PostMapping("/teacher-standards")
	public ResponseEntity<Object> addTeacherStandards(@RequestHeader("standardNames")String[] standardNames,@RequestHeader("teacherId")String id)
	{
		return coreservice.saveTeacherStandards(standardNames,id);
	}
	
	@DeleteMapping("/teacher-standard")
	public ResponseEntity<Object> deleteTeacherStandards(@RequestParam("teacherId")int id)
	{
		return coreservice.deleteTeacherStandardsById(id);
	}
	
}
