package com.school.app.service.classes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.school.app.exception.ResourceNotFoundException;
import com.school.app.model.Teacher;
import com.school.app.model.TeacherRequest;
import com.school.app.model.User;
import com.school.app.repository.TeacherRepository;
import com.school.app.repository.TeacherRequestRepository;
import com.school.app.repository.UserRepository;
import com.school.app.service.interfaces.TeacherService;

@Service
public class TeacherServiceImpl implements TeacherService 
{
	@Autowired
	private TeacherRepository teacherrepository;
	
	@Autowired
	private TeacherRequestRepository teacherrequestrepository;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder; 
	
	@Autowired
	private UserRepository UserRepository;
	
	@Override
	public ResponseEntity<Object> saveTeacher(Teacher teacher)
	{
		try
		{
			Teacher add_teacher = teacherrepository.save(teacher);
			return ResponseEntity.status(HttpStatus.CREATED).body(add_teacher);
		}catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}

	//filters
	@Override
	public ResponseEntity<Object> getAllTeachers() 
	{
		try {
			int total_teacher =teacherrepository.findTotalTeacher();
			return ResponseEntity.status(HttpStatus.OK).body(total_teacher);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}	
	}

	@Override
	public ResponseEntity<Object> getAllTeacherRequests(int page) {
		Pageable pageable = PageRequest.of(page, 9, Sort.by("name"));
		Page<TeacherRequest> teacherRequest_list = (Page<TeacherRequest>)teacherrequestrepository.findAll(pageable);
		if(teacherRequest_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(teacherRequest_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}

	@Override
	public ResponseEntity<Object> saveTeacherRequest(TeacherRequest teacherRequest)
	{
		try
		{
			String encodePasswordString = passwordEncoder.encode(teacherRequest.getPassword());
			teacherRequest.setPassword(encodePasswordString);
			TeacherRequest add_teacherRequest = teacherrequestrepository.save(teacherRequest);
			return ResponseEntity.status(HttpStatus.CREATED).body(add_teacherRequest);
		}catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@Override
	public ResponseEntity<Object> deleteTeacherRequestById(int id) 
	{
		teacherrequestrepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Sorry! Not found for :" + id));
		try {
			teacherrequestrepository.deleteById(id);
			return ResponseEntity.status(HttpStatus.OK).build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}

	@Override
	public ResponseEntity<Object> getAllTeachers(int page) 
	{
		Pageable pageable = PageRequest.of(page, 12,Sort.by("user.name").ascending());
		Page<Teacher> teacher_list = (Page<Teacher>)teacherrepository.findAll(pageable);
		if(teacher_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(teacher_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}
	
	@Override
	public ResponseEntity<Object> getTeacherById(int id) 
	{
		Teacher teacher =  teacherrepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try {
			return ResponseEntity.status(HttpStatus.OK).body(teacher);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> deleteTeacherById(int id)
	{
		teacherrepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Sorry! Not found for :" + id));
		try {
			teacherrepository.deleteById(id);
			return ResponseEntity.status(HttpStatus.OK).build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}
	
	@Override
	public ResponseEntity<Object> getTeacherByName(String name,int page) {
		Pageable pageable = PageRequest.of(page, 15);
		Page<Teacher> teacher_list = (Page<Teacher>)teacherrepository.findAllTeacherByName(name,pageable);
		if(teacher_list.isEmpty() ==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(teacher_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getTeacherByUserName(String username) {
		try {
			Teacher teacher = teacherrepository.findTeacherByUserName(username);
			if(teacher==null)
			{
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("UserName not Found for : "+username);
			}
			return ResponseEntity.status(HttpStatus.OK).body(teacher);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> UpdateTeacherByUserName(String username,Teacher teacher) {
		Teacher teacherByUserName =  teacherrepository.findTeacherByUserName(username);
		try 
		{
			teacherByUserName.setAddress1(teacher.getAddress1());
			teacherByUserName.setAddress2(teacher.getAddress2());
			teacherByUserName.setGender(teacher.getGender());
			teacherByUserName.setJoiningDate(teacher.getJoiningDate());
			teacherByUserName.setPincode(teacher.getPincode());
			teacherByUserName.setImage(teacher.getImage());
			teacherByUserName.setQualification(teacher.getQualification());
			User user = teacher.getUser();
			 
			UserRepository.save(user);
			teacherrepository.save(teacherByUserName);
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(teacherByUserName);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}	
	}
	
	// add this 
	@Override
	public ResponseEntity<Object> getTeacherRequestById(int id) {
		TeacherRequest teacherRequest =  teacherrequestrepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try {
			return ResponseEntity.status(HttpStatus.OK).body(teacherRequest);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}		
}
