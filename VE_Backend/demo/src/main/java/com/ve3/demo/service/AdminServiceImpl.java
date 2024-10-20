package com.ve3.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ve3.demo.dao.AdminDao;
import com.ve3.demo.model.Admin;

@Service
public class AdminServiceImpl implements AdminService{
	
	@Autowired
	private AdminDao adminDao;
	
	@Override
	public Admin getById(String adminEmail) {
		
		Optional<Admin> opt = adminDao.findById(adminEmail);
		if(opt.isPresent())
			return opt.get();
		else
			return null;
	}

	@Override
	public void save(Admin admin) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Admin> getAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteByEmail(String adminEmail) {
		// TODO Auto-generated method stub
		
	}

}
