package com.example.sbjpamysql.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserGroup {
	
	@Id
	@GenericGenerator(name = "group_id", strategy = "com.example.sbjpamysql.idgenerators.GroupIdGen")
    @GeneratedValue(generator = "group_id")
	private int id;
	private String name;
	
	public UserGroup(int id, String name) {
		super();
		this.id = id;
		this.name = name;
	}

	public UserGroup() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
