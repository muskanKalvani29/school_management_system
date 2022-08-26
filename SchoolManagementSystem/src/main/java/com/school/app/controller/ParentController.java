package com.school.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.school.app.model.Parent;
import com.school.app.service.interfaces.ParentService;

@RestController
@RequestMapping("/sms")
@CrossOrigin(origins = "http://localhost:4200")

public class ParentController
{
	@Autowired
	private ParentService parentservice;
	
	//filters
	@GetMapping("/count-parents")
	public ResponseEntity<Object> getParentList()
	{
		return parentservice.getAllParents();
	}
	
	@GetMapping("/parents")
	public ResponseEntity<Object> getParentList(@RequestParam("page") int page)
	{
		return parentservice.getAllParents(page);
	}
	
	@GetMapping("/parent/{id}")
	public ResponseEntity<Object> getParent(@PathVariable int id)
	{
		return parentservice.getParentById(id);
	}
	
	@GetMapping("/parent")
	public ResponseEntity<Object> getParentByGrNo(@RequestParam("grNo") int grNo,@RequestParam("page")int page)
	{
		return parentservice.getAllParentByGrNo(grNo, page);
	}
	
	@PutMapping("/update-parent-profile")
	public ResponseEntity<Object> updateParentByUserName(@RequestBody Parent parent,@RequestParam("username") String username)
	{
		return parentservice.updateParentByUserName(parent, username);
	}
	
	@GetMapping("/aboutMe-parent")
	public ResponseEntity<Object> getParentByUserName(@RequestParam("username") String username)
	{
		return parentservice.getParentByUserName(username);
	}
	
	@PostMapping("/parent")
	public ResponseEntity<Object> AddParent(@RequestBody Parent parent)
	{
		return parentservice.saveParent(parent);
	}
	
	// for registration
	@GetMapping("/parent-student-grNo")
	public boolean getParentAndStudentByGrNo(@RequestParam("grNo") int grNo)
	{
		return parentservice.getParentAndStudentByGrNo(grNo);
	}
}
