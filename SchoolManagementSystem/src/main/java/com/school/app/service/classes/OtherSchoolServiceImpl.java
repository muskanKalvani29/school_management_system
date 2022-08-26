package com.school.app.service.classes;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.school.app.exception.ResourceNotFoundException;
import com.school.app.model.BestStudent;
import com.school.app.model.FeeStructure;
import com.school.app.model.SchoolDetail;
import com.school.app.model.image;
import com.school.app.repository.BestStudentRepository;
import com.school.app.repository.FeeStructureRepository;
import com.school.app.repository.ImageRepository;
import com.school.app.repository.SchoolDetailRepository;
import com.school.app.service.interfaces.OtherSchoolService;

@Service
public class OtherSchoolServiceImpl implements OtherSchoolService
{
	@Autowired
	ImageRepository imagerepository;
	
	@Autowired
	FeeStructureRepository feestructurerepository;
	
	@Autowired
	private BestStudentRepository beststudentrepository;
	
	@Autowired
	private SchoolDetailRepository schooldetailrepository;
	
	//filters
	@Override
	public ResponseEntity<Object> feeStrctureList(int page)
	{
		try 
		{
			Pageable pageable = PageRequest.of(page, 8);
			Page<FeeStructure> feestructure_list = (Page<FeeStructure>)feestructurerepository.findAll(pageable);
			return ResponseEntity.status(HttpStatus.OK).body(feestructure_list);	
		} catch (Exception e) 
		{
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getFeeStructureByMedium(String medium) 
	{	
		List<FeeStructure> feeStructureByMedium = (List<FeeStructure>)feestructurerepository.feeStructureByMedium(medium);
		if(feeStructureByMedium.size() < 1)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(feeStructureByMedium);		
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}
	
	@Override
	public ResponseEntity<Object> feeStructureByMediumAndStandard(String medium, String Standard)
	{
		List<FeeStructure> feeStructure = (List<FeeStructure>) feestructurerepository.feeStructureByMediumAndStandard(medium, Standard);
		if(feeStructure.size() < 1)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(feeStructure);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> updateFeeStructreById(FeeStructure feeStructure,int id)
	{
		FeeStructure feeStructureById = feestructurerepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try {
			feeStructureById.setFee(feeStructure.getFee());
			feestructurerepository.save(feeStructureById);
			return ResponseEntity.status(HttpStatus.OK).body(feeStructureById);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@Override
	public ResponseEntity<Object> getFeeStructureById(int id)
	{
		FeeStructure feeStructureById = feestructurerepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try {
			return ResponseEntity.status(HttpStatus.OK).body(feeStructureById);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	//best student
	@Override
	public ResponseEntity<Object> saveBestStudent(BestStudent bestStudent){
		try
		{
			BestStudent add_bestStudent = beststudentrepository.save(bestStudent);
			return ResponseEntity.status(HttpStatus.CREATED).body(add_bestStudent);
		}catch(Exception e){
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getAllBestStudents(int page) {
		Pageable pageable =PageRequest.of(page,8,Sort.by("uploadDate").descending());
		Page<BestStudent> bestStudent_list = (Page<BestStudent>)beststudentrepository.findAll(pageable);
		if(bestStudent_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found. ");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(bestStudent_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}	
	}
	
	@Override
	public ResponseEntity<Object> getBestStudents() {
		List<BestStudent> bestStudent_list = (List<BestStudent>)beststudentrepository.findAllBestStudents();
		if(bestStudent_list.size()<1)
		{
			throw new ResourceNotFoundException("Sorry! Not Found. ");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(bestStudent_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}	
	}

	@Override
	public ResponseEntity<Object> getBestStudentByName(String name, int page) {
		Pageable pageable =PageRequest.of(page, 8);
		Page<BestStudent> bestStudent_list = (Page<BestStudent>)beststudentrepository.findAllBestStudentByName(name,pageable);
		if(bestStudent_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found. ");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(bestStudent_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}	
	}
	
	@Override
	public ResponseEntity<Object> getBestStudentById(int id) {
		BestStudent bestStudentById =  beststudentrepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try {
			return ResponseEntity.status(HttpStatus.OK).body(bestStudentById);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}
	
	@Override
	public ResponseEntity<Object> updateBestStudent(BestStudent bestStudent, int id) {
		BestStudent bestStudentById =  beststudentrepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try
		{
			bestStudentById.setImage(bestStudent.getImage());
			bestStudentById.setDivisionName(bestStudent.getDivisionName());
			bestStudentById.setMedium(bestStudent.getMedium());
			bestStudentById.setName(bestStudent.getName());
			bestStudentById.setStandardName(bestStudent.getStandardName());
			bestStudentById.setUploadDate(bestStudent.getUploadDate());
			
			beststudentrepository.save(bestStudentById);
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(bestStudentById);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
		
	@Override
	public ResponseEntity<Object> deleteBestStudentById(int id){
		beststudentrepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try {
			beststudentrepository.deleteById(id);
			return ResponseEntity.status(HttpStatus.OK).build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}	
	//image
	@Override
	public ResponseEntity<Object> saveImage(image image) 
	{
		try
		{
			image add_image = imagerepository.save(image);
			return ResponseEntity.status(HttpStatus.CREATED).body(add_image);
		}catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}				
		
	@Override
	public ResponseEntity<Object> getAllImages(int page) 
	{
		Pageable pageable = PageRequest.of(page,8,Sort.by("uploadDate").descending());
		Page<image> image_list = (Page<image>)imagerepository.findAll(pageable);
		if(image_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(image_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}
	
	@Override
	public ResponseEntity<Object> getImageById(int id) 
	{
		image image =  imagerepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try {
			return ResponseEntity.status(HttpStatus.OK).body(image);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}		
		
	@Override
	public ResponseEntity<Object> updateImage(image image,int id) 
	{
		image imageById =  imagerepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try 
		{
			imageById.setImageName(image.getImageName());
			imageById.setImagePath(image.getImagePath());
			imageById.setImageDiscription(image.getImageDiscription());
			//imageById.setUploadDate(image.getUploadDate());
			
			imagerepository.save(imageById);
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(imageById);
		}catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@Override
	public ResponseEntity<Object> deleteImageById(int id) 
	{
		imagerepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try {
			imagerepository.deleteById(id);
			return ResponseEntity.status(HttpStatus.OK).build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}	
	}
	//home
		@Override
		public ResponseEntity<Object> getImageByActivity() {
			List<image> image_list = (List<image>)imagerepository.findByActivity();
			if(image_list.size() < 1)
			{
				throw new ResourceNotFoundException("Sorry! Not Found.");
			}
			try {
				return ResponseEntity.status(HttpStatus.OK).body(image_list);
			} catch (Exception e) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
			}
		}

		@Override
		public ResponseEntity<Object> getImageByAchievement() {
			List<image> image_list = (List<image>)imagerepository.findByAchievement();
			if(image_list.size() < 1)
			{
				throw new ResourceNotFoundException("Sorry! Not Found.");
			}
			try {
				return ResponseEntity.status(HttpStatus.OK).body(image_list);
			} catch (Exception e) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
			}
		}
		//admin side 
		@Override
		public ResponseEntity<Object> getImageByName(String name, int page) {
			Pageable pageable = PageRequest.of(page,8,Sort.by("uploadDate").descending());
			Page<image> image_list = (Page<image>)imagerepository.findAllByImageName(name,pageable);
			if(image_list.isEmpty()==true)
			{
				throw new ResourceNotFoundException("Sorry! Not Found.");
			}
			try {
				return ResponseEntity.status(HttpStatus.OK).body(image_list);
			} catch (Exception e) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
			}
		}	
	
	//school details
	@Override
	public ResponseEntity<Object> getSchoolDetail()
	{
		int id=1;
		SchoolDetail schooldetail = schooldetailrepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));;
		if(schooldetail==null)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(schooldetail);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Sorry! Try Again.");
		}
		
	}
	
	@Override
	public ResponseEntity<Object> updateSchoolDetail(SchoolDetail schooldetail, int id) 
	{
		SchoolDetail schooldetailById =  schooldetailrepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try 
		{
			schooldetailById.setEmailId(schooldetail.getEmailId());
			schooldetailById.setLandlineNo(schooldetail.getLandlineNo());
			schooldetailById.setMobileNo(schooldetail.getMobileNo());
			schooldetailById.setOfficeCloseTime(schooldetail.getOfficeCloseTime());
			schooldetailById.setOfficeOpenTime(schooldetail.getOfficeOpenTime());
			
			schooldetailrepository.save(schooldetailById);
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(schooldetailById);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Sorry! Try Again.");
		}	
	}

	@Override
	public ResponseEntity<Object> feeStrctureList() {
		List<FeeStructure> feeStructure_list = (List<FeeStructure>)feestructurerepository.findAll();
		if(feeStructure_list.size() < 1)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(feeStructure_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Sorry! Try Again.");
		}
	}

}
