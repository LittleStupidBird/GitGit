
define(function () {
   return {
       createBarChart:function (obj){
           require([
               'echarts',
               'echarts/chart/bar'
           ],function(ec){
				//过滤数据，使所有additional为0的数据变成空串
				for(var i = 0;i < obj["additional"].length;i++) {
					if(obj["additional"][i] == 0) {
						obj["additional"][i] = "";
					}
				}
               var myChart = ec.init(document.getElementById('chart_activity'));

               var option = {
                   calculable : false,
                   grid:{
                       borderWidth:0
                   },
                   xAxis : [
                       {
                           type : 'category',
                           data : ["New Prospects","Fact Finds","Closing","Sales"],
                           splitLine:0,
                           axisLabel:{
                               textStyle:{
                                   fontSize:15
                               }
                           }
                           //show:false
                       }
                   ],
                   yAxis : [
                       {
                           type : 'value',
                           show:true,
                           splitLine:0
                       }
                   ],
                   series : [
                       {
                           name:'Planed',
                           type:'bar',
                           stack: 'plan',
                           itemStyle : { normal: {color:'#F9E1B8',label : {textStyle: {color:'#0A6E93'}, show: true, position: 'insideTop'}}},
                           data:obj["planed"]
                       },
                       {
                           name:'Actual',
                           type:'bar',
                           stack:'actual',
                           itemStyle : { normal: {color:'#22A8DA',label : {textStyle: {color:'white'}, show: true, position: 'insideTop'}}},

                           data:obj["actual"]
                       },
                       {
                           name:'add',
                           type:'bar',
                           stack:'actual',
                           itemStyle : { normal: {color:'#A9DCEF',label : {textStyle: {color:'#0A6E93'}, show: true, position: 'insideTop'}}},
                           data:obj["additional"] == "0" ?  "" : obj["additional"]
                       }
                   ]
               };
               myChart.setOption(option);
           })
       }
   }
});