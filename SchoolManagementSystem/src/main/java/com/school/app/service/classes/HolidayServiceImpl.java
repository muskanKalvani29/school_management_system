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
import com.school.app.model.Holiday;
import com.school.app.repository.HolidayRepository;
import com.school.app.service.interfaces.HolidayService;

@Service
public class HolidayServiceImpl implements HolidayService
{
	@Autowired
	private HolidayRepository holidayrepository;
	
	//filter
	@Override
	public ResponseEntity<Object> saveHoliday(Holiday holiday) 
	{
		try
		{
			Holiday add_holiday = holidayrepository.save(holiday);
			return ResponseEntity.status(HttpStatus.CREATED).body(add_holiday);
		}catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getAllHolidayList(int page) 
	{
		Pageable pageable= PageRequest.of(page, 8,Sort.by("holidayEnddate").descending());
		Page<Holiday> holiday_list = (Page<Holiday>)holidayrepository.findAll(pageable);
		if(holiday_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(holiday_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getHolidays() {
		List<Holiday> holiday_list = (List<Holiday>) holidayrepository.findAllHoliday();
		if(holiday_list.size()<1)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(holiday_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@Override
	public ResponseEntity<Object> getAllHolidayByName(String name,int page) {
		Pageable pageable= PageRequest.of(page, 8,Sort.by("holidayEnddate").descending());
		Page<Holiday> holiday_list =(Page<Holiday>)holidayrepository.findHolidayByName(name,pageable);
		if(holiday_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(holiday_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@Override
	public ResponseEntity<Object> getHolidayById(int id)
	{
		Holiday holiday =  holidayrepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try {
			return ResponseEntity.status(HttpStatus.OK).body(holiday);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}

	@Override
	public ResponseEntity<Object> deleteHolidayById(int id) 
	{	
		holidayrepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try {
			holidayrepository.deleteById(id);
			return ResponseEntity.status(HttpStatus.OK).build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}

	@Override
	public ResponseEntity<Object> updateHoliday(Holiday holiday, int id)
	{
		Holiday holidayById =  holidayrepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try
		{
			holidayById.setHolidayDescription(holiday.getHolidayDescription());
			holidayById.setHolidayEnddate(holiday.getHolidayEnddate());
			holidayById.setHolidayName(holiday.getHolidayName());
			holidayById.setHolidayStartdate(holiday.getHolidayStartdate());
			
			holidayrepository.save(holidayById);
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(holidayById);
		}catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}
