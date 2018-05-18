/**
 * 
 */
package com.ssms.action;

import java.io.File;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJacksonJsonView;

import ch.qos.logback.classic.Logger;

import com.ssms.util.DateUtil;

/**
 * @author yeyongjia
 * enctype="multipart/form-data"
 */
@Controller
@RequestMapping("/upload")
public class UploadController {
	
	private static Logger logger = (Logger) LoggerFactory.getLogger(UploadController.class);

	
	@RequestMapping("/pic")
	public ModelAndView upload(@RequestParam(value = "file", required = false) MultipartFile file, HttpServletRequest request) {  
 
		ModelAndView mv = null;
		
		MappingJacksonJsonView mjv = new MappingJacksonJsonView();

		mjv.setContentType("text/html;charset=UTF-8");

		mv = new ModelAndView(mjv);
		
		  
        try {  
		
	        String path = request.getSession().getServletContext().getRealPath("upload");  
	        
	        String fileName = DateUtil.getNow()+".jpg"; 
	 
	        File targetFile = new File(path, fileName);  
	        
	        if(!targetFile.exists()){  
	        	
	            targetFile.mkdirs();  
	            
	        }  

            file.transferTo(targetFile);  
            
            mv.addObject("code",1);
			
			mv.addObject("message", "上传文件成功");
			
			mv.addObject("img_url", request.getContextPath()+"/upload/"+fileName);
            
        } catch (Exception e) {  
        	
        	mv.addObject("code",0);
 			
 			mv.addObject("message", "上传文件失败");
            
        }  
 
        return mv;
        
    }  

}
