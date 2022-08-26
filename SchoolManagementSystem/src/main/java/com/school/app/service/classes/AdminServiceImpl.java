package com.school.app.service.classes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.school.app.model.Admin;
import com.school.app.model.User;
import com.school.app.repository.AdminRepository;
import com.school.app.repository.UserRepository;
import com.school.app.service.interfaces.AdminService;

@Service
public class AdminServiceImpl implements AdminService
{
	@Autowired 
	private AdminRepository adminrepository; 
	
	@Autowired
	private UserRepository UserRepository;

	@Override
	public ResponseEntity<Object> getAdminByUserName(String username) {
		try {
			Admin admin = adminrepository.findAdminByUserName(username);
			if(admin==null)
			{
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("UserName not found with Admin : "+username);
			}
			return ResponseEntity.status(HttpStatus.OK).body(admin);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@Override
	public ResponseEntity<Object> updateAdminByUserName(Admin admin,String username) {
		Admin adminByUserName =  adminrepository.findAdminByUserName(username);
		try 
		{
			adminByUserName.setAddress1(admin.getAddress1());
			adminByUserName.setAddress2(admin.getAddress2());
			adminByUserName.setGender(admin.getImage());
			adminByUserName.setJoiningDate(admin.getJoiningDate());
			adminByUserName.setPincode(admin.getPincode());
			adminByUserName.setGender(admin.getGender());
			User user = admin.getUser();
			
			UserRepository.save(user);
			adminrepository.save(adminByUserName);
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(adminByUserName);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}	
	}

}

	
