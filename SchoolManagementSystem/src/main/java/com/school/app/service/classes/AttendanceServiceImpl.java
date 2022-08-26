package com.school.app.service.classes;

import java.time.LocalDate;
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
import com.school.app.model.Attendance;
import com.school.app.model.Parent;
import com.school.app.model.Student;
import com.school.app.repository.AttendanceRepository;
import com.school.app.repository.ParentRepository;
import com.school.app.service.interfaces.AttendanceService;

@Service
public class AttendanceServiceImpl implements AttendanceService
{
	@Autowired
	private AttendanceRepository attendancerepository;
	
	@Autowired
	private ParentRepository parentRepository;

	@Override
	public ResponseEntity<Object> saveAttendance(Attendance attendance) 
	{
		try
		{
			Attendance add_attendance = attendancerepository.save(attendance);
			return ResponseEntity.status(HttpStatus.CREATED).body(add_attendance);
		}catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@Override
	public ResponseEntity<Object> getAttendancesByStudentId(int grNo,int page) 
	{
		try {
			Pageable pageable = PageRequest.of(page, 8, Sort.by("year").descending());
			Page<Attendance> attendance_list = (Page<Attendance>)attendancerepository.findAllByStudentGrNo(grNo,pageable);
			if(attendance_list.isEmpty()==true)
			{
				throw new ResourceNotFoundException("Sorry! Not Found");
			}
			return ResponseEntity.status(HttpStatus.OK).body(attendance_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getAttendanceById(int id) 
	{
		Attendance attendance =  attendancerepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try {
			return ResponseEntity.status(HttpStatus.OK).body(attendance);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> updateAttendance(Attendance attendance, int id) 
	{
		Attendance attendanceById =  attendancerepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try
		{
			attendanceById.setAbsentDays(attendance.getAbsentDays());
			attendanceById.setMonth(attendance.getMonth());
			attendanceById.setPresentDays(attendance.getPresentDays());
			attendanceById.setTotalDays(attendance.getTotalDays());
			attendanceById.setYear(attendance.getYear());
			
			attendancerepository.save(attendanceById);
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(attendanceById);
		}catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> deleteAttendanceById(int id) 
	{
		attendancerepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try {
			attendancerepository.deleteById(id);
			return ResponseEntity.status(HttpStatus.OK).build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	//progress report
	@Override
	public ResponseEntity<Object> getAttendanceByMonthAndYear(int id, String month, String year) {
		Parent parent = parentRepository.findByUserUserId(id);
		Student student = parent.getStudent();
		List<Attendance> attendance =attendancerepository.findAllByStudentGrNoAndMonthAndYear(student.getGrNo(),month,year);
		if(attendance.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found");
		}
		try {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(attendance);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getAttendanceByMonth(int grNo,String month, int page) 
	{
		Pageable pageable = PageRequest.of(page, 8, Sort.by("year").descending());
		Page<Attendance> attendance_list = (Page<Attendance>)attendancerepository.findAllByStudentGrNoAndMonth(grNo,month,pageable);
		if(attendance_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(attendance_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getAttendanceByYear(int grNo, String year, int page) {
		Pageable pageable = PageRequest.of(page, 8, Sort.by("year").descending());
		Page<Attendance> attendance_list = (Page<Attendance>)attendancerepository.findAllByStudentGrNoAndYear(grNo, year, pageable);
		if(attendance_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(attendance_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getAttendanceByMAndY(int grNo, String month, String year) {
		List<Attendance> attendance =attendancerepository.findAllByStudentGrNoAndMonthAndYear(grNo,month,year);
		if(attendance.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found");
		}
		try {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(attendance);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}