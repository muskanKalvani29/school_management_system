package com.school.app.config.security;

import java.util.Collection;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.school.app.model.User;
import com.school.app.model.UserType;

@CrossOrigin(origins="http://localhost:4200")
public class UserPrincipal implements UserDetails 
{
	private static final long serialVersionUID = 1L;
	
	@Autowired
	private User user;
	
	public UserPrincipal(User user) {
		this.user=user;
	}

	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
	
		UserType userType =user.getUserType();
		//System.out.println(userType.getUserType());
		List<SimpleGrantedAuthority> authorities = new java.util.ArrayList<SimpleGrantedAuthority>();
		authorities.add(new SimpleGrantedAuthority(userType.getUserType()));
		return authorities;
		
	}

	
	@Override
	public String getPassword() {
		
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		
		return user.getUserName();
	}

	@Override
	public boolean isAccountNonExpired() {
		
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		
		return true;
	}

	@Override
	public boolean isEnabled() {	
		
		return true;
	}
	
}
