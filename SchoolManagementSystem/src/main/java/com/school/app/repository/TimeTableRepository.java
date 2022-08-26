package com.school.app.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.school.app.model.TimeTable;

@Repository
public interface TimeTableRepository extends PagingAndSortingRepository<TimeTable, Integer>
{
	public Page<TimeTable> findAllByStandardStandardId(int sId,Pageable pageable);
	
	public Page<TimeTable> findAllByStandardStandardIdAndDivisionDivisionId(int sId,int dId,Pageable pageable);

}
