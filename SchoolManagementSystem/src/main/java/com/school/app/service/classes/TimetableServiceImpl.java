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
import com.school.app.model.Division;
import com.school.app.model.Parent;
import com.school.app.model.Standard;
import com.school.app.model.Student;
import com.school.app.model.TimeTable;
import com.school.app.repository.ParentRepository;
import com.school.app.repository.StandardRepository;
import com.school.app.repository.TeacherRepository;
import com.school.app.repository.TimeTableRepository;
import com.school.app.service.interfaces.TimetableService;

@Service
public class TimetableServiceImpl implements TimetableService
{
	@Autowired
	TimeTableRepository timetablerepository;
	
	@Autowired
	TeacherRepository TeacherRepository;
	
	@Autowired
	ParentRepository ParentRepository;
	
	@Autowired
	StandardRepository StandardRepository;

	
	@Override
	public ResponseEntity<Object> saveTimeTable(TimeTable timeTable)
	{
		try
		{
			TimeTable add_timetable = timetablerepository.save(timeTable);
			return ResponseEntity.status(HttpStatus.CREATED).body(add_timetable);
		}catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getAllTimeTables(int page) 
	{
		Pageable pageable =PageRequest.of(page, 8, Sort.by("uploadDate").descending());
		Page<TimeTable> timetable_list = (Page<TimeTable>)timetablerepository.findAll(pageable);
		if(timetable_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(timetable_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}

	@Override
	public ResponseEntity<Object> getTimeTableById(int id) 
	{
		TimeTable timetable =  timetablerepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try {
			return ResponseEntity.status(HttpStatus.OK).body(timetable);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}

	@Override
	public ResponseEntity<Object> deleteTimeTableById(int id)
	{
		timetablerepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try {
			timetablerepository.deleteById(id);
			return ResponseEntity.status(HttpStatus.OK).build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@Override
	public ResponseEntity<Object> updateTimeTable(TimeTable timeTable,int id) 
	{
		TimeTable timetableById =  timetablerepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try 
		{
			timetableById.setTimetableFile(timeTable.getTimetableFile());
			timetableById.setUploadDate(timeTable.getUploadDate());
			timetableById.setName(timeTable.getName());
			
			timetablerepository.save(timetableById);
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(timetableById);
		}catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getTimeTableByStandard(String StandardName,int page) {
		Pageable pageable =PageRequest.of(page, 8, Sort.by("uploadDate").descending());
		Standard standard = StandardRepository.findByStandardName(StandardName);
		Page<TimeTable> timetable_list = (Page<TimeTable>)timetablerepository.findAllByStandardStandardId(standard.getStandardId(),pageable);
		if(timetable_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(timetable_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@Override
	public ResponseEntity<Object> getTimeTableBySAndD(String StandardName,int dId, int page) {
		Pageable pageable =PageRequest.of(page, 8, Sort.by("uploadDate").descending());
		Standard standard = StandardRepository.findByStandardName(StandardName);
		Page<TimeTable> timetable_list = (Page<TimeTable>)timetablerepository.findAllByStandardStandardIdAndDivisionDivisionId(standard.getStandardId(),dId,pageable);
		if(timetable_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(timetable_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	//parent
	@Override
	public ResponseEntity<Object> getTimeTableByStudentAndStandard(int id, int page) {
		Parent parent = ParentRepository.findByUserUserId(id);
		Student student =parent.getStudent();
		Standard standard =student.getStandard();
		Division division =student.getDivision();
		Pageable pageable = PageRequest.of(page, 8, Sort.by("uploadDate").descending());
		Page<TimeTable> timetable_list = (Page<TimeTable>)timetablerepository.findAllByStandardStandardIdAndDivisionDivisionId(standard.getStandardId(),division.getDivisionId(),pageable);
		if(timetable_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(timetable_list.getContent());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}
	

}
