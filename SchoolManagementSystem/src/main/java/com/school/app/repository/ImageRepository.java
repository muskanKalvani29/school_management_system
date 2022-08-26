package com.school.app.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import com.school.app.model.image;


@Repository
public interface ImageRepository extends PagingAndSortingRepository<image, Integer> {

	@Query(nativeQuery = true,value ="Select * from  image where (image_name)= 'activity'order by upload_date DESC LIMIT 5")
	public List<image> findByActivity();
	
	@Query(nativeQuery = true,value ="Select * from image where (image_name)= 'achievement' order by upload_date DESC LIMIT 6")
	public List<image> findByAchievement();

	public Page<image> findAllByImageName(String name, Pageable pageable);

}
