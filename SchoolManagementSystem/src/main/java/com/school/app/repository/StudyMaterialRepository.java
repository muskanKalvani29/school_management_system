package com.school.app.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import com.school.app.model.StudyMaterial;

@Repository
public interface StudyMaterialRepository extends PagingAndSortingRepository<StudyMaterial, Integer>{

	//doubt
	@Query(nativeQuery = true,value = "select * from study_material\r\n"
			+ "	where standard_standard_id= :id order by standard_standard_id asc limit 2")
	public List<StudyMaterial> findNoOfStudyMaterialById(int id);
	
	@Query(nativeQuery = true,value = "select * from study_material\r\n"
			+ "	where standard_standard_id= :s_id ")
	public List<StudyMaterial> findStudyMaterialsById(int s_id);
	
	public Page<StudyMaterial> findAllByStandardStandardId(int sId,Pageable pageable);

}
