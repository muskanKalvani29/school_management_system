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
import com.school.app.model.Event;
import com.school.app.repository.EventRepository;
import com.school.app.service.interfaces.EventService;

@Service
public class EventServiceImpl implements EventService
{

	@Autowired
	private EventRepository eventrepository;
	
	//filter
	@Override
	public ResponseEntity<Object> getAllEventList(int page) 
	{
		Pageable pageable = PageRequest.of(page,8,Sort.by("eventEnddate").descending());
		Page<Event> event_list = (Page<Event>) eventrepository.findAll(pageable);
		if(event_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(event_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}
	
	public ResponseEntity<Object> getAllEventByName(String name,int page) 
	{
		Pageable pageable = PageRequest.of(page,8,Sort.by("eventEnddate").descending());
		Page<Event> event_list = (Page<Event>) eventrepository.findAllByName(name,pageable);
		if(event_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {	
			return ResponseEntity.status(HttpStatus.OK).body(event_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}
	
	@Override
	public ResponseEntity<Object> getEvents() {
		List<Event> event_list = (List<Event>) eventrepository.findAllEvent();
		if(event_list.size()<1)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(event_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@Override
	public ResponseEntity<Object> saveEvent(Event event) 
	{
		try
		{
			Event add_event = eventrepository.save(event);
			return ResponseEntity.status(HttpStatus.CREATED).body(add_event);
		}catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getEventyById(int id) 
	{
		Event event =  eventrepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try {	
			return ResponseEntity.status(HttpStatus.OK).body(event);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}	
	}

	@Override
	public ResponseEntity<Object> deleteEventyById(int id) 
	{
		eventrepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try {
			eventrepository.deleteById(id);
			return ResponseEntity.status(HttpStatus.OK).build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}

	@Override
	public ResponseEntity<Object> updateEvent(Event event, int id) 
	{
		Event eventById =  eventrepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try
		{
			eventById.setEventDescription(event.getEventDescription());
			eventById.setEventEnddate(event.getEventEnddate());
			eventById.setEventEndtime(event.getEventEndtime());
			eventById.setEventName(event.getEventName());
			eventById.setEventStartdate(event.getEventStartdate());
			eventById.setEventStarttime(event.getEventStarttime());
			
			eventrepository.save(eventById);
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(eventById);
		}catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}
