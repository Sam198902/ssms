/**
 * 
 */
package com.ssms.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ssms.dao.SampleIODao;
import com.ssms.vo.SampleIO;

/**
 * @author yeyongjia
 *
 */
@Service("sampleIOService")
public class SampleIOService {
	
	@Resource
	private SampleIODao sampleIODao;
	
	public int input(Map<String,String> paramMap){
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		
		String sample_in_time = sdf.format(new Date());
		
		paramMap.put("sample_in_time", sample_in_time);
		
		paramMap.put("sample_io_type", "1");
		
		return sampleIODao.input(paramMap);
		
	}
	
	public List<SampleIO> list(Map<String,String> paramMap){
		
		return sampleIODao.list(paramMap);
		
	}

}
