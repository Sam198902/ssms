/**
 * 
 */
package com.ssms.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ssms.dao.LocationDao;
import com.ssms.vo.Location;

/**
 * @author yeyongjia
 *
 */
@Service("locationService")
public class LocationService {

	@Resource
	private LocationDao locationDao;
	
	public Map<String,List<String>> getAvaliablePosition1(Map<String,String> paramMap){
		
		Map<String,String> param = new HashMap<String,String>();
		
		param.put("location_type", "1");
		
		param.put("location_up_value", "0");
		
		List<Map<String,String>> allPosition1  = locationDao.getAllPosition(param);
		
		List<Map<String,Object>> usedPosition1 = locationDao.getUsedPosition1();
		
		return getPostionMap(1,allPosition1,usedPosition1);
		
	}
	
	public Map<String,List<String>> getAvaliablePosition2(Map<String,String> paramMap){
		
		Map<String,String> param = new HashMap<String,String>();
		
		param.put("location_type", "2");
		
		param.put("location_up_value", paramMap.get("sample_positon_1"));
		
		List<Map<String,String>> allPosition2  = locationDao.getAllPosition(param);
		
		List<Map<String,Object>> usedPosition2 = locationDao.getUsedPosition2(paramMap);
		
		return getPostionMap(2,allPosition2,usedPosition2);
		
	}
	
	public Map<String,List<String>> getAvaliablePosition3(Map<String,String> paramMap){
		
		Map<String,String> param = new HashMap<String,String>();
		
		param.put("location_type", "3");
		
		param.put("location_up_value", paramMap.get("sample_positon_1")+"."+paramMap.get("sample_positon_2"));
		
		List<Map<String,String>> allPosition3  = locationDao.getAllPosition(param);
		
		List<Map<String,Object>> usedPosition3 = locationDao.getUsedPosition3(paramMap);
		
		return getPostionMap(3,allPosition3,usedPosition3);
		
	}
	
	public Map<String,List<String>> getAvaliablePosition4(Map<String,String> paramMap){
		
		Map<String,String> param = new HashMap<String,String>();
		
		param.put("location_type", "4");
		
		param.put("location_up_value", paramMap.get("sample_positon_1")+"."+paramMap.get("sample_positon_2")+"."+paramMap.get("sample_positon_3"));
		
		List<Map<String,String>> allPosition4  = locationDao.getAllPosition(param);
		
		List<Map<String,Object>> usedPosition4 = locationDao.getUsedPosition4(paramMap);
		
		return getPostionMap(4,allPosition4,usedPosition4);
		
	}
	
	public Map<String,List<String>> getAvaliablePosition5(Map<String,String> paramMap){
		
		Map<String,String> param = new HashMap<String,String>();
		
		param.put("location_type", "5");
		
		param.put("location_up_value", paramMap.get("sample_positon_1")+"."+paramMap.get("sample_positon_2")+"."+paramMap.get("sample_positon_3")+"."+paramMap.get("sample_positon_4"));
		
		List<Map<String,String>> allPosition5  = locationDao.getAllPosition(param);
		
		List<Map<String,Object>> usedPosition5 = locationDao.getUsedPosition5(paramMap);
		
		return getPostionMap(5,allPosition5,usedPosition5);
		
	}
	
	public Map<String,List<String>> getAvaliablePosition6(Map<String,String> paramMap){
		
		Map<String,String> param = new HashMap<String,String>();
		
		param.put("location_type", "6");
		
		param.put("location_up_value", paramMap.get("sample_positon_1")+"."+paramMap.get("sample_positon_2")+"."+paramMap.get("sample_positon_3")+"."+paramMap.get("sample_positon_4")+"."+paramMap.get("sample_positon_5"));
		
		List<Map<String,String>> allPosition6  = locationDao.getAllPosition(param);
		
		List<Map<String,Object>> usedPosition6 = locationDao.getUsedPosition6(paramMap);
		
		return getPostionMap(6,allPosition6,usedPosition6);
		
	}
	
