package com.school.app.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.school.app.model.SchoolDetail;

@Repository
public interface SchoolDetailRepository extends PagingAndSortingRepository<SchoolDetail, Integer>{

}
