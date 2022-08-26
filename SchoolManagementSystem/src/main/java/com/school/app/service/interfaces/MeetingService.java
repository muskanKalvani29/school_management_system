package com.school.app.service.interfaces;


import org.springframework.http.ResponseEntity;
import com.school.app.model.Meeting;

public interface MeetingService
{
	//filters
	public  ResponseEntity<Object> saveMeeting(Meeting meeting);
	
	public ResponseEntity<Object> getAllTeacherMeeting(int page);
	
	public  ResponseEntity<Object> getMeetingById(int id);
	
 	public  ResponseEntity<Object> updateMeeting(Meeting meeting,int id);
 	
 	public ResponseEntity<Object> deleteMeetingById(int id);
 	
 	public ResponseEntity<Object> getAllTeacherMeetingByName(String name, int page);
 	
 	//user side
 	public int getMeetingBySAndT(int id);
 	
 	public ResponseEntity<Object> getAllParentMeeting(int page);
 	
 	public ResponseEntity<Object> getAllMeetingByStandard(String StandardName,int page);
 	
 	public ResponseEntity<Object> getAllMeetingBySAndD(String StandardName,int dId,int page);

	public ResponseEntity<Object> getParentMeetingByUser(int id, int page);
	
}
