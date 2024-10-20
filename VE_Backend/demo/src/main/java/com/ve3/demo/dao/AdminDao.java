package com.ve3.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ve3.demo.model.Admin;

@Repository
public interface AdminDao extends JpaRepository<Admin, String> {

}
