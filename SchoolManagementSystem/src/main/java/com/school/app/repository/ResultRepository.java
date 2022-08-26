package com.school.app.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.school.app.model.Result;

@Repository
public interface ResultRepository extends PagingAndSortingRepository<Result, Integer>
{
	public Page<Result> findAllByStudentGrNo(int grNo,Pageable pageable);

	@Query(nativeQuery = true,value = "select * from result,student\r\n"
			+ "where  result.student_gr_no=student.gr_no And\r\n"
			+ "	result.exam_type_examtype_id= :e_id And\r\n"
			+ "    student.standard_standard_id= :s_id And student.division_division_id= :d_id\r\n"
			+ "    And result.year= :year\r\n"
			+ "    ")
	public List<Result> findAllByStandardAndDivisionAndExamTypeAndYear(int s_id, int d_id, int e_id, String year);
}
