package com.school.app.service.interfaces;

import java.time.Month;

import org.springframework.http.ResponseEntity;
import com.school.app.model.Activity;

public interface ActivityService
{
	public ResponseEntity<Object> saveActivity(Activity activity);
	
	public ResponseEntity<Object> getAllActivitiesByGrNo(int grNo,int page);
	
	public ResponseEntity<Object> getActivityById(int id);
	
 	public ResponseEntity<Object> updateActivity(Activity activity,int id);
 	
 	public ResponseEntity<Object> deleteActivityById(int id);

 	
 	//progress report
 	public ResponseEntity<Object> getActivityByMonthAndYear(int id, int month, String year);

 	//in teacher
	public ResponseEntity<Object> getAllStudentActivitiesByMonth(int grNo, int month, int page);

	public ResponseEntity<Object> getAllStudentActivitiesByYear(int grNo, String year, int page);

	public ResponseEntity<Object> getAllStudentActivitiesByMAndY(int grNo, int month, String year);

	
}
