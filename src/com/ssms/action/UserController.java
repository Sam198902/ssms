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

import com.ssms.service.UserService;
import com.ssms.util.ConvertUtil;
import com.ssms.vo.User;

@Controller
@RequestMapping("/user")
public class UserController {

	private static Logger logger = (Logger) LoggerFactory.getLogger(UserController.class);

	@Resource
	private UserService userService;
	
	/*
	 * 获取用户信息
	 */
	@RequestMapping("/get")
	public ModelAndView getUserInfo(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		Map<String,String> paramMap = ConvertUtil.getParamMap(request);
		
		User user = userService.getUserInfo(paramMap);
		
		if(user != null){
			
			mv.addObject("code", 1);

			mv.addObject("message", "获取用户数据成功");
			
			mv.addObject("userInfo",user);
			
		}else{
			
			mv.addObject("code", 0);

			mv.addObject("message", "获取用户数据失败");
			
		}
	
		return mv;
		
	}
	
	@RequestMapping("/list")
	public ModelAndView queryUserList(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		List<User> userList = userService.getUserInfoList();
		
		if(userList != null){
			
			mv.addObject("code", 1);

			mv.addObject("message", "获取用户数据成功");
			
			mv.addObject("userInfoList",userList);
			
		}else{
			
			mv.addObject("code", 0);

			mv.addObject("message", "获取用户数据失败");
			
		}
	
		return mv;
		
	}
	
	
	/*
	 * 增加用户
	 */
	@RequestMapping("/add")
	public ModelAndView addUserInfo(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		Map<String,String> paramMap = ConvertUtil.getParamMap(request);
		
		int result = userService.addUser(paramMap);
		
		if(result == 1){
			
			mv.addObject("code", 1);

			mv.addObject("message", "用户添加成功");
			
		}else{
			
			mv.addObject("code", 0);

			mv.addObject("message", "用户添加失败");
			
		}
		
		return mv;
		
	}
	
	@RequestMapping("/delete")
	public ModelAndView deleteUserInfo(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		Map<String,String> paramMap = ConvertUtil.getParamMap(request);
		
		int result = userService.deleteUser(paramMap);
		
		if(result == 1){
			
			mv.addObject("code", 1);

			mv.addObject("message", "删除用户成功");
			
		}else{
			
			mv.addObject("code", 0);

			mv.addObject("message", "删除用户失败");
			
		}
		
		return mv;
		
	}
}
