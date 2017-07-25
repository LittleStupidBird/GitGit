
define(function () {
    return {
        changeTopBtn:function(id,bgcolor,color){
        	var tabs = $("#"+id).find('a');
        	for(var i=0;i<tabs.length;i++){
        		tabs.eq(0).css('background-color',bgcolor);
        		tabs.eq(0).css('color','#fff');
        		tabs.eq(i).css('color',color);
        		tabs.eq(i).click(function(){
//        			if($(this).text()=='FYC'||$(this).text()=='Cases'){
        				$("#sub_btn").find('a').each(function(){
        					$(this).css('background-color','#fff');
        					$(this).css('color','#554344');
        				})
        				$("#sub_btn").find('a').eq(0).css('background-color','rgb(165,162,152)');
        				$("#sub_btn").find('a').eq(0).css('color','#fff');
//        			}

        			for(var j=0;j<tabs.length;j++){
        				tabs.eq(j).css('background-color','#fff');
        				tabs.eq(j).css('color',color);
        				$(this).css('background-color',bgcolor);
        				$(this).css('color','#fff');
        			}
        		})
        	}
        }
    }
});