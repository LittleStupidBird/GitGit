
define(['jquery'], function ($) {
   return {
       changeDashboard: function (par) {
           var doms = $(par+" span");
           for(var i=0;i<doms.length;i++){
               var data = parseFloat(doms.eq(i).text());
               if(data < 0){
                   doms.eq(i).css("background-color","rgb(163,45,74)");
               }else if(data > 15){
                   doms.eq(i).css("background-color","rgb(17,79,192)");
               }else{
                   doms.eq(i).css("background-color","rgb(65,163,137)");
               }
           }
       }
   }
});