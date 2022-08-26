package com.school.app.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.school.app.model.FeePayment;

@Repository
public interface FeePaymentRepository extends PagingAndSortingRepository<FeePayment, Integer>
{
	@Query(nativeQuery = true,value="select * from fee_payment where(student_gr_no) like :grNo%")
	public Page<FeePayment> findFeePaymentByGrNo(int grNo,Pageable pageable);

	@Query(nativeQuery = true,value = "select * from fee_payment,student\r\n"
			+ "where fee_payment.student_gr_no=student.gr_no And student.standard_standard_id= :s_id And student.division_division_id= :d_id")
	public Page<FeePayment> findFeePaymentByStandardAndDivision(int s_id,int d_id, Pageable pageable);

	@Query(nativeQuery = true,value = "select * from fee_payment,student\r\n"
			+ "where fee_payment.student_gr_no=student.gr_no And student.standard_standard_id= :s_id")
	public Page<FeePayment> findFeePaymentByStandard(int s_id, Pageable pageable);
}
