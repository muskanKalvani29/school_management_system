package com.school.app.service.interfaces;

import org.springframework.http.ResponseEntity;
import com.school.app.model.Parent;

public interface ParentService 
{
	// for registration time we save parent
	public ResponseEntity<Object> saveParent(Parent parent);
	
	//filters
	public ResponseEntity<Object> getAllParents();
	
	public ResponseEntity<Object> getAllParents(int page);
	
	public ResponseEntity<Object> getParentById(int id);
	
	public ResponseEntity<Object> getAllParentByGrNo(int grNo,int page);
	
	//abotme-parent
	public ResponseEntity<Object> getParentByUserName(String username);
 	
 	public ResponseEntity<Object> updateParentByUserName(Parent parent,String username);
 	
 	//registration
 	public boolean getParentAndStudentByGrNo(int grNo);
}
