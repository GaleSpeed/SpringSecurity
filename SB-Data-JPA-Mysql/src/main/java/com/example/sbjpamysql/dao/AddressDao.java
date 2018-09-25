package com.example.sbjpamysql.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.sbjpamysql.models.Address;

public interface AddressDao extends JpaRepository<Address,Integer> {

}
