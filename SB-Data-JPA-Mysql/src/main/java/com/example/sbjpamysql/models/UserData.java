package com.example.sbjpamysql.models;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.xml.bind.annotation.XmlRootElement;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity(name="users")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "authorities","accountNonExpired","credentialsNonExpired","accountNonLocked"})
@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class,property="id", scope = UserData.class)
@XmlRootElement(name = "UserData")
public class UserData implements UserDetails{
	
	static final long serialVersionUID = 1L;
	
	@Id
	@GenericGenerator(name = "data_id", strategy = "com.example.sbjpamysql.idgenerators.DataIdGen")
    @GeneratedValue(generator = "data_id")
	@Column(name = "user_id", nullable = false, updatable = false)
	private int id;
	
	@Column(name = "username", nullable = false, unique = true)
	private String username;
	
	@Column(name = "password", nullable = false)
	private String password;
	
	@Column(name = "email", nullable = false)
	private String email;
	
	@Column(name = "phone", nullable = false)
	private String phone;
	
	@Column(name = "enabled", nullable = false)
	private boolean enabled;
	
	@OneToMany(cascade=CascadeType.ALL,mappedBy="userData")
	private List<Address> addresses;
	
	@ManyToOne
    private Role role;
	
	@ManyToOne	
	private UserGroup userGroup;

	public UserData(){
		
	}
	
	public UserData(int id, String username, String password, String email, boolean enabled, String phone, int groupId) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.email = email;
		this.phone = phone;
		this.enabled = enabled;
		this.userGroup = new UserGroup(groupId,"");
		
		int role_id = getRoleId(groupId);
		
		this.role = new Role(role_id,"");
	}
	
	private int getRoleId(int groupId) {
		int id = 0;
		
		if(groupId == 1) id=2;
		else if (groupId == 2) id=1;
		return id;
	}

	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		
        String name = role.getName().toUpperCase();
        authorities.add(new SimpleGrantedAuthority(name));

		return authorities;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// we never lock accounts
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// credentials never expire
		return true;
	}

	@Override
	public boolean isEnabled() {
		return enabled;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}

	public List<Address> getAddresses() {
		return addresses;
	}

	public void setAddresses(List<Address> addresses) {
		this.addresses = addresses;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public UserGroup getUserGroup() {
		return userGroup;
	}

	public void setUserGroup(UserGroup userGroup) {
		this.userGroup = userGroup;
	}

}
