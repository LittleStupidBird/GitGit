document.oncontextmenu=new Function('event.returnValue=false;');
document.onselectstart=new Function('event.returnValue=false;');
var sum =0;
var monthlyRestore;
var activityRestore;
var BP = {
	dataDashboard:null,
	dataProduct:null,
	dataMonthly:null,
	dataActivity:null,
	dataActChild:null,
	dataMdrt:null,
	dataDrill:null,
	dataCA:null,
	dataGA:null,
	dataGCA:null,
	dataPopup:null,
	dataPopupDashboard:null,
	dataPopupMonthly:null,
	dataPopupProduct:null,
	dataPopupActivity:null,
	dataPopupCA:null,
	languageType:"th",
	language:null,

	getDashboardData:function(data){
		this.dataDashboard = data;
	},
	getProductData: function (data) {
		this.dataProduct = data;
	},
	getMonthlyData: function (data) {
		this.dataMonthly = data;
	},
	getActivityData: function (data) {
		activityRestore = 1;
		this.dataActivity = data;
	},
	getActChildData: function (data) {
		this.dataActChild = data;
	},
	getMdrtData: function (data) {
		this.dataMdrt = data;
	},
	getDrilldownData: function (data) {
		this.dataDrill = data;
	},
	getCAData: function (data) {
		this.dataCA = data;
	},
	getGAData: function (data) {
		this.dataGA = data;
	},
	getGCAData: function (data) {
		this.dataGCA = data;
	},
	getPopupData: function (data) {
		this.dataPopup = data;
	},
	getPopupDashboardData: function (data) {
		this.dataPopupDashboard = data;
	},
	getPopupMonthlyData: function (data) {
		this.dataPopupMonthly = data;
		monthlyRestore = 1;
	},
	getPopupProductData: function (data) {
		this.dataPopupProduct = data;
	},
	getPopupActivityData: function (data) {
		this.dataPopupActivity = data;
	},
	getPopupCAData: function (data) {
		this.dataPopupCA = data;
	},
	setLanguageType: function (type) {
		this.languageType = type;
	},
	valueToInt:function(str){
		if(str == null || str == "" || str == "undefiend"){
			return 0;
		}
		str = str.replace(/[,]/g, "");
		return parseInt(str);
	},
	formatMoney:function(number) {
		if(number === "" || number === null || number == undefined) {
			return "";
		}
		if(number.toString().indexOf(",") > 0){
			number = number.replace(/,/g,"");
		}

		var formatNumber = Math.abs(number);
		//console.log("formatNumber : " + formatNumber);
		var ch = "";
		if(number < 0) {
			ch = "-"
		}
		
		var rg = /(\d{1,3})(?=(?:\d{3})+(?!\d))/g;
		if(formatNumber < 1000000) {
			//小于7位数字：保留原数字，去掉小数点
			return ch + (formatNumber.toString().split(".")[0]).replace(rg,'$1,');
		} else if(formatNumber >= 1000000 && formatNumber < 100000000) {
			//大于等于7位数字，小于9位数字：去掉后三位数字和小数点，用K代替
			formatNumber = ((formatNumber.toString().split(".")[0]/1000).toString().split(".")[0]).replace(rg,'$1,');
			return ch + formatNumber + "K";
		} else if(formatNumber >= 100000000 && formatNumber < 10000000000) {
			//大于等于9位数字，小于11位数字：去掉后四位数字，用M表示，保留两位小数
			var arr = (formatNumber/1000000).toString().split(".");
			if(arr.length > 1){
				formatNumber = arr[0].replace(rg,'$1,') + "." + arr[1].substring(0,2);
			}else{
				formatNumber = arr[0].replace(rg,'$1,') + ".00";
			}
			return ch + formatNumber + "M";
		} else if(formatNumber >= 10000000000) {
			//大于11位数字，去掉后六位，用M表示
			var realNumber = Math.round(formatNumber/1000000).toString();
			formatNumber = (formatNumber/1000000).toString().split(".")[0];
			
			if(realNumber.indexOf('e+')>0){
				formatNumber = realNumber.substring(0,realNumber.indexOf('.')+3) + "e+" + realNumber.split("e+")[1];
				// return ch + formatNumber + "M";
			}
			return ch + formatNumber.replace(rg,'$1,') + "M";
		}
	},
	getDataPercentage: function(actual,vsGoal){
		if(vsGoal == "" || vsGoal == null){
			return "";
		}
		var ret;
		ret = vsGoal/(actual - vsGoal);
		return ret;
	},
	turnToPercentage: function(val){
		if(val === "" || val == null || val == "Null" || val == "null"){
			return "";
		}

		val = val * 100;

		return val;
	},
	//保留指定位小数
	keepDecimal:function(val,num){
		var ret = 0;
		var flag = false;
		var valueFlag = false;
		try{
			if(val == "-"){
				return val;
			}
			if(val === "" || val == null || val == "NULL"){
				return "";
			}

			val = val.toString();
			if(val.indexOf("%")>=0){
				flag = true;
			}
			if(val.toString().indexOf(",") > 0){
				val = val.replace(/,/g,"");
			}
			if(val.indexOf("-") == 0){
				valueFlag = true;
				val = val.replace(/-/g,"");
			}

			val = parseFloat(val);
			ret = this.accurateCalculate(val,num);

			if(valueFlag && ret != 0){
				ret = "-" + ret;
			}
			if(flag){
				ret += "%";
			}
			//增加逗号
			ret = this.addCommas(ret);
		}catch(e){
			console.log(e.message);
		}

		return ret.toString();
	},
	//保留指定位小数,并保留一位小数，不四舍五入，直接舍去
	keepOneDecimal:function(val,num){
		var ret = 0;
		var flag = false;
		var valueFlag = false;
		try{
			if(val == "-"){
				return val;
			}
			if(val === "" || val == null || val == "NULL"|| val == "null"){
				return "";
			}

			val = val.toString();
			if(val.indexOf("%")>=0){
				flag = true;
			}
			if(val.toString().indexOf(",") > 0){
				val = val.replace(/,/g,"");
			}
			if(val.indexOf("-") == 0){
				valueFlag = true;
				val = val.replace(/-/g,"");
			}

			val = parseFloat(val).toString();
			if(val.lastIndexOf('.') >=0){
				val = val.substring(0,val.lastIndexOf('.')+2);
			}

			ret = this.accurateCalculate(val,num);

			if(valueFlag && ret != 0){
				ret = "-" + ret;
			}
			if(flag){
				ret += "%";
			}
			//增加逗号
			ret = this.addCommas(ret);
		}catch(e){
			console.log(e.message);
		}

		return ret.toString();
	},
	//如果值不为>999 则显示+，否则显示>999%
	keepDecimalLimitGrowth:function(val,num){
		var ret = this.keepDecimalLimit(val,num);
		
		if((ret != ">999")){
			if(parseFloat(ret)>0){
				ret = "+" + ret;
			}
		}

		return ret;
	},
	//保留指定位小数,并对百分比做限制，大于999%，显示>999%,小于-999%，显示<-999%
	keepDecimalLimit:function(val,num){
		var ret = 0;
		var flag = false;
		var valueFlag = false;
		try{
			if(val == "-"){
				return val;
			}
			if(val === "" || val == null || val == "NULL" || val == "null"){
				return "";
			}

			val = val.toString();
			if(val.indexOf("%")>=0){
				flag = true;
			}
			if(val.toString().indexOf(",") > 0){
				val = val.replace(/,/g,"");
			}
			if(val.indexOf("-") == 0){
				valueFlag = true;
				val = val.replace(/-/g,"");
			}

			val = parseFloat(val);
			ret = this.accurateCalculate(val,num);
			
			if(valueFlag && ret != 0){
				ret = "-" + ret;
			}

			//limit
			if(ret > 999){
				ret = ">999";
			}else if(ret < -999){
				ret = "<-999";
			}

			if(flag){
				ret += "%";
			}
			//增加逗号
			// ret = this.addCommas(ret);
		}catch(e){
			console.log(e.message);
		}

		return ret.toString();
	},

	//实现精度统一
	accurateCalculate: function(v,s){ 
		changenum=(parseInt(v * Math.pow( 10, s ) + 0.5)/ Math.pow( 10, s )).toString(); 
		index=changenum.indexOf(".");

		if(index<0&&s>0){
			changenum=changenum+"."; 
			for(i=0;i<s;i++){ 
				changenum=changenum+"0"; 
			} 
		}else { 
			index=changenum.length-index; 
			for(i=0;i<(s-index)+1;i++){ 
				changenum=changenum+"0"; 
			} 
		} 

		return changenum; 
	},

	//增加逗号
	addCommas: function(nStr){
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }
};
