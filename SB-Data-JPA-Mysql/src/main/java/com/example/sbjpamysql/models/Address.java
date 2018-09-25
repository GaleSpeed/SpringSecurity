package com.example.sbjpamysql.models;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.xml.bind.annotation.XmlRootElement;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class,property="id", scope = Address.class)
@XmlRootElement(name = "Address")
public class Address{
	
	
	@Id
	@GenericGenerator(name = "addr_id", strategy = "com.example.sbjpamysql.idgenerators.AddressIdGen")
    @GeneratedValue(generator = "addr_id")
	private int id;
	private String hno;
	private String area;
	private String pincode;
	
	@ManyToOne(cascade=CascadeType.ALL,targetEntity = UserData.class)
	private UserData userData;
	
/*	public Address(){
		
	}
	
	public Address(String hno, String area, String pincode,int userId,int groupId) {
		super();
		this.hno = hno;
		this.area = area;
		this.pincode = pincode;
		this.userData = new UserData(userId,"","","",true,"",groupId);
	}
	*/
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public UserData getUserData() {
		return userData;
	}
	public void setUserData(UserData userData) {
		this.userData = userData;
	}
	
	public String getHno() {
		return hno;
	}
	public void setHno(String hno) {
		this.hno = hno;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	public String getPincode() {
		return pincode;
	}
	public void setPincode(String pincode) {
		this.pincode = pincode;
	}
}
