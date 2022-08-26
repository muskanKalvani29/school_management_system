package com.school.app.service.classes;


import java.util.List;
import java.util.Optional;

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
import com.school.app.model.Meeting;
import com.school.app.model.Parent;
import com.school.app.model.Standard;
import com.school.app.model.Student;
import com.school.app.model.Teacher;
import com.school.app.model.User;
import com.school.app.model.UserType;
import com.school.app.repository.MeetingRepository;
import com.school.app.repository.ParentRepository;
import com.school.app.repository.StandardRepository;
import com.school.app.repository.TeacherRepository;
import com.school.app.repository.UserRepository;
import com.school.app.service.interfaces.MeetingService;

@Service
public class MeetingServiceImpl implements MeetingService
{
	@Autowired
	MeetingRepository meetingrepository;
	
	@Autowired
	TeacherRepository TeacherRepository;
	
	@Autowired
	UserRepository UserRepository;
	
	@Autowired
	ParentRepository ParentRepository;
	
	@Autowired
	StandardRepository StandardRepository;
	
	//filters
	@Override
	public ResponseEntity<Object> saveMeeting(Meeting meeting) 
	{
		try
		{
			Standard standard = meeting.getStandard();
			if(standard==null) {
				Meeting add_meeting = meetingrepository.save(meeting);
				return ResponseEntity.status(HttpStatus.CREATED).body(add_meeting);
			}else {
				Standard standard1 = StandardRepository.findByStandardName(standard.getStandardName());
				meeting.setStandard(standard1);
				Meeting add_meeting = meetingrepository.save(meeting);
				return ResponseEntity.status(HttpStatus.CREATED).body(add_meeting);
			}
			
		}catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getAllTeacherMeeting(int page) 
	{
		Pageable pageable =PageRequest.of(page, 8, Sort.by("meeting_date").descending());
		Page<Meeting> meeting_list = (Page<Meeting>)meetingrepository.findMeetingByTeacher(pageable);
		if(meeting_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(meeting_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}

	@Override
	public ResponseEntity<Object> getMeetingById(int id) 
	{
		Meeting meeting =  meetingrepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try {
			return ResponseEntity.status(HttpStatus.OK).body(meeting);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}

	@Override
	public ResponseEntity<Object> deleteMeetingById(int id)
	{
		meetingrepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try {
			meetingrepository.deleteById(id);
			return ResponseEntity.status(HttpStatus.OK).build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> updateMeeting(Meeting meeting,int id) 
	{
		Meeting meetingById =  meetingrepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try 
		{
			meetingById.setMeetingDate(meeting.getMeetingDate());
			meetingById.setMeetingDescription(meeting.getMeetingDescription());
			meetingById.setMeetingEndTime(meeting.getMeetingEndTime());
			meetingById.setMeetingName(meeting.getMeetingName());
			meetingById.setMeetingStartTime(meeting.getMeetingStartTime());
			
			meetingrepository.save(meetingById);
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(meetingById);
		}catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getAllTeacherMeetingByName(String name, int page) {
		Pageable pageable =PageRequest.of(page, 8, Sort.by("meeting_date").descending());
		Page<Meeting> meeting_list = (Page<Meeting>)meetingrepository.findMeetingByName(name,pageable);
		if(meeting_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(meeting_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	//user side
	//total meetings arranged for teacher till now
	@Override
	public int getMeetingBySAndT(int id) {
		int total_meeting=0;
		Teacher teacher = TeacherRepository.findTeacherByUserId(id);
		List<Standard> standard_list = teacher.getStandard();
		for(Standard std : standard_list)
		{
			List<Meeting> meeting_list = meetingrepository.findNoOfMeetingById(std.getStandardId());
			total_meeting+=meeting_list.size();
		}
		return total_meeting;
	}

	//teacher side
	@Override
	public ResponseEntity<Object> getAllParentMeeting(int page) {
		Pageable pageable =PageRequest.of(page, 8, Sort.by("meeting_date").descending());
		Page<Meeting> meeting_list = (Page<Meeting>)meetingrepository.findMeetingByParent(pageable);
		if(meeting_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(meeting_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getAllMeetingByStandard(String StandardName, int page) {
		Pageable pageable =PageRequest.of(page, 8, Sort.by("meetingDate").descending());
		Standard standard = StandardRepository.findByStandardName(StandardName);
		Page<Meeting> meeting_list = (Page<Meeting>)meetingrepository.findAllByStandardStandardId(standard.getStandardId(),pageable);
		if(meeting_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(meeting_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getAllMeetingBySAndD(String StandardName, int dId, int page) {
		Pageable pageable =PageRequest.of(page, 8, Sort.by("meetingDate").descending());
		Standard standard = StandardRepository.findByStandardName(StandardName);
		Page<Meeting> meeting_list = (Page<Meeting>)meetingrepository.findAllByStandardStandardIdAndDivisionDivisionId(standard.getStandardId(),dId,pageable);
		if(meeting_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(meeting_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	//parent side 
	@Override
	public ResponseEntity<Object> getParentMeetingByUser(int id,int page) {
		 Parent parent = ParentRepository.findByUserUserId(id);
		 Student student = parent.getStudent();
		 Standard standard = student.getStandard();
		 Division  division = student.getDivision(); 
		 Pageable pageable = PageRequest.of(page, 8,Sort.by("meetingDate").descending());
		 Page<Meeting> meeting_list = (Page<Meeting>) meetingrepository.findAllByStandardStandardIdAndDivisionDivisionId(standard.getStandardId(),division.getDivisionId(),pageable);
		 if(meeting_list.isEmpty()==true)
		 {
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(meeting_list.getContent());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}		
	}
}
