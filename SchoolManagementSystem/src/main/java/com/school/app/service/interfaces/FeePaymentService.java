package com.school.app.service.interfaces;

import org.springframework.http.ResponseEntity;
import com.school.app.model.FeePayment;

public interface FeePaymentService
{
 	//filters	
 	public ResponseEntity<Object> getAllFeePayments(int page);
 	
// 	public ResponseEntity<Object> getFeePaymentByGrNo(int grNo,int page);
 	
 	public  ResponseEntity<Object> saveFeePayment(FeePayment feePayment);//parent
 	
 	public  ResponseEntity<Object> getFeePaymentById(int id);
	
 	public  ResponseEntity<Object> updateFeePayment(FeePayment feePayment,int id);
 	
 	public ResponseEntity<Object> deleteFeePaymentById(int id);
 	
 	public ResponseEntity<Object> getFeePaymentByParent(int id,int page);
 	
 	public ResponseEntity<Object> getFeePaymentByStandard(String StandardName,int page);
 	
 	public ResponseEntity<Object> getFeePaymentBySAndD(String StandardName,int d_id,int page);
}
