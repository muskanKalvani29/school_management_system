package com.school.app.service.classes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.school.app.exception.ResourceNotFoundException;
import com.school.app.model.Parent;
import com.school.app.model.Query;
import com.school.app.model.Student;
import com.school.app.model.User;
import com.school.app.repository.ParentRepository;
import com.school.app.repository.StudentRepository;
import com.school.app.repository.UserRepository;
import com.school.app.service.interfaces.ParentService;

@Service
public class ParentServiceImpl implements ParentService 
{
	@Autowired
	private ParentRepository parentrepository;
	
	@Autowired
	private UserRepository UserRepository;
	
	@Override
	public ResponseEntity<Object> saveParent(Parent parent)
	{
		try
		{
			Parent add_parent = parentrepository.save(parent);
			return ResponseEntity.status(HttpStatus.CREATED).body(add_parent);
		}catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	//filters
	@Override
	public ResponseEntity<Object> getAllParents() 
	{
		try {
			int total_parents =parentrepository.findTotalParent();
			return ResponseEntity.status(HttpStatus.OK).body(total_parents);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@Override
	public ResponseEntity<Object> getAllParents(int page) 
	{
		Pageable pageable = PageRequest.of(page, 15,Sort.by("user.name").ascending());
		Page<Parent> parent_list = (Page<Parent>)parentrepository.findAll(pageable);
		if(parent_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(parent_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getParentById(int id) 
	{ 
		Parent parent=	parentrepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try {
			return ResponseEntity.status(HttpStatus.OK).body(parent);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}

	@Override
	public ResponseEntity<Object> getAllParentByGrNo(int grNo,int page) {
		Pageable pageable = PageRequest.of(page, 15);
		Page<Parent> parent_list = (Page<Parent>) parentrepository.findAllparentsByGrNo(grNo,pageable);
		if(parent_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(parent_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}

	}


	@Override
	public ResponseEntity<Object> getParentByUserName(String username) {
		try {
			Parent parent = parentrepository.findParentByUserName(username);
			if(parent==null)
			{
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("UserName not found with parent : "+username);
			}
			return ResponseEntity.status(HttpStatus.OK).body(parent);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}


	@Override
	public ResponseEntity<Object> updateParentByUserName(Parent parent, String username) {
		Parent parentByUserName =  parentrepository.findParentByUserName(username);
		try 
		{
			parentByUserName.setContactNo2(parent.getContactNo2());
			parentByUserName.setOccupation(parent.getOccupation());
			parentByUserName.setQualification(parent.getQualification());
			User user =parent.getUser();
			
			UserRepository.save(user);
			parentrepository.save(parentByUserName);
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(parentByUserName);
		}catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}	
	}

	@Override
	public boolean getParentAndStudentByGrNo(int grNo) {
		Parent parent = parentrepository.findByStudentGrNo(grNo);
		if(parent==null)
		{
			return true;
		}
		else {
			return false;
		}
		
	}

}
