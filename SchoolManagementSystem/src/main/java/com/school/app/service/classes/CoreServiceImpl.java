package com.school.app.service.classes;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.school.app.exception.ResourceNotFoundException;
import com.school.app.model.Division;
import com.school.app.model.Standard;
import com.school.app.model.Subject;
import com.school.app.model.Teacher;
import com.school.app.repository.DivisionRepository;
import com.school.app.repository.StandardRepository;
import com.school.app.repository.SubjectRepository;
import com.school.app.repository.TeacherRepository;
import com.school.app.repository.UserTypeRepository;
import com.school.app.service.interfaces.CoreService;

import net.bytebuddy.asm.Advice.This;


@Service
public class CoreServiceImpl implements CoreService
{
	@Autowired
	DivisionRepository divisionrepository;
	
	@Autowired
	StandardRepository Standardrepository;

	@Autowired
	 SubjectRepository subjectrepository;
	
	@Autowired
	UserTypeRepository UserTypeRepository;
	
	@Autowired
	TeacherRepository TeacherRepository;
	
	//filter(ADMIN)//(user side)  both use this methods
	@Override
	public ResponseEntity<Object> getAllDivisions() 
	{
		List<Division> division_list = (List<Division>)divisionrepository.findAll();
		if(division_list.size() < 1)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(division_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}

	@Override
	public ResponseEntity<Object> getAllStandards() 
	{
		List<Standard> standard_list = (List<Standard>)Standardrepository.findAll();
		if(standard_list.size() < 1)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(standard_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getAllSubjects() 
	{
		List<Subject> subject_list = (List<Subject>)subjectrepository.findAll();
		if(subject_list.size() < 1)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(subject_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}

	@Override
	public ResponseEntity<Object> getAllStandardByTeacher(int id) {
		Teacher teacher = TeacherRepository.findTeacherByUserId(id);
		List<Standard> standard_list = teacher.getStandard();
		if(standard_list.size()<1)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(standard_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getAllSubjectByStandard(String StandardName) {
		Standard standard = Standardrepository.findByStandardName(StandardName);
		List<String> subjectName_list = new ArrayList<String>();
		List<Subject> subject_list = (List<Subject>) subjectrepository.findAllByStandardStandardId(standard.getStandardId());
		try {	
			for(Subject subject:subject_list)
			{
				subjectName_list.add(subject.getSubjectName());
			}
			return ResponseEntity.status(HttpStatus.OK).body(subjectName_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	
	@Override
	public ResponseEntity<Object> getStandardId(String standard) {
		Standard standard2 = Standardrepository.findByStandardName(standard);
		try {
			return ResponseEntity.status(HttpStatus.OK).body(standard2.getStandardId());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getDivisionId(String division) {
		Division division2 = divisionrepository.findByDivisionName(division);
		try {
			return ResponseEntity.status(HttpStatus.OK).body(division2.getDivisionId());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> saveTeacherStandards(String[] standardNames, String id) {
		Teacher teacher = TeacherRepository.findById(Integer.parseInt(id)).orElseThrow(()-> new ResourceNotFoundException("Sorry! Not found for :" + Integer.parseInt(id)));
		try {
			teacher.setStandard(this.createStandard(standardNames));
			TeacherRepository.save(teacher);
			return ResponseEntity.status(HttpStatus.OK).body(teacher);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}
	
	public List<Standard> createStandard(String [] standardNames) {
		List<Standard> standards=new ArrayList<Standard>();
		for(int i=0;i<standardNames.length;i++)
		{
			Standard standard = this.Standardrepository.findByStandardName(standardNames[i]);
			standards.add(standard);
		}
		return standards;
	}

	//delete from teacher_standard
	@Override
	public ResponseEntity<Object> deleteTeacherStandardsById(int id) {
		TeacherRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Sorry! Not found for :" + id));
		try {
			Standardrepository.deleteTeacherStandardById(id);
			return ResponseEntity.status(HttpStatus.OK).build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}
