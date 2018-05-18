/**
 * 
 */
package com.ssms.dao;

import java.util.List;
import java.util.Map;

import com.ssms.vo.Position;

/**
 * @author yeyongjia
 *
 */
public interface PositionDao {
	
	public int setPosition(Map<String,String> paramMap);
	
	public int delPosition(Map<String,String> paramMap);
	
	public List<Position> getPositionList(Map<String,String> paramMap);
	
}
