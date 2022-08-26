package com.school.app.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import com.school.app.model.Student;

@Repository
public interface StudentRepository extends PagingAndSortingRepository<Student, Integer>
{
	@Query(nativeQuery = true,value = "select * from student where(standard_standard_id)= :sId")
	public Page<Student> findByStandardId(Pageable pageable,int sId);
	
	@Query(nativeQuery = true,value = "select * from student where"
			+ "(standard_standard_id)= :sId And (division_division_id)= :dId")
	public Page<Student> findByStandardAndDivision(Pageable pageable,int sId,int dId);
	
	@Query(nativeQuery = true,value = "select * from student where(fee_status)= 'unpaid'")
	public Page<Student> findAllStudentByFeeStatus(Pageable pageable);
	
	@Modifying
	@Query(nativeQuery = true,value="UPDATE student SET (standard_standard_id)= :to_sId")
	public Student updateStandard(int to_sId);
	
	@Query(nativeQuery = true,value = "select * from student where(standard_standard_id)= :to_sId")
	public List<Student> findByStandard(int to_sId);
	
	@Query(nativeQuery = true,value = "select count(*) from student")
	public int findTotalStudent();
	
	@Query(nativeQuery = true,value = "select no_of_students from standard\r\n"
			+ "	where standard_id= :id")
	public int findNoOfStudentById(int id);

	@Query(nativeQuery = true,value = "select * from student where(fee_status)= 'unpaid' And"
			+ "(standard_standard_id)= :sId")
	public Page<Student> findAllStudentByFeeStatusAndStandardStandardId(int sId, Pageable pageable);

	@Query(nativeQuery = true,value = "select * from student where(fee_status)= 'unpaid' And"
			+ "(standard_standard_id)= :sId And (division_division_id)= :dId")
	public Page<Student> findAllStudentByFeeStatusAndStandardStandardIdAndDivisionDivisionId(int sId, int dId,
			Pageable pageable);
	
}