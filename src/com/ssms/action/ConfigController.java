package com.ssms.action;

import java.util.HashMap;
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

import com.ssms.service.ConfigService;
import com.ssms.service.LocationService;
import com.ssms.service.PointService;
import com.ssms.service.PositionService;
import com.ssms.util.ConvertUtil;
import com.ssms.vo.Location;
import com.ssms.vo.Point;
import com.ssms.vo.Position;

@Controller
@RequestMapping("/config")
public class ConfigController {
	
	private static Logger logger = (Logger) LoggerFactory.getLogger(ConfigController.class);

	@Resource
	private PositionService positionService;
	
	@Resource
	private LocationService locationService;
	
	@Resource
	private PointService pointService;
	
	@Resource
	private ConfigService configService;
	
	/*
	 * 设置位置信息
	 */
	@RequestMapping("/position/set")
	public ModelAndView set(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		Map<String,String> paramMap = ConvertUtil.getParamMap(request);
		
		int result = positionService.setPosition(paramMap);
		
		if(result > 0){
			
			mv.addObject("code",1);
			
			mv.addObject("message", "设置位置成功");
			
		}else{
			
			mv.addObject("code",0);
			
			mv.addObject("message", "设置位置失败");
			
		}
		
		return mv;
		
	}
	
	/*
	 * 设置位置信息
	 */
	@RequestMapping("/position/simpleSet")
	public ModelAndView simpleSet(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		Map<String,String> paramMap = ConvertUtil.getParamMap(request);
		
		int result = pointService.setPoint(paramMap);
		
		if(result > 0){
			
			mv.addObject("code",1);
			
			mv.addObject("message", "设置位置成功");
			
		}else{
			
			mv.addObject("code",0);
			
			mv.addObject("message", "设置位置失败");
			
		}
		
		return mv;
		
	}
	
	/*
	 * 设置位置信息
	 */
	@RequestMapping("/position/simpleGet")
	public ModelAndView simpleGet(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		Map<String,String> paramMap = ConvertUtil.getParamMap(request);
		
		List<Point> pointList = pointService.getPointList(paramMap);
		
		if(pointList.size() > 0){
			
			mv.addObject("code",1);
			
			mv.addObject("message", "设置位置成功");
			
			mv.addObject("point", pointList.get(0));
			
		}else{
			
			mv.addObject("code",0);
			
			mv.addObject("message", "设置位置失败");
			
		}
		
		return mv;
		
	}
	
	@RequestMapping("/position/batchSet")
	public ModelAndView batchSet(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		String param = ConvertUtil.getParamString(request);
		
		int result = positionService.batchSetPostion(param);
		
		if(result > 0){
			
			mv.addObject("code",1);
			
			mv.addObject("message", "批量设置位置成功");
			
		}else{
			
			mv.addObject("code",0);
			
			mv.addObject("message", "批量设置位置失败");
			
		}
		
		return mv;
		
	}
	
	@RequestMapping("/position/del")
	public ModelAndView del(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		Map<String,String> paramMap = ConvertUtil.getParamMap(request);
		
		int result = positionService.delPosition(paramMap);
		
		if(result > 0){
			
			mv.addObject("code",1);
			
			mv.addObject("message", "删除位置成功");
			
		}else{
			
			mv.addObject("code",0);
			
			mv.addObject("message", "删除位置失败");
			
		}
		
		return mv;
		
	}
	
	@RequestMapping("/position/batchDel")
	public ModelAndView batchDel(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		String param = ConvertUtil.getParamString(request);
		
		int result = positionService.batchDelPostion(param);
		
		if(result > 0){
			
			mv.addObject("code",1);
			
			mv.addObject("message", "批量删除位置成功");
			
		}else{
			
			mv.addObject("code",0);
			
			mv.addObject("message", "批量删除位置失败");
			
		}
		
		return mv;
		
	}
	
