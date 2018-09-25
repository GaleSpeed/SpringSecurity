package com.example.sbjpamysql.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.sbjpamysql.dao.UserDataDao;
import com.example.sbjpamysql.models.Address;
import com.example.sbjpamysql.models.UserData;
import com.example.sbjpamysql.models.UserGroup;

@Service("userDetailsService")
public class UserDataService implements UserDetailsService {
	@Autowired
	private UserDataDao userDataDao;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return userDataDao.findOneByEmail(username);
	}
	
	public List<UserData> findByUserGroupId(int groupId){
		return userDataDao.findByUserGroupId(groupId);
	}
	
	public UserData addUser(UserData userData, int groupId){
		userData.setUserGroup(new UserGroup(groupId,""));
		return userDataDao.save(userData);
	}
	
	public UserData getUser(int id){
		return userDataDao.findById(id).get();
	}
	public void deleteUser(int id){
		userDataDao.deleteById(id);
	}
	public void deleteByGroupId(int groupId){
		userDataDao.deleteByUserGroupId(groupId);
	}
	public UserData cloneUser(UserData ud){
		UserData userData = new UserData();
		
		userData.setId(ud.getId());
		userData.setUsername(ud.getUsername());
		userData.setPhone(ud.getPhone());
		userData.setEmail(ud.getEmail());
		userData.setPassword(ud.getPassword());
		userData.setAddresses(new ArrayList<Address>(ud.getAddresses()));
		userData.setEnabled(ud.isEnabled());
		userData.setRole(ud.getRole());
		
		List<Address> adrs = userData.getAddresses();
		adrs.forEach(adr -> adr.setUserData(userData));
		return userData;
	}
	public UserData updateUser(UserData ud){
		return userDataDao.save(ud);
	}

	public UserData getUserById(int userId) {
		return userDataDao.getOne(userId);
	}

	public UserData findOne(String username) {
		return userDataDao.getUserByUsername(username);
	}
}
