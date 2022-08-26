package com.school.app.controller;

import java.util.Map;
import java.util.Random;
import java.util.TreeMap;
import java.util.Map.Entry;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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
import org.springframework.web.servlet.ModelAndView;

import com.paytm.pg.merchant.PaytmChecksum;
import com.school.app.exception.ResourceNotFoundException;
import com.school.app.model.FeePayment;
import com.school.app.model.Student;
import com.school.app.repository.StudentRepository;
import com.school.app.service.interfaces.FeePaymentService;

@Controller
@RequestMapping("/sms")
@CrossOrigin(origins = "http://localhost:4200")

public class FeePaymentController
{
	@Autowired
	private FeePaymentService feepaymentservice;
	
	@Autowired
	Environment env;
	
	@Autowired
	StudentRepository StudentRepository;
	
	ServletContext context;
	
	//filters
	@GetMapping("/feedetail-standard")
	public ResponseEntity<Object> getFeeDetailListByStandard(@RequestParam("sname")String StandardName,@RequestParam("page") int page)
	{
		return feepaymentservice.getFeePaymentByStandard(StandardName, page);
	}
	
	@GetMapping("/feedetail-standard-division")
	public ResponseEntity<Object> getFeeDetailListBySAndD(@RequestParam("sname")String StandardName,@RequestParam("d_id")int d_id,@RequestParam("page") int page)
	{
		return feepaymentservice.getFeePaymentBySAndD(StandardName, d_id, page);
	}
	
	@GetMapping("/feedetail/{id}")
	public ResponseEntity<Object> getFeePayment(@PathVariable int id)
	{
		return feepaymentservice.getFeePaymentById(id);
	}
		
	@PutMapping("/feedetail/{id}")
	public ResponseEntity<Object> updateFeePayment(@RequestBody FeePayment feepayment,@PathVariable int id)
	{
		return feepaymentservice.updateFeePayment(feepayment, id);
	}
	
	@DeleteMapping("/feedetail/{id}")
	public ResponseEntity<Object> deleteFeePayment(@PathVariable int id)
	{
		return feepaymentservice.deleteFeePaymentById(id);
	}
	
	@GetMapping("/feedetail-parent/{id}")
	public ResponseEntity<Object> getFeeByParent(@PathVariable int id,@RequestParam("page")int page)
	{
		return feepaymentservice.getFeePaymentByParent(id,page);
	}
	
	@PostMapping("/add-fee")
	public ResponseEntity<Object> addFeePayment(@RequestBody FeePayment feepayment)
	{
		return feepaymentservice.saveFeePayment(feepayment);
	}
	
	//fee payment
	@PostMapping("/pay-fee")
	public ResponseEntity<Object> addFeePayment(@RequestBody FeePayment feepayment,HttpServletRequest request)
	{
		ServletContext context = request.getServletContext();
		context.setAttribute("payment", feepayment);
		System.out.println("Hello I am pay-fees");
		System.out.println(feepayment.getFeesAmount());
//		feepaymentservice.saveFeePayment(feepayment);
		return new ResponseEntity<Object>(HttpStatus.OK);	
	}
	
	@GetMapping("/redirect-paytm")	
	public ModelAndView redirectPaytm(@RequestParam("amount") String amount) throws Exception
	{
			String transactionId = createTransactionId();
			ModelAndView modelAndView = new ModelAndView("redirect:"+env.getProperty("paytm.payment.sandbox.paytmUrl"));
			TreeMap<String, String> parameters = new TreeMap<>();
		  	parameters.put("MID", env.getProperty("paytm.payment.sandbox.details.MID"));
		  	parameters.put("CHANNEL_ID", env.getProperty("paytm.payment.sandbox.details.CHANNEL_ID"));
		  	parameters.put("INDUSTRY_TYPE_ID", env.getProperty("paytm.payment.sandbox.details.INDUSTRY_TYPE_ID"));
		  	parameters.put("WEBSITE", env.getProperty("paytm.payment.sandbox.details.WEBSITE"));
		  	parameters.put("CALLBACK_URL", env.getProperty("paytm.payment.sandbox.details.CALLBACK_URL"));
	        parameters.put("TXN_AMOUNT", amount);  
	        parameters.put("ORDER_ID", transactionId);
	        parameters.put("CUST_ID", "saff");
	        String checkSum = getCheckSum(parameters);
	        parameters.put("CHECKSUMHASH", checkSum);
	        modelAndView.addAllObjects(parameters);
		return modelAndView;
	}
	
	@PostMapping("/payment-result")
	public String addPayment(Model model,HttpServletRequest request) throws CloneNotSupportedException
	{
		context = request.getServletContext();  
		 Map<String, String[]> mapData = request.getParameterMap();
	        TreeMap<String, String> parameters = new TreeMap<String, String>();
	        
	        String paytmChecksum = "";
	        for (Entry<String, String[]> requestParamsEntry : mapData.entrySet()) {
	            if ("CHECKSUMHASH".equalsIgnoreCase(requestParamsEntry.getKey())){
	                paytmChecksum = requestParamsEntry.getValue()[0];
	            } else {
	            	parameters.put(requestParamsEntry.getKey(), requestParamsEntry.getValue()[0]);
	            }
	        }
	        String result;
	        ServletContext context = request.getServletContext();
	        FeePayment payment = (FeePayment) context.getAttribute("payment");
	        payment.setTransactionId(parameters.get("ORDERID"));
	        boolean isValideChecksum = false;
	        System.out.println("RESULT : "+parameters.toString());
	        try {
	            isValideChecksum = validateCheckSum(parameters, paytmChecksum);
	            System.out.println(isValideChecksum + paytmChecksum);
	            if (isValideChecksum && parameters.containsKey("RESPCODE")) {
	                if (parameters.get("RESPCODE").equals("01")) {
	                    result = "Payment Successful";
	                //    paymentService.addDonor(payment.getDonor());
//	                    
	                    feepaymentservice.saveFeePayment(payment);
	                    
	                } else {
	                    result = "Payment Failed";
	                }
	            } else {
	                result = "Checksum mismatched";
	            }
	            request.removeAttribute("payment");
	        } catch (Exception e) {
	            result = e.toString();
	        }
	        model.addAttribute("result",result);
	        parameters.remove("CHECKSUMHASH");
	        model.addAttribute("parameters",parameters);
	        return "result";
	}
	
	public String createTransactionId()
	{
		String transactionId = ""; 
		Random random = new Random();
		String number = "1234567890";
		String smallAlphabetic = "abcdefghijklmnopqrstuvwxyz";
		String capitalAlphabetic = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		String combineString = number + smallAlphabetic + capitalAlphabetic;
		char values[] = combineString.toCharArray();
		int PasswordLength = 18;
		for(int i = 0;i<PasswordLength;i++)
		{
			transactionId += values[random.nextInt(combineString.length())];
		}
		System.out.println(transactionId);
		return transactionId;
	}
	
	private String getCheckSum(TreeMap<String, String> parameters) throws Exception {
		return PaytmChecksum.generateSignature(parameters, env.getProperty("paytm.payment.sandbox.merchantKey"));
	}
	
	private boolean validateCheckSum(TreeMap<String, String> parameters, String paytmChecksum) throws Exception {
	        return PaytmChecksum.verifySignature(parameters, env.getProperty("paytm.payment.sandbox.merchantKey"), paytmChecksum);
	}
	
}
