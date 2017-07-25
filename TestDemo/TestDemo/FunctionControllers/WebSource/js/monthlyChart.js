
define(['Chart'],function(c){
    return {
        createLineChart:function(obj) {
            var canvas = document.getElementById("mychart");
            var cxt = canvas.getContext("2d");
            var dataT=[];
            var label =["Dec","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov"];

            var actualArr = [];
            var goalArr = [];
            for(var i=0;i<obj.ACTUAL.length;i++){
                if(obj.ACTUAL[i]==''){
                    break;
                }
                actualArr[i] = this.numType(obj.ACTUAL[i]);
            }
            for(var i=0;i<obj.GOAL.length;i++){
                if(obj.GOAL[i]==''){
                    break;
                }
                goalArr[i] = this.numType(obj.GOAL[i]);
            }
            //for(var i=0;i<obj.ACTUAL.length;i++){
            //    var val=[];
            //    for(var j=0;j<obj.data[i].length;j++){
            //        if(obj.data[i][j]==''){
            //            break;
            //        }
            //        val[j] = this.numType(obj.data[i][j]);
            //    }
            //    dataT[i] = val;
            //}
            var data = {
                labels :label,
                datasets : [
                    {
                        label: "My First dataset",
                        fillColor : "rgba(220,220,220,0.5)",
                        strokeColor : "rgba(220,220,220,1)",
                        pointColor : "rgba(220,220,220,1)",
                        pointStrokeColor : "#fff",
                        //data : [65,59,90,81,56,55,40,12,23,44,32,55]
                        data:actualArr
                    },
                    {
                        label: "My Second dataset",
                        fillColor : "rgba(151,187,205,0.5)",
                        strokeColor : "rgba(151,187,205,1)",
                        pointColor : "rgba(151,187,205,1)",
                        pointStrokeColor : "#fff",
                        //data : [28,48,40,19,96,27,100,11,32,34,65,21]
                        data:goalArr
                    }
                ]
            };
            var options = {
                //responsive:true,
                //animation: false,
                scaleLabel:"<%=value+'$'%>",
                scaleOverlay : false,
                //Y轴是否显示值
                scaleShowLabels:false,
                //Y轴起始值
                scaleStartValue:0,
                //color
                scaleFontColor:"rgb(199,35,55)",
                scaleFontSize:17,
                //scaleStepWidth:600
                //跨度
//        scaleStepWidth : 10
            };
            var myNewChart = new Chart(cxt).Line(data,options);
        },
        numType:function(str){

            var arr = str.split(',');
            var strs='';
            for(var i=0;i<arr.length;i++){
                strs += arr[i];
            }
            return parseInt(strs);
        }
    }
})