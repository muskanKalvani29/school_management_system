package com.school.app.repository;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import com.school.app.model.FeeStructure;

@Repository
public interface FeeStructureRepository extends PagingAndSortingRepository<FeeStructure, Integer> 
{
	@Query(nativeQuery = true, value = "select * from fee_structure where (medium) = :medium ")
	public List<FeeStructure> feeStructureByMedium(String medium);
	 
	@Query(nativeQuery = true, value = "select * from fee_structure where (medium) = :medium And (standard) = :standard")
	public List<FeeStructure> feeStructureByMediumAndStandard(String medium,String standard);
	
//	@Query(nativeQuery = true, value = "update fee_structure where (medium) = :medium And (standard) = :standard")
//	public FeeStructure saveByMediumAndStandard(String medium,String standard);
}
