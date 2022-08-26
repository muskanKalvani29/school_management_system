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
import com.school.app.model.Meeting;
import com.school.app.model.Parent;
import com.school.app.model.Standard;
import com.school.app.model.Student;
import com.school.app.model.StudyMaterial;
import com.school.app.model.StudyMaterialType;
import com.school.app.model.Teacher;
import com.school.app.repository.ParentRepository;
import com.school.app.repository.StandardRepository;
import com.school.app.repository.StudyMaterialRepository;
import com.school.app.repository.StudyMaterialTypeRepository;
import com.school.app.repository.TeacherRepository;
import com.school.app.service.interfaces.StudyMaterialService;

@Service
public class StudyMaterialServiceImpl implements StudyMaterialService
{
	@Autowired
	private StudyMaterialRepository studyMaterialRepository;
	
	@Autowired
	private StudyMaterialTypeRepository studymaterialtyperepository;
	
	@Autowired
	private TeacherRepository TeacherRepository;
	
	@Autowired
	private ParentRepository ParentRepository;
	
	@Autowired
	private StandardRepository StandardRepository;

	@Override
	public ResponseEntity<Object> saveStudyMaterial(StudyMaterial studyMaterial) 
	{
		try {
			Standard standard = studyMaterial.getStandard();
			if(standard==null) {
				StudyMaterial add_studymaterial = studyMaterialRepository.save(studyMaterial);
				return ResponseEntity.status(HttpStatus.CREATED).body(add_studymaterial);
			}else {
				Standard standard1 = StandardRepository.findByStandardName(standard.getStandardName());
				studyMaterial.setStandard(standard1);
				StudyMaterial add_studymaterial = studyMaterialRepository.save(studyMaterial);
				return ResponseEntity.status(HttpStatus.CREATED).body(add_studymaterial);
			}
		}catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}

	@Override
	public ResponseEntity<Object> getAllStudyMaterials(int page) 
	{
		Pageable pageable = PageRequest.of(page, 8, Sort.by("uploadDate").descending());
		Page<StudyMaterial> Studymaterial_list = (Page<StudyMaterial>)studyMaterialRepository.findAll(pageable);
		if(Studymaterial_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(Studymaterial_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}	
	}

	@Override
	public ResponseEntity<Object> getAllStudyMaterialsByStandard(String StandardName,int page) 
	{
		Pageable pageable = PageRequest.of(page, 8, Sort.by("uploadDate").descending());
		Standard standard = StandardRepository.findByStandardName(StandardName);
		Page<StudyMaterial> Studymaterial_list = (Page<StudyMaterial>)studyMaterialRepository.findAllByStandardStandardId(standard.getStandardId(),pageable);
		if(Studymaterial_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(Studymaterial_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}	
	}
	
	@Override
	public ResponseEntity<Object> getStudyMaterialById(int id) 
	{
		StudyMaterial Studymaterial =  studyMaterialRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try {
			return ResponseEntity.status(HttpStatus.OK).body(Studymaterial);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}

	@Override
	public ResponseEntity<Object> updateStudyMaterial(StudyMaterial studyMaterial,int id) 
	{
		StudyMaterial StudymaterialById =  studyMaterialRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try
		{
			StudymaterialById.setDescription(studyMaterial.getDescription());
			StudymaterialById.setStudymaterialFile(studyMaterial.getStudymaterialFile());
			StudymaterialById.setUploadDate(studyMaterial.getUploadDate());
			
			studyMaterialRepository.save(StudymaterialById);
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(StudymaterialById);
		}catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> deleteStudyMaterialById(int id) 
	{
		studyMaterialRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Sorry! Not found for :" + id));
		try {
			studyMaterialRepository.deleteById(id);
			return ResponseEntity.status(HttpStatus.OK).build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getAllStudyMaterialTypes() {
		List<StudyMaterialType> Studymaterialtype_list = (List<StudyMaterialType>)studymaterialtyperepository.findAll();
		if(Studymaterialtype_list.size() < 1)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(Studymaterialtype_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	//for count the documents
	@Override
	public int getStudyMaterialBySAndT(int id) {
		int total_document=0;
		Teacher teacher = TeacherRepository.findTeacherByUserId(id);
		List<Standard> standard_list = teacher.getStandard();
		for(Standard std : standard_list)
		{
			List<StudyMaterial> list = studyMaterialRepository.findNoOfStudyMaterialById(std.getStandardId());
			total_document+=list.size();
		}
		return total_document;
	}

	@Override
	public ResponseEntity<Object> getStudyMaterialByParent(int id, int page) {
		Parent parent = ParentRepository.findByUserUserId(id);
		Student student =parent.getStudent();
		Standard standard =student.getStandard();
		Pageable pageable = PageRequest.of(page, 8, Sort.by("uploadDate").descending());
		Page<StudyMaterial> Studymaterial_list = (Page<StudyMaterial>)studyMaterialRepository.findAllByStandardStandardId(standard.getStandardId(),pageable);
		if(Studymaterial_list.getSize() < 1)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(Studymaterial_list.getContent());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); 
		}

	}
	
	
}
