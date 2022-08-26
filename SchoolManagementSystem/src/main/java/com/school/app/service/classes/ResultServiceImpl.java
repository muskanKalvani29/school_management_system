package com.school.app.service.classes;

import java.util.ArrayList;
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
import com.school.app.model.Division;
import com.school.app.model.ExamType;
import com.school.app.model.Parent;
import com.school.app.model.Result;
import com.school.app.model.ResultFile;
import com.school.app.model.Standard;
import com.school.app.model.Student;
import com.school.app.model.Teacher;
import com.school.app.repository.ExamTypeRepository;
import com.school.app.repository.ParentRepository;
import com.school.app.repository.ResultFileRepository;
import com.school.app.repository.ResultRepository;
import com.school.app.repository.StandardRepository;
import com.school.app.repository.TeacherRepository;
import com.school.app.service.interfaces.ResultService;

@Service
public class ResultServiceImpl implements ResultService
{
	@Autowired
	private ResultRepository resultrepository;
	
	@Autowired
	private ResultFileRepository resultfilerepository;
	
	@Autowired
	private ExamTypeRepository examtyperepository;
	
	@Autowired
	private ParentRepository ParentRepository;
	
	@Autowired
	private StandardRepository StandardRepository;
	
	@Autowired
	private TeacherRepository TeacherRepository;

	@Override
	public ResponseEntity<Object> saveResult(Result result)
	{
		try
		{
			Result add_result = resultrepository.save(result);
			return ResponseEntity.status(HttpStatus.CREATED).body(add_result);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
//	@Override
//	public ResponseEntity<Page<Result>> getAllResults(Pageable pageable) {
//		Page<Result> result_list = (Page<Result>)resultrepository.findAll(pageable);
//		if(result_list.getSize() < 1)
//		{
//			throw new ResourceNotFoundException("Sorry! Not Found.");
//		}
//		return ResponseEntity.status(HttpStatus.OK).body(result_list);
//	}

	@Override
	public ResponseEntity<Object> getResultById(int id)
	{
		Result result =  resultrepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try {
			return ResponseEntity.status(HttpStatus.OK).body(result);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}

	@Override
	public ResponseEntity<Object> updateResult(Result result, int id)
	{
		Result resultById =  resultrepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try
		{
			resultById.setExamType(result.getExamType());
			resultById.setDrawing(result.getDrawing());
			resultById.setEnglish(result.getEnglish());
			resultById.setEnvironment(result.getEnvironment());
			resultById.setGujarati(result.getGujarati());
			resultById.setHindi(result.getHindi());
			resultById.setMaths(result.getMaths());
			resultById.setPathmala(result.getPathmala());
			resultById.setPt(result.getPt());
			resultById.setSanskrit(result.getSanskrit());
			resultById.setScience(result.getScience());
			resultById.setSocialscience(result.getSocialscience());
			resultById.setTotalMarks(result.getTotalMarks());
			resultById.setYear(result.getYear());
			resultById.setObtainedMarks(result.getObtainedMarks());
			resultById.setPassingmMarks(result.getPassingmMarks());
			resultById.setGrade(result.getGrade());
			
			resultrepository.save(resultById);
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(resultById);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> delteResultById(int id)
	{
		resultrepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Sorry! Not found for :" + id));
		try {
			resultrepository.deleteById(id);
			return ResponseEntity.status(HttpStatus.OK).build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	
	@Override
	public ResponseEntity<Object> saveResultFile(ResultFile resultfile)
	{
		try
		{
			ResultFile add_resultfile = resultfilerepository.save(resultfile);
			return ResponseEntity.status(HttpStatus.CREATED).body(add_resultfile);
		}catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> updateResultFile(ResultFile resultfile, int id)
	{
		ResultFile resultFileById =  resultfilerepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try
		{
			resultFileById.setResultFile(resultfile.getResultFile());
			resultFileById.setDescription(resultfile.getDescription());
			resultfile.setUploadDate(resultfile.getUploadDate());
			
			resultfilerepository.save(resultFileById);
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(resultFileById);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> deleteResultFileById(int id) {
		resultfilerepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Sorry! Not found for :" + id));
		try {
			resultfilerepository.deleteById(id);
			return ResponseEntity.status(HttpStatus.OK).build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@Override
	public ResponseEntity<Object> getResultFileById(int id) 
	{
		ResultFile resultfile =  resultfilerepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try {
			return ResponseEntity.status(HttpStatus.OK).body(resultfile);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	
	@Override
	public ResponseEntity<Object> getAllExamTypes()
	{
		List<ExamType> examtype_list = (List<ExamType>)examtyperepository.findAll();
		if(examtype_list.size() < 1)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(examtype_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getResultByStudent(int grNo, int page) {
		Pageable pageable = PageRequest.of(page, 8, Sort.by("year").descending());
		Page<Result> result_list = (Page<Result>)resultrepository.findAllByStudentGrNo(grNo,pageable);
		if(result_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(result_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getResultFileByStudentAndStandard(int id, int page) {
		Parent parent = ParentRepository.findByUserUserId(id);
		Student student =parent.getStudent();
		Standard standard =student.getStandard();
		Division division =student.getDivision();
		Pageable pageable = PageRequest.of(page, 8, Sort.by("uploadDate").descending());
		Page<ResultFile> file_list = (Page<ResultFile>)resultfilerepository.findAllByStandardStandardIdAndDivisionDivisionId(standard.getStandardId(),division.getDivisionId(),pageable);
		if(file_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(file_list.getContent());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getResultByStandardAndDivisionAndExamTypeAndYear(String StandardName, int d_id, int e_id,
			String year) {
		Standard standard = StandardRepository.findByStandardName(StandardName);
		List<Result> result_list = (List<Result>)resultrepository.findAllByStandardAndDivisionAndExamTypeAndYear(standard.getStandardId(),d_id,e_id,year);
		if(result_list.size() < 1)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(result_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}
