package com.school.app.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.school.app.model.ResultFile;

public interface ResultFileRepository extends PagingAndSortingRepository<ResultFile, Integer> 
{

    public Page<ResultFile> findAllByStandardStandardIdAndDivisionDivisionId(int standardId, int divisionId,
			Pageable pageable);

}
