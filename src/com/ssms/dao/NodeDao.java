package com.ssms.dao;

import java.util.List;
import java.util.Map;

public interface NodeDao {

	public List<Map<String,Object>> getAllPosition1();
	
	public List<Map<String,Object>> getUsedPosition1();
	
	public List<Map<String,Object>> getAllPosition2(Map<String,String> param);
	
	public List<Map<String,Object>> getUsedPosition2(Map<String,String> param);
	
	public List<Map<String,Object>> getAllPosition3(Map<String,String> param);
	
	public List<Map<String,Object>> getUsedPosition3(Map<String,String> param);
	
	public List<Map<String,Object>> getAllPosition4(Map<String,String> param);
	
	public List<Map<String,Object>> getUsedPosition4(Map<String,String> param);
	
	public List<Map<String,Object>> getAllPosition5(Map<String,String> param);
	
	public List<Map<String,Object>> getUsedPosition5(Map<String,String> param);

	public List<Map<String,Object>> getAllPosition6(Map<String,String> param);
	
	public List<Map<String,Object>> getUsedPosition6(Map<String,String> param);
	
	public int set(Map<String,String> paramMap);
	
}
