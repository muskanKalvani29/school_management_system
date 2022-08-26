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
import com.school.app.model.FeePayment;
import com.school.app.model.Parent;
import com.school.app.model.Standard;
import com.school.app.model.Student;
import com.school.app.repository.FeePaymentRepository;
import com.school.app.repository.ParentRepository;
import com.school.app.repository.StandardRepository;
import com.school.app.repository.StudentRepository;
import com.school.app.service.interfaces.FeePaymentService;

@Service
public class FeePaymentServiceImpl implements FeePaymentService
{
	@Autowired
	FeePaymentRepository feepaymentrepository;
	
	@Autowired
	StudentRepository StudentRepository;
	
	@Autowired
	ParentRepository ParentRepository;
	
	@Autowired
	StandardRepository StandardRepository;
	
	//filters
	@Override
	public ResponseEntity<Object> saveFeePayment(FeePayment feePayment) 
	{
		try
		{
			FeePayment add_feepayment = feepaymentrepository.save(feePayment);
			return ResponseEntity.status(HttpStatus.CREATED).body(add_feepayment);
		}catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getFeePaymentById(int id) 
	{
		FeePayment feePayment =  feepaymentrepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try {
			return ResponseEntity.status(HttpStatus.OK).body(feePayment);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}		
		
	}

	@Override
	public ResponseEntity<Object> updateFeePayment(FeePayment feePayment,int id) 
	{
		FeePayment feePaymentById =  feepaymentrepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try 
		{
			feePaymentById.setFeesAmount(feePayment.getFeesAmount());
			feePaymentById.setInstallmentNo(feePayment.getInstallmentNo());
			feePaymentById.setPaymentDate(feePayment.getPaymentDate());
			feePaymentById.setPaymentMode(feePayment.getPaymentMode());
			
			feepaymentrepository.save(feePaymentById);
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(feePaymentById);
		}catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> deleteFeePaymentById(int id) 
	{
		feepaymentrepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Sorry! Not found for :" + id));
		try {	
			feepaymentrepository.deleteById(id);
			return ResponseEntity.status(HttpStatus.OK).build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getAllFeePayments(int page) 
	{
		Pageable pageable = PageRequest.of(page,15,Sort.by("paymentDate").descending());
		Page<FeePayment> feePayment_list = (Page<FeePayment>)feepaymentrepository.findAll(pageable);
		if(feePayment_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(feePayment_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}

	@Override
	public ResponseEntity<Object> getFeePaymentByParent(int id,int page) {
		Parent parent = ParentRepository.findByUserUserId(id);
		Student student =parent.getStudent();
		Pageable pageable = PageRequest.of(page,15,Sort.by("payment_date").descending());
		Page<FeePayment> feePayment_list = (Page<FeePayment>)feepaymentrepository.findFeePaymentByGrNo(student.getGrNo(), pageable);
		if(feePayment_list.isEmpty()==true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(feePayment_list.getContent());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	
	}

	@Override
	public ResponseEntity<Object> getFeePaymentByStandard(String StandardName, int page) {
		Pageable pageable = PageRequest.of(page,15,Sort.by("payment_date").descending());
		Standard standard = StandardRepository.findByStandardName(StandardName);
		Page<FeePayment> feePayment_list = (Page<FeePayment>)feepaymentrepository.findFeePaymentByStandard(standard.getStandardId(), pageable);
		if(feePayment_list.isEmpty() == true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(feePayment_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<Object> getFeePaymentBySAndD(String StandardName, int d_id, int page) {
		Pageable pageable = PageRequest.of(page, 15,Sort.by("payment_date").descending());
		Standard standard = StandardRepository.findByStandardName(StandardName);
		Page<FeePayment> feePayment_list = (Page<FeePayment>)feepaymentrepository.findFeePaymentByStandardAndDivision(standard.getStandardId(),d_id, pageable);
		if(feePayment_list.isEmpty() == true)
		{
			throw new ResourceNotFoundException("Sorry! Not Found.");
		}
		try {
			return ResponseEntity.status(HttpStatus.OK).body(feePayment_list);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}
