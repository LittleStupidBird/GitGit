//var dataDAL = '{ "RECRUIT" : {    "agentID" : "0000235468",    "num" : "0",    "SelfLevel" : "AG",    "growth" : "0",    "fullyear" : "0",    "goal" : ""  },  "ACTIVENEW" : {    "agentID" : "0000235468",    "num" : "0",    "SelfLevel" : "AG",    "growth" : "0",    "fullyear" : "0",    "goal" : ""  },  "AGENTS" : {    "agentID" : "0000235468",    "num" : "0",    "SelfLevel" : "AG",    "growth" : "0",    "fullyear" : "0",    "goal" : ""  },  "CASES" : {    "agentID" : "0000235468",    "num" : "5.88",    "SelfLevel" : "AG",    "growth" : "67",    "fullyear" : "4",    "goal" : "0"  },  "CASESIZEFYC" : {    "agentID" : "0000235468",    "num" : "0",    "SelfLevel" : "AG",    "growth" : "0",    "fullyear" : "0",    "goal" : ""  },  "CASESIZEFYP" : {    "agentID" : "0000235468",    "num" : "0",    "SelfLevel" : "AG",    "growth" : "0",    "fullyear" : "0",    "goal" : ""  },  "ANP" : {    "agentID" : "0000235468",    "num" : "1788918",    "SelfLevel" : "AG",    "growth" : "1800.0",    "fullyear" : "0",    "goal" : ""  },  "FYC" : {"num": "222222222222", "growth": "29", "fullyear": "222222222232323232334", "goal": "29"},  "FYP" : {    "agentID" : "0000235468",    "num" : "149076",   "SelfLevel" : "AG",    "growth" : "799.5",    "fullyear" : "0",    "goal" : "" }, "CASESIZEANP" : {    "agentID" : "0000235468",    "num" : "0",    "SelfLevel" : "AG",    "growth" : "0",    "fullyear" : "0",    "goal" : ""  }, "ACTIVEAGENTS" : {    "agentID" : "0000235468",    "num" : "1",    "SelfLevel" : "AG",    "growth" : "0",    "fullyear" : "0",    "goal" : ""  }}';
//dataDAL = '{  "FYP" : {    "goal" : "0.0",    "growth" : "0.0",    "agentID" : "0000271896",    "goalYear" : "2017",    "num" : "0.0",    "fullyear" : "280000.0",    "SelfLevel" : "FA"  },  "RECRUIT" : {    "goal" : "0.0",    "growth" : "0.0",    "agentID" : "0000271896",    "goalYear" : "2017",    "num" : "0.0",    "fullyear" : "0.0",    "SelfLevel" : "FA"  },  "CASESIZEFYC" : {    "goal" : "0.0",    "growth" : "0.0",    "agentID" : "0000271896",    "goalYear" : "2017",    "num" : "0.0",    "fullyear" : "0.0",    "SelfLevel" : "FA"  },  "ACTIVEAGENTS" : {    "goal" : "0.0",    "growth" : "0.0",    "agentID" : "0000271896",    "goalYear" : "2017",    "num" : "0.0",    "fullyear" : "0.0",    "SelfLevel" : "FA"  },  "CASESIZEFYP" : {    "goal" : "0.0",    "growth" : "0.0",    "agentID" : "0000271896",    "goalYear" : "2017",    "num" : "0.0",    "fullyear" : "0.0",    "SelfLevel" : "FA"  },  "CASES" : {    "goal" : "0.0",    "growth" : "0.0",    "agentID" : "0000271896",    "goalYear" : "2017",    "num" : "0.0",    "fullyear" : "0.0",    "SelfLevel" : "FA"  },  "ANP" : {    "goal" : "0.0",    "growth" : "0.0",    "agentID" : "0000271896",    "goalYear" : "2017",    "num" : "0.0",    "fullyear" : "0.0",    "SelfLevel" : "FA"  },  "CASESIZEANP" : {    "goal" : "0.0",    "growth" : "0.0",    "agentID" : "0000271896",    "goalYear" : "2017",    "num" : "0.0",    "fullyear" : "0.0",    "SelfLevel" : "FA"  },  "AGENTS" : {    "goal" : "0.0",    "growth" : "0.0",    "agentID" : "0000271896",    "goalYear" : "2017",    "num" : "0.0",    "fullyear" : "0.0",    "SelfLevel" : "FA"  },  "Add" : {    "SameClass" : "13 of 115",    "Training" : "45.00",    "PlanGrantExactDate" : "1433088000000",    "Late" : "0.00",    "PlanExpireExactDate" : "1454256000000",    "PlanGrantDate" : "Jun 2015",    "ActiveMonth" : "1.00",    "Absent" : "0.00",    "PlanValue" : "10000.00",    "Date" : "",    "PlanExpireDate" : "Feb 2016",    "AllFa" : "15 of 789"  },  "ACTIVENEW" : {    "goal" : "0.0",    "growth" : "0.0",    "agentID" : "0000271896",    "goalYear" : "2017",    "num" : "0.0",    "fullyear" : "0.0",    "SelfLevel" : "FA"  },  "FYC" : {    "goal" : "0.0",    "growth" : "0.0",    "agentID" : "0000271896",    "goalYear" : "2017",    "num" : "0.0",    "fullyear" : "90180.0",    "SelfLevel" : "FA"  }}';
//BP.getDashboardData(dataDAL);

