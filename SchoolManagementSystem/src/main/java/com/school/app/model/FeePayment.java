package com.school.app.model;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class FeePayment {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,generator = "native")
	@GenericGenerator(name="native",strategy = "native")
	@Column(updatable = false,length = 7)
	private int paymentId;
	
	@ManyToOne
	private Student student;
	
	@Column(length = 25)
	private String transactionId;
	
	@NotNull
	@Column(length = 7,nullable = false)
	@Size(max = 7)
	private String paymentMode;
	
	@NotNull
	@Column(length = 4,nullable = false)
	private int feesAmount;
	
	
	@NotNull
	@Column(nullable = false,columnDefinition = "DATE")
	@CreatedDate
	@JsonFormat(pattern ="MM-dd-yyyy")
	private Calendar paymentDate;
	
	@NotNull
	@Column(length = 1,nullable = false)
	private Integer InstallmentNo;

	//default Constructor
	public FeePayment() 
	{
		super();
	}

	//Parameterized Constructor
	public FeePayment(int paymentId, Student student, String transactionId, @NotNull @Size(max = 7) String paymentMode,
			@NotNull int feesAmount, 
			@NotNull Calendar paymentDate, @NotNull Integer installmentNo) {
		super();
		this.paymentId = paymentId;
		this.student = student;
		this.transactionId = transactionId;
		this.paymentMode = paymentMode;
		this.feesAmount = feesAmount;
		this.paymentDate = paymentDate;
		InstallmentNo = installmentNo;
	}


	//getters and setters
	public int getPaymentId() {
		return paymentId;
	}

	public void setPaymentId(int paymentId) {
		this.paymentId = paymentId;
	}

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	public String getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}

	public String getPaymentMode() {
		return paymentMode;
	}

	public void setPaymentMode(String paymentMode) {
		this.paymentMode = paymentMode;
	}

	public int getFeesAmount() {
		return feesAmount;
	}

	public void setFeesAmount(int feesAmount) {
		this.feesAmount = feesAmount;
	}

	public Calendar getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(Calendar paymentDate) {
		this.paymentDate = paymentDate;
	}

	public Integer getInstallmentNo() {
		return InstallmentNo;
	}

	public void setInstallmentNo(Integer installmentNo) {
		InstallmentNo = installmentNo;
	}

	@Override
	public String toString() {
		return "FeePayment [paymentId=" + paymentId + ", student=" + student + ", transactionId=" + transactionId
				+ ", paymentMode=" + paymentMode + ", feesAmount=" + feesAmount + ", paymentDate=" + paymentDate
				+ ", InstallmentNo=" + InstallmentNo + "]";
	}

}
