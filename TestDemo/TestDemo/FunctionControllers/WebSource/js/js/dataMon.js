
// var dataM = '{"color":"1","label" : [    "Dec",    "Jan",    "Feb",    "Mar",    "Apr",    "May",    "Jun",    "Jul",    "Aug",    "Sep",    "Oct",    "Nov"  ],  "data" : {    "ACTUAL" : [      "7",      "7",      "7",      "7",      "7",      "7",      "",      "",      "",      "",      "",      ""    ],    "GOAL" : [      "49",      "49",      "49",      "49",      "49",      "49",      "0",      "0",      "0",      "0",      "0",      "0"    ]  }}';
// BP.getMonthlyData(dataM);
define(['jquery','tppl','monthly','iframe','language'], function ($,t,monthly,iframe,language) {
    return {
        monthlyData:null,

        getMonthlyData: function (data) {
            this.monthlyData = data;
        },
        updateMonthly: function () {
        	var dataMonModel = '{"color": "", "label": [""], "data": {"ACTUAL": [""], "GOAL": [""] } }';
//            var data = $.parseJSON(dataMonModel);	
            var data = $.extend(true,  {}, $.parseJSON(dataMonModel), $.parseJSON(this.monthlyData)); 

            if($('#tag').val()=='popup'){
                var render = tppl($("#monthly_tmpl").html());

                var dataMonthly = data.FYC;
                dataMonthly.type = 0;
                dataMonthly.FullYearGoal = data.FullYearGoal.FYC;
                dataMonthly.FullYearReforecast = data.FullYearReforecast.FYC;
                
                var html = render(dataMonthly);
                $("#mon_top_btns li").click(function () {
					//样式切换
					$("#mon_top_btns li.current").removeClass("current");
					$(this).addClass("current");
					
					//用户权限以及当前月份
					var level = data.level;
					var currentMon = parseInt(new Date().getMonth() + 1);
						
                    var text = $(this).text().toUpperCase().replace(/ /g,"");
                    if(text === "CASE"){
                    	text = "CASES";
                    }
                    var obj = {};
                    obj.data = data[text];
                    //多语言X坐标title
                    data = this.changeMonthlyTitle(data);

                    obj.label = data.label;
					
                    createLineChart(obj);
                    
                    dataMonthly = data[text];
					if(text == "FYC" || text == "FYP" || text == "ANP"){
						dataMonthly.type = 0;
					}else{
						dataMonthly.type = 1;
					}
                    dataMonthly.FullYearGoal = data.FullYearGoal[text];
                    dataMonthly.FullYearReforecast = data.FullYearReforecast[text];
                    
                    html = render(dataMonthly);
					
                    $("#html_monthly").remove();
                    $("#tmpl_monthly").append(html);

					//change language to html
		            language.changeLanguage();
		            
					if(text == "FYC" || text == "FYP" || text == "ANP"){
                    	obj.color = "0";
						$("#monthly_mark_ul li:eq(0) span").css("backgroundColor","#e86478");
						//更改grid 上面边的颜色
						$('#html_monthly table').eq(0).addClass('monthly_tb');
                    }else{
                    	obj.color = "1";
						$("#monthly_mark_ul li:eq(0) span").css("backgroundColor","#46d3bd");
						$("table.monthly_tb tr:eq(0) td").addClass("td_acture1");
						//更改grid 上面边的颜色
						$('#html_monthly table').eq(0).addClass('monthly_tb_green');
                    }
					
					//如果是agentleader 显示三个按钮并且给按钮注册事件
					if(level == "AL") {
						$(".monthly-btns").show();
						//reforcedcast 如果是前四个tab，给文本框设置值为full year goal除以文本框数量；如果是后三个tab,给文本框设置值为full year goal
						$(".monthly-btns div:eq(1)").click(function() {
							$(".monthly_full_tb .monthly-reforcecast").html($(".monthly_full_tb .monthly-goal").html());
							if($("#mon_top_btns li").index( $("#mon_top_btns li.current")) > 3) {
								$(".monthly-input").val(parseInt($(".monthly_full_tb .monthly-goal").html().replace(',','')));
								// console.log("");
								// data[text]["GOAL"][currentMon + index] = parseInt($(".monthly_full_tb .monthly-goal").html().replace(',',''));
							} else {
								$(".monthly-input").val(parseInt($(".monthly-goal").html().replace(',',''))/$(".monthly-input").length);
								// data[text]["GOAL"][currentMon + index] = parseInt($(".monthly-goal").html().replace(',',''))/$(".monthly-input").length;
							}

							for(var i=11;i>=12 - $(".monthly-input").length;i--){
								data[text]["GOAL"][i] = $(".monthly-input").val();
							}

							var ret = {};
							ret.ACTUAL = data[text].ACTUAL;
							ret.GOAL = data[text].GOAL;
							ret.VSGOAL = data[text].VSGOAL;
							ret.GROWTH = data[text].GROWTH;
							ret.TYPE = text;
							
							iframe.loadURL("popupMonthlyReforecast:"+ JSON.stringify(ret));
						});

						$(".monthly-btns div:eq(3)").click(function() {
							//发送请求
							iframe.loadURL("popupMonthlyReload:");
							//monthlyRestore设置为0,当数据返回时修改为1
							monthlyRestore = 0;
							//监听数据是否返回
							var timer = setInterval(function () {
								if(monthlyRestore){
									clearInterval(timer);
									//reload popup monthly
									$("#top_btns li:eq(1)").click();
								}
							}, 100);
						});
						$(".monthly-btns div:eq(5)").click(function() {
							iframe.loadURL("popupMonthlySubmit:");
						});
					}

					//改变table样式增加input框
					$("#html_monthly .monthly_tb tr").each(function(index, val) {
						if(currentMon == 12){
							$("td:gt(0)",$(this)).css("backgroundColor","transparent");
						}else{
							$("td:gt(" + monthlIndex + ")",$(this)).css("backgroundColor","transparent");
						}

						if(index == 1 && level == "AL") {
							for(var i=0; i<12; i++){
								if(currentMon == 12){
									var inputValue = $("td:eq(" + i + ")",$(this)).text();
									$("td :eq("+ i +")",$(this)).html("<input type='text' class='monthly-input' onclick='onInputClick(this)' onblur='onInputBlur(this)' onkeyup='onInput(this)' data-value="+ inputValue +" value="+ BP.formatMoney(inputValue) +">")
								}else if(i>=currentMon){
									var inputValue = $("td:eq(" + i + ")",$(this)).text();
									$("td :eq("+ i +")",$(this)).html("<input type='text' class='monthly-input' onclick='onInputClick(this)' onblur='onInputBlur(this)' onkeyup='onInput(this)' data-value="+ inputValue +" value="+ BP.formatMoney(inputValue) +">")
								}
							}
						}
					});

					//保存goal数据到data中
					if($(".monthly-input").length >0) {
						$(".monthly-input").each(function(index, val) {
							$(this).bind('blur',function () {
								data[text]["GOAL"][index] = $(this).data("value");

								var ret = {};
								ret.ACTUAL = data[text].ACTUAL;
								ret.GOAL = data[text].GOAL;
								ret.VSGOAL = data[text].VSGOAL;
								ret.GROWTH = data[text].GROWTH;
								ret.TYPE = text;

								iframe.loadURL("changeMonthlyGoal:"+ JSON.stringify(ret));
								//重新加载piechart
				                var obj = {}
				                obj.data = data.FYC;
				                obj.label = data.label;
				                createLineChart(obj);
							});
						});
					}
                });

                $("#tmpl_monthly").append(html);
                    

                var obj = {}
                obj.data = data.FYC;
                obj.label = data.label;
                createLineChart(obj);
            }else{
				//change language to html
	            language.changeLanguage();
            	if(data.color == "1"){
					$("#monthly_mark_ul li:eq(0) span").css("backgroundColor","#46d3bd");
					$("table.monthly_tb tr:eq(0) td").addClass("td_acture1");
            	}else{
            		$("#monthly_mark_ul li:eq(0) span").css("backgroundColor","#e86478");
            	}

                //多语言X坐标title
                data = this.changeMonthlyTitle(data);

                createLineChart(data);
            }
        },
        changeMonthlyTitle: function(data){
        	if(BP.languageType == "th"){
        		var label = data.label;
        		var labelArray = [];

        		for(var i=0; i<label.length; i++){
        			var key = label[i].toUpperCase();
        			labelArray.push(Global.language["th"][key]);
        		}
        		data.label = labelArray;
        	}
        	return data;
        }
    }
});

//input 输入只能为数字
function onInput(inputField){
	$(inputField).val(inputField.value.replace(/\D/g,''));
	$(inputField).data("value",inputField.value);
}

//失去焦点后格式化value
function onInputBlur(inputField){
	$(inputField).val(BP.formatMoney(inputField.value));
	$(inputField).data("value",$(inputField).data("value"));
}

//点击input，显示真实数值
function onInputClick(inputField){
	$(inputField).val($(inputField).data("value"));
}