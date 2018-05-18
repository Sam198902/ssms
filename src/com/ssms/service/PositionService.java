/**
 * 
 */
package com.ssms.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import ch.qos.logback.classic.Logger;

import com.ssms.dao.PositionDao;
import com.ssms.vo.Position;

/**
 * @author yeyongjia
 *
 */
@Service("positionService")
public class PositionService {
	
	private static Logger logger = (Logger) LoggerFactory.getLogger(PositionService.class);
	
	@Resource
	private PositionDao positionDao;
	
	public int setPosition(Map<String,String> paramMap){
		
		return positionDao.setPosition(paramMap);
		
	}
	
	public int delPosition(Map<String,String> paramMap){
		
		return positionDao.delPosition(paramMap);
		
	}
	
	public List<Position> getPositionList(Map<String,String> paramMap){
		
		return positionDao.getPositionList(paramMap);
		
	}
	
	public int batchSetPostion(String param){
		
		int result = 0;
		
		try{
		
			JSONObject obj = JSONObject.fromObject(param);
			
			Map<String,String> paramMap = new HashMap<String,String>();
			
			paramMap.put("position_type", obj.getString("position_type"));
			
			paramMap.put("position_up_value", obj.getString("position_up_value"));
			
			JSONArray list = obj.getJSONArray("position_value_list");
			
			for(int i = 0; list != null && i < list.size() ; i++){
				
				JSONObject item = list.getJSONObject(i);
				
				paramMap.put("position_value", item.getString("position_value"));
				
				paramMap.put("postion_nickname", item.getString("postion_nickname"));
				
				result += positionDao.setPosition(paramMap);
				
			}
		
			
		}catch(Exception e){
			
			logger.error("Exception in batchSetPostion:",e);
			
		}
		
		return result;
		
	}
	
	public int batchDelPostion(String param){
		
		int result = 0;
		
		try{
		
			JSONObject obj = JSONObject.fromObject(param);
			
			Map<String,String> paramMap = new HashMap<String,String>();
			
			paramMap.put("position_type", obj.getString("position_type"));
			
			JSONArray list = obj.getJSONArray("position_value_list");
			
			for(int i = 0; list != null && i < list.size() ; i++){
				
				JSONObject item = list.getJSONObject(i);
				
				paramMap.put("position_value", item.getString("position_value"));
				
				result += positionDao.delPosition(paramMap);
				
			}
		
			
		}catch(Exception e){
			
			logger.error("Exception in batchDelPostion:",e);
			
		}
		
		return result;
		
	}
	
}
