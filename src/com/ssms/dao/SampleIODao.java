/**
 * 
 */
package com.ssms.dao;

import java.util.List;
import java.util.Map;

import com.ssms.vo.SampleIO;

/**
 * @author Administrator
 *
 */
public interface SampleIODao {
	
	public int input(Map<String,String> paramMap);
	
	public List<SampleIO> list(Map<String,String> paramMap);
	
}
