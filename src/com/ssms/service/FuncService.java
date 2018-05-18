/**
 * 
 */
package com.ssms.service;

import java.util.Map;

import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.xvolks.jnative.JNative;
import org.xvolks.jnative.Type;
import org.xvolks.jnative.pointers.Pointer;

import ch.qos.logback.classic.Logger;

/**
 * @author yeyongjia
 *
 */
@Service("funcService")
public class FuncService {
	
	private static Logger logger = (Logger) LoggerFactory.getLogger(FuncService.class);

	public int netSet(Map<String,String> paramMap){
		
		int result = 0;
		
		try{
			
			JNative.setLoggingEnabled(true);
			
			JNative netSet = new JNative("lib.dll","NetSet");
			
			netSet.setRetVal(Type.INT);
			
			String mgrIp = paramMap.get("ipaddress");  
			
			System.out.println(mgrIp);
			
			Pointer ptr = Pointer.createPointerFromString(mgrIp); 
			
			int port = 24992;
			
			if(paramMap.get("port") != null){
				
				port = Integer.parseInt(paramMap.get("port"));
				
			}
			
			netSet.setParameter(0, ptr);
			
			netSet.setParameter(1, port);
			
			netSet.invoke();
			
			result = netSet.getRetValAsInt();
			
		}catch(Exception e){
			
			e.printStackTrace();
			
			result = 0;
			
		}
		
		return result;
		
	}

	public int netConnectOn(Map<String,String> paramMap){
		
		int result = 0;
		
		try{
			
			JNative.setLoggingEnabled(true);
			
			JNative netSet = new JNative("lib.dll","NetConnectOn");
			
			netSet.setRetVal(Type.INT);
			
			int qNumber = Integer.parseInt(paramMap.get("sample_positon_1"));
			
			netSet.setParameter(0, qNumber);
			
			netSet.invoke();
			
			result = netSet.getRetValAsInt();
			
		}catch(Exception e){
			
			result = 0;
			
		}
		
		return result;
		
	}
	
	public int netDconnectOn(Map<String,String> paramMap){
		
		int result = 0;
		
		try{
			
			JNative.setLoggingEnabled(true);
			
			JNative netSet = new JNative("lib.dll","NetDconnectOn");
			
			netSet.setRetVal(Type.INT);
			
			int qNumber = Integer.parseInt(paramMap.get("sample_positon_1"));
			
			netSet.setParameter(0, qNumber);
			
			netSet.invoke();
			
			result = netSet.getRetValAsInt();
			
		}catch(Exception e){
			
			result = 0;
			
		}
		
		return result;
		
	}
	
	public int netOpenL(Map<String,String> paramMap){
		
		int result = 0;
		
		try{
			
			JNative.setLoggingEnabled(true);
			
			JNative netSet = new JNative("lib.dll","NetOpenL");
			
			netSet.setRetVal(Type.INT);
			
			int qNumber = Integer.parseInt(paramMap.get("sample_positon_1"));
			
			int lNumber = Integer.parseInt(paramMap.get("sample_positon_2"));
			
			int lName = Integer.parseInt(paramMap.get("sample_positon_2"));
			
			netSet.setParameter(0, qNumber);
			
			netSet.setParameter(1, lNumber);
			
			netSet.setParameter(2, lName);
			
			logger.info("区号："+qNumber);
			
			logger.info("列号："+lNumber);
			
			logger.info("列名："+lName);
			
			netSet.invoke();
			
			result = netSet.getRetValAsInt();
			
			logger.info("调用接口结果："+result);
			
		}catch(Exception e){
			
			logger.error(e.getMessage());
			
			result = 0;
			
		}
		
		return result;
		
	}
	
	public int netCloseL(Map<String,String> paramMap){
		
		int result = 0;
		
		try{
			
			JNative.setLoggingEnabled(true);
			
			JNative netSet = new JNative("lib.dll","NetCloseL");
			
			netSet.setRetVal(Type.INT);
			
			int qNumber = Integer.parseInt(paramMap.get("sample_positon_1"));
			
			logger.info("区号："+qNumber);
			
			netSet.setParameter(0, qNumber);
			
			netSet.invoke();
			
			result = netSet.getRetValAsInt();
			
			logger.info("调用接口结果："+result);
			
		}catch(Exception e){
			
			logger.error(e.getMessage());
			
			result = 0;
			
		}
		
		return result;
		
	}
}
