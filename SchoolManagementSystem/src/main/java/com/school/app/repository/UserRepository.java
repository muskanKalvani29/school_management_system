package com.school.app.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import com.school.app.model.User;

@Repository
public interface UserRepository extends PagingAndSortingRepository<User, Integer>
{
	//for authentication
	 public User findByUserName(String userName);

	public User findByEmailId(String email);

	public User findByUserId(int userId);

	

}