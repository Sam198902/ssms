/**
 * 
 */
package com.ssms.interceptor;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.servlet.view.json.MappingJacksonJsonView;

import ch.qos.logback.classic.Logger;

/**
 * @author yeyongjia
 *
 */
public class CommonHandlerInterceptor extends HandlerInterceptorAdapter {
	private static Logger log = (Logger) LoggerFactory.getLogger(CommonHandlerInterceptor.class);

	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		super.afterCompletion(request, response, handler, ex);
	}

	/*
	 * 处理返回名为json的ModelAndView 已被前台识别
	 */

	@Override
	public void postHandle(HttpServletRequest request,HttpServletResponse response, Object handler,ModelAndView modelAndView) throws Exception {
		
		String viewName = modelAndView.getViewName();
		
		log.info("viewName=" + viewName);
		
		// 如果返回视图名为json，则返回json
		if (viewName != null && "json".equals(viewName)) {
			MappingJacksonJsonView jmv = new MappingJacksonJsonView();
			jmv.setContentType("text/html;charset=UTF-8");
			modelAndView.setView(jmv);
		}
		
		log.info("\n" + modelAndView.getModel());

	}

	@SuppressWarnings("unchecked")
	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {

		Map<String, String[]> params = request.getParameterMap();
		
		String queryString = "?";
		
		for (String key : params.keySet()) {
			String[] values = params.get(key);
			for (int i = 0; i < values.length; i++) {
				String value = values[i];
				queryString += key + "=" + value + "&";
			}
		}
		
		// 去掉最后一个空&
		if (queryString.length() > 1) {
			queryString = queryString.substring(0, queryString.length() - 1);
		}

		log.info("request:" + request.getRequestURL() + queryString);
		
		return super.preHandle(request, response, handler);

	}

}
