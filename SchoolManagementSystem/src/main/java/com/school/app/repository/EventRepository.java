package com.school.app.repository;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.school.app.model.Event;

@Repository
public interface EventRepository extends PagingAndSortingRepository<Event, Integer>
{
	@Query(nativeQuery = true,value = "select * from event where (event_name) like :name% order by event_enddate DESC")
	public Page<Event> findAllByName(String name,Pageable pageable);

	@Query(nativeQuery = true , value="select * from event order by event_enddate DESC limit 4")
	public List<Event> findAllEvent();
}
