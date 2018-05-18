package com.ssms.dao;

import java.util.List;
import java.util.Map;

import com.ssms.vo.User;

public interface UserDao {

	public User queryUser(Map<String,String> paramMap);
	
	public int addUser(Map<String,String> paramMap);
	
	public int deleteUser(Map<String,String> paramMap);
	
	public int updateUser(Map<String,String> paramMap);
	
	public List<User> queryUserList();
	
}
