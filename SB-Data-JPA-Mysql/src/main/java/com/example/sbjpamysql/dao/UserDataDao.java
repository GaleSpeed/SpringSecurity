package com.example.sbjpamysql.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.sbjpamysql.models.UserData;

public interface UserDataDao extends JpaRepository<UserData, Integer> {
	
	public List<UserData> findByUserGroupId(int groupId);
	public void deleteByUserGroupId(int groupId);
	public UserData getUserByUsername(String username);
	public UserData findOneByEmail(String email);

}
