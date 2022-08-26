package com.school.app.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import com.school.app.model.Holiday;

@Repository
public interface HolidayRepository extends PagingAndSortingRepository<Holiday, Integer>
{
	@Query(nativeQuery = true,value = "select * from holiday where holiday_name like :name% order by holiday_enddate DESC")
	public Page<Holiday> findHolidayByName(String name,Pageable pageable);
	
	@Query(nativeQuery = true , value="select * from holiday order by holiday_enddate DESC limit 4")
	public List<Holiday> findAllHoliday();
}
