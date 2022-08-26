package com.school.app.exception;

import java.util.Date;

import org.springframework.http.HttpStatus;

public class ErrorDetails 
{
	private Date date;
	private HttpStatus httpstatus;
	private String message;
	private String path;
	
	
	public ErrorDetails() 
	{
		super();
	}


	public ErrorDetails(Date date, HttpStatus httpstatus, String message, String path) 
	{
		super();
		this.date = date;
		this.httpstatus = httpstatus;
		this.message = message;
		this.path = path;
	}


	public Date getDate() 
	{
		return date;
	}

	public void setDate(Date date) 
	{
		this.date = date;
	}

	public HttpStatus getHttpstatus() 
	{
		return httpstatus;
	}

	public void setHttpstatus(HttpStatus httpstatus)
	{
		this.httpstatus = httpstatus;
	}

	public String getMessage() 
	{
		return message;
	}

	public void setMessage(String message)
	{
		this.message = message;
	}

	public String getPath() 
	{
		return path;
	}

	public void setPath(String path)
	{
		this.path = path;
	}
	
}
