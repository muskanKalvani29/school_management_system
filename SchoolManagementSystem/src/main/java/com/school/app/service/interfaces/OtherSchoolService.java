 package com.school.app.service.interfaces;

import org.springframework.http.ResponseEntity;
import com.school.app.model.BestStudent;
import com.school.app.model.FeeStructure;
import com.school.app.model.SchoolDetail;
import com.school.app.model.image;

public interface OtherSchoolService
{
	
 	//filter
 	public ResponseEntity<Object> feeStrctureList(int page);
 	
 	public ResponseEntity<Object> feeStrctureList();
 	
 	public ResponseEntity<Object> feeStructureByMediumAndStandard(String medium,String Standard);
 	
 	public ResponseEntity<Object> getFeeStructureByMedium(String medium);
 	
 	public ResponseEntity<Object> updateFeeStructreById(FeeStructure feeStructure,int id);
 	
 	public ResponseEntity<Object> getFeeStructureById(int id);
 	
 	//image
 	public ResponseEntity<Object> getAllImages(int page);
	
	public ResponseEntity<Object> saveImage(image image);
	
	public ResponseEntity<Object> updateImage(image image, int id);
 	
	public ResponseEntity<Object> getImageById(int id);
 	
 	public ResponseEntity<Object> deleteImageById(int id);
 	
 	public ResponseEntity<Object> getImageByActivity();
 	
 	public ResponseEntity<Object> getImageByAchievement();
 	
 	public ResponseEntity<Object> getImageByName(String name,int page);
 	
 	//best student
 	public ResponseEntity<Object> saveBestStudent(BestStudent bestStudent);
		
 	public ResponseEntity<Object> getAllBestStudents(int page);
	
	public ResponseEntity<Object> getBestStudentById(int id); 
	
	public ResponseEntity<Object> updateBestStudent(BestStudent bestStudent,int id);
	
	public ResponseEntity<Object> deleteBestStudentById(int id); 
	
	public ResponseEntity<Object> getBestStudentByName(String name,int page);
	
	// best student limit 3
	public  ResponseEntity<Object> getBestStudents();
	
	//schooldetails
	public  ResponseEntity<Object> updateSchoolDetail(SchoolDetail schooldetail,int id);

	public ResponseEntity<Object> getSchoolDetail();
	 		 	
}
