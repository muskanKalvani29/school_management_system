package com.school.app.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.school.app.model.Admin;

@Repository
public interface AdminRepository extends PagingAndSortingRepository<Admin, Integer>
{
	@Query(nativeQuery = true,value="select *\r\n"
			+ "from admin,user\r\n"
			+ "where admin.user_user_id=user.user_id And user_name= :username")
	public Admin findAdminByUserName(String username);
}