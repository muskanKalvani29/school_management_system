package com.school.app.repository;


import java.time.Month;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.school.app.model.Activity;
import com.school.app.model.Attendance;

@Repository
public interface ActivityRepository extends PagingAndSortingRepository<Activity, Integer>
{
	public Page<Activity> findAllByStudentGrNo(int grNo,Pageable pageable);
	

	@Query(nativeQuery = true,value="select * from activity,student\r\n"
			+ "where  activity.student_gr_no=student.gr_no\r\n"
			+ " And student.gr_no= :grNo\r\n"
			+ "		And MONTH(activity.upload_date)= :month\r\n"
			+ "        And YEAR(activity.upload_date)= :year order by upload_date desc")
	public List<Activity> findAllByStudentGrNoAndMonthAndYear(int grNo, int month, String year);
	
	
	@Query(nativeQuery = true,value="select * from activity,student\r\n"
			+ "where  activity.student_gr_no=student.gr_no\r\n"
			+ " And student.gr_no= :grNo\r\n"
			+ "		And MONTH(activity.upload_date)= :month  order by upload_date desc")
	public Page<Activity> findAllByStudentGrNoAndMonth(int grNo, int month, Pageable pageable);
	
	@Query(nativeQuery = true,value="select * from activity,student\r\n"
			+ "where  activity.student_gr_no=student.gr_no\r\n"
			+ " And student.gr_no= :grNo\r\n"
			+ "        And YEAR(activity.upload_date)= :year order by upload_date desc")
	public Page<Activity> findAllByStudentGrNoAndYear(int grNo, String year, Pageable pageable);

}