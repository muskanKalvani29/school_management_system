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
public class Query {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,generator = "native")
	@GenericGenerator(name="native",strategy = "native")
	@Column(updatable = false,length = 4)
	private int queryId;
	
	@ManyToOne
	private Parent parent;
	
	@NotNull
	@Column(length = 300,nullable = false)
	@Size(max = 300)
	private String queryMessage;
	
	@Column(length = 300)
	@Size(max = 300)
	private String responseMessage;
	
	@NotNull
	@Column(nullable = false,columnDefinition = "DATE")
	@CreatedDate
	@JsonFormat(pattern ="MM-dd-yyyy")
	private Calendar uploadDate;

	//default Constructor
	public Query() 
	{
		super();
	}

	//Parameterized Constructor
	public Query(int queryId, Parent parent, @NotNull @Size(max = 300) String queryMessage,
			@Size(max = 300) String responseMessage, @NotNull Calendar uploadDate) {
		super();
		this.queryId = queryId;
		this.parent = parent;
		this.queryMessage = queryMessage;
		this.responseMessage = responseMessage;
		this.uploadDate = uploadDate;
	}

	//getters and setters
	public int getQueryId() {
		return queryId;
	}

	public void setQueryId(int queryId) {
		this.queryId = queryId;
	}

	public Parent getParent() {
		return parent;
	}

	public void setParent(Parent parent) {
		this.parent = parent;
	}

	public String getQueryMessage() {
		return queryMessage;
	}

	public void setQueryMessage(String queryMessage) {
		this.queryMessage = queryMessage;
	}

	public String getResponseMessage() {
		return responseMessage;
	}

	public void setResponseMessage(String responseMessage) {
		this.responseMessage = responseMessage;
	}
	
	public Calendar getUploadDate() {
		return uploadDate;
	}

	public void setUploadDate(Calendar uploadDate) {
		this.uploadDate = uploadDate;
	}

	@Override
	public String toString() {
		return "Query [queryId=" + queryId + ", parent=" + parent + ", queryMessage=" + queryMessage
				+ ", responseMessage=" + responseMessage + ", uploadDate=" + uploadDate + "]";
	}
	
}