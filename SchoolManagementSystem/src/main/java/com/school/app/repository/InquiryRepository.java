package com.school.app.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.school.app.model.Inquiry;

@Repository
public interface InquiryRepository extends PagingAndSortingRepository<Inquiry, Integer>{

}
