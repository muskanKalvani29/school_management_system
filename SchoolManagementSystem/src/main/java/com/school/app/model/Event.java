package com.school.app.model;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
//import javax.persistence.Temporal;
//import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonFormat;


@Entity
public class Event {

		@Id
		@GeneratedValue(strategy = GenerationType.AUTO,generator = "native")
		@GenericGenerator(name="native",strategy = "native")
		@Column(updatable = false,length = 4)
		private int eventId;
		
		@NotNull
		@Column(length = 60,nullable = false)
		@Size(max = 60)
		private String eventName;
		
		@NotNull
		@Column(nullable = false,columnDefinition = "DATE")
		@CreatedDate
		@JsonFormat(pattern = "MM-dd-yyyy")
		private Calendar eventStartdate;
		
		@NotNull
		@Column(nullable = false,columnDefinition = "DATE")
		@CreatedDate
		@JsonFormat(pattern = "MM-dd-yyyy")
		private Calendar eventEnddate;
		
		@NotNull
		@Column(nullable = false,columnDefinition = "TIME")
		@JsonFormat(pattern = "HH:mm:ss")
		private Calendar eventStarttime;
		
		@NotNull
		@Column(nullable = false,columnDefinition = "TIME")
		@JsonFormat(pattern = "HH:mm:ss")
		private Calendar eventEndtime;
		
		@Column(length = 500)
		@Size(max = 500)
		private String eventDescription;

		//default Constructor
		public Event() 
		{
			super();
		}

		//Parameterized Constructor
		public Event(int eventId, @NotNull @Size(max = 60) String eventName, @NotNull @NotNull Calendar eventStartdate,
				@NotNull @NotNull Calendar eventEnddate, @NotNull @NotNull Calendar eventStarttime, @NotNull @NotNull Calendar eventEndtime,
				@Size(max = 500) String eventDescription) 
		{
			super();
			this.eventId = eventId;
			this.eventName = eventName;
			this.eventStartdate = eventStartdate;
			this.eventEnddate = eventEnddate;
			this.eventStarttime = eventStarttime;
			this.eventEndtime = eventEndtime;
			this.eventDescription = eventDescription;
		}

		//getters and setters
		public int getEventId() 
		{
			return eventId;
		}

		public void setEventId(int eventId) 
		{
			this.eventId = eventId;
		}

		public String getEventName()
		{
			return eventName;
		}

		public void setEventName(String eventName) 
		{
			this.eventName = eventName;
		}

		public Calendar getEventStartdate()
		{
			return eventStartdate;
		}

		public void setEventStartdate(Calendar eventStartdate)
		{
			this.eventStartdate = eventStartdate;
		}

		public Calendar getEventEnddate() 
		{
			return eventEnddate;
		}

		public void setEventEnddate(Calendar eventEnddate) 
		{
			this.eventEnddate = eventEnddate;
		}

		public Calendar getEventStarttime()
		{
			return eventStarttime;
		}

		public void setEventStarttime(Calendar eventStarttime) 
		{
			this.eventStarttime = eventStarttime;
		}

		public Calendar getEventEndtime() 
		{
			return eventEndtime;
		}

		public void setEventEndtime(Calendar eventEndtime) 
		{
			this.eventEndtime = eventEndtime;
		}

		public String getEventDescription() 
		{
			return eventDescription;
		}

		public void setEventDescription(String eventDescription)
		{
			this.eventDescription = eventDescription;
		}

		@Override
		public String toString() 
		{
			return "Event [eventId=" + eventId + ", eventName=" + eventName + ", eventStartdate=" + eventStartdate
					+ ", eventEnddate=" + eventEnddate + ", eventStarttime=" + eventStarttime + ", eventEndtime="
					+ eventEndtime + ", eventDescription=" + eventDescription + "]";
		}
		
}
