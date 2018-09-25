package com.example.sbjpamysql.controllers;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.sbjpamysql.models.UserGroup;
import com.example.sbjpamysql.services.UserGroupService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class UserGroupController {
	
	@Autowired
	private UserGroupService userGroupService;
	
	@RequestMapping("/")
	public String index(){
		return "Welcome to User Group Module";
	}
	
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	@GetMapping("/user-groups")
	public List<UserGroup> getAllGroups(){
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		Set<String> roles = authentication.getAuthorities().stream()
		     .map(r -> r.getAuthority()).collect(Collectors.toSet());

		System.out.println(roles);
		
		return userGroupService.getAllGroups();
	}
	
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	@GetMapping("/user-groups/{groupId}")
	public UserGroup getGroupById(@PathVariable int groupId){
		UserGroup group = userGroupService.getGroupById(groupId);
		return group;
	}
	
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	@PostMapping("/user-groups")
	public int addGroup(@RequestBody UserGroup ud){		
		UserGroup userGroup = userGroupService.addGroup(userGroupService.cloneGroup(ud));
		return userGroup.getId();
	}
	
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	@PutMapping("/user-groups")
	public int updateGroup(@RequestBody UserGroup ug){
		UserGroup userGroup = userGroupService.updateGroup(ug);
		return userGroup.getId();
	}
	
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	@DeleteMapping("/user-groups/{groupId}")
	public void deleteGroup(@PathVariable int groupId){
		userGroupService.deleteGroup(groupId);
	}
	
}
