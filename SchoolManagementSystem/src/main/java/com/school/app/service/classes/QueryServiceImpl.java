package com.school.app.service.classes;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.school.app.exception.ResourceNotFoundException;
import com.school.app.model.Inquiry;
import com.school.app.model.Parent;
import com.school.app.model.Query;
import com.school.app.repository.InquiryRepository;
import com.school.app.repository.ParentRepository;
import com.school.app.repository.QueryRepository;
import com.school.app.service.interfaces.QueryService;

@Service
public class QueryServiceImpl implements QueryService
{
	@Autowired
	private QueryRepository queryrepository;
	
	@Autowired
	InquiryRepository inquiryrepository;
	
	@Autowired
	ParentRepository ParentRepository;
	//filers
	@Override
	public ResponseEntity<Object> saveQuery(Query query) 
	{
		try
		{
			Query add_query = queryrepository.save(query);
			return ResponseEntity.status(HttpStatus.CREATED).body(add_query);
		}catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@Override
	public ResponseEntity<Object> getQueryById(int id) 
	{
		Query query =  queryrepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try {
			return ResponseEntity.status(HttpStatus.OK).body(query);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}	
	}

	@Override
	public ResponseEntity<Object> getAllQuery(int page) 
	{
		Pageable pageable = PageRequest.of(page,8,Sort.by("uploadDate").descending());
		Page<Query> query_list = (Page<Query>)queryrepository.findAll(pageable);
		if(query_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(query_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> updateQuery(Query query, int id)
	{
		Query queryById =  queryrepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try 
		{
			queryById.setResponseMessage(query.getResponseMessage());
			queryrepository.save(queryById);
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(queryById);
		}catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> deleteQueryById(int id)
	{
		queryrepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try {
			queryrepository.deleteById(id);
			return ResponseEntity.status(HttpStatus.OK).build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	
	@Override
	public ResponseEntity<Object> saveInquiry(Inquiry inquiry) 
	{
		try
		{
			Inquiry add_inquiry = inquiryrepository.save(inquiry);
			return ResponseEntity.status(HttpStatus.CREATED).body(add_inquiry);
		}catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getInquiryById(int id) 
	{
		Inquiry inquiry =  inquiryrepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try {
			return ResponseEntity.status(HttpStatus.OK).body(inquiry);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getAllInquery(int page) {
		Pageable pageable = PageRequest.of(page,8,Sort.by("uploadDate").descending());
		Page<Inquiry> inquiry_list = (Page<Inquiry>)inquiryrepository.findAll(pageable);
		if(inquiry_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(inquiry_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> updateInquiry(Inquiry inquiry,int id) 
	{
		Inquiry inquiryById =  inquiryrepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try 
		{
			inquiryById.setInquiryResponse(inquiry.getInquiryResponse());
			
			inquiryrepository.save(inquiryById);
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(inquiryById);
		}catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> deleteInquiryById(int id) 
	{
		inquiryrepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try {
			inquiryrepository.deleteById(id);
			return ResponseEntity.status(HttpStatus.OK).build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}	
	}

	@Override
	public ResponseEntity<Object> getQueryByParent(int id,int page) {
		Pageable pageable =PageRequest.of(page,8, Sort.by("uploadDate").descending());
		Parent parent = ParentRepository.findByUserUserId(id);
		Page<Query> query_list = (Page<Query>) queryrepository.findAllByParentParentId(parent.getParentId(),pageable);
		if(query_list.isEmpty()==true) {
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(query_list.getContent());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}
