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
public interface PointDao {

	public int setPoint(Map<String,String> paramMap);
	
	public List<Point> getPointList(Map<String,String> paramMap);
	
	public int delPoint(Map<String,String> paramMap);
	
}
