package com.school.app.service.classes;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.school.app.exception.ResourceNotFoundException;
import com.school.app.model.Parent;
import com.school.app.model.Student;
import com.school.app.model.TeacherRequest;
import com.school.app.model.User;
import com.school.app.model.UserType;
import com.school.app.repository.ParentRepository;
import com.school.app.repository.StudentRepository;
import com.school.app.repository.TeacherRequestRepository;
import com.school.app.repository.UserRepository;
import com.school.app.repository.UserTypeRepository;
import com.school.app.service.interfaces.UserService;

@Service
public class UseServiceImpl implements UserService
{

	@Autowired
	private UserRepository userrepository;
	
	@Autowired
	private StudentRepository studentrepository;
	
	@Autowired
	private UserTypeRepository usertyperepository;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder; 
	
	@Autowired
	private ParentRepository ParentRepository;
	
	@Autowired
	private TeacherRequestRepository TeacherRequestRepository;
	
	//filters
	@Override
	public ResponseEntity<Object> getAllUserTypes() 
	{
		List<UserType> usertype_list = (List<UserType>)usertyperepository.findAll();
		if(usertype_list.size() < 1)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(usertype_list);
		}catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}
	
	//user
	@Override
	public ResponseEntity<Object> saveUser(User user)
	{
		try
		{
			String encodePasswordString = passwordEncoder.encode(user.getPassword());
			user.setPassword(encodePasswordString);
			User add_user = userrepository.save(user);
			return ResponseEntity.status(HttpStatus.CREATED).body(add_user);
		}catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}

	// for home page user name check use this service
	
	@Override
	public ResponseEntity<Object> getUserByUserName(String username) {
		User user = userrepository.findByUserName(username);
		if(user==null) {
			throw new UsernameNotFoundException("User Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(user);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getParentUserByStudent(int grNo) {
		Student student =studentrepository.findById(grNo).orElseThrow(()->new ResourceNotFoundException("Enter Valid Gr No for registraton"));
		Parent find_parent =ParentRepository.findByStudentGrNo(student.getGrNo());
		if(find_parent==null)
		{
			return ResponseEntity.status(HttpStatus.OK).body("now you can register");
		}
		else {
			return ResponseEntity.status(HttpStatus.OK).body("You are already registered with the GrNo"+grNo);
		}
	}

	@Override
	public boolean getUser(String username) {
		User user = userrepository.findByUserName(username);
		TeacherRequest user1 = TeacherRequestRepository.findByUserName(username);
		if(user==null && user1==null) {
			return false;
		}
		else {
				return true;
		}
		
	}

//	@Override
//	public ResponseEntity<Object> updateUserByUserName(User user, String username) {
//		User user1 = userrepository.findByUserName(username);
//		if(user1==null) {
//			throw new ResourceNotFoundException("Sorry! Not Found.");
//		}
//		else {
//			user1.setName(user.getName());
//			user1.setUserName(user.getUserName());
//			user1.setEmailId(user.getEmailId());
//			user1.setContactNo1(user.getContactNo1());
//			userrepository.save(user1);
//			return ResponseEntity.status(HttpStatus.OK).body(user1);
//		}
//	}	
}
