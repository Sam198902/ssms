/**
 * 
 */
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

import com.ssms.service.LocationService;
import com.ssms.util.ConvertUtil;

/**
 * @author yeyongjia
 *
 */
@Controller
@RequestMapping("/locate")
public class LocationController {
	
	private static Logger logger = (Logger) LoggerFactory.getLogger(LocationController.class);

	@Resource
	private LocationService locationService;
	
	@RequestMapping("/getPos1")
	public ModelAndView getSamplePosition1(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		Map<String,String> paramMap = ConvertUtil.getParamMap(request);

		Map<String, List<String>> resultMap = locationService.getAvaliablePosition1(paramMap);
		
		mv.addAllObjects(resultMap);
		
		return mv;
		
	}

	@RequestMapping("/getPos2")
	public ModelAndView getSamplePosition2(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		Map<String,String> paramMap = ConvertUtil.getParamMap(request);
		
		logger.info(paramMap.toString());

		Map<String, List<String>> resultMap = locationService.getAvaliablePosition2(paramMap);
		
		mv.addAllObjects(resultMap);
		
		return mv;
		
	}
	
	@RequestMapping("/getPos3")
	public ModelAndView getSamplePosition3(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		Map<String,String> paramMap = ConvertUtil.getParamMap(request);
		
		logger.info(paramMap.toString());

		Map<String, List<String>> resultMap = locationService.getAvaliablePosition3(paramMap);
		
		mv.addAllObjects(resultMap);
		
		return mv;
		
	}
	
	@RequestMapping("/getPos4")
	public ModelAndView getSamplePosition4(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		Map<String,String> paramMap = ConvertUtil.getParamMap(request);

		logger.info(paramMap.toString());
		
		Map<String, List<String>> resultMap = locationService.getAvaliablePosition4(paramMap);
		
		mv.addAllObjects(resultMap);
		
		return mv;
		
	}
	
	@RequestMapping("/getPos5")
	public ModelAndView getSamplePosition5(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		Map<String,String> paramMap = ConvertUtil.getParamMap(request);

		logger.info(paramMap.toString());
		
		Map<String, List<String>> resultMap = locationService.getAvaliablePosition5(paramMap);
		
		mv.addAllObjects(resultMap);
		
		return mv;
		
	}
	
	@RequestMapping("/getPos6")
	public ModelAndView getSamplePosition6(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		Map<String,String> paramMap = ConvertUtil.getParamMap(request);

		logger.info(paramMap.toString());
		
		Map<String, List<String>> resultMap = locationService.getAvaliablePosition6(paramMap);
		
		mv.addAllObjects(resultMap);
		
		return mv;
		
	}
	
}
