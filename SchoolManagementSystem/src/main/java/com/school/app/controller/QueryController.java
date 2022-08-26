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

import com.school.app.model.Inquiry;
import com.school.app.model.Query;
import com.school.app.service.interfaces.QueryService;

@RestController
@RequestMapping("/sms")
@CrossOrigin(origins = "http://localhost:4200")

public class QueryController
{
	@Autowired
	private QueryService queryservice;
	
	//filters
	@GetMapping("/inquiries")
	public ResponseEntity<Object> getInquiryList(@RequestParam("page") int page)
	{
		return queryservice.getAllInquery(page);
	}
	
	@GetMapping("/inquiry/{id}")
	public ResponseEntity<Object> getInquiry(@PathVariable int id)
	{
		return queryservice.getInquiryById(id);
	}
	
	@PutMapping("/inquiry/{id}")
	public ResponseEntity<Object> updateInquiry(@RequestBody Inquiry inquiry,@PathVariable int id)
	{
		return queryservice.updateInquiry(inquiry, id);
	}

	@PostMapping("/inquiry")
	public ResponseEntity<Object> addInquiry(@RequestBody Inquiry inquiry)
	{
		return queryservice.saveInquiry(inquiry);
	}
	
	@DeleteMapping("/inquiry/{id}")
	public ResponseEntity<Object> deleteInquiry(@PathVariable int id)
	{
		return queryservice.deleteInquiryById(id);
	}
	
	//query
	@GetMapping("/queries")
	public ResponseEntity<Object> getQueryList(@RequestParam("page") int page)
	{
		return queryservice.getAllQuery(page);
	}
	
	@GetMapping("/query/{id}")
	public ResponseEntity<Object> getQuery(@PathVariable int  id)
	{
		return queryservice.getQueryById(id);
	}
	
	@PostMapping("/query")
	public ResponseEntity<Object> addQuery(@RequestBody Query query)
	{
		return queryservice.saveQuery(query);
	}
	
	@PutMapping("/query/{id}")
	public ResponseEntity<Object> updateQuery(@RequestBody Query query,@PathVariable int id)
	{
		return queryservice.updateQuery(query, id);
	}
	
	@DeleteMapping("/query/{id}")
	public ResponseEntity<Object> deleteQuery(@PathVariable int id)
	{
		return queryservice.deleteQueryById(id);
	}
	
	//parent(query response)
	@GetMapping("/query-parent/{id}")
	public ResponseEntity<Object> getQueryByParent(@PathVariable int id,@RequestParam("page")int page)
	{
		return queryservice.getQueryByParent(id, page);
	}
}
