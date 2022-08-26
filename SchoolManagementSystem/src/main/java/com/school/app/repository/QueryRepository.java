package com.school.app.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.school.app.model.Query;

@Repository
public interface QueryRepository extends PagingAndSortingRepository<Query, Integer>{

	public Page<Query> findAllByParentParentId(int parentId, Pageable pageable);

}
