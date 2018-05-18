/**
 * 
 */
package com.ssms.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ssms.dao.SampleDao;
import com.ssms.util.ConvertUtil;
import com.ssms.util.DateUtil;
import com.ssms.vo.Sample;

/**
 * @author yeyongjia
 *
 */
@Service("sampleService")
public class SampleService {
	
	@Resource
	private SampleDao sampleDao;
	
	public int addSample(Map<String,String> paramMap){
		
		StringBuffer sb = new StringBuffer();
		
		sb.append(DateUtil.getDateFormatStr(paramMap.get("sample_time")));
		
		sb.append(ConvertUtil.formatArea(paramMap.get("sample_area")));
		
		sb.append(ConvertUtil.formatString(paramMap.get("sample_depth"), 2));
		
		sb.append(ConvertUtil.formatSoilUseType(paramMap.get("sample_use_type")));
		
		int count = sampleDao.getSampleNo(paramMap);
		
		sb.append(ConvertUtil.formatString(""+(count+1),2));
		
		paramMap.put("sample_id", sb.toString());
		
		return sampleDao.addSample(paramMap);
		
	}
	
	public Sample getSample(Map<String,String> paramMap){
		
		return sampleDao.getSample(paramMap);
		
	}
	
	public int updateSample(Map<String,String> paramMap){
		
		return sampleDao.updateSample(paramMap);
		
	}
	
	public int deleteSample(Map<String,String> paramMap){
		
		return sampleDao.deleteSample(paramMap);
		
	}
	
	public List<Sample> getSampleList(Map<String,String> paramMap){
		
		return sampleDao.getSampleList(paramMap);
		
	}
	
	public List<Sample> getSampleListByKeyword(Map<String,String> paramMap){
		
		return sampleDao.getSampleListByKeyword(paramMap);
		
	}
	
	public List<Sample> getSampleListByKeywords(Map<String,String> paramMap){
		
		return sampleDao.getSampleListByKeywords(paramMap);
		
	}
	
	public List<String> getTownListFromSample(Map<String,String> paramMap){
			
		return sampleDao.getTownListFromSample(paramMap);
		
	}
	
	public List<String> getVillageListFromSample(Map<String,String> paramMap){
		
		return sampleDao.getVillageListFromSample(paramMap);
		
	}

}
