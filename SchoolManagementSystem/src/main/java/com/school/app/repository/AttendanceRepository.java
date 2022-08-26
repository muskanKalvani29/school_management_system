package com.school.app.repository;



import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import com.school.app.model.Attendance;

@Repository
public interface AttendanceRepository extends PagingAndSortingRepository<Attendance, Integer>
{
	public Page<Attendance> findAllByStudentGrNo(int grNo,Pageable pageable); 
	

	public Page<Attendance> findAllByStudentGrNoAndMonth(int grNo, String month, Pageable pageable);
	
	public Page<Attendance> findAllByStudentGrNoAndYear(int grNo, String year, Pageable pageable);

//	@Query(nativeQuery = true,value="select * from attendance "
//			+ "where student_gr_no= :grNo And month= :month And year= :year")
	public List<Attendance> findAllByStudentGrNoAndMonthAndYear(int grNo, String month, String year);


	

}