	public Map<String,List<String>> getPostionMap(int type,List<Map<String,String>> allPosition,List<Map<String,Object>> usedPosition) {
		
		Map<String,List<String>> resultMap = new HashMap<String,List<String>>();
		
		List<String> all_position = new ArrayList<String>();
		
		List<String> used_position = new ArrayList<String>();
		
		for(int i = 0 ; i < allPosition.size() ; i++){
			
			Map<String,String> map1 = allPosition.get(i);
			
			String location_value = map1.get("location_value");
			
			int location_max_node = Integer.parseInt(map1.get("location_max_node"));
			
			all_position.add(location_value);
			
			for(int j = 0 ; j < usedPosition.size() ; j++){
				
				Map<String,Object> map2 = usedPosition.get(j);
				
				String sample_position = (String)map2.get("sample_position");
				
				int used_num = (Integer)map2.get("used_num");
				
				if(location_value.equals(sample_position)){
					
					if(location_max_node == used_num){
						
						used_position.add(location_value);
						
						all_position.remove(location_value);
						
					}
					
					break;
					
				}
				
			}
			
		}
		
		resultMap.put("all_position"+type, all_position);
		
		resultMap.put("used_position"+type, used_position);
		
		return resultMap;
		
	}
	
	
	public int setLocation(Map<String,String> paramMap) {
		
		int result = 0;
		
		String location_type = paramMap.get("location_type");
		
		int location_type_int = Integer.parseInt(location_type);
		
		String sample_positon_1 = "";
		
		String sample_positon_2 = "";
		
		String sample_positon_3 = "";
		
		String sample_positon_4 = "";
		
		String sample_positon_5 = "";
		
		String sample_positon_6 = "";
		
		if(location_type_int == 1){
			
			sample_positon_1 = paramMap.get("sample_positon_1");
			
			String[] sample_positon_1_arr = sample_positon_1.split(",");
			
			for(int i = 0 ; i < sample_positon_1_arr.length ; i++){
				
				paramMap.put("location_value", sample_positon_1_arr[i]);	
					
				paramMap.put("location_up_value", "0");
				
				result+=locationDao.setLocation(paramMap);
				
			}
			
		}else if(location_type_int == 2){
			
			sample_positon_1 = paramMap.get("sample_positon_1");
			
			sample_positon_2 = paramMap.get("sample_positon_2");
			
			String[] sample_positon_1_arr = sample_positon_1.split(",");
			
			String[] sample_positon_2_arr = sample_positon_2.split(",");
			
			for(int i = 0 ; i < sample_positon_1_arr.length ; i++){
				
				for(int j = 0 ; j < sample_positon_2_arr.length ; j++){
				
					paramMap.put("location_value", sample_positon_2_arr[j]);	
					
					paramMap.put("location_up_value", sample_positon_1_arr[i]);
					
					result+=locationDao.setLocation(paramMap);
					
				}
				
			}
			
		}else if(location_type_int == 3){
			
			sample_positon_1 = paramMap.get("sample_positon_1");
			
			sample_positon_2 = paramMap.get("sample_positon_2");
			
			sample_positon_3 = paramMap.get("sample_positon_3");
			
			String[] sample_positon_1_arr = sample_positon_1.split(",");
			
			String[] sample_positon_2_arr = sample_positon_2.split(",");
			
			String[] sample_positon_3_arr = sample_positon_3.split(",");
			
			for(int i = 0 ; i < sample_positon_1_arr.length ; i++){
				
				for(int j = 0 ; j < sample_positon_2_arr.length ; j++){
					
					for(int k = 0 ; k < sample_positon_3_arr.length ; k++){
				
						paramMap.put("location_value", sample_positon_3_arr[k]);	
						
						paramMap.put("location_up_value", sample_positon_1_arr[i]+"."+sample_positon_2_arr[j]);
						
						result+=locationDao.setLocation(paramMap);
						
					}
					
				}
				
			}
			
		}else if(location_type_int == 4){
			
			sample_positon_1 = paramMap.get("sample_positon_1");
			
			sample_positon_2 = paramMap.get("sample_positon_2");
			
			sample_positon_3 = paramMap.get("sample_positon_3");
			
			sample_positon_4 = paramMap.get("sample_positon_4");
			
			String[] sample_positon_1_arr = sample_positon_1.split(",");
			
			String[] sample_positon_2_arr = sample_positon_2.split(",");
			
			String[] sample_positon_3_arr = sample_positon_3.split(",");
			
			String[] sample_positon_4_arr = sample_positon_4.split(",");
			
			for(int i = 0 ; i < sample_positon_1_arr.length ; i++){
				
				for(int j = 0 ; j < sample_positon_2_arr.length ; j++){
					
					for(int k = 0 ; k < sample_positon_3_arr.length ; k++){
						
						for(int x = 0 ; x < sample_positon_4_arr.length ; x++){
				
							paramMap.put("location_value", sample_positon_4_arr[x]);	
							
							paramMap.put("location_up_value", sample_positon_1_arr[i]+"."+sample_positon_2_arr[j]+"."+sample_positon_3_arr[k]);
							
							result+=locationDao.setLocation(paramMap);
							
						}
						
					}
					
				}
				
			}
			
		}else if(location_type_int == 5){
			
			sample_positon_1 = paramMap.get("sample_positon_1");
			
			sample_positon_2 = paramMap.get("sample_positon_2");
			
			sample_positon_3 = paramMap.get("sample_positon_3");
			
			sample_positon_4 = paramMap.get("sample_positon_4");
			
			sample_positon_5 = paramMap.get("sample_positon_5");
			
			String[] sample_positon_1_arr = sample_positon_1.split(",");
			
			String[] sample_positon_2_arr = sample_positon_2.split(",");
			
			String[] sample_positon_3_arr = sample_positon_3.split(",");
			
			String[] sample_positon_4_arr = sample_positon_4.split(",");
			
			String[] sample_positon_5_arr = sample_positon_5.split(",");
			
			for(int i = 0 ; i < sample_positon_1_arr.length ; i++){
				
				for(int j = 0 ; j < sample_positon_2_arr.length ; j++){
					
					for(int k = 0 ; k < sample_positon_3_arr.length ; k++){
						
						for(int x = 0 ; x < sample_positon_4_arr.length ; x++){
							
							for(int y = 0 ; y < sample_positon_5_arr.length ; y++){
				
								paramMap.put("location_value", sample_positon_5_arr[y]);	
								
								paramMap.put("location_up_value", sample_positon_1_arr[i]+"."+sample_positon_2_arr[j]+"."+sample_positon_3_arr[k]+"."+sample_positon_4_arr[x]);
								
								result+=locationDao.setLocation(paramMap);
								
							}
							
						}
						
					}
					
				}
				
			}
			
		}else if(location_type_int == 6){
			
			sample_positon_1 = paramMap.get("sample_positon_1");
			
			sample_positon_2 = paramMap.get("sample_positon_2");
			
			sample_positon_3 = paramMap.get("sample_positon_3");
			
			sample_positon_4 = paramMap.get("sample_positon_4");
			
			sample_positon_5 = paramMap.get("sample_positon_5");
			
			sample_positon_6 = paramMap.get("sample_positon_6");
			
			String[] sample_positon_1_arr = sample_positon_1.split(",");
			
			String[] sample_positon_2_arr = sample_positon_2.split(",");
			
			String[] sample_positon_3_arr = sample_positon_3.split(",");
			
			String[] sample_positon_4_arr = sample_positon_4.split(",");
			
			String[] sample_positon_5_arr = sample_positon_5.split(",");
			
			String[] sample_positon_6_arr = sample_positon_6.split(",");
			
			for(int i = 0 ; i < sample_positon_1_arr.length ; i++){
				
				for(int j = 0 ; j < sample_positon_2_arr.length ; j++){
					
					for(int k = 0 ; k < sample_positon_3_arr.length ; k++){
						
						for(int x = 0 ; x < sample_positon_4_arr.length ; x++){
							
							for(int y = 0 ; y < sample_positon_5_arr.length ; y++){
								
								for(int z = 0 ; z < sample_positon_6_arr.length ; z++){
				
									paramMap.put("location_value", sample_positon_6_arr[y]);	
									
									paramMap.put("location_up_value", sample_positon_1_arr[i]+"."+sample_positon_2_arr[j]+"."+sample_positon_3_arr[k]+"."+sample_positon_4_arr[x]+"."+sample_positon_5_arr[y]);
									
									result+=locationDao.setLocation(paramMap);
									
								}
								
							}
							
						}
						
					}
					
				}
				
			}
			
		}

		return result;
		
	}
	
	public int delLocation(Map<String,String> paramMap) {
		
		return locationDao.delLocation(paramMap);
		
	}
	
	public int delAllLocation(Map<String,String> paramMap) {
		
		return locationDao.delAllLocation(paramMap);
		
	}
	
	public List<Location> getLocationList(Map<String,String> paramMap) {
		
		return locationDao.getLocationList(paramMap);
		
	}

		
}
