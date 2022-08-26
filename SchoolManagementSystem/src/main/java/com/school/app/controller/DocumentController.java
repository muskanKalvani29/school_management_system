package com.school.app.controller;

import java.time.Month;

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
import com.school.app.model.Activity;
import com.school.app.model.Event;
import com.school.app.model.Holiday;
import com.school.app.model.StudyMaterial;
import com.school.app.service.interfaces.ActivityService;
import com.school.app.service.interfaces.EventService;
import com.school.app.service.interfaces.HolidayService;
import com.school.app.service.interfaces.StudyMaterialService;

@RestController
@RequestMapping("/sms")
@CrossOrigin(origins = "http://localhost:4200")

public class DocumentController 
{
	@Autowired
	private HolidayService holidayservice;
	
	@Autowired
	private EventService eventservice;
	
	@Autowired
	private ActivityService activityservice;
	
	@Autowired
	private StudyMaterialService studymaterialservice;
	
	//user side activity
	@GetMapping("/activities/{grNo}")
	public ResponseEntity<Object> getActivityListByStudent(@PathVariable int grNo,@RequestParam("page")int page)
	{
		return activityservice.getAllActivitiesByGrNo(grNo, page);
	}
	
	@GetMapping("/activities-month/{grNo}")
	public ResponseEntity<Object> getStudentActivityListByMonth(@PathVariable int grNo,@RequestParam("month")int month,@RequestParam("page")int page)
	{
		return activityservice.getAllStudentActivitiesByMonth(grNo,month,page);
	}
	
	@GetMapping("/activities-year/{grNo}")
	public ResponseEntity<Object> getStudentActivityListByYear(@PathVariable int grNo,@RequestParam("year")String year,@RequestParam("page")int page)
	{
		return activityservice.getAllStudentActivitiesByYear(grNo,year,page);
	}
	
	@GetMapping("/activities-MAndY/{grNo}")
	public ResponseEntity<Object> getStudentActivityListByMonthAndYear(@PathVariable int grNo,@RequestParam("month")int month,@RequestParam("year")String year)
	{
		return activityservice.getAllStudentActivitiesByMAndY(grNo, month,year);
	}
	
	//parent
	@GetMapping("/activity-student/{id}")
	public ResponseEntity<Object> getActivityByMonthAndYear(@PathVariable int id,@RequestParam("month")int month,@RequestParam("year")String year)
	{
		return activityservice.getActivityByMonthAndYear(id, month, year);
	}	
		
	
	@GetMapping("/activity/{id}")
	public ResponseEntity<Object> getActivity(@PathVariable int id)
	{
		return activityservice.getActivityById(id);
	}

	@PostMapping("/activity")
	public ResponseEntity<Object> addActivity(@RequestBody Activity activity)
	{
		return activityservice.saveActivity(activity);
	}

	@PutMapping("/activity/{id}")
	public ResponseEntity<Object> updateActivity(@RequestBody Activity activity,@PathVariable int id)
	{
		return activityservice.updateActivity(activity, id);
	}
	
	@DeleteMapping("/activity/{id}")
	public ResponseEntity<Object> deleteActivity(@PathVariable int id)
	{
		return activityservice.deleteActivityById(id);
	}
	
	
	//filter
	@GetMapping("/holidays")
	public ResponseEntity<Object> getAllHoliday(@RequestParam("page") int page)
	{
		return holidayservice.getAllHolidayList(page);
	}
	
	@GetMapping("/holiday-name")
	public ResponseEntity<Object> getAllHolidayByName(@RequestParam("name") String name,@RequestParam("page")int page)
	{
		return holidayservice.getAllHolidayByName(name,page);
	}
	
	@GetMapping("/holiday-home")
	public ResponseEntity<Object> getHolidays()
	{
		return holidayservice.getHolidays();
	}
	
	@GetMapping("/holiday/{id}")
	public ResponseEntity<Object> getHoliday(@PathVariable int id)
	{
		return holidayservice.getHolidayById(id);
	}
	
