package com.school.app.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.school.app.model.User;
import com.school.app.repository.UserRepository;

@Service
@CrossOrigin(origins="http://localhost:4200")
public class UserDetailServiceImpl implements UserDetailsService{

	@Autowired
	UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException 
	{
		User user =userRepository.findByUserName(username);
		
		if(user==null)
		{
			throw new UsernameNotFoundException("username not found for the username : ");
		}
		
		UserPrincipal userPrincipal = new UserPrincipal(user);
		//System.out.print(user.getUserType());
		return userPrincipal;
	}

}
