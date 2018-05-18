/**
 * 
 */
package com.ssms.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ssms.dao.UserDao;
import com.ssms.vo.User;

/**
 * @author yeyongjia
 *
 */
@Service("userService")
public class UserService {
	
	@Resource
	private UserDao userDao;
	
	public User getUserInfo(Map<String,String> paramMap) {
		
		return userDao.queryUser(paramMap);
		
	}
	
	public int addUser(Map<String,String> paramMap) {
		
		return userDao.addUser(paramMap);
		
	}
	
	public List<User> getUserInfoList() {
		
		return userDao.queryUserList();
		
	}
	
	public int deleteUser(Map<String,String> paramMap){
		
		return userDao.deleteUser(paramMap);
		
	}

}
