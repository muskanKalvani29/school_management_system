package com.school.app.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.school.app.model.ExamType;

@Repository
public interface ExamTypeRepository extends PagingAndSortingRepository<ExamType, Integer>{

}
