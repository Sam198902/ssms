/**
 * 
 */
package com.ssms.dao;

import java.util.List;
import java.util.Map;

import com.ssms.vo.Sample;

/**
 * @author yeyongjia
 *
 */
public interface SampleDao {
	
	public int addSample(Map<String,String> paramMap);
	
	public Sample getSample(Map<String,String> paramMap);
	
	public int updateSample(Map<String,String> paramMap);
	
	public int deleteSample(Map<String,String> paramMap);
	
	public List<Sample> getSampleList(Map<String,String> paramMap);
	
	public int getSampleNo(Map<String,String> paramMap);
	
	public List<Sample> getSampleListByKeyword(Map<String,String> paramMap);

	public List<Sample> getSampleListByKeywords(Map<String,String> paramMap);
	
	public List<String> getTownListFromSample(Map<String,String> paramMap);
	
	public List<String> getVillageListFromSample(Map<String,String> paramMap);
	
	public List<Sample> getNotSyncSample();
	
	public int setSyncSampleFlag(Map<String,String> paramMap);
	
}
