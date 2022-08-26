package com.school.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.school.app.model.BestStudent;
import com.school.app.model.FeeStructure;
import com.school.app.model.SchoolDetail;
import com.school.app.model.image;
import com.school.app.service.interfaces.OtherSchoolService;

@RestController
@RequestMapping("/sms")
@CrossOrigin(origins = "http://localhost:4200")
public class OtherSchoolServiceController 
{
	@Autowired
	private OtherSchoolService OtherSchoolService;
	
	//filters
	
	@GetMapping("/fee-structures")
	public ResponseEntity<Object> getFeeStructureList(@RequestParam("page") int page)
	{
		return OtherSchoolService.feeStrctureList(page);
	}
	
	
	@GetMapping("/fee-structure")
	public ResponseEntity<Object> getFeeStructureByMedium(@RequestParam("medium") String medium)
	{
		return OtherSchoolService.getFeeStructureByMedium(medium);
	}
	
	@GetMapping("/MediumAndStandard")
	public ResponseEntity<Object> getFeeStructureByMediumAndStandard(@RequestParam("medium") String medium,@RequestParam("standard")String Standard)
	{
		return OtherSchoolService.feeStructureByMediumAndStandard(medium, Standard);
	}
	
	@GetMapping("/fee-structure/{id}")
	public ResponseEntity<Object> getFeeStructure(@PathVariable int id)
	{
		return OtherSchoolService.getFeeStructureById(id);
	}
		
	@PutMapping("/fee-structure/{id}")
	public ResponseEntity<Object> updateFeeStructure(@RequestBody FeeStructure feeStructure,@PathVariable int id)
	{
		return OtherSchoolService.updateFeeStructreById(feeStructure, id);
	}
	
	//home also called this url
	@GetMapping("/bestStudents")
	public ResponseEntity<Object> getBestStudentList(@RequestParam("page")int page)
	{
		return OtherSchoolService.getAllBestStudents(page);
	}
	
	@GetMapping("/bestStudent")
	public ResponseEntity<Object> getBestStudents()
	{
		return OtherSchoolService.getBestStudents();
	}
	
	@GetMapping("/bestStudent-name")
	public ResponseEntity<Object> getBestStudentByName(@RequestParam("name")String name,@RequestParam("page")int page)
	{
		return OtherSchoolService.getBestStudentByName(name, page);
	}
	
	@GetMapping("/bestStudent/{id}")
	public ResponseEntity<Object> getBestStudent(@PathVariable int id)
	{ 
		return OtherSchoolService.getBestStudentById(id);
	}
	
	@PostMapping("/bestStudent")
	public ResponseEntity<Object> addBestStudent(@RequestBody BestStudent bestStudent)
	{
		return OtherSchoolService.saveBestStudent(bestStudent);
	}
		
	@PutMapping("/bestStudent/{id}")
	public ResponseEntity<Object> updateBestStudent(@RequestBody BestStudent bestStudent,@PathVariable int id)
	{
		return OtherSchoolService.updateBestStudent(bestStudent, id);
	}
	
	@DeleteMapping("/bestStudent/{id}")
	public ResponseEntity<Object> deleteBestStudent(@PathVariable int id)
	{
		return OtherSchoolService.deleteBestStudentById(id);
	}
	
	@GetMapping("/images")
	public ResponseEntity<Object> getImageList(@RequestParam("page") int page)
	{
		return OtherSchoolService.getAllImages(page);
	}
	
	@GetMapping("/image-name")
	public ResponseEntity<Object> getImageListByName(@RequestParam("name")String name,@RequestParam("page") int page)
	{
		return OtherSchoolService.getImageByName(name, page);
	}
	
	@GetMapping("/image/{id}")
	public ResponseEntity<Object> getImage(@PathVariable int id)
	{
		return OtherSchoolService.getImageById(id);
	}
	
	@PostMapping("/image")
	public ResponseEntity<Object> addImage(@RequestBody image image)
	{
		return OtherSchoolService.saveImage(image);
	}
		
	@PutMapping("/image/{id}")
	public ResponseEntity<Object> updateImage(@RequestBody image image,@PathVariable int id)
	{
		return OtherSchoolService.updateImage(image, id);
	}
	
	@DeleteMapping("/image/{id}")
	public ResponseEntity<Object> deleteImage(@PathVariable int id)
	{
		return OtherSchoolService.deleteImageById(id);
	}
	
	@GetMapping("/schooldetails")
	public ResponseEntity<Object> getSchoolDetail()
	{
		return OtherSchoolService.getSchoolDetail();
	}
	
	@PutMapping("/schooldetail/{id}")
	public ResponseEntity<Object> updateSchoolDetail(@RequestBody SchoolDetail schooldetail,@PathVariable int id)
	{
		return OtherSchoolService.updateSchoolDetail(schooldetail, id);
	}
	
	//home
	@GetMapping("/feestructure-list")
	public ResponseEntity<Object> getFeeStructureList()
	{
		return OtherSchoolService.feeStrctureList();
	}
	
	@GetMapping("/image-activity")
	public ResponseEntity<Object> getImageByActivity()
	{
		return OtherSchoolService.getImageByActivity();
	}
	
	@GetMapping("/image-achievement")
	public ResponseEntity<Object> ImageByAchievement()
	{
		return OtherSchoolService.getImageByAchievement();
	}
}