	@RequestMapping("/position/get")
	public ModelAndView get(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		Map<String,String> paramMap = ConvertUtil.getParamMap(request);
		
		List<Position> positionList = positionService.getPositionList(paramMap);
		
		if(positionList != null && positionList.size() > 0){
			
			mv.addObject("code",1);
			
			mv.addObject("message", "获取位置成功");
			
			mv.addObject("position_list", positionList);
			
		}else{
			
			mv.addObject("code",0);
			
			mv.addObject("message", "获取位置失败");
			
		}
		
		return mv;
		
	}
	
	@RequestMapping("/location/set")
	public ModelAndView locate(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		Map<String,String> paramMap = ConvertUtil.getParamMap(request);
		
		int result = locationService.setLocation(paramMap);
		
		if(result > 0){
			
			mv.addObject("code",1);
			
			mv.addObject("message", "设置位置成功");
			
		}else{
			
			mv.addObject("code",0);
			
			mv.addObject("message", "设置位置失败");
			
		}
		
		return mv;
		
	}
	
	@RequestMapping("/location/del")
	public ModelAndView delLocation(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		Map<String,String> paramMap = ConvertUtil.getParamMap(request);
		
		int result = locationService.delLocation(paramMap);
		
		if(result > 0){
			
			mv.addObject("code",1);
			
			mv.addObject("message", "删除成功");
			
		}else{
			
			mv.addObject("code",0);
			
			mv.addObject("message", "删除失败");
			
		}
		
		return mv;
		
	}
	
	@RequestMapping("/location/del/all")
	public ModelAndView delAllLocation(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		Map<String,String> paramMap = ConvertUtil.getParamMap(request);
		
		int result = locationService.delAllLocation(paramMap);
		
		if(result > 0){
			
			mv.addObject("code",1);
			
			mv.addObject("message", "重置成功");
			
		}else{
			
			mv.addObject("code",0);
			
			mv.addObject("message", "重置失败");
			
		}
		
		return mv;
		
	}
	
	@RequestMapping("/location/get")
	public ModelAndView getLocation(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		Map<String,String> paramMap = ConvertUtil.getParamMap(request);
		
		List<Location> locationList = locationService.getLocationList(paramMap);
		
		if(locationList != null && locationList.size() > 0){
			
			mv.addObject("code",1);
			
			mv.addObject("message", "获取位置成功");
			
			mv.addObject("position_list", locationList);
			
		}else{
			
			mv.addObject("code",0);
			
			mv.addObject("message", "获取位置失败");
			
		}
		
		return mv;
		
	}
	
	@RequestMapping("/api/setIp")
	public ModelAndView setApiIp(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		Map<String,String> paramMap = ConvertUtil.getParamMap(request);
		
		int result = configService.updConfig(paramMap);
		
		if(result > 0){
			
			mv.addObject("code",1);
			
			mv.addObject("message", "设置同步服务器地址成功");
			
		}else{
			
			mv.addObject("code",0);
			
			mv.addObject("message", "设置同步服务器地址失败");
			
		}
		
		return mv;
		
	}
	
	@RequestMapping("/api/getIp")
	public ModelAndView getIp(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		Map<String,String> paramMap = new HashMap<String,String>();
		
		paramMap.put("ssms_key", "url");
		
		List<Map<String,String>> resultList = configService.getConfigList(paramMap);
		
		if(resultList.size() > 0){
			
			Map<String,String> config = resultList.get(0);
			
			mv.addObject("url",config.get("ssms_value"));
			
			mv.addObject("code",1);
			
			mv.addObject("message", "设置同步服务器地址成功");
			
		}else{
			
			mv.addObject("code",0);
			
			mv.addObject("message", "设置同步服务器地址失败");
			
		}
		
		return mv;
		
	}
	
	@RequestMapping("/api/sync")
	public ModelAndView sync(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		Map<String,String> paramMap = ConvertUtil.getParamMap(request);
		
		logger.info("接收到同步数据:"+paramMap);
		
		mv.addObject("code",1);
		
		mv.addObject("message", "同步数据成功");
		
		return mv;
		
	}
	
}
