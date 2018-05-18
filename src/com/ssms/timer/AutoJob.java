/**
 * 
 */
package com.ssms.timer;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.LoggerFactory;

import ch.qos.logback.classic.Logger;

import com.ssms.dao.ConfigDao;
import com.ssms.dao.SampleDao;
import com.ssms.util.DateUtil;
import com.ssms.util.HttpClient;
import com.ssms.vo.Sample;

/**
 * @author Administrator
 *
 */
public class AutoJob {
	
	@Resource
	private ConfigDao configDao;
	
	@Resource
	private SampleDao sampleDao;
	
	private static Logger logger = (Logger) LoggerFactory.getLogger(AutoJob.class);
	
	public void invoke() {
		
		Map<String,String> paramMap = new HashMap<String,String>();
		
		paramMap.put("ssms_key", "url");		
		
		String url = "";
		
		while(true){
			
			try{
				
				List<Map<String,String>> config = configDao.getConfigList(paramMap);
				
				if(config.size() > 0){
					
					url = config.get(0).get("ssms_value");
					
					System.out.println(url);
					
				}
				
				List<Sample> sampleList = sampleDao.getNotSyncSample();
				
				for(int i = 0 ; i < sampleList.size() ; i++){
					
					try{
						
						String result = post(url,sampleList.get(i));
						
						if(result != null && !"".equals(result.trim())){
						
							Map<String,String> param = new HashMap<String,String>();
							
							param.put("sample_id", sampleList.get(i).getSample_id());
							
							param.put("sync_time", DateUtil.getNowTime());
							
							sampleDao.setSyncSampleFlag(param);
							
						}
						
					}catch(Exception e){
						
						logger.error("同步数据出错",e);
						
					}
					
				}
				
				Thread.sleep(60000);
				
			}catch(Exception e){
				
				logger.error("同步数据出错",e);
				
			}
			
		}
		
	}
	
	public static String post(String url,Sample sample) throws Exception {
		
		Map<String,String> paramMap = new HashMap<String,String>();
		
		paramMap.put("Code", sample.getSample_id());
		
		paramMap.put("Time", sample.getSample_time());
		
		paramMap.put("Weather", sample.getSample_weather());
		
		paramMap.put("Depth", sample.getSample_depth());
		
		paramMap.put("MonitorPoint", "");
		
		paramMap.put("Height", sample.getSample_altitude());
		
		paramMap.put("LocaID", "");
		
		paramMap.put("LocaModel", "");
		
		paramMap.put("Land", sample.getSample_using());
		
		paramMap.put("Crop", sample.getSample_use_type());
		
		paramMap.put("Irrigation", "");
		
		paramMap.put("Terrain", sample.getSample_soil_face());
		
		paramMap.put("SoilModel", sample.getSample_soil_type());
		
		paramMap.put("SoilTexture", sample.getSample_soil_texture());
		
		paramMap.put("SoilColour", sample.getSample_soil_color());
		
		paramMap.put("SoilHumidity", "");
		
		paramMap.put("PeriEast", sample.getSample_env_info_east());
		
		paramMap.put("PeriSouth", sample.getSample_env_info_south());
		
		paramMap.put("PeriWest", sample.getSample_env_info_west());
		
		paramMap.put("PeriNorth", sample.getSample_env_info_north());
		
		paramMap.put("PhotoFront", sample.getSample_pic_before());
		
		paramMap.put("PhotoAfter", sample.getSample_pic_after());
		
		paramMap.put("PhotoEast", sample.getSample_pic_east());
		
		paramMap.put("PhotoSouth", sample.getSample_pic_south());
		
		paramMap.put("PhotoWest", sample.getSample_pic_west());
		
		paramMap.put("PhotoNorth", sample.getSample_pic_north());
		
		paramMap.put("Weight", sample.getSample_weight());
		
		paramMap.put("Tool", "");
		
		paramMap.put("Container", "");
		
		paramMap.put("Remarks", sample.getSample_remark());
		
		paramMap.put("SamplPerson", sample.getSample_operator());
		
		paramMap.put("NotePerson", sample.getSample_recorder());
		
		paramMap.put("CheckPerson", sample.getSample_checker());
		
		paramMap.put("NoteTime", sample.getSample_date());
		
		logger.info("同步样本数据，url:"+url+"\tparamMap:"+paramMap);
				
		return HttpClient.doPost(url, getRequestParam(paramMap));
		
	}
	
	public static String getRequestParam(Map<String, String> map) {
		
		StringBuilder param = new StringBuilder();
		
		for (Map.Entry<String, String> me : map.entrySet()) {
			
			param.append(me.getKey()).append("=").append(me.getValue()).append("&");
		
		}
		
		String result = param.toString();
		
		result = result.substring(0, result.length()-1);
		
		return result;
	
	}

}
