
define(function(){
    return {
        numType:function(str){

            var arr = str.split(',');
            var strs='';
            for(var i=0;i<arr.length;i++){
                strs += arr[i];
            }
            return parseInt(strs);
        },
        removeBlank:function(str){

            return str.replace(/\s*/g,'');
        }
    }
});