package com.school.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.school.app.model.Admin;
import com.school.app.service.interfaces.AdminService;

@RestController
@RequestMapping("/sms")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController 
{
	@Autowired
	private AdminService adminService;
		
	@PutMapping("/update-admin-profile")
	public ResponseEntity<Object> updateAdminByUserName(@RequestBody Admin admin,@RequestParam("username") String username)
	{
		return adminService.updateAdminByUserName(admin, username);
	}
	
	@GetMapping("/aboutMe-admin")
	public ResponseEntity<Object> getAdminByUserName(@RequestParam("username") String username)
	{
		return adminService.getAdminByUserName(username);
	}
}
	
	
	
	
	
	
	
	
	
	
	
	
	
