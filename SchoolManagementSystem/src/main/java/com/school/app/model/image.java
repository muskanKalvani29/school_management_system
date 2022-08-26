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
public class image {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,generator = "native")
	@GenericGenerator(name="native",strategy = "native")
	@Column(updatable = false,length = 5)
	private int imageId;
	
	@Size(max = 255)
	@Column(length = 255)
	private String imagePath;
	
	@NotNull
	@Size(max = 300)
	@Column(length = 300,nullable = false)
	private String imageDiscription;
	
	@NotNull
	@Size(max = 30)
	@Column(length = 30,nullable = false)
	private String imageName;
	
	@NotNull
	@Column(nullable = false,columnDefinition = "DATE")
	@CreatedDate
	@JsonFormat(pattern ="MM-dd-yyyy")
	private Calendar uploadDate;

	public image() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	public image(int imageId, @Size(max = 255) String imagePath, @NotNull @Size(max = 300) String imageDiscription,
			@NotNull @Size(max = 30) String imageName, @NotNull Calendar uploadDate) {
		super();
		this.imageId = imageId;
		this.imagePath = imagePath;
		this.imageDiscription = imageDiscription;
		this.imageName = imageName;
		this.uploadDate = uploadDate;
	}

	public int getImageId() {
		return imageId;
	}

	public void setImageId(int imageId) {
		this.imageId = imageId;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public String getImageDiscription() {
		return imageDiscription;
	}

	public void setImageDiscription(String imageDiscription) {
		this.imageDiscription = imageDiscription;
	}

	public String getImageName() {
		return imageName;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}

	public Calendar getUploadDate() {
		return uploadDate;
	}

	public void setUploadDate(Calendar uploadDate) {
		this.uploadDate = uploadDate;
	}

	@Override
	public String toString() {
		return "image [imageId=" + imageId + ", imagePath=" + imagePath + ", imageDiscription=" + imageDiscription
				+ ", imageName=" + imageName + ", uploadDate=" + uploadDate + "]";
	}

}
