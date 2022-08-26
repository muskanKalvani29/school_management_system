package com.school.app.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import com.school.app.model.Teacher;

@Repository
public interface TeacherRepository extends PagingAndSortingRepository<Teacher, Integer>
{
	@Query(nativeQuery = true,value="select *\r\n"
			+ "from teacher,user\r\n"
			+ "where teacher.user_user_id=user.user_id And user.name like :name%")
	public Page<Teacher> findAllTeacherByName(String name,Pageable pageable);
	
	@Query(nativeQuery = true,value = "select count(*) from teacher")
	public int findTotalTeacher();
	
	@Query(nativeQuery = true,value="select * from teacher where user_user_id= :id")
	public Teacher findTeacherByUserId(int id);
	
	@Query(nativeQuery = true,value="select *\r\n"
			+ "from teacher,user\r\n"
			+ "where teacher.user_user_id=user.user_id And user_name= :username")
	public Teacher findTeacherByUserName(String username);

	
}
