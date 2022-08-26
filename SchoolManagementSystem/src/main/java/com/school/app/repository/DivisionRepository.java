package com.school.app.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.school.app.model.Division;

@Repository
public interface DivisionRepository extends PagingAndSortingRepository<Division, Integer>
{

	Division findByDivisionName(String division);

}