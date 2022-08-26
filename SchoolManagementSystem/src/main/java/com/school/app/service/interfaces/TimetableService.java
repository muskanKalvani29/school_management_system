package com.school.app.service.interfaces;

import org.springframework.http.ResponseEntity;
import com.school.app.model.TimeTable;

public interface TimetableService 
{
	public  ResponseEntity<Object> saveTimeTable(TimeTable timeTable);
	
	public ResponseEntity<Object> getAllTimeTables(int page);
	
	public  ResponseEntity<Object> getTimeTableById(int id);
 	
 	public ResponseEntity<Object> deleteTimeTableById(int id);

	public ResponseEntity<Object> updateTimeTable(TimeTable timeTable, int id);
	
	public ResponseEntity<Object> getTimeTableByStandard(String StandardName,int page);
	
	public ResponseEntity<Object> getTimeTableBySAndD(String StandardName,int dId,int page);
	
	//parent
	public ResponseEntity<Object> getTimeTableByStudentAndStandard(int id,int page);
}
