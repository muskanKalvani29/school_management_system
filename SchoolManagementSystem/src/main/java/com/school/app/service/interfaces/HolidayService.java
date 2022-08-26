package com.school.app.service.interfaces;

import org.springframework.http.ResponseEntity;
import com.school.app.model.Holiday;

public interface HolidayService 
{
	
 	//filter
 	
 	public ResponseEntity<Object> getAllHolidayList(int page);
 	
 	public ResponseEntity<Object> getAllHolidayByName(String name, int page);
 	
 	public  ResponseEntity<Object> saveHoliday(Holiday holiday);
	
	public  ResponseEntity<Object> getHolidayById(int id);
	
	public  ResponseEntity<Object> updateHoliday(Holiday holiday,int id);
 	
 	public ResponseEntity<Object> deleteHolidayById(int id);
 	
 	public ResponseEntity<Object> getHolidays();
 	
}
