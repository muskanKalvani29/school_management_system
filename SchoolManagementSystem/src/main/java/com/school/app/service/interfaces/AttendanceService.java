package com.school.app.service.interfaces;

import org.springframework.http.ResponseEntity;
import com.school.app.model.Attendance;

public interface AttendanceService
{
	public ResponseEntity<Object> saveAttendance(Attendance attendance);

	public ResponseEntity<Object> getAttendancesByStudentId(int grNo,int page);
	
	public ResponseEntity<Object> getAttendanceById(int id);
		
	public ResponseEntity<Object> updateAttendance(Attendance attendance,int id);
	 	
	public ResponseEntity<Object> deleteAttendanceById(int id);
	 
	//teacher side attendance
    public	ResponseEntity<Object> getAttendanceByMonth(int grNo, String month, int page);
    
    public	ResponseEntity<Object> getAttendanceByYear(int grNo, String year, int page);
    
    public	ResponseEntity<Object> getAttendanceByMAndY(int grNo, String month,String year);

	//progress report
	public ResponseEntity<Object> getAttendanceByMonthAndYear(int id, String month, String year);
}
