package com.school.app.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.school.app.model.Meeting;

@Repository
public interface MeetingRepository extends PagingAndSortingRepository<Meeting, Integer>
{
	@Query(nativeQuery = true,value="select * from meeting where usertype_usertype_id= 3 And meeting_name like :name%")
	public Page<Meeting> findMeetingByName(String name,Pageable pageable);
	
	@Query(nativeQuery = true,value="select * from meeting where usertype_usertype_id = 3")
	public Page<Meeting> findMeetingByTeacher(Pageable pageable);
	
	@Query(nativeQuery = true,value = "select * from meeting\r\n"
			+ "	where standard_standard_id= :id")
    public List<Meeting> findNoOfMeetingById(int id);
	
	@Query(nativeQuery = true,value="select * from meeting where usertype_usertype_id = 2")
	public Page<Meeting> findMeetingByParent(Pageable pageable);
	
	public Page<Meeting> findAllByStandardStandardId(int sId,Pageable pageable);
	
	public Page<Meeting> findAllByStandardStandardIdAndDivisionDivisionId(int sId,int dId,Pageable pageable);
}
