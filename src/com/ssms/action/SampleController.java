package com.ssms.action;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJacksonJsonView;

import ch.qos.logback.classic.Logger;

import com.ssms.service.SampleService;
import com.ssms.util.ConvertUtil;
import com.ssms.vo.Sample;

@Controller
@RequestMapping("/sample")
public class SampleController {

	private static Logger logger = (Logger) LoggerFactory.getLogger(SampleController.class);

	@Resource
	private SampleService sampleService;
	
	/*
	 * 获取样品信息
	 */
	@RequestMapping("/get")
	public ModelAndView getSampleInfo(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		Map<String,String> paramMap = ConvertUtil.getParamMap(request);
		
		Sample sample = sampleService.getSample(paramMap);
		
		if(sample != null){
			
			mv.addObject("code",1);
			
			mv.addObject("message", "获取样品信息成功");
			
			mv.addObject("sampleInfo", sample);
			
		}else{
			
			mv.addObject("code",0);
			
			mv.addObject("message", "获取样品信息失败");
			
		}
		
		mv.addObject("sampleInfo",sample);
	
		return mv;
		
	}
	
	/*
	 * 添加样品信息
	 */
	@RequestMapping("/add")
	public ModelAndView addSampleInfo(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		Map<String,String> paramMap = ConvertUtil.getParamMap(request);
		
		int result = sampleService.addSample(paramMap);
		
		if(result == 1){
			
			mv.addObject("code",1);
			
			mv.addObject("message", "增加样品信息成功");
			
		}else{
			
			mv.addObject("code",0);
			
			mv.addObject("message", "增加样品信息失败");
			
		}

		return mv;
		
	}
	
	
	/*
	 * 获取样品信息列表
	 */
	@RequestMapping("/get/list/keyword")
	public ModelAndView getSampleListByKeyword(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		Map<String,String> paramMap = ConvertUtil.getParamMap(request);
		
		String keyword = paramMap.get("keyword");
		
		if(keyword != null && !"".equals(keyword.trim())){
		
			List<Sample> sampleList = sampleService.getSampleListByKeyword(paramMap);
			
			if(sampleList != null){
				
				mv.addObject("code",1);
				
				mv.addObject("message", "获取样品信息成功");
				
				mv.addObject("sampleInfoList",sampleList);
				
			}else{
				
				mv.addObject("code",0);
				
				mv.addObject("message", "获取样品信息失败");
				
			}
		}else{
			
			mv.addObject("code",0);
			
			mv.addObject("message", "关键字不能为空");
			
		}
		
		return mv;
		
	}
	
	/*
	 * 获取样品信息列表
	 */
	@RequestMapping("/get/list/search")
	public ModelAndView getSampleListByKeywords(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		Map<String,String> paramMap = ConvertUtil.getParamMap(request);
		
		List<Sample> sampleList = sampleService.getSampleListByKeywords(paramMap);
		
		List<String> townList = sampleService.getTownListFromSample(paramMap);
		
		List<String> villageList = sampleService.getVillageListFromSample(paramMap);
		
		if(sampleList != null){
			
			mv.addObject("code",1);
			
			mv.addObject("message", "获取样品信息成功");
			
			mv.addObject("sampleInfoList",sampleList);
			
			mv.addObject("Town",townList);
			
			mv.addObject("Village",villageList);
			
		}else{
			
			mv.addObject("code",0);
			
			mv.addObject("message", "获取样品信息失败");
			
		}
		
		
		return mv;
		
	}
	
	/*
	 * 添加样品信息
	 */
	@RequestMapping("/update")
	public ModelAndView updateSampleInfo(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		Map<String,String> paramMap = ConvertUtil.getParamMap(request);
		
		int result = sampleService.updateSample(paramMap);
		
		if(result == 1){
			
			mv.addObject("code",1);
			
			mv.addObject("message", "更新样品信息成功");
			
		}else{
			
			mv.addObject("code",0);
			
			mv.addObject("message", "更新样品信息失败");
			
		}

		return mv;
		
	}
	
	/*
	 * 添加样品信息
	 */
	@RequestMapping("/delete")
	public ModelAndView deleteSampleInfo(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		Map<String,String> paramMap = ConvertUtil.getParamMap(request);
		
		int result = sampleService.deleteSample(paramMap);
		
		if(result > 0){
			
			mv.addObject("code",1);
			
			mv.addObject("message", "删除样品信息成功");
			
		}else{
			
			mv.addObject("code",0);
			
			mv.addObject("message", "删除样品信息失败");
			
		}

		return mv;
		
	}
	
	/*
	 * 获取样品信息列表
	 */
	@RequestMapping("/get/list")
	public ModelAndView getSampleInfoList(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		Map<String,String> paramMap = ConvertUtil.getParamMap(request);
		
		List<Sample> sampleList = sampleService.getSampleList(paramMap);
		
		if(sampleList != null){
			
			mv.addObject("code",1);
			
			mv.addObject("message", "获取样品信息成功");
			
			mv.addObject("sampleInfoList",sampleList);
			
		}else{
			
			mv.addObject("code",0);
			
			mv.addObject("message", "获取样品信息失败");
			
		}
		
		return mv;
		
	}



}
