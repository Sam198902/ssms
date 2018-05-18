package com.ssms.action;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJacksonJsonView;

import com.ssms.service.SampleIOService;
import com.ssms.util.ConvertUtil;

@Controller
@RequestMapping("/sample")
public class SampleIOController {

	@Resource
	private SampleIOService sampleIOService;
	
	/*
	 * 获取样品信息
	 */
	@RequestMapping("/in")
	public ModelAndView input(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		Map<String,String> paramMap = ConvertUtil.getParamMap(request);
		
		int result = sampleIOService.input(paramMap);
		
		if(result > 0){
			
			mv.addObject("code",1);
			
			mv.addObject("message", "样品入库成功");
			
		}else{
			
			mv.addObject("code",0);
			
			mv.addObject("message", "样品入库失败");
			
		}
		
		return mv;
		
	}
	
	/*
	 * 获取样品信息
	 */
	@RequestMapping("/in/list")
	public ModelAndView list(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		Map<String,String> paramMap = ConvertUtil.getParamMap(request);
		
		int result = sampleIOService.input(paramMap);
		
		if(result > 0){
			
			mv.addObject("code",1);
			
			mv.addObject("message", "样品入库成功");
			
		}else{
			
			mv.addObject("code",0);
			
			mv.addObject("message", "样品入库失败");
			
		}
		
		return mv;
		
	}
	
}
