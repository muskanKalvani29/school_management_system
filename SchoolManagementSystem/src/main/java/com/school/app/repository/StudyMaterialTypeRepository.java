package com.school.app.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.school.app.model.StudyMaterialType;

@Repository
public interface StudyMaterialTypeRepository extends PagingAndSortingRepository<StudyMaterialType, Integer>{

}
