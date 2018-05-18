/**
 * 
 */
package com.ssms.test;

import com.ssms.util.DateUtil;

/**
 * @author yeyongjia
 *
 */
public class TestDate {

	/**
	 * @param args
	 */
	public static void main(String[] args) {

		String dateStr = "2017-09-21";
		
		boolean flag = DateUtil.before(dateStr);
		
		System.out.println(flag);
		
	}

}
