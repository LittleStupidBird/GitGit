// var dataM = '{"kpiName":"Case","color":"1","label" : [    "Dec",    "Jan",    "Feb",    "Mar",    "Apr",    "May",    "Jun",    "Jul",    "Aug",    "Sep",    "Oct",    "Nov"  ],  "data" : {    "ACTUAL" : [      "9.123",      "7",      "7",      "7",      "7",      "7",      "",      "",      "",      "",      "",      ""    ],    "GOAL" : [      "49.9",      "49",      "49",      "49",      "49",      "49",      "0",      "0",      "0",      "0",      "0",      "0"    ]  }}';
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