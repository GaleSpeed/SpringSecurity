package com.example.sbjpamysql.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class Role {
	
	@Id
	@GenericGenerator(name = "role_id", strategy = "com.example.sbjpamysql.idgenerators.RoleIdGen")
    @GeneratedValue(generator = "role_id")
	private int id;
	
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

	String name;
	
	Role(){
	};
	
	Role(int id,String name){
		//super();
		this.id = id;
		this.name = name;
	}

}
