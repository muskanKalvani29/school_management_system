package com.school.app.service.classes;

import java.time.LocalDate;
import java.time.Month;
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
import com.school.app.model.Activity;
import com.school.app.model.Attendance;
import com.school.app.model.Parent;
import com.school.app.model.Student;
import com.school.app.repository.ActivityRepository;
import com.school.app.repository.ParentRepository;
import com.school.app.service.interfaces.ActivityService;

@Service
public class ActivityServiceImpl implements ActivityService
{
	@Autowired
	private ActivityRepository activityrepository;
	
	@Autowired
	private ParentRepository ParentRepository;
	
	LocalDate currentdate = LocalDate.now();
	
	@Override
	public ResponseEntity<Object> saveActivity(Activity activity) 
	{
		try
		{
			Activity add_activity = activityrepository.save(activity);
			return ResponseEntity.status(HttpStatus.CREATED).body(add_activity);
		}catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getActivityById(int id)
	{
		Activity activity =  activityrepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for : " + id));
		try {
			return ResponseEntity.status(HttpStatus.OK).body(activity);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}

	@Override
	public ResponseEntity<Object> deleteActivityById(int id) 
	{
		activityrepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try {
			activityrepository.deleteById(id);
			return ResponseEntity.status(HttpStatus.OK).build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}

	@Override
	public ResponseEntity<Object> updateActivity(Activity activity, int id) 
	{
		Activity activityById =  activityrepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Activity not found for id" + id));
		try
		{
			activityById.setAchievementDescription(activity.getAchievementDescription());
			activityById.setAchievementName(activity.getAchievementName());
			activityById.setActivityName(activity.getActivityName());
			activityById.setUploadDate(activity.getUploadDate());
			
			activityrepository.save(activityById);
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(activityById);
		}catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@Override
	public ResponseEntity<Object> getAllActivitiesByGrNo(int grNo,int page) 
	{
		Pageable pageable = PageRequest.of(page, 8, Sort.by("uploadDate").descending());
		Page<Activity> activity_list = (Page<Activity>)activityrepository.findAllByStudentGrNo(grNo,pageable);
		if(activity_list.isEmpty() ==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(activity_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	//progress report
	@Override
	public ResponseEntity<Object> getActivityByMonthAndYear(int id, int month, String year) {
		Parent parent = ParentRepository.findByUserUserId(id);
		Student student = parent.getStudent();
		List<Activity> activity_list = (List<Activity>) activityrepository.findAllByStudentGrNoAndMonthAndYear(student.getGrNo(),month, year);
		System.out.println("size of activity=> "+activity_list.size());
//		boolean ans = activity_list.isEmpty();
		if(activity_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found");
		}
		try {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(activity_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getAllStudentActivitiesByMonth(int grNo, int month, int page) {
		Pageable pageable = PageRequest.of(page, 8);
		Page<Activity> activity_list = (Page<Activity>)activityrepository.findAllByStudentGrNoAndMonth(grNo, month, pageable);
		if(activity_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(activity_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getAllStudentActivitiesByYear(int grNo, String year, int page) {
		Pageable pageable = PageRequest.of(page, 8);
		Page<Activity> activity_list = (Page<Activity>)activityrepository.findAllByStudentGrNoAndYear(grNo, year, pageable);
		if(activity_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(activity_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getAllStudentActivitiesByMAndY(int grNo, int month, String year) {
		List<Activity> activity_list =activityrepository.findAllByStudentGrNoAndMonthAndYear(grNo, month, year);
		if(activity_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found");
		}
		try {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(activity_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}
