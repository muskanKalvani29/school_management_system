package com.school.app.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.school.app.model.TeacherRequest;
import com.school.app.model.User;

@Repository
public interface TeacherRequestRepository extends PagingAndSortingRepository<TeacherRequest, Integer>{

   public TeacherRequest findByUserName(String username);

}
