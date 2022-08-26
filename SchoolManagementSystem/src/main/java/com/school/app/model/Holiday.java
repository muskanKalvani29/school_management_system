package com.school.app.model;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonFormat;


@Entity
public class Holiday {

		@Id
		@GeneratedValue(strategy = GenerationType.AUTO,generator = "native")
		@GenericGenerator(name="native",strategy = "native")
		@Column(updatable = false,length = 3)
		private int holidayId;
		
		@NotNull
		@Column(length = 60,nullable = false)
		@Size(max = 60)
		private String holidayName;
		
		@NotNull
		@Column(nullable = false,columnDefinition = "DATE")
		@CreatedDate
		@JsonFormat(pattern = "MM-dd-yyyy")
		private Calendar holidayStartdate;
		
		@NotNull
		@Column(nullable = false,columnDefinition = "DATE")
		@CreatedDate
		@JsonFormat(pattern = "MM-dd-yyyy")
		private Calendar holidayEnddate;
		
		@Column(length = 300)
		@Size(max = 300)
		private String holidayDescription;

		//default Constructor
		public Holiday()
		{
			super();
		}

		//Parameterized Constructor
		public Holiday(int holidayId, @NotNull @Size(max = 60) String holidayName, @NotNull Calendar holidayStartdate,
				@NotNull Calendar holidayEnddate, @Size(max = 300) String holidayDescription) {
			super();
			this.holidayId = holidayId;
			this.holidayName = holidayName;
			this.holidayStartdate = holidayStartdate;
			this.holidayEnddate = holidayEnddate;
			this.holidayDescription = holidayDescription;
		}

		//getters and setters
		public int getHolidayId() {
			return holidayId;
		}

		public void setHolidayId(int holidayId) {
			this.holidayId = holidayId;
		}

		public String getHolidayName() {
			return holidayName;
		}

		public void setHolidayName(String holidayName) {
			this.holidayName = holidayName;
		}

		public Calendar getHolidayStartdate() {
			return holidayStartdate;
		}

		public void setHolidayStartdate(Calendar holidayStartdate) {
			this.holidayStartdate = holidayStartdate;
		}

		public Calendar getHolidayEnddate() {
			return holidayEnddate;
		}

		public void setHolidayEnddate(Calendar holidayEnddate) {
			this.holidayEnddate = holidayEnddate;
		}

		public String getHolidayDescription() {
			return holidayDescription;
		}

		public void setHolidayDescription(String holidayDescription) {
			this.holidayDescription = holidayDescription;
		}

		@Override
		public String toString() {
			return "Holiday [holidayId=" + holidayId + ", holidayName=" + holidayName + ", holidayStartdate="
					+ holidayStartdate + ", holidayEnddate=" + holidayEnddate + ", holidayDescription="
					+ holidayDescription + "]";
		}
}
