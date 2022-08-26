package com.school.app.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class FeeStructure {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,generator = "native")
	@GenericGenerator(name="native",strategy = "native")
	@Column(updatable = false,length = 2)
	private int feeStuctureId;
	
	@NotNull
	@Size(max = 10)
	@Column(length = 10,nullable = false)
	private String medium;
	
	@NotNull
	@Size(max = 15)
	@Column(length = 15,nullable = false)
	private String standard;
	
	@NotNull
	@Column(length = 5,nullable = false)
	private int fee;

	public FeeStructure() {
		super();
		// TODO Auto-generated constructor stub
	}

	public FeeStructure(int feeStuctureId, @NotNull @Size(max = 10) String medium,
			@NotNull @Size(max = 15) String standard, @NotNull int fee) {
		super();
		this.feeStuctureId = feeStuctureId;
		this.medium = medium;
		this.standard = standard;
		this.fee = fee;
	}

	public int getFeeStuctureId() {
		return feeStuctureId;
	}

	public void setFeeStuctureId(int feeStuctureId) {
		this.feeStuctureId = feeStuctureId;
	}

	public String getMedium() {
		return medium;
	}

	public void setMedium(String medium) {
		this.medium = medium;
	}

	public String getStandard() {
		return standard;
	}

	public void setStandard(String standard) {
		this.standard = standard;
	}

	public int getFee() {
		return fee;
	}

	public void setFee(int fee) {
		this.fee = fee;
	}

	@Override
	public String toString() {
		return "FeeStructure [feeStuctureId=" + feeStuctureId + ", medium=" + medium + ", standard=" + standard
				+ ", fee=" + fee + "]";
	}
	
}
