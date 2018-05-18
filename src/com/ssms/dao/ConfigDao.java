/**
 * 
 */
package com.ssms.dao;

import java.util.List;
import java.util.Map;

import com.ssms.vo.Point;

/**
 * @author Administrator
 *
 */
public interface ConfigDao {

	public int updConfig(Map<String,String> paramMap);
	
	public int setConfig(Map<String,String> paramMap);
	
	public List<Map<String,String>> getConfigList(Map<String,String> paramMap);
	
	public int delConfig(Map<String,String> paramMap);
	
}
