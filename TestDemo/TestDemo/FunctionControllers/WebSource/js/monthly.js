/**
 * Created by pactera on 15/7/20.
 */
function createLineChart(obj){
    // 路径配置
    require.config({
        paths: {
            echarts: 'extra/echarts-2.2.5/build/dist'
        }
    });

// 使用
    require(
        [
            'echarts',
            'echarts/chart/line' //按需加载
        ],
        function (ec) {
            var actual = [];
            var target = [];
            var data = obj.data;
            var currentMon = parseInt(new Date().getMonth() + 2);
            if(currentMon > 12){
                currentMon = 1;
            }

            for(var i = 0; i < data.ACTUAL.length; i++){
                if(i < currentMon){
                    if(obj.kpiName == "Case" || obj.kpiName == "Case/Avg. ActiveAgent"){
                        actual.push(BP.keepDecimal(data.ACTUAL[i],1));
                    }else{
                        actual.push(BP.valueToInt(data.ACTUAL[i]));   
                    }
                }
            }

            for(var i = 0; i < data.GOAL.length; i++){
                if(obj.kpiName == "Case" || obj.kpiName == "Case/Avg. ActiveAgent"){
                   target.push(BP.keepDecimal(data.GOAL[i],1));
                }else{
                   target.push(BP.valueToInt(data.GOAL[i]));
                }
            }
            // 基于准备好的dom，初始化echarts图表
            var myChart = ec.init(document.getElementById('main'));
            
            var color = '#e86478';
            if(obj.color && (obj.color != "0")){
            	color = '#46d3bd';
            }
            
            var option = {
                tooltip: {
                    trigger: 'axis'
                },
                calculable: false,
                grid:{
                    x:36,
                    y:10,
                    width:792,
                    height:130
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: obj.label
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        show: true,
                        axisLabel : function(data){
                        	return {
                                formatter: '0 '
                            };
                        }
                    }
                ],
                series: [
                    {
                        name: Global.language[BP.languageType].M_GOAL,
                        type: 'line',
                        stack: 'Target',
                        data: target,
                        symbol : 'circle',
                    	smooth:true,
                        itemStyle:{normal:{color:'rgb(246,179,69)'}}
                    },
                    {
                        name: Global.language[BP.languageType].M_ACTUAL,
                        type: 'line',
                        stack: 'Actual',
                        data: actual,
                        symbol : 'circle',
                    	smooth:true,
                        itemStyle:{normal:{color:color}}

                    }
                ]
            };
            
            // 为echarts对象加载数据
            myChart.setOption(option);
        }
    );
}
