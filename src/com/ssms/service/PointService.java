/**
 * 
 */
package com.ssms.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import ch.qos.logback.classic.Logger;

import com.ssms.dao.PointDao;
import com.ssms.vo.Point;

/**
 * @author yeyongjia
 *
 */
@Service("pointService")
public class PointService {
	
	private static Logger logger = (Logger) LoggerFactory.getLogger(PointService.class);
	
	@Resource
	private PointDao pointDao;
	
	public int setPoint(Map<String,String> paramMap){
		
		List<Point> pointList = pointDao.getPointList(paramMap);
		
		if(pointList != null && pointList.size() > 0){
			
			for(int i = 0 ; i < pointList.size() ; i++){
				
				Point point = pointList.get(i);
				
				Map<String,String> param = new HashMap<String,String>();
				
				param.put("sample_area", point.getSample_area());			
				
				pointDao.delPoint(param);
				
			}
			
		}
		
		return pointDao.setPoint(paramMap);
		
	}
	
	public int delPoint(Map<String,String> paramMap){
		
		return pointDao.delPoint(paramMap);
		
	}
	
	public List<Point> getPointList(Map<String,String> paramMap){
		
		return pointDao.getPointList(paramMap);
		
	}
	
}
