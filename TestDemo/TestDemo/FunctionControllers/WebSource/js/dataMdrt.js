//
//var dataMdrt = '[{"TOT": {"Current": "1", "Agents": "3"}, "COT": {"Current": "3", "Agents": "7"}, "MDRT": {"Current": "5", "Agents": "10"} }, {"FA Prime after 12 months": {"Agents": "", "ANP": "300000", "Cases": "3.1", "FYC": "250000", "FYP": "100000", "CaseSize": "", "CaseSizeFYP": "","CaseSizeANP": "", "ActiveAgents": "6"}, "Agent": {"Agents": "11", "ANP": "", "Cases": "", "FYC": "", "FYP": "", "CaseSize": "", "CaseSizeFYP": "", "ActiveAgents": ""}, "FA during 9 months": {"Agents": "", "ANP": "700000", "Cases": "3.1", "FYC": "30000", "FYP": "250000", "CaseSizeFYP": "", "CaseSize": "", "ActiveAgents": "9"}, "FA after 9 months": {"Agents": "", "ANP": "600000", "Cases": "3.1", "FYC": "25000", "CaseSizeFYP": "", "FYP": "100000", "CaseSize": "", "ActiveAgents": "6"}, "FA Prime during 12 months": {"Agents": "", "ANP": "400000", "Cases": "3.1", "FYC": "300000", "CaseSizeFYP": "", "FYP": "130000", "CaseSize": "", "ActiveAgents": "5"} } ]';
//BP.getMdrtData(dataMdrt);
define(['jquery','tppl','animate',"language"], function ($, t,animate,language) {
   
    return {
        mdrtData:null,
        getMdrtData: function (data) {
            this.mdrtData = data;
        },
        updateMdrtData: function () {
            language.changeLanguage();
        	
        	var dataMdrtModel = '[{"TOT": {"Current": "", "Agents": ""}, "COT": {"Current": "", "Agents": ""}, "MDRT": {"Current": "", "Agents": ""} }, {"FA Prime after 12 months": {"Agents": "", "ANP": "", "Cases": "", "FYC": "", "FYP": "", "CaseSize": "", "CaseSizeFYP": "", "CaseSizeANP": "", "ActiveAgents": ""}, "Agent": {"Agents": "", "ANP": "", "Cases": "", "FYC": "", "FYP": "", "CaseSize": "", "CaseSizeFYP": "", "ActiveAgents": ""}, "FA during 9 months": {"Agents": "", "ANP": "", "Cases": "", "FYC": "", "FYP": "", "CaseSizeFYP": "", "CaseSize": "", "ActiveAgents": ""}, "FA after 9 months": {"Agents": "", "ANP": "", "Cases": "", "FYC": "", "CaseSizeFYP": "", "FYP": "", "CaseSize": "", "ActiveAgents": ""}, "FA Prime during 12 months": {"Agents": "", "ANP": "", "Cases": "", "FYC": "", "CaseSizeFYP": "", "FYP": "", "CaseSize": "", "ActiveAgents": ""} } ]';
//            var data = $.parseJSON(dataMdrtModel);
            var data = $.extend(true,  {}, $.parseJSON(dataMdrtModel), $.parseJSON(this.mdrtData)); 
            var obj = {};
            
            obj.val = data;
            var render = tppl($("#mdrt-tmpl").html());
            var html = render(obj);
            
            $("#mdrt .content").append(html);

    		var bar = $('.progress-bar');
	   		$(bar).each(function(){
	   			var bar_max = $(this).attr('aria-valuemax');
	   			var bar_now = $(this).attr('aria-valuenow');
	   			var per = (bar_now/bar_max*100).toFixed(2);
	   			var percentage = per + '%';
	   			$(this).width(percentage);
	   		});
        }
    }
});