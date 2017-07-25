function createCircleChart(obj){
    // 路径配置
    require.config({
        paths: {
            echarts: 'extra/echarts-2.2.5/build/dist'
        }
    });
    
    require(
        [
            'echarts',
            'echarts/chart/pie' //按需加载
        ],
        function (ec) {
            // 基于准备好的dom，初始化echarts图表
            var myChart = ec.init(document.getElementById('view'));
            //the item style
            var labelFromatter = {
                	normal:{
                		label:{
                			formatter:function(params){
                				//如果是全为0，则默认显示不带tip的饼图
                				if(parseFloat(params.data.per)==0 && parseFloat(params.data.value)==100){
                					return "";
                				}
                				return (parseFloat(params.data.per) < 0 || parseFloat(params.data.value)==0) ? "" : params.data.per;
                			},
                			textStyle:{
                				baseline:'top'
                			},
                			show : true
                		}
                	},
                    emphasis : {
                        label : {
                            show : true,
                            position : 'center',
                            textStyle : {
                                fontSize : '15',
                                fontWeight : 'bold'
                            }
                        }
                    }
            };
            
            var radius = ["30%", "55%"];
            var option = {
                series : [
                    {
                        type:'pie',
                        radius : radius,
                        selectedMode : 'single',
                        itemStyle :  labelFromatter,
                        data:[
                            {itemStyle:{
								normal:{color:'#e86487', labelLine : {show : true, length:15, lineStyle:{color:'#e86487', type:'solid', width:(BP.valueToInt(obj["dataArray_1"]) > 0 ? '1.5' : '0') } }, label : {textStyle:{baseline:'top', color:'#e86487', fontSize : '14', fontWeight : 'bold'}}}},
								value:function() {
									var val = BP.valueToInt(obj["dataArray_1"])<0?0:BP.valueToInt(obj["dataArray_1"]);
									
									if(val > 0) {
										return val;
									} else if(val == 0) {
										if(BP.valueToInt(obj["dataArray_2"]) == 0 && BP.valueToInt(obj["dataArray_3"]) == 0 &&BP.valueToInt(obj["dataArray_4"]) == 0 && BP.valueToInt(obj["dataArray_5"]) == 0 &&BP.valueToInt(obj["dataArray_6"]) == 0) {
											return 100;
										} else {
											return 0;
										}
									} else {
										return "";
									}
								}(), 
								name:'Ordinary Life',id:'td1',tdb:'tdb1',per:obj.per[0]},
                            {itemStyle:{normal:{color:'#FBBF56', labelLine : {show : true, length:15, lineStyle:{color:'#FBBF56', type:'solid', width:(BP.valueToInt(obj["dataArray_2"]) > 0 ? '1.5' : '0') } }, label : {textStyle:{baseline:'top', color:'#FBBF56', fontSize : '14', fontWeight : 'bold'}}}},
								value:function() {
									var val = BP.valueToInt(obj["dataArray_2"]);
									
									if(val > 0) {
										return val;
									} else if(val == 0) {
										return 0;
									} else {
										return "";
									}
								}(), 
								name:'Single Premium',id:'td2',tdb:'tdb2',per:obj.per[1]},
                            {itemStyle:{normal:{color:'#97CB5D', labelLine : {show : true, length:15, lineStyle:{color:'#97CB5D', type:'solid', width:(BP.valueToInt(obj["dataArray_3"]) > 0 ? '1.5' : '0') } }, label : {textStyle:{baseline:'top', color:'#97CB5D', fontSize : '14', fontWeight : 'bold'}}}},
								value:function() {
									var val = BP.valueToInt(obj["dataArray_3"]);
									if(val > 0) {
										return val;
									} else if(val == 0) {
										return 0;
									} else {
										return "";
									}
								}(), 
								name:'ILP',id:'td3',tdb:'tdb3',per:obj.per[2]},
                            {itemStyle:{normal:{color:'#46D3BD', labelLine : {show : true, length:15, lineStyle:{color:'#46D3BD', type:'solid', width:(BP.valueToInt(obj["dataArray_4"]) > 0 ? '1.5' : '0') } }, label : {textStyle:{baseline:'top', color:'#46D3BD', fontSize : '14', fontWeight : 'bold'}}}},
								value:function() {
									var val = BP.valueToInt(obj["dataArray_4"]);
									if(val > 0) {
										return val;
									} else if(val == 0) {
										return 0;
									} else {
										return "";
									}
								}(), 
								name:'PA',id:'td4',tdb:'tdb4',per:obj.per[3]},
                            {itemStyle:{normal:{color:'#22A8DA', labelLine : {show : true, length:15, lineStyle:{color:'#22A8DA', type:'solid', width:(BP.valueToInt(obj["dataArray_5"]) > 0 ? '1.5' : '0') } }, label : {textStyle:{baseline:'top', color:'#22A8DA', fontSize : '14', fontWeight : 'bold'}}}},
								value:function() {
									var val = BP.valueToInt(obj["dataArray_5"]);
									if(val > 0) {
										return val;
									} else if(val == 0) {
										return 0;
									} else {
										return "";
									}
								}(), 
								name:'CSG',id:'td5',tdb:'tdb5',per:obj.per[4]},
                            {itemStyle:{normal:{color:'#9962D2', labelLine : {show : true, length:15, lineStyle:{color:'#9962D2', type:'solid', width:(BP.valueToInt(obj["dataArray_6"]) > 0 ? '1.5' : '0') } }, label : {textStyle:{baseline:'top', color:'#9962D2', fontSize : '14', fontWeight : 'bold'}}}},
								value:function() {
									var val = BP.valueToInt(obj["dataArray_6"]);
									if(val > 0) {
										return val;
									} else if(val == 0) {
										return 0;
									} else {
										return "";
									}
								}(), 
								name:'Credit Life',id:'td6',tdb:'tdb6',per:obj.per[5]}
                        ]
                    }
                ]
            };

            // init data for pie chart
            myChart.setOption(option);

            //listen on pie chart click
            var ecConfig = require('echarts/config');
            myChart.on(ecConfig.EVENT.PIE_SELECTED, function (param){
                var selected = param.selected;
                var serie;
                for (var idx in selected) {
                    serie = option.series[idx];
                    for (var i = 0, l = serie.data.length; i < l; i++) {
                        if (selected[idx][i]) {
                            var id = serie.data[i].id;
                            var tdb = serie.data[i].tdb;
                            //change table background when you click pie
                        	$('.' + id).parent().addClass(tdb);  
                        }else{
							 var tdb = serie.data[i].tdb;
                        	$('.' + serie.data[i].id).parent().removeClass(tdb);  
                        }
                    }
                }
            });

			//listen on table click
			$('#F-MTD tr').click(function(value) {
				var id = $(this).children()[0].className;
				if(myChart.chart.pie){
					//make part of the pie select
					var data = myChart.chart.pie.series[0].data;
					for(var i=0; i<data.length; i++){
						var tdb = data[i].tdb;
						if(data[i].id == id && !data[i].selected){
							data[i].selected = true;
                        	$('.' + id).parent().children().addClass(tdb);  
						}else{
							data[i].selected = false;
                        	$('.' + data[i].id).parent().children().removeClass(tdb);  
						}
						myChart.resize();
					}
				}
			});
        });
}