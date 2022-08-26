package com.school.app.service.interfaces;

import org.springframework.http.ResponseEntity;
import com.school.app.model.Admin;


public interface AdminService 
{	
 	//filters
 	public ResponseEntity<Object> getAdminByUserName(String username);
 	
 	public ResponseEntity<Object> updateAdminByUserName(Admin admin,String username);
}
