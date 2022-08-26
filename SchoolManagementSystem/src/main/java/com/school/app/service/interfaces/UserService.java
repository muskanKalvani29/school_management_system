package com.school.app.service.interfaces;

import org.springframework.http.ResponseEntity;

import com.school.app.model.Parent;
import com.school.app.model.User;

public interface UserService 
{
		
	public ResponseEntity<Object> getUserByUserName(String username);
	
	//UserType
	//filters
	public ResponseEntity<Object> getAllUserTypes();
	
	//User
	public  ResponseEntity<Object> saveUser(User user);
	
	public ResponseEntity<Object> getParentUserByStudent(int grNo);

	public boolean getUser(String username);

//	public ResponseEntity<Object> updateUserByUserName(User user, String username);

}
