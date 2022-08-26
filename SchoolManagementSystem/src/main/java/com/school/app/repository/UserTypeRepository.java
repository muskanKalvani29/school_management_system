package com.school.app.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.school.app.model.UserType;

@Repository
public interface UserTypeRepository extends PagingAndSortingRepository<UserType, Integer>
{
	
}