	@PostMapping("/holiday")	
	public ResponseEntity<Object> addHoliday(@RequestBody Holiday holiday)
	{
		return holidayservice.saveHoliday(holiday);
	}
	
	@DeleteMapping("/holiday/{id}")
	public ResponseEntity<Object> deleteHoliday(@PathVariable int id)
	{
		return holidayservice.deleteHolidayById(id);
	}
	
	@PutMapping("/holiday/{id}")
	public ResponseEntity<Object> updateHoliday(@RequestBody Holiday holiday,@PathVariable int id)
	{
		return holidayservice.updateHoliday(holiday, id);
	}
	
	//event
	@GetMapping("/events")
	public ResponseEntity<Object> getAllEvents(@RequestParam("page") int page)
	{
		return eventservice.getAllEventList(page);
	}
	
	@GetMapping("/event-home")
	public ResponseEntity<Object> getEvents()
	{
		return eventservice.getEvents();
	}
	
	@GetMapping("/event-name")
	public ResponseEntity<Object> getAllEventByName(@RequestParam("name") String name,@RequestParam("page")int page)
	{
		return eventservice.getAllEventByName(name,page);
	}
	
	@GetMapping("/event/{id}")
	public ResponseEntity<Object> getEventById(@PathVariable int  id)
	{
		return eventservice.getEventyById(id);
	}
	
	@PostMapping("/event")
	public ResponseEntity<Object> addEvent(@RequestBody Event event)
	{
		return eventservice.saveEvent(event);
	}
	
	@PutMapping("/event/{id}")
	public ResponseEntity<Object> updateEvent(@RequestBody Event event,@PathVariable int id)
	{
		return eventservice.updateEvent(event, id);
	}
	
	@DeleteMapping("/event/{id}")
	public ResponseEntity<Object> deleteEvent(@PathVariable int id)
	{
		return eventservice.deleteEventyById(id);
	}
	
	//user side documents
	@GetMapping("/teacher-count-studymaterial/{id}")
	public int getByStandardAndTeacher(@PathVariable int id)
	{
		return studymaterialservice.getStudyMaterialBySAndT(id);
	}
	
	@GetMapping("/studymaterials")
	public ResponseEntity<Object> getStudyMaterialList(@RequestParam("page") int page)
	{
		return studymaterialservice.getAllStudyMaterials(page);
	}
	
	@GetMapping("/studymaterial-standard")
	public ResponseEntity<Object> getStudyMaterialByStandard(@RequestParam("sname") String StandardName,@RequestParam("page") int page)
	{
		return studymaterialservice.getAllStudyMaterialsByStandard(StandardName, page);
	}
	
	@GetMapping("/studymaterial/{id}")
	public ResponseEntity<Object> getStudyMaterial(@PathVariable int id)
	{
		return studymaterialservice.getStudyMaterialById(id);
	}
	
	@PostMapping("/studymaterial")	
	public ResponseEntity<Object> addStudyMaterial(@RequestBody StudyMaterial studymaterial)
	{
		return studymaterialservice.saveStudyMaterial(studymaterial);
	}
	
	@DeleteMapping("/studymaterial/{id}")
	public ResponseEntity<Object> deleteStudyMaterial(@PathVariable int id)
	{
		return studymaterialservice.deleteStudyMaterialById(id);
	}
	
	@PutMapping("/studymaterial/{id}")
	public ResponseEntity<Object> updateStudyMaterial(@RequestBody StudyMaterial studymaterial,@PathVariable int id)
	{
		return studymaterialservice.updateStudyMaterial(studymaterial, id);
	}
	
	@GetMapping("/studymaterialTypes")
	public ResponseEntity<Object> getStudyMaterialTypeList()
	{
		return studymaterialservice.getAllStudyMaterialTypes();
	}
	
	//progress report
	@GetMapping("studymaterial-student/{id}")
	public ResponseEntity<Object> getStudyMaterialByParent(@PathVariable int id,@RequestParam("page")int page)
	{
		return studymaterialservice.getStudyMaterialByParent(id, page);
	}
	
}
