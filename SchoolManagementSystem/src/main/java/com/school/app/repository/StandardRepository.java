package com.school.app.repository;


import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.school.app.model.Standard;


@Repository
public interface StandardRepository extends PagingAndSortingRepository<Standard, Integer>
{
	Standard findByStandardName(String standard);
	
	@Modifying
	@Transactional
	@Query(nativeQuery = true,value="delete from teacher_standard where teacher_teacher_id= :id")
	public void deleteTeacherStandardById(int id);

	@Query(nativeQuery = true,value="select * from standard where standard_name= :standard")
	Standard findByStandardStandardNames(String standard);
	
	
}