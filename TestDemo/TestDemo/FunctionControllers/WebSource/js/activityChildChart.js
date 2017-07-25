define(['Chart','clickStyle'], function (c,cs) {
	return {
		getWeeklyData:function(arr1,arr2,obj){
			try{
				for(var i=0;i<arr2.length;i++){
					arr1[i] = {
						labels:obj.weekly.label,
						datasets:[{
							label: "My First dataset",
							fillColor: "#a9dcef",
							strokeColor: "rgba(164,164,164,1)",
							highlightFill: "rgba(164,164,164,1)",
							highlightStroke: "rgba(164,164,164,1)",
							data:obj.weekly.data[arr2[i]]
						}]
					}
				}
			}catch(e){
				console.log(e.message);
			}
		},
		getMonthlyData:function(labelArr,obj){
			//处理数据 从12个月中取得3个月的值
			try{
				var label = obj.monthly.label;
				var dataMon = obj.monthly.data;
				var labelArray =[];
				var dataArray = {};
				for(var i=0;i<label.length;i++){
					if(label[i] != ""){
						labelArray.push(label[i]);

						var dataArr = [];
						for(var j=0;j<labelArr.length;j++){
							if(!dataArray[labelArr[j]]){
								dataArray[labelArr[j]] = [];
							}
							dataArray[labelArr[j]].push(dataMon[labelArr[j]][i]);
						}
					}
				}
				obj.monthly.label = labelArray;
				obj.monthly.data = dataArray;

				//修改月份排序
				obj.monthly.label.reverse();

				var o = {
					labels : obj.monthly.label,
					datasets : []
				}
				
				var colorArray = ["#E5F5FA","#a9dcef","#22a8da","#0a6e93"];
				for(var i=0;i<labelArr.length;i++){
					o.datasets[i] = {
						fillColor : colorArray[i],
						strokeColor : colorArray[i],
						data:obj.monthly.data[labelArr[i]].reverse()
					}
				}
				return o;
			}catch(e){
				console.log(e.message);
			}
		},
		getYTDData:function(arr1,arr2,obj){
			//处理数据 从12个月中取得3个月的值
			try{
				var label = obj.ytd.label;
				var dataMon = obj.ytd.data;
				var labelArray =[];
				var dataArray = {};

				//add by fred 2015/12/09
				//当12月份时显示12月份，1月份显示12和1月份，2月份及以后会显示3个月份
				var acitveMonth = parseInt(new Date().getMonth());
				if(acitveMonth == 11){
					label = label.slice(0,1);
				}else if(acitveMonth == 0){
					label = label.slice(0,2);
				}

				for(var i=0;i<label.length;i++){
					if(label[i] != ""){
						labelArray.push(label[i]);

						var dataArr = [];
						for(var j=0;j<arr2.length;j++){
							if(!dataArray[arr2[j]]){
								dataArray[arr2[j]] = [];
							}
							dataArray[arr2[j]].push(dataMon[arr2[j]][i]);
						}
					}
				}
				obj.ytd.label = labelArray;
				obj.ytd.data = dataArray;

				//修改月份排序
				obj.ytd.label.reverse();
				for(var i=0;i<arr2.length;i++){
					arr1[i] = {
						labels:obj.ytd.label,
						datasets:[{
							label: "My First dataset",
							fillColor: "#a9dcef",
							strokeColor: "a9dcef",
							highlightFill: "rgba(164,164,164,1)",
							highlightStroke: "rgba(164,164,164,1)",
							data:obj.ytd.data[arr2[i]].reverse()
						}]
					}
				}
			}catch(e){
				console.log(e.message);
			}
		},
		createCharts: function (obj) {
			var cxt = [];
			var canvas = $("#activityChild canvas");

			for(var i=0;i<canvas.length;i++){
				cxt.push(canvas[i].getContext("2d"));
			}
			var labelArr = ["New Prospects","Fact Finds","Closing","Sales"];
			var weeklyArr = [];
			var monthlyArr = {};
			var ytdArr = [];
			this.getWeeklyData(weeklyArr,labelArr,obj);
			var monthlyArr = this.getMonthlyData(labelArr,obj);
			this.getYTDData(ytdArr,labelArr,obj);
       
			var options = {
				animation: true,
				showScale: true, //x,y
				scaleOverride: false,
				scaleSteps:null,
				scaleStepWidth:10,
				bezierCurve: false,
				//        scaleFontSize: 22,
				showTooltips: true,
				scaleShowGridLines : true,
				responsive:false,
				scaleShowLabels:true,
				pointDotRadius : 2,
				//        datasetStroke : false,
				datasetStrokeWidth : 2,
				barValueSpacing :50,
                barDatasetSpacing:4,
                scaleBeginAtZero : true,
				scaleStartValue:0
			};
			var btn = document.getElementById("top_btn");
			var btns = btn.children;
			btns[0].addEventListener('click',function(){
				$("#top_btn li").removeClass('current');
				$(this).addClass("current");
				showWeekly();
			},false);
			btns[1].addEventListener('click',function(){
				$("#top_btn li").removeClass('current');
				$(this).addClass("current");
				showMonthly()
				},false);
			btns[2].addEventListener('click',function(){
				$("#top_btn li").removeClass('current');
				$(this).addClass("current");
				showYTD()
			},false);
       
			cs.changeTopBtn('top_btn');
       
			function showWeekly(){
				document.getElementById("ActMonthly").style.display = "none";
				document.getElementById("ActYTD").style.display = "none";
				document.getElementById("ActWeekly").style.display = "table";
				for(var i=0;i<4;i++){
					new Chart(cxt[i]).Line(weeklyArr[i],options);
				}
			}
			function showMonthly(){
				document.getElementById("ActWeekly").style.display = "none";
				document.getElementById("ActYTD").style.display = "none";
				document.getElementById("ActMonthly").style.display = "table";
				
				new Chart(cxt[4]).Bar(monthlyArr,options);
			}
			function showYTD(){
				document.getElementById("ActWeekly").style.display = "none";
				document.getElementById("ActMonthly").style.display = "none";
				document.getElementById("ActYTD").style.display = "table";
				for(var i=5;i<cxt.length;i++){
					new Chart(cxt[i]).Bar(ytdArr[i-5],options);
				}
			}
		}
	}
})