define(['jquery','tppl','DBPicTable','language'],function($,t,DBPicTable,language){
	return {
		DB_STA:1,
		dashboardData:null,
		pageId:null,

		getDashboardData:function(data){
			this.dashboardData = data;
		},
		updateDashboard:function(){
			var data = $.parseJSON(this.dashboardData);
			//if the data is null
			if(!data){
				data={};
			}
			if(!data.FYC){
				data.FYC = {};
			}
			if(!data.FYP){
				data.FYP = {};
			}
			if(!data.FYP){
				data.FYP = {};
			}
			if(!data.ANP){
				data.ANP = {};
			}
			if(!data.AGENTS){
				data.AGENTS = {};
			}
			if(!data.ACTIVEAGENTS){
				data.ACTIVEAGENTS = {};
			}
			if(!data.CASES){
				data.CASES = {};
			}
			if(!data.CASESIZEFYP){
				data.CASESIZEFYP = {};
			}
			if(!data.RECRUIT){
				data.RECRUIT = {};
			}
			if(!data.ACTIVENEW){
				data.ACTIVENEW = {};
			}
			if(!data.CASESIZEFYC){
				data.CASESIZEFYC = {};
			}
			if(!data.Add){
				data.Add = {};
			}
			
			var render = tppl($("#dashboard-tmpl").html());
			var html = render(data);
			$('#agentDashboard').append(html);
			
			//change language to html
            language.changeLanguage();
            

			var canvas = document.getElementsByTagName('canvas');
			var cxt = [];
			for (var i = 0; i < canvas.length; i++) {
				cxt[i] = canvas[i].getContext('2d');
			}

			var halfCircle = {
				w: 60
			};
			var top = new DbPicTable();
			top.setStyle(halfCircle);
			top.setDBData('FYC', this.removeDot(data['FYC'].fullyear), this.removeDot(data['FYC'].num));
			var top1 = new DbPicTable();
			top1.setStyle(halfCircle);
			top1.setDBData('FYP', this.removeDot(data['FYP'].fullyear), this.removeDot(data['FYP'].num));
			var top2 = new DbPicTable();
			top2.setStyle(halfCircle);
			top2.setDBData('ANP', this.removeDot(data['ANP'].fullyear), this.removeDot(data['ANP'].num));

			var len = 0;
			for(var i in data){
				len++;
			}
			
			if(this.pageId == "FA"){
				//fa_dashboard html add
				var bm0 = new DbPicTable();
				bm0.setDBData('Case', this.removeDot(data['CASES'].fullyear), this.removeDot(data['CASES'].num));
				var bm1 = new DbPicTable();
				bm1.setDBData('Case Size ANP', this.removeDot(data['CASESIZEANP'].fullyear), this.removeDot(data['CASESIZEANP'].num));

				var timer = setInterval(function () {
					top.drawHalfCircle(cxt[0]);
					top1.drawHalfCircle(cxt[1]);
					top2.drawHalfCircle(cxt[2]);
					bm0.drawCircleTable(cxt[3]);
					// bm1.drawCircleTable(cxt[4]);
				}, 10);
				setTimeout(function () {
					clearInterval(timer);
				},5000)
			}else if(this.pageId == "AL"){
					//leader_dashboard html add
					var bm = new DbPicTable();
					bm.setDBData('New Recruits', this.removeDot(data['RECRUIT'].fullyear), this.removeDot(data['RECRUIT'].num));

					var bm0 = new DbPicTable();
					bm0.setDBData('Active New Agents', this.removeDot(data['ACTIVENEW'].fullyear), this.removeDot(data['ACTIVENEW'].num));
	
					var bm1 = new DbPicTable();
					bm1.setDBData('Avg.Active Agent', this.removeDot(data['ACTIVEAGENTS'].fullyear), this.removeDot(data['ACTIVEAGENTS'].num));
					var bm2 = new DbPicTable();
					bm2.setDBData('Case/Avg.Active Agent', BP.keepDecimal(data['CASES'].fullyear,1), BP.keepDecimal(data['CASES'].num,1));
					var bm3 = new DbPicTable();
					bm3.setDBData('Case Size FYP', this.removeDot(data['CASESIZEFYP'].fullyear), this.removeDot(data['CASESIZEFYP'].num));
					//var bm4 = new DbPicTable();
					//bm4.setDBData('Case Size ANP', this.removeDot(data['CASESIZEANP'].fullyear), this.removeDot(data['CASESIZEANP'].num));
	
					var timer = setInterval(function () {
						top.drawHalfCircle(cxt[0]);
						top1.drawHalfCircle(cxt[1]);
						top2.drawHalfCircle(cxt[2]);
						//bm0.drawLCircleTable(cxt[3]);
						bm.drawLCircleTable(cxt[3]);
						bm0.drawLCircleTable(cxt[4]);
						bm1.drawLCircleTable(cxt[5]);
						bm2.drawLCircleTable(cxt[6]);
						bm3.drawLCircleTable(cxt[7]);
						//bm4.drawLCircleTable(cxt[7]);
					}, 10);
					setTimeout(function () {
						clearInterval(timer);
					},5000)
			}else{
				//agent_dashboard html add
				var bm0 = new DbPicTable();
				bm0.setDBData('Case', this.removeDot(data['CASES'].fullyear), this.removeDot(data['CASES'].num));

				var bm1 = new DbPicTable();
				bm1.setDBData('Case Size FYC', this.removeDot(data['CASESIZEFYC'].fullyear), this.removeDot(data['CASESIZEFYC'].num));
				var bm2 = new DbPicTable();
				bm2.setDBData('Case Size FYP', this.removeDot(data['CASESIZEFYP'].fullyear), this.removeDot(data['CASESIZEFYP'].num));
				//var bm3 = new DbPicTable();
				//bm3.setDBData('Case Size ANP', this.removeDot(data['CASESIZEANP'].fullyear), this.removeDot(data['CASESIZEANP'].num));

				var timer = setInterval(function () {
					top.drawHalfCircle(cxt[0]);
					top1.drawHalfCircle(cxt[1]);
					top2.drawHalfCircle(cxt[2]);
					bm0.drawCircleTable(cxt[3]);
					bm1.drawCircleTable(cxt[4]);
					bm2.drawCircleTable(cxt[5]);
					//bm3.drawCircleTable(cxt[6]);
				}, 10);
				setTimeout(function () {
					clearInterval(timer);
				},5000)
			}
		},
		getAngles:function(){
			var num = $(".circle_num");
			var full = $(".circle_mark");
			var angles = [];
			for(var i=0;i < num.length;i++){
				var angle = parseFloat(num.eq(i).text())/parseFloat(full.eq(i).text());
				angle = angle * 185-100;
				angle = angle>155?155:angle;
				if(!angle){
					angle = -100;
				}
				angles.push(angle);
			}

		    return angles;
		},
		numType:function(str){

			var arr = str.split(',');
			var strs='';
			for(var i=0;i<arr.length;i++){
				strs += arr[i];
			}
			return parseInt(strs);
		},
		removeDot: function(str){
			var ret = "";
			if(str){
				ret = str.replace(/,/g,"");
			}
			return ret;
		},
		changeDash:function(){
			var tab = 1;
			$(".dash_change").click(function(){
				if(tab){
					$(this).css("background-color","black");
					$(".circle_bar div").css("opacity","1");
					$(".circle_bar div:nth-child(1)").css("background-color","rgb(163,45,74)");
					$(".circle_bar div:nth-child(2)").css("background-color","rgb(65,163,137)");
					$(".circle_bar div:nth-child(3)").css("background-color","rgb(17,79,192)");

					tab = 0;
				}else{
					$(".circle_bar div").css("opacity","0");
					$(this).css("background-color","rgb(187,55,58)");
					$(".circle_bar div").css("background-color","#fff");
					tab = 1;
				}
			});
		}
	}
});
