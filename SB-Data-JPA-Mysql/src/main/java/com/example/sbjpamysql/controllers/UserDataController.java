package com.example.sbjpamysql.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.sbjpamysql.models.UserData;
import com.example.sbjpamysql.services.UserDataService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class UserDataController {

	@Autowired
	private UserDataService userDataService;
	
	@PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN')")
	@GetMapping("/user-groups/{groupId}/users")
	@Procedure("application/json")
	public List<UserData> getAllUsers(@PathVariable int groupId){
		return userDataService.findByUserGroupId(groupId);
	}

	@PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN')")
	@GetMapping("/user-groups/{groupId}/users/{userId}")
	public UserData getUserById(@PathVariable int userId){
		return userDataService.getUserById(userId);
	}
	
	@GetMapping("/users/{email}")
	public UserData getUserByEmail(@PathVariable String email){
		return (UserData) userDataService.loadUserByUsername(email);
	}

	@PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN')")
	@PostMapping("/user-groups/{groupId}/users")
	public int addUser(@RequestBody UserData ud, @PathVariable int groupId){		
		UserData userData = userDataService.addUser(userDataService.cloneUser(ud), groupId);
		return userData.getId();
	}

	@PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN')")
	@PutMapping("/user-groups/{groupId}/users/{userId}")
	public int updateUser(@RequestBody UserData ud){
		UserData userData = userDataService.updateUser(ud);
		return userData.getId();
	}

	@PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN')")
	@DeleteMapping("/user-groups/{groupId}/users/{userId}")
	public void deleteUser(@PathVariable int userId){
		userDataService.deleteUser(userId);
	}

	@PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN')")
	@DeleteMapping("/user-groups/{groupId}/users")
	public void deleteUsers(@PathVariable int groupId){
		userDataService.deleteByGroupId(groupId);
	}
}
