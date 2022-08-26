package com.school.app.controller;


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
import com.school.app.model.Attendance;
import com.school.app.model.Student;
import com.school.app.service.interfaces.AttendanceService;
import com.school.app.service.interfaces.StudentService;

@RestController
@RequestMapping("/sms")
@CrossOrigin(origins = "http://localhost:4200")
public class StudentController 
{
	@Autowired
	StudentService studentservice;
	
	@Autowired
	AttendanceService attendanceservice;
	
	//filters
	@GetMapping("/count-students")
	public ResponseEntity<Object> getStudentList()
	{
		return studentservice.getallStudents();
	}
	
	@GetMapping("/students-standard")
	public ResponseEntity<Object> StudentListByStandard(@RequestParam("sname")String StandardName,@RequestParam("page") int page)
	{
		return studentservice.getStudentByStandardId(StandardName,page);
	}
	
	@GetMapping("/students-standard-divison")
	public ResponseEntity<Object> StudentListByStdAndDiv(@RequestParam("sname")String StandardName,@RequestParam("dId")int division,@RequestParam("page") int page)
	{
		return studentservice.getStrudentByStandardAndDivision(StandardName, division,page);
	}
	
	// kadhvani che
	@GetMapping("/students-feeStatus")
	public ResponseEntity<Object> StudentListByFeeStatus(@RequestParam("page") int page)
	{
		return studentservice.getAllStudentByFeeStatus(page);
	}
	
	@GetMapping("/students-feeStatus-standard")
	public ResponseEntity<Object> StudentListByFeeStatusAndStandrad(@RequestParam("sname")String StandardName,@RequestParam("page") int page)
	{
		return studentservice.getAllStudentByFeeStatusAndStandard(StandardName,page);
	}
	
	@GetMapping("/students-feeStatus-standard-division")
	public ResponseEntity<Object> StudentListByFeeStatusAndStandardAndDivision(@RequestParam("sname") String StandardName,@RequestParam("dId") int division,@RequestParam("page") int page)
	{
		return studentservice.getAllStudentByFeeStatusAndSAndD(StandardName,division,page);
	}
	
	@GetMapping("/students")
	public ResponseEntity<Object> getStudentList(@RequestParam("page") int page)
	{
		return studentservice.getAllStudents(page);
	}
	
	@GetMapping("/student/{grNo}")
	public ResponseEntity<Object> getStudent(@PathVariable int grNo)
	{
		return studentservice.getStudentByGrNo(grNo);
	}
	
	@PostMapping("/student")
	public ResponseEntity<Object> addStudent(@RequestBody Student student)
	{
		return studentservice.saveStudent(student);
	}
		
	@PutMapping("/student/{grNo}")
	public ResponseEntity<Object> updateStudent(@RequestBody Student student,@PathVariable int grNo)
	{
		return studentservice.updateStudent(student, grNo);
	}
	
	@DeleteMapping("/student/{grNo}")
	public ResponseEntity<Object> deleteStudent(@PathVariable int grNo)
	{
		return studentservice.deleteStudentByGrNo(grNo);
	}
	//promotion page
	@PutMapping("student-standard-update")
	public ResponseEntity<Object> updatestudentByStandard(@RequestParam("from_standard")String from_standard,@RequestParam("to_standard") String to_standard)
	{
		return studentservice.updateStudentByStandard(from_standard, to_standard);
	}
	
	//update feestatus
	@PutMapping("student-feeStatus")
	public ResponseEntity<Object> updatestudentFeeStatus(@RequestParam("status")String status)
	{
		return studentservice.updateStudentFeeStatus(status);
	}
	
	//user side urls
	@GetMapping("/teacher-count-students/{id}")
	public int getStudentByStandardAndTeacher(@PathVariable int id)
	{
		return studentservice.getStudentBySAndT(id);
	}
	
	@GetMapping("/attendances/{grNo}")
	public ResponseEntity<Object> getAttendanceList(@PathVariable int grNo,@RequestParam("page")int page)
	{
		return attendanceservice.getAttendancesByStudentId(grNo,page);
	}
	
	@PostMapping("/attendance")
	public ResponseEntity<Object> addAttendance(@RequestBody Attendance attendance)
	{
		return attendanceservice.saveAttendance(attendance);
	}
	
	@GetMapping("/attendance/{id}")
	public ResponseEntity<Object> getAttendance(@PathVariable int id)
	{
		return attendanceservice.getAttendanceById(id);
	}
		
	@PutMapping("/attendance/{id}")
	public ResponseEntity<Object> updateAttendance(@RequestBody Attendance attendance,@PathVariable int id)
	{
		return attendanceservice.updateAttendance(attendance, id);
	}
	
	@DeleteMapping("/attendance/{id}")
	public ResponseEntity<Object> deleteAttendance(@PathVariable int id)
	{
		return attendanceservice.deleteAttendanceById(id);
	}
	
	//parent
	@GetMapping("student-info/{id}")
	public ResponseEntity<Object> getStudentByParentId(@PathVariable int id)
	{
		return studentservice.getStudentByParentId(id);
	}
	
	//progress report
	@GetMapping("attendance-student/{id}")
	public ResponseEntity<Object> getAttendanceByMonthAndYear(@PathVariable int id,@RequestParam("month")String month,@RequestParam("year")String year)
	{
		return attendanceservice.getAttendanceByMonthAndYear(id, month, year);
	}
	
	//teacher side attendance filter
	@GetMapping("attendance-month/{grNo}")
	public ResponseEntity<Object> getAttendanceByMonth(@PathVariable int grNo,@RequestParam("month")String month,@RequestParam("page")int page)
	{
		return attendanceservice.getAttendanceByMonth(grNo, month, page);
	}
	
	@GetMapping("attendance-year/{grNo}")
	public ResponseEntity<Object> getAttendanceByYear(@PathVariable int grNo,@RequestParam("year")String year,@RequestParam("page")int page)
	{
		return attendanceservice.getAttendanceByYear(grNo, year, page);
	}
	
	@GetMapping("attendance-MAndY/{grNo}")
	public ResponseEntity<Object> getAttendanceByMAndY(@PathVariable int grNo,@RequestParam("month")String month,@RequestParam("year")String year)
	{
		return attendanceservice.getAttendanceByMAndY(grNo, month, year);
	}
}
