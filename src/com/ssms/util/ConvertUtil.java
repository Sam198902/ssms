/**
 * 
 */
package com.ssms.util;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;

/**
 * @author yeyongjia
 *
 */
public class ConvertUtil {
	
	 /** 
     * 从request中获得参数Map，并返回可读的Map 
     * @param request 
     * @return 
     */  
    @SuppressWarnings("unchecked")
	public static Map<String,String> getParamMap(HttpServletRequest request) {  
    	
        Map<String,String> returnMap = new HashMap<String,String>();  
    	
        // 参数Map  
        Map<String,Object> properties = request.getParameterMap();  

        Iterator<Entry<String, Object>> entries = properties.entrySet().iterator();  
        
        while (entries.hasNext()) {  
        	
        	Entry<String, Object> entry = entries.next(); 
            
            String name = entry.getKey();  
            
            Object valueObj = entry.getValue();  
            
            String value = "";
            
            if(null == valueObj){  
            	
                value = "";  
                
            }else if(valueObj instanceof String[]){  
            	
                String[] values = (String[])valueObj;  
                
                for(int i=0;i<values.length;i++){  
                	
                    value = values[i] + ",";  
                    
                }  
                
                value = value.substring(0, value.length()-1);  
                
            }else{  
            	
                value = valueObj.toString();  
                
            }  
            
            returnMap.put(name, value);  
            
        }  
        
        return returnMap;  
        
    }  
    
    public static String formatString(String str,int num){
    	
    	StringBuffer sb = new StringBuffer();
    	
    	if(num < 1){
    		
    		return "";
    		
    	}
    	
    	if(str == null || "".equals(str.trim())){
    		
    		for(int i = 0 ; i < num ;i++){
    			
    			sb.append("0");
    			
    		}
    		
    		return sb.toString();
    		
    	}else if(str.trim().length() == num){
    		
    		return str.trim();
    		
    	}else if(str.trim().length() > num){
    		
    		return str.substring(0, num);
    		
    	}else{
    		
    		sb = new StringBuffer(str.trim());
    		
    		for(int i = str.trim().length() ; i < num ;i++){
    			
    			sb.insert(0, "0");
    			
    		}
    		
    		return sb.toString();
    		
    	}
    	
    }
    
    public static String formatArea(String name){
    	
    	if("雨山区".contains(name)){
    		
    		return "YS";
    		
    	}else if("花山区".contains(name)){
    		
    		return "HS";
    		
    	}else if("博望区".contains(name)){
    		
    		return "BW";
    		
    	}else if("当涂县".contains(name)){
    		
    		return "DT";
    		
    	}else if("含山县".contains(name)){
    		
    		return "HS";
    		
    	}else{
    		
    		return "HX";
    		
    	}
    	
    }
    
    public static String formatSoilUseType(String name){
    	
    	if("耕地".contains(name)){
    		
    		return "A";
    		
    	}else if("旱地".contains(name)){
    		
    		return "B";
    		
    	}else if("水田".contains(name)){
    		
    		return "C";
    		
    	}else if("林地".contains(name)){
    		
    		return "E";
    		
    	}else if("草地".contains(name)){
    		
    		return "F";
    		
    	}else if("小麦".contains(name)){
    		
    		return "G";
    		
    	}else if("水稻".contains(name)){
    		
    		return "H";
    		
    	}else if("玉米".contains(name)){
    		
    		return "I";
    		
    	}else if("豆类".contains(name)){
    		
    		return "J";
    		
    	}else if("蔬菜".contains(name)){
    		
    		return "K";
    		
    	}else{
    		
    		return "L";
    		
    	}
    	
    }
    
    public static String getParamString(HttpServletRequest request) {  
        Map<String, String[]> map = request.getParameterMap();  
        StringBuilder sb = new StringBuilder();  
        String reqBody = null;  
        try {  
            for (Entry<String, String[]> e : map.entrySet()) {  
                sb.append(e.getKey()).append("=");  
                String[] value = e.getValue();  
                if (value != null && value.length == 1) {  
                    sb.append(value[0]).append("&");  
                } else {  
                    sb.append(Arrays.toString(value)).append("\n");  
                }  
            }  
            reqBody = URLDecoder.decode(sb.toString(), "UTF-8");  
            if (reqBody.contains("{") && reqBody.contains("}")) {  
                reqBody = reqBody.substring(reqBody.indexOf("{"));  
                reqBody = reqBody.substring(0, reqBody.lastIndexOf("}") + 1);  
            } else if (reqBody.contains("&")) {  
                reqBody = reqBody.substring(0, reqBody.lastIndexOf("&"));  
            }  
        } catch (UnsupportedEncodingException e1) {  
            e1.printStackTrace();  
        } finally {  
            System.out.println("JsonReq reqBody>>>>>" + reqBody);  
        }  
        return reqBody;  
    }  

}
