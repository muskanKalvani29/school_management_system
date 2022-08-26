package com.school.app.repository;

import java.util.List;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.school.app.model.Subject;

@Repository
public interface SubjectRepository extends PagingAndSortingRepository<Subject, Integer>
{
	public List<Subject> findAllByStandardStandardId(int sId);
}
