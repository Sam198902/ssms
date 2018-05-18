package com.ssms.util;

import java.io.IOException;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PropertiesLoaderUtils;


public class PropertiesUtil {

	public static Properties configProps = new Properties();

	private static Logger logger = LoggerFactory.getLogger(PropertiesUtil.class);

	static {
		
		Resource configRes = new ClassPathResource("/config/properties/config.properties");

		try {
			
			configProps = PropertiesLoaderUtils.loadProperties(configRes);

		} catch (IOException e) {

			logger.error("Read props error!", e);
			
		}
	}

	public final static String getValue(String key) {
		
		return configProps.getProperty(key);
		
	}

}

