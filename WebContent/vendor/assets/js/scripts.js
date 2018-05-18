
jQuery(document).ready(function() {
	
    /*
        Fullscreen background
    */
    $.backstretch("vendor/assets/img/backgrounds/1.jpg");
    
    /*
        Form validation
    */
   $('.login-form input[type="text"], .login-form input[type="password"], .login-form textarea').on('focus', function() {
    	 console.log("++++")
        $(this).removeClass('input-error');
    });
    
    $('.login-form').on('submit', function(e) {
        console.log("--------")
    	
    	$(this).find('input[type="text"], input[type="password"], textarea').each(function(){
    		if( $(this).val() == "" ) {
    			//e.preventDefault();
    			//$(this).addClass('input-error');
                console.log("=========")
    		}
    		else {
    			login();
    		}
    	});
    	
    });
    
    
});


function login() {
    console.log("-----+-------");
    console.log($('form-username').val);
    console.log($('form-password').val);

    location.href = "index.html";
}
