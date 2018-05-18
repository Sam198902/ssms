/**
 * 
 */
package com.ssms.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 *
 */
public class DateUtil {

	// 返回当天格式化日期
	public static String getToday() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		return sdf.format(new Date());
	}

	public static String getNow() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		return sdf.format(new Date());
	}
	
	public static String getNowTime() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return sdf.format(new Date());
	}
	
	public static String format(Date date) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return sdf.format(date);
	}

	public static String getFormatDate(Object date) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		return sdf.format(date);
	}

	public static String getFormatTime(Object time) {
		SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
		return sdf.format(time);
	}

	public static Date getDate(String date) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		return sdf.parse(date);
	}

	public static String getBeforeHourTime(int ihour) {  
		
	    String returnstr = "";  
	    
	    Calendar calendar = Calendar.getInstance();  
	    
	    calendar.set(Calendar.HOUR_OF_DAY, calendar.get(Calendar.HOUR_OF_DAY) - ihour);  
	    
	    SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
	    
	    returnstr = df.format(calendar.getTime());  
	  
	    return returnstr;  
	}  
	
	public static String getDateFormatStr(String dt){
		
		SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
		
		SimpleDateFormat sdf2 = new SimpleDateFormat("yyyyMMdd");
		
		String dtStr = "";
		
		try{
			
			Date date = sdf1.parse(dt);
			
			dtStr = sdf2.format(date);
			
		}catch(Exception e){
			
			
		}

	    return dtStr;
		
	}
	
	public static boolean before(String dateStr){
		
		try{
			
			Date d1 = getDate(dateStr);

			return d1.after(new Date());
			
		}catch(Exception e){
						
		}		

		return false;
		
	}

}
