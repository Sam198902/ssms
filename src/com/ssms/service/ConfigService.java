/**
 * 
 */
package com.ssms.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ssms.dao.ConfigDao;

/**
 * @author yeyongjia
 *
 */
@Service("configService")
public class ConfigService {

	@Resource
	private ConfigDao configDao;
	
	public int updConfig(Map<String,String> paramMap) {
		
		return configDao.updConfig(paramMap);
		
	}
	
	public int setConfig(Map<String,String> paramMap){
		
		
		return configDao.setConfig(paramMap); 
	}
	
	public List<Map<String,String>> getConfigList(Map<String,String> paramMap){
		
		return configDao.getConfigList(paramMap);
		
	}
	
	public int delConfig(Map<String,String> paramMap){
		
		return configDao.delConfig(paramMap);
		
	}

}
