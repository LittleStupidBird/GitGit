
define(function () {
   return {
       createBarChart:function (obj){
           require([
               'echarts',
               'echarts/chart/bar'
           ],function(ec){
               var myChart = ec.init(document.getElementById('chart_activity'));

               var option = {
                   calculable : false,
                   grid:{
                       borderWidth:0
                   },
                   xAxis : [
                       {
                           type : 'category',
                           data : ['New Prospects',"Fact Finds","Closing","Sales"],
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
                           name:'Planned',
                           type:'bar',
                           stack: 'plan',
                           itemStyle : { normal: {color:'rgb(147,147,147)',label : {show: true, position: 'insideTop'}}},
                           data:obj["Planned"]
                       },
                       {
                           name:'Actual',
                           type:'bar',
                           stack:'actual',
                           itemStyle : { normal: {color:'rgb(140,131,156)',label : {show: true, position: 'insideTop'}}},

                           data:obj["Actual"]
                       },
                       {
                           name:'add',
                           type:'bar',
                           stack:'actual',
                           itemStyle : { normal: {color:'rgb(115,105,142)',label : {show: true, position: 'insideTop'}}},
                           data:obj["Additionall"]
                       }
                   ]
               };
               myChart.setOption(option);
           })
       }
   }
});