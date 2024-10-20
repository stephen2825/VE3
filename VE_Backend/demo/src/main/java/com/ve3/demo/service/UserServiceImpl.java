package com.ve3.demo.service;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;

import com.ve3.demo.dao.UserDao;
import com.ve3.demo.model.User;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	UserDao userDao;
	
	@Override
	public void add(User user) {
	    // Hash the password before saving the user
	    user.setUserPassword(hashPassword(user.getUserPassword()));

	    // Save the new user
	    userDao.save(user);
	}



	
	// encrypt the password
	static private String hashPassword(String plainTextPassword){
		return BCrypt.hashpw(plainTextPassword, BCrypt.gensalt());
	}
	
	@Override
	public List<User> getAll() {
		Iterable<User> itr = userDao.findAll();
		List<User> lst = new ArrayList<User>();
		itr.forEach(ele->lst.add(ele));
		return lst;
	}

	@Override
	public User getById(int userId) {
		Optional<User> opt = userDao.findById(userId);
		if(opt.isPresent()) {
			return opt.get();
		}
			
		return null;
	}

	@Override
	public User getByEmail(String userEmail) {
		// TODO Auto-generated method stub
		User obj=userDao.selectByUserEmail(userEmail);
		if(obj != null) {
			return obj;
		}
		return null;
	}

	@Override
	public void save(User user) {
		// TODO Auto-generated method stub
		
	}
	@Override
	public void update(User user) {
	    // Add any additional update logic if needed
	    userDao.save(user);
	}

	

}
