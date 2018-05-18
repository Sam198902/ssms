package com.ssms.action;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJacksonJsonView;

import com.ssms.service.UserService;
import com.ssms.util.ConvertUtil;
import com.ssms.vo.User;

@Controller
@RequestMapping("/admin")
public class LoginController {

	@Resource
	private UserService userService;
	
	/*
	 * 用户登录
	 */
	@RequestMapping("/login")
	public ModelAndView login(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);

		Map<String,String> paramMap = ConvertUtil.getParamMap(request);
		
		User user = userService.getUserInfo(paramMap);
		
		if(user != null){
			
			mv.addObject("message", "用户登录成功");
			
			mv.addObject("code", "1");
			
			mv.addObject("userInfo",user);
			
			request.getSession().setAttribute("userInfo", user);
			
		}else{
			
			mv.addObject("message", "用户名或密码失败");
			
			mv.addObject("code", "0");

		}

		return mv;
		
	}
	
	/*
	 * 用户登录
	 */
	@RequestMapping("/logout")
	public ModelAndView logout(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
			
		User user = (User)request.getSession().getAttribute("userInfo");
		
		if(user != null){
			
			mv.addObject("message", "用户注销成功");
			
			mv.addObject("code", "1");
			
			request.getSession().removeAttribute("userInfo");
			
		}else{
			
			mv.addObject("message", "用户注销失败");
			
			mv.addObject("code", "0");

		}

		return mv;
		
	}
	
}
