package com.ve3.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ve3.demo.model.User;

@Repository
public interface UserDao extends JpaRepository<User, Integer>{
	@Query(value="select v from User v where v.userEmail = :userEmail")
	public User selectByUserEmail(@Param(value = "userEmail") String userEmail);

}
