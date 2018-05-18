/**
 * 
 */
package com.ssms.dao;

import java.util.List;
import java.util.Map;

import com.ssms.vo.Location;

/**
 * @author yeyongjia
 *
 */
public interface LocationDao {
	
	public List<Map<String,String>> getAllPosition(Map<String,String> param);
	
	public List<Map<String,Object>> getUsedPosition1();

	public List<Map<String,Object>> getUsedPosition2(Map<String,String> param);
	
	public List<Map<String,Object>> getUsedPosition3(Map<String,String> param);
	
	public List<Map<String,Object>> getUsedPosition4(Map<String,String> param);
	
	public List<Map<String,Object>> getUsedPosition5(Map<String,String> param);

	public List<Map<String,Object>> getUsedPosition6(Map<String,String> param);
	
	public int setLocation(Map<String,String> paramMap);
	
	public int delLocation(Map<String,String> paramMap);
	
	public int delAllLocation(Map<String,String> paramMap);
	
	public List<Location> getLocationList(Map<String,String> paramMap);
	
	public Location getLocationUpValue(Map<String,String> paramMap);
	
	
	
}
