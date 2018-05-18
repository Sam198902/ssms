package com.ssms.action;

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

import com.ssms.service.FuncService;
import com.ssms.util.ConvertUtil;
import com.ssms.util.PropertiesUtil;

@Controller
@RequestMapping("/func")
public class FuncController {

	private static Logger logger = (Logger) LoggerFactory.getLogger(FuncController.class);

	@Resource
	private FuncService funcService;
	

	@RequestMapping("/netSet")
	public ModelAndView netSet(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		Map<String,String> paramMap = ConvertUtil.getParamMap(request);
		
		String path = request.getSession().getServletContext().getRealPath("/");
		
		paramMap.put("path", path);
		
		int result = funcService.netSet(paramMap);
		
		if(result != 0){
			
			mv.addObject("message", "设置IP地址和端口号，工控机以TCP/IP方式和上位机通信成功");
			
			mv.addObject("code", "1");
			
		}else{
			
			mv.addObject("message", "设置IP地址和端口号，工控机以TCP/IP方式和上位机通信失败");
			
			mv.addObject("code", "0");

		}

		return mv;
		
	}
	

	@RequestMapping("/netConnectOn")
	public ModelAndView netConnectOn(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
			
		Map<String,String> paramMap = ConvertUtil.getParamMap(request);
		
		String path = request.getSession().getServletContext().getRealPath("/");
		
		paramMap.put("path", path);
		
		int result = funcService.netConnectOn(paramMap);
		
		if(result != 0){
			
			mv.addObject("message", "与指定区号的工控机建立连接成功");
			
			mv.addObject("code", "1");
			
		}else{
			
			mv.addObject("message", "与指定区号的工控机建立连接失败");
			
			mv.addObject("code", "0");

		}

		return mv;
		
	}
	

	@RequestMapping("/netDconnectOn")
	public ModelAndView netDconnectOn(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
			
		Map<String,String> paramMap = ConvertUtil.getParamMap(request);

		String path = request.getSession().getServletContext().getRealPath("/");
		
		paramMap.put("path", path);
		
		int result = funcService.netDconnectOn(paramMap);
		
		if(result != 0){
			
			mv.addObject("message", "与指定区号的工控机断开连接成功");
			
			mv.addObject("code", "1");
			
		}else{
			
			mv.addObject("message", "与指定区号的工控机断开连接失败");
			
			mv.addObject("code", "0");

		}

		return mv;
		
	}
	
	@RequestMapping("/open")
	public ModelAndView netOpenL(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
			
		Map<String,String> paramMap = ConvertUtil.getParamMap(request);
		
		String sample_positon_1 = paramMap.get("sample_positon_1"); 
		
		String sample_positon_2 = paramMap.get("sample_positon_2");
		
		String address = PropertiesUtil.getValue("region"+sample_positon_1);
		
		String ipaddress = address.split(":")[0];
				
		String port = address.split(":")[1];
		
		paramMap.put("ipaddress", ipaddress);
		
		paramMap.put("port", port);
		
		// 1.设置
		int result = funcService.netSet(paramMap);
		
		if(result == 0){
			
			mv.addObject("message", "设置指定区号["+sample_positon_1+"]工控机IP地址和端口["+address+"]失败");
			
			mv.addObject("code", "0");
			
			return mv;
			
		}
		
		logger.info("设置指定区号["+sample_positon_1+"]工控机IP地址和端口号["+address+"]成功");
		
		// 2.连接
		result = funcService.netConnectOn(paramMap);
		
		if(result == 0){
			
			mv.addObject("message", "与指定区号["+sample_positon_1+"]的工控机建立连接失败");
			
			mv.addObject("code", "0");
			
			return mv;
			
		}
		
		logger.info("与指定区号["+sample_positon_1+"]的工控机建立连接成功");
		
		// 3.打开
		result = funcService.netOpenL(paramMap);
			
		if(result == 0){
			
			mv.addObject("message", "打开指定区号["+sample_positon_1+"]的密集架中的指定列["+sample_positon_2+"]失败");
			
			mv.addObject("code", "0");
			
			return mv;
			
		}
		
		mv.addObject("code", "1");
		
		mv.addObject("message", "打开指定区号["+sample_positon_1+"]的密集架中的指定列["+sample_positon_2+"]成功");
		
		// 4.关闭
		result = funcService.netDconnectOn(paramMap);
		
		if(result == 0){
			
			mv.addObject("message", "闭合指定区号["+sample_positon_1+"]的密集架中所有已打开的通道失败");
			
		}
		
		logger.info("闭合指定区号["+sample_positon_1+"]的密集架中所有已打开的通道失败");

		return mv;
		
	}
	
	@RequestMapping("/close")
	public ModelAndView netCloseL(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
			
		Map<String,String> paramMap = ConvertUtil.getParamMap(request);
		
		String sample_positon_1 = paramMap.get("sample_positon_1"); 
		
		String address = PropertiesUtil.getValue("region"+sample_positon_1);
		
		String ipaddress = address.split(":")[0];
				
		String port = address.split(":")[1];
		
		paramMap.put("ipaddress", ipaddress);
		
		paramMap.put("port", port);
		
		// 1.设置
		int result = funcService.netSet(paramMap);
		
		if(result == 0){
			
			mv.addObject("message", "设置指定区号["+sample_positon_1+"]工控机IP地址和端口["+address+"]失败");
			
			mv.addObject("code", "0");
			
			return mv;
			
		}
		
		logger.info("设置指定区号["+sample_positon_1+"]工控机IP地址和端口号["+address+"]成功");
		
		// 2.连接
		result = funcService.netConnectOn(paramMap);
		
		if(result == 0){
			
			mv.addObject("message", "与指定区号["+sample_positon_1+"]的工控机建立连接失败");
			
			mv.addObject("code", "0");
			
			return mv;
			
		}
		
		logger.info("与指定区号["+sample_positon_1+"]的工控机建立连接成功");
		
		// 3.关闭
		result = funcService.netCloseL(paramMap);
			
		if(result == 0){
			
			mv.addObject("message", "关闭指定区号["+sample_positon_1+"]的密集架中所有已打开的通道失败");
			
			mv.addObject("code", "0");
			
			return mv;
			
		}
		
		mv.addObject("code", "1");
		
		mv.addObject("message", "闭合指定区号["+sample_positon_1+"]的密集架中所有已打开的通道成功");
		
		// 4.关闭
		result = funcService.netDconnectOn(paramMap);
		
		if(result == 0){
			
			mv.addObject("message", "与指定区号["+sample_positon_1+"]的工控机断开连接失败");
			
		}
		
		logger.info("与指定区号["+sample_positon_1+"]的工控机断开连接成功");

		return mv;
		
	}
	
	@RequestMapping("/sync")
	public ModelAndView sync(HttpServletRequest request,HttpServletResponse response) throws Exception{

		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		Map<String,String> paramMap = ConvertUtil.getParamMap(request);
		
		String path = request.getSession().getServletContext().getRealPath("/");
		
		paramMap.put("path", path);
		
		int result = funcService.netSet(paramMap);
		
		if(result != 0){
			
			mv.addObject("message", "设置IP地址和端口号，工控机以TCP/IP方式和上位机通信成功");
			
			mv.addObject("code", "1");
			
		}else{
			
			mv.addObject("message", "设置IP地址和端口号，工控机以TCP/IP方式和上位机通信失败");
			
			mv.addObject("code", "0");

		}

		return mv;
		
	}
	
}
