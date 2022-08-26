package com.school.app.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.school.app.model.BestStudent;

@Repository
public interface BestStudentRepository extends PagingAndSortingRepository<BestStudent, Integer>
{
	public Page<BestStudent> findAll(Pageable pageable);

	@Query(nativeQuery = true,value="select * from best_student where (name) like :name% order by upload_date DESC")
	public Page<BestStudent> findAllBestStudentByName(String name, Pageable pageable);

	@Query(nativeQuery = true,value="select * from best_student order by upload_date DESC limit 3 ")
	public List<BestStudent> findAllBestStudents();
}
