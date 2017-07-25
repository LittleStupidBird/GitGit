// dataA = '{"planned":["13","15","8","21"],"actual":["8","18","20","12"],"additionall":["","","2",""]}';
// var dataA = '{"trend":{  "monthly" : {"label" : [ "AUG",      "JUL",      "JUN"    ],    "data" : {      "New Prospects" : [        "15",        "28",        "25"      ],      "Sales" : [        "9",        "26",        "22"      ],      "Closing" : [        "8",        "27",        "27"      ],      "Fact Finds" : [        "15",        "30",        "23"      ]    }  },  "ytd" : {    "label" : [      "By AUG",      "By JUL",      "By JUN"    ],    "data" : {      "New Prospects" : [        "318",        "303",        "275"      ],      "Sales" : [        "277",        "268",        "242"      ],      "Closing" : [        "292",        "284",        "257"      ],      "Fact Finds" : [        "298",        "283",        "253"      ]    }  },  "weekly" : {    "label" : [      "05/23",      "05/30",      "06/06",      "06/13",      "06/20",      "06/27",      "07/04",      "07/11",      "07/18",      "07/25",      "08/01",      "08/08"    ],    "data" : {      "New Prospects" : [        "1",        "2",        "3",        "4",        "5",        "6",        "15",        "15",        "15",        "15",        "15",        "15"      ],      "Sales" : [        "13",        "13",        "13",        "13",        "13",        "13",        "13",        "13",        "13",        "13",        "13",        "13"      ],      "Closing" : [        "13",        "13",        "13",        "13",        "13",        "13",        "13",        "13",        "13",        "13",        "13",        "13"      ],      "Fact Finds" : [        "14",        "14",        "14",        "14",        "14",        "14",        "14",        "14",        "14",        "14",        "14",        "14"      ]    }  }},"last":{"top":{"right":"2015-08-02 - 2015-08-08","left":"2015-07-26 - 2015-08-01"},"bottom":{"last Month":["1.00:1","1.03:1","1.11:1"],"last 3 Months":["1.10:1","0.92:1","1.17:1"],"last Week":["1.06:1","1.06:1","1.00:1"]},"middle":{"actual":["15","14","13","13"],"iposActual":["15","14","13","13"],"additional":["0","4","4","4"],"Addtional Case":["2","2","2","2"],"planed":["36","8","4","2"]}}}';
//var dataActModel = '{"trend":{"monthly":{"label":[""], "data":{"New Prospects" : [""],      "Sales" : [""],      "Closing" : [""],      "Fact Finds" : [""]    }  },  "ytd" : {    "label" : [""],    "data" : {      "New Prospects" : [""],      "Sales" : [""],      "Closing" : [""],      "Fact Finds" : [""]    }  },  "weekly" : {    "label" : [],    "data" : {      "New Prospects" : [],      "Sales" : [],      "Closing" : [],      "Fact Finds" : []    }  }},"last":{"top":{"right":"","left":""},"bottom":{"last Month":["","",""],"last 3 Months":["","",""],"last Week":["","",""]},"middle":{"actual":[""],"iposActual":[],"additional":[],"Addtional Case":[],"planed":[]}}}';""
// var dataA='{"isself":"1","trend":{  "monthly" : {    "label" : [      "DEC",      "NOV",      "OCT"    ],    "data" : {      "New Prospects" : [      ],      "Sales" : [      ],      "Closing" : [      ],      "Fact Finds" : [      ]    }  },  "ytd" : {    "label" : [      "By DEC",      "By NOV",      "By OCT"    ],    "data" : {      "New Prospects" : [      ],      "Sales" : [      ],      "Closing" : [      ],      "Fact Finds" : [      ]    }  },  "weekly" : {    "label" : [      "09/14",      "09/21",      "09/28",      "10/05",      "10/12",      "10/19",      "10/26",      "11/02",      "11/09",      "11/16",      "11/23",      "11/30"    ],    "data" : {      "New Prospects" : [ "","",       "42",        "72"      ],      "Sales" : [        "48",        "78"      ],      "Closing" : [        "46",        "76"      ],      "Fact Finds" : [        "44",        "74"      ]    }  }},"last":{  "top" : {    "right" : "2015-11-30 - 2015-12-06",    "left" : "2015-11-23 - 2015-11-29"  },  "bottom" : {    "last Month" : [      "2:1",      "3:1",      "100:1"    ],    "last 3 Months" : [      "11:1",      "12:1",      "200:1"    ],    "last Week" : [      "1:1",      "10:1",      "100:1"    ]  },  "middle" : {    "actual" : [      "",      "",      "",      ""    ],    "iposActual" : [      "",      "",      "",      ""    ],    "additional" : [      "",      "",      "",      "12345"    ],    "Addtional Case" : [      "212333",      "2",      "2",      "2"    ],    "planed" : [      "20",      "20",      "20",      "20"    ]  }}}';
// BP.getActivityData(dataA);
define(['iframe',"language",'activityChart','jquery','activityChildChart'], function (iframe,language,activityChart,$,ac) {
       return {
       activityData:null,
       
       getActivityData: function (data) {
    	   this.activityData = data;
       },
       updateActivity: function () {
       	   var content = this;
       	   var timer;
           language.changeLanguage();
           
    	   //init
    	   var dataActModel = '{"trend":{"monthly":{"label":[""], "data":{"New Prospects" : [""],"Sales" : [""],"Closing" : [""],"Fact Finds" : [""]}},  "ytd" : {"label" : [""],"data" : {"New Prospects" : [""],"Sales" : [""],"Closing" : [""],"Fact Finds" : [""]}  },  "weekly" : {"label" : [],"data" : {"New Prospects" : [],"Sales" : [],"Closing" : [],"Fact Finds" : []}}},"last":{"top":{"right":"","left":""},"bottom":{"last Month":["","",""],"last 3 Months":["","",""],"last Week":["","",""]},"middle":{"actual":[""],"iposActual":[],"additional":[],"Addtional Case":[],"planed":[]}}}';
           var dataAll=$.extend(true,  {}, $.parseJSON(dataActModel), $.parseJSON(this.activityData)); 
//           var dataAll = $.parseJSON(dataActModel);
    	   var data = dataAll.last;
    	   var dataTrend = dataAll.trend;
    	   var isself = dataAll.isself;
    	   
    	   //如果agent leader 选中自己，则additional 可编辑,否则不可编辑
    	   if(isself == "0"){
    	   		$('#activity_hide').find('input').attr("readonly","true");
    	   		$(".activity-btns").hide();
    	   }

	       $(".act_btn li").each(function(){
            	language.changeLanguage();

	       		$(this).click(function(){
		    	   $(".act_btn li").removeClass('current');
		    	   $(this).addClass("current");

	           		var index = $(this).index();

	       			if(index == 0){
		    		   $("#activity_hide").hide();
		    		   $("#activity-trend").show();
		    		   $("#activity-last-week").hide();
					   $("#top_btn li:eq(0)").click();
		    	   }else if(index == 1){
		    		   $("#activity_hide").hide();
		    		   $("#activity-trend").hide();
		    		   $("#activity-last-week").show();
	       				activityChart.createBarChart(data.middle);
		    	   }else{
		    		   $("#activity_hide").show();
		    		   $("#activity-trend").hide();
		    		   $("#activity-last-week").hide();
		    	   }
	       		});
	       });
	   //当reload 时，如果在第三个页签上，则不刷新第二个页签表格
	   if($(".act_btn").find(".current").index()!=2){
	       activityChart.createBarChart(data.middle);
	   }
	   ac.createCharts(dataTrend);
       
       $("#last_week span").html('Activity performance of last week<br>['+data.top.left+']');
       $("#this_week span").html('Adjust for this week<br>['+data.top.right+']');
	   $(".act_btn li:eq(1) span:eq(1)").html("(" + this.formatDate(data.top.left) + ")");
	   $(".act_btn li:eq(2) span:eq(1)").html("(" + this.formatDate(data.top.right) + ")");
       
       var td = $("#actual").find('td');
       for(var i=0;i<td.length;i++){
    	   td.eq(i).text(data.middle.iposActual[i]);
       }
       
       var input = $("#Case").find('input');
       for(var i=0;i<input.length;i++){
    	   input.eq(i).text(data.middle["Addtional Case"][i]);
       }

        //按比例更改ratio add by fred 2015.12.11 
        /////////////////////////////////////////
        var lastWeekRatio = [];
		var lastMonthRatio = [];
		var lastTMonthRatio = [];

		for(var i=0;i<3;i++){
			var weekValue = parseFloat(data.bottom["last Week"][i])?parseFloat(data.bottom["last Week"][i]):0;
			var monthValue = parseFloat(data.bottom["last Month"][i])?parseFloat(data.bottom["last Month"][i]):0;
			var tMonthValue = parseFloat(data.bottom["last 3 Months"][i])?parseFloat(data.bottom["last 3 Months"][i]):0;

			switch(i){
				case 0:
					lastWeekRatio.push(weekValue);
					lastWeekRatio.push(monthValue);
					lastWeekRatio.push(tMonthValue);
					break;
				case 1:
					lastMonthRatio.push(weekValue);
					lastMonthRatio.push(monthValue);
					lastMonthRatio.push(tMonthValue);
					break;
				default:
					lastTMonthRatio.push(weekValue);
					lastTMonthRatio.push(monthValue);
					lastTMonthRatio.push(tMonthValue);
					break;
			}
		}

		var maxLastWeek = Math.max.apply(null, lastWeekRatio);
		var maxLastMonth = Math.max.apply(null, lastMonthRatio);
		var maxLastTMonth = Math.max.apply(null, lastTMonthRatio);

		if(maxLastWeek > 100){
			lastWeekRatio[0] = 100*lastWeekRatio[0]/maxLastWeek;
			lastWeekRatio[1] = 100*lastWeekRatio[1]/maxLastWeek;
			lastWeekRatio[2] = 100*lastWeekRatio[2]/maxLastWeek;
		}

		var maxLastMonth = lastMonthRatio[0];
		if(maxLastMonth > 100){
			lastMonthRatio[0] = 100*lastMonthRatio[0]/maxLastMonth;
			lastMonthRatio[1] = 100*lastMonthRatio[1]/maxLastMonth;
			lastMonthRatio[2] = 100*lastMonthRatio[2]/maxLastMonth;
		}

		if(maxLastTMonth > 100){
			lastTMonthRatio[0] = 100*lastTMonthRatio[0]/maxLastTMonth;
			lastTMonthRatio[1] = 100*lastTMonthRatio[1]/maxLastTMonth;
			lastTMonthRatio[2] = 100*lastTMonthRatio[2]/maxLastTMonth;
		}

        /////////////////////////////////////////
        //end
       var html = '<tr><td>'+ BP.language.A_LAST_WEEK  +'</td>';
	       html += '<td><span><p data-value='+ lastWeekRatio[0]+'>'+this.formatRatio(data.bottom["last Week"][0])+'</p></span></td>';
	       html += '<td><span><p data-value='+ lastMonthRatio[0]+'>'+this.formatRatio(data.bottom["last Week"][1])+'</p></span></td>';
	       html += '<td><span><p data-value='+ lastTMonthRatio[0]+'>'+this.formatRatio(data.bottom["last Week"][2])+'</p></span></td></tr><tr><td>'+ BP.language.A_LAST_MONTH +'</td>';
	       html += '<td><span><p data-value='+ lastWeekRatio[1]+'>'+this.formatRatio(data.bottom["last Month"][0])+'</p></span></td>';
	       html += '<td><span><p data-value='+ lastMonthRatio[1]+'>'+this.formatRatio(data.bottom["last Month"][1])+'</p></span></td>';
	       html += '<td><span><p data-value='+ lastTMonthRatio[1]+'>'+this.formatRatio(data.bottom["last Month"][2])+'</p></span></td></tr><tr><td>'+ BP.language.LAST_3_MONTHS +'</td>';
	       html += '<td><span><p data-value='+ lastWeekRatio[2]+'>'+this.formatRatio(data.bottom["last 3 Months"][0])+'</p></span></td>';
	       html += '<td><span><p data-value='+ lastMonthRatio[2]+'>'+this.formatRatio(data.bottom["last 3 Months"][1])+'</p></span></td>';
	       html += '<td><span><p data-value='+ lastTMonthRatio[2]+'>'+this.formatRatio(data.bottom["last 3 Months"][2])+'</p></span></td></tr>';
       
       
       $("#activity_span").html(html);
       
       
       var input = $("#activity_hide input");
       var i = 0;
       input.each(function (index) {
	      $(this).val(data.middle['Addtional Case'][i++])
	      $(this).bind('blur',function () {
	           if($(this).val() != data.middle['Addtional Case'][index]){
	        	   data.middle['Addtional Case'][index] = $(this).val();
		           var middleArr = data.middle['Addtional Case'];
		           var arr_0 = middleArr[0];
		           var arr_1 = middleArr[1];
		           var arr_2 = middleArr[2];
		           var arr_3 = middleArr[3];
		           iframe.loadURL('changedata:' + arr_0 + ':' + arr_1 + ':' + arr_2 + ':' + arr_3);
	           }
           })
      });
       
		activityChart.createBarChart(data.middle);
       $("#activity_span").find('span').each(function(){
    	   $(this).animate({width:parseFloat($(this).find('p').data("value"))},"Normal")
       })

       //取消上一次click事件
	   $(".activity-btns div:eq(3)").unbind("click"); 
	   $(".activity-btns div:eq(5)").unbind("click");

       //监听button
       $(".activity-btns div:eq(3)").click(function() {
			//发送请求
			iframe.loadURL("activityRestore:");
			//monthlyRestore设置为0,当数据返回时修改为1
			activityRestore = 0;
			//监听数据是否返回
			if(!timer){
				timer = setInterval(function () {
					if(activityRestore){
						clearInterval(timer);
						//reload activity
						content.getActivityData(BP.dataActivity);
						content.updateActivity();
						// $(".act_btn li:eq(2)").click();
					}
				}, 100);
			}
		});
		$(".activity-btns div:eq(5)").click(function() {
			iframe.loadURL("activitySubmit:");
		});

       },
	   formatDate:function(date) {
	   		var ret = "";
	   		try{
				var mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
				//多语言转换
        		if(BP.languageType == "th"){
	        		var monArray = [];
	        		
	        		for(var i=0; i<mon.length; i++){
	        			var key = mon[i].toUpperCase();
	        			monArray.push(Global.language["th"][key]);
	        		}
	        		mon = monArray;
	        	}

				var arr = date.split("-");
				var m1 = parseInt(arr[1]);
				arr[1] = mon[m1 - 1];
				var m2 = parseInt(arr[4]);
				arr[4] = mon[m2 - 1];
				ret = $.trim(arr[1] + arr[2] + " - " + arr[4] + arr[5]);
			}catch(e){
				ret = "";
			}
			
			return ret;
		},
		formatRatio: function(val){
			if(val == ""){
				return "&nbsp-:-";
			}
			return val;
		}
    }
});

    //format Input Value
    function formatInputValue(val){
    	val = val.replace(/\D/g,'');
    	val = val.replace(/' '/g,'');
    	if(val.indexOf(0) == 0 && val.length >1){
    		val = val.substring(1,val.length)
    	}
    	if(val.length>4){
    		val = val.substring(0,4);
    	}
    	// val = BP.addCommas(val);
    	return val;
    }