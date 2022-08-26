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
import com.school.app.model.Student;
import com.school.app.model.User;
import com.school.app.service.interfaces.UserService;

@RestController
@RequestMapping("/sms")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController 
{
	
	@Autowired
	private UserService userservice;
	
		
	//home
	//user
	@PostMapping("/user")
	public ResponseEntity<Object> addUser(@RequestBody User user)
	{
		return userservice.saveUser(user);
	}
	
	@GetMapping("/user-username")
	public ResponseEntity<Object> getUserByUserName(@RequestParam("username") String username)
	{
		return userservice.getUserByUserName(username);
	}
	
	@GetMapping("/user-uname")
	public boolean getUser(@RequestParam("username") String username)
	{
		return userservice.getUser(username);
	}
	
	@GetMapping("/user-types")
	public ResponseEntity<Object> getUserTypeList()
	{
		return userservice.getAllUserTypes();
	}
	
	@GetMapping("/user-parent/{grNo}")
	public ResponseEntity<Object> getParentByStudent(@PathVariable int grNo)
	{
		return userservice.getParentUserByStudent(grNo);
		
	}
	
//	@PutMapping("/update-user")
//	public ResponseEntity<Object> updateUserByUserName(@RequestBody User user,@RequestParam("username") String username)
//	{
//		return userservice.updateUserByUserName(user,username);
//	}
	
}
