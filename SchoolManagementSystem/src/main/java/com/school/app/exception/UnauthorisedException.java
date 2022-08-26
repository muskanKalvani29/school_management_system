package com.school.app.exception;

public class UnauthorisedException extends RuntimeException
{
	private static final long serialVersionUID = 1L;

	public UnauthorisedException(String message) 
	{
	        super(message);
	   
	}
}
