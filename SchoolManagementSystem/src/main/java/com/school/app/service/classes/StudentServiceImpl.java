package com.school.app.service.classes;

import java.util.List;
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
import com.school.app.model.Standard;
import com.school.app.model.Student;
import com.school.app.model.Teacher;
import com.school.app.repository.ParentRepository;
import com.school.app.repository.StandardRepository;
import com.school.app.repository.StudentRepository;
import com.school.app.repository.TeacherRepository;
import com.school.app.service.interfaces.StudentService;

@Service
public class StudentServiceImpl  implements StudentService
{
	@Autowired
	private StudentRepository studentrepository;
	
	@Autowired
	private StandardRepository StandardRepository;
	
	@Autowired
	private TeacherRepository TeacherRepository;
	
	@Autowired
	private ParentRepository ParentRepository;

	//filters
	@Override
	public ResponseEntity<Object> getallStudents() 
	{
		try {
			int total_student=studentrepository.findTotalStudent();
			return ResponseEntity.status(HttpStatus.OK).body(total_student);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}	
	}

	@Override
	public ResponseEntity<Object> getStudentByStandardId(String standardName,int page) {
		Pageable pageable =PageRequest.of(page, 15, Sort.by("gr_no").ascending());
		Standard standard = StandardRepository.findByStandardName(standardName);
		Page<Student> student_list = (Page<Student>) studentrepository.findByStandardId(pageable,standard.getStandardId());
		if(student_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found. ");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(student_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}

	@Override
	public ResponseEntity<Object> getStrudentByStandardAndDivision(String standardName, int dId,int page) {
		Pageable pageable =PageRequest.of(page, 15, Sort.by("gr_no").ascending());
		Standard standard = StandardRepository.findByStandardName(standardName);
		Page<Student> student_list = (Page<Student>) studentrepository.findByStandardAndDivision(pageable,standard.getStandardId(), dId);
		if(student_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found. ");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(student_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}

	@Override
	public ResponseEntity<Object> getAllStudentByFeeStatus(int page) {
		Pageable pageable =PageRequest.of(page, 15, Sort.by("gr_no").ascending());
		Page<Student> student_list = (Page<Student>) studentrepository.findAllStudentByFeeStatus(pageable);
		if(student_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found. ");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(student_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> saveStudent(Student student)
	{
		try
		{
			Student add_student = studentrepository.save(student);
			return ResponseEntity.status(HttpStatus.CREATED).body(add_student);
		}catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getAllStudents(int page)
	{
		Pageable pageable = PageRequest.of(page, 15, Sort.by("grNo").ascending());
		Page<Student> student_list = (Page<Student>)studentrepository.findAll(pageable);
		if(student_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found. ");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(student_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}

	@Override
	public ResponseEntity<Object> getStudentByGrNo(int grNo) 
	{
		Student student =  studentrepository.findById(grNo).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + grNo));
		try {
			return ResponseEntity.status(HttpStatus.OK).body(student);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> updateStudent(Student student,int grNo) 
	{
		Student studentById =  studentrepository.findById(grNo).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + grNo));
		try
		{
			studentById.setFeeStatus(student.getFeeStatus());
			studentById.setEmailId(student.getEmailId());
			studentById.setRollNo(student.getRollNo());
			studentById.setAddress1(student.getAddress1());
			studentById.setAddress2(student.getAddress2());
			studentById.setAdmissionDate(student.getAdmissionDate());
			studentById.setBloodGroup(student.getBloodGroup());
			studentById.setDateOfBirth(student.getDateOfBirth());
			studentById.setFatherName(student.getFatherName());
			studentById.setFirstName(student.getFirstName());
			studentById.setLastName(student.getLastName());
			studentById.setMiddleName(student.getMiddleName());
			studentById.setMotherName(student.getMotherName());
			studentById.setMedium(student.getMedium());
			studentById.setDivision(student.getDivision());
			studentById.setStream(student.getStream());
			studentById.setGender(student.getGender());
			studentById.setPincode(student.getPincode());
			studentById.setPreviousSchoolName(student.getPreviousSchoolName());
			studentById.setImage(student.getImage());
			
			studentrepository.save(studentById);
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(studentById);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> deleteStudentByGrNo(int grNo) 
	{
		studentrepository.findById(grNo).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + grNo));
		try {
			studentrepository.deleteById(grNo);
			return ResponseEntity.status(HttpStatus.OK).build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> updateStudentByStandard(String from_standard,String to_standard) {
		try {
				Standard get_standard1 = StandardRepository.findByStandardName(from_standard);
				List<Student> student_list= (List<Student>)studentrepository.findByStandard(get_standard1.getStandardId());
				for(Student student2 : student_list)
				{
					Standard get_standard2 = StandardRepository.findByStandardName(to_standard);
					Standard standard = StandardRepository.findById(get_standard2.getStandardId()).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + get_standard2.getStandardId()));
					student2.setStandard(standard);
					studentrepository.save(student2);
				}
				return ResponseEntity.status(HttpStatus.OK).body("Standard successfully updated");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	//user side
	@Override
	public int getStudentBySAndT(int id) {
		int total_student=0;
		Teacher teacher = TeacherRepository.findTeacherByUserId(id);
		List<Standard> standard_list = teacher.getStandard();
		for(Standard std : standard_list)
		{
			int s_id = std.getStandardId();
			total_student += studentrepository.findNoOfStudentById(s_id);
		}
		return total_student;
	}

	//doubt jovu ke usertype mde che ke parent ni id
	@Override
	public ResponseEntity<Object> getStudentByParentId(int id) {
		try {
			Parent parent = ParentRepository.findByUserUserId(id);
			Student student = parent.getStudent();
			return ResponseEntity.status(HttpStatus.OK).body(student);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> updateStudentFeeStatus(String status) {
		try {
			List<Student> student_list= (List<Student>)studentrepository.findAll();
			for(Student student: student_list)
			{
				student.setFeeStatus(status);
				studentrepository.save(student);
			}
			return ResponseEntity.status(HttpStatus.OK).body("Fee Status successfully updated");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Sorry! Try Again++.");
		}
	}

	@Override
	public ResponseEntity<Object> getAllStudentByFeeStatusAndStandard(String StandardName, int page) {
		Pageable pageable =PageRequest.of(page, 15, Sort.by("gr_no").ascending());
		Standard standard = StandardRepository.findByStandardName(StandardName);
		Page<Student> student_list = (Page<Student>) studentrepository.findAllStudentByFeeStatusAndStandardStandardId(standard.getStandardId(),pageable);
		if(student_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found. ");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(student_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getAllStudentByFeeStatusAndSAndD(String StandardName, int dId, int page) {
		Pageable pageable =PageRequest.of(page, 15, Sort.by("gr_no").ascending());
		Standard standard = StandardRepository.findByStandardName(StandardName);
		Page<Student> student_list = (Page<Student>) studentrepository.findAllStudentByFeeStatusAndStandardStandardIdAndDivisionDivisionId(standard.getStandardId(),dId,pageable);
		if(student_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found. ");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(student_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}
