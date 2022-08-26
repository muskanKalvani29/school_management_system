 package com.school.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.school.app.model.Meeting;
import com.school.app.model.TimeTable;
import com.school.app.service.interfaces.MeetingService;
import com.school.app.service.interfaces.TimetableService;

@RestController
@RequestMapping("/sms")
@CrossOrigin(origins = "http://localhost:4200")

public class ScheduleController 
{
	@Autowired
	private TimetableService timetableservice;
	
	@Autowired
	private MeetingService meetingservice;
	
	//filters
	// meeting
		
		@GetMapping("/meetings-teacher")//user side also
		public ResponseEntity<Object> getTeacherMeetingList(@RequestParam("page") int page)
		{
		 	return meetingservice.getAllTeacherMeeting(page);
		}
		
		@GetMapping("/meeting/{id}")//user side also
		public ResponseEntity<Object> getMeeting(@PathVariable int id)
		{
			return meetingservice.getMeetingById(id);
		}
		//for admin side we show only teacher meetings
		@GetMapping("/meeting-teacher-name")
		public ResponseEntity<Object> getMeetingByName(@RequestParam("name") String name,@RequestParam("page")int page)
		{
			return meetingservice.getAllTeacherMeetingByName(name,page);
		}
		
		@PostMapping("/meeting")
		public ResponseEntity<Object> addMeeting(@RequestBody Meeting meeting)
		{
			return meetingservice.saveMeeting(meeting);
		}
		
		@DeleteMapping("/meeting/{id}")
		public ResponseEntity<Object> deleteMeeting(@PathVariable int id)
		{
			return meetingservice.deleteMeetingById(id);
		}
		
		@PutMapping("/meeting/{id}")
		public ResponseEntity<Object> updateMeeting(@RequestBody Meeting meeting,@PathVariable int id)
		{
			return meetingservice.updateMeeting(meeting, id);
		}
		
		//timetable
		@GetMapping("/timetables")
		public ResponseEntity<Object> getTimetableList(@RequestParam("page") int page)
		{
			return timetableservice.getAllTimeTables(page);
		}
		
		@GetMapping("/timetable-standard")
		public ResponseEntity<Object> getTimetableByStandard(@RequestParam("sname") String StandardName, @RequestParam("page") int page)
		{
			return timetableservice.getTimeTableByStandard(StandardName, page);
		}
		
		@GetMapping("/timetable-standard-division")
		public ResponseEntity<Object> getTimetableByStandardAndDivision(@RequestParam("sname") String StandardName,@RequestParam("dId") int dId, @RequestParam("page") int page)
		{
			return timetableservice.getTimeTableBySAndD(StandardName, dId, page);
		}
		
		@GetMapping("/timetable/{id}")
		public ResponseEntity<Object> getTimetable(@PathVariable int id)
		{
			return timetableservice.getTimeTableById(id);
		}
		
		@PostMapping("/timetable")
		public ResponseEntity<Object> addTimetable(@RequestBody TimeTable timeTable)
		{
			return timetableservice.saveTimeTable(timeTable);
		}
		
		@DeleteMapping("/timetable/{id}")
		public ResponseEntity<Object> deleteTimetable(@PathVariable int id)
		{
			return timetableservice.deleteTimeTableById(id);
		}
		
		@PutMapping("/timetable/{id}")
		public ResponseEntity<Object> updateTimetable(@RequestBody TimeTable timeTable,@PathVariable int id)
		{
			return timetableservice.updateTimeTable(timeTable, id);
		}
		
		//user side(teacher)
		@GetMapping("/teacher-count-meetings/{id}")
		public int getMeetingByStandardAndTeacher(@PathVariable int id)
		{
			return meetingservice.getMeetingBySAndT(id);
		}
		
		@GetMapping("/meetings-parent")
		public ResponseEntity<Object> getParentMeetingList(@RequestParam("page") int page)
		{
			return meetingservice.getAllParentMeeting(page);
		}
		
		@GetMapping("/meetings-standard")
		public ResponseEntity<Object> getMeetingListByStandard(@RequestParam("sname")String StandardName ,@RequestParam("page") int page)
		{
			return meetingservice.getAllMeetingByStandard(StandardName, page);
		}
		
		@GetMapping("/meetings-standard-division")
		public ResponseEntity<Object> getMeetingListByStandardAndDivision(@RequestParam("sname")String StandardName,@RequestParam("dId")int dId, @RequestParam("page") int page)
		{
			return meetingservice.getAllMeetingBySAndD(StandardName, dId, page);
		}
		
		//parent
		@GetMapping("/timetable-student-standard/{id}")
		public ResponseEntity<Object> getTimeTableByStudentAndStandard(@PathVariable int id,@RequestParam("page")int page)
		{
			return timetableservice.getTimeTableByStudentAndStandard(id, page);
		}
		
		@GetMapping("/meeting-parent-standard-division/{id}")
		public ResponseEntity<Object> getParentMeetingByUserId(@PathVariable int id,@RequestParam("page")int page)
		{
			return meetingservice.getParentMeetingByUser(id, page);
		}
}
