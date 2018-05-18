package com.ssms.test;

import org.xvolks.jnative.JNative;
import org.xvolks.jnative.Type;
import org.xvolks.jnative.pointers.Pointer;


public class TestDll {

	public static void main(String[] args) throws Exception {
		
		JNative.setLoggingEnabled(true);
		
		JNative url = new JNative("C:/Users/yeyongjia/Desktop/ViewDLL2.0/lib.dll","NetConnectOn");
		
		url.setRetVal(Type.INT);
		
//		String mgrIp = "127.0.0.1";  
//		
//		Pointer ptr = Pointer.createPointerFromString(mgrIp);  
		
		url.setParameter(0, 1);
		
//		url.setParameter(1, 24992);
		
		url.invoke();
		
		System.out.println(url.getRetVal());
		
	}

}
