package com.school.app.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.school.app.model.Parent;
import com.school.app.model.Student;

@Repository
public interface ParentRepository extends PagingAndSortingRepository<Parent, Integer>
{
	
	@Query(nativeQuery = true, value = "select * from parent where student_gr_no like :grNo% ")
	public Page<Parent> findAllparentsByGrNo(int grNo,Pageable pageable);
	
	@Query(nativeQuery = true, value="select * \r\n"
			+ "from parent,user\r\n"
			+ "where parent_id= :id AND parent.user_user_id = user.user_id")
	public Parent findParentById(int id);
	
	@Query(nativeQuery = true,value = "select count(*) from parent")
	public int findTotalParent();
	
	@Query(nativeQuery = true,value="select *\r\n"
			+ "from parent,user\r\n"
			+ "where parent.user_user_id=user.user_id And user_name= :username")
	public Parent findParentByUserName(String username);
	
	public Parent findByUserUserId(int id);

	public Parent findByStudentGrNo(int grNo);

}
