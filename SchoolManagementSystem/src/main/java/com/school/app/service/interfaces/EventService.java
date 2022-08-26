package com.school.app.service.interfaces;


import org.springframework.http.ResponseEntity;
import com.school.app.model.Event;

public interface EventService 
{
 	//filters
 	public ResponseEntity<Object> getAllEventList(int page);
 	
 	public ResponseEntity<Object> getAllEventByName(String name, int page);
 	
 	public ResponseEntity<Object> getEventyById(int id);
 	
 	public ResponseEntity<Object> saveEvent(Event event);
	
 	public ResponseEntity<Object> updateEvent(Event event,int id);
 	
 	public ResponseEntity<Object> deleteEventyById(int id);
 	
 	public ResponseEntity<Object> getEvents();
}
