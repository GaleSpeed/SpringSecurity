package com.example.sbjpamysql.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.sbjpamysql.models.UserGroup;

public interface UserGroupDao extends JpaRepository<UserGroup, Integer> {

}
