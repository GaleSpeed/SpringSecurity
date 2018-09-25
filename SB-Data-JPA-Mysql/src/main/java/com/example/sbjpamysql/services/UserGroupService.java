package com.example.sbjpamysql.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.sbjpamysql.dao.UserGroupDao;
import com.example.sbjpamysql.models.UserGroup;

@Service
public class UserGroupService {
	@Autowired
	private UserGroupDao userGroupDao;
	
	public List<UserGroup> getAllGroups(){
		return userGroupDao.findAll();
	}
	
	public UserGroup addGroup(UserGroup userGroup){
		return userGroupDao.save(userGroup);
	}
	
	public UserGroup getGroup(int id){
		return userGroupDao.findById(id).get();
	}
	public void deleteGroup(int id){
		userGroupDao.deleteById(id);
	}
	public UserGroup cloneGroup(UserGroup ug){
		UserGroup userGroup = new UserGroup();
		
		userGroup.setId(ug.getId());
		userGroup.setName(ug.getName());
		return userGroup;
	}
	public UserGroup updateGroup(UserGroup ug){
		return userGroupDao.save(ug);
	}

	public UserGroup getGroupById(int groupId) {
		return userGroupDao.getOne(groupId);
	}
}
