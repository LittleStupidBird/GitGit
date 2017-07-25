
// var _dataGA = '{"Prospects":{"Weekly":"14","Monthly":"60","Yearly":"720","Planned":"18","Average":"10"},"Fact Finds":{"Weekly":"4","Monthly":"16","Yearly":"192","Planned":"4","Average":"3"},"Closing":{"Weekly":"2","Monthly":"8","Yearly":"96","Planned":"2","Average":"1"},"Sales":{"Weekly":"1","Monthly":"4","Yearly":"1.1","Planned":"1.0","Average":"1"}}';
// BP.getGAData(_dataGA);
define(['jquery','iframe','tppl','animate'], function ($,iframe,t,animate) {
    return {
        GAData:null,
        getGAData: function (data) {
            this.GAData = data;
        },
        updateGAData: function () {
            var data = $.parseJSON(this.GAData);
            //when Sales yearly null default 0
            if(isNaN(data.Sales.Yearly)){
                data.Sales.Yearly = 0;
            }
            var obj = {};
            obj.val = data;
            var render = tppl($("#goal_activity-tmpl").html());
            var html = render(obj);
            $("#activity_goals").append(html);
            this.moveChange();
            this.changeData();
            this.uploadData();
			animate.triAnimate();
			var cur = this;
			$(".ga-input-btn").click(function() {
				cur.subData(this);
			});
			$(".ga-input-btn-1").click(function() {
				cur.addData(this);
			});
        },
        moveChange: function () {
            var range = $('table input');
            var content = this;
            range.each(function(){
                $(this).change(function(){
                    $(this).parent().parent().prev().text($(this).val());
                    content.changeData();
                    content.uploadData();
                })
            })
        },
        uploadData: function(){
                    var tds = document.getElementsByTagName('td');
                    var arr_0 = Math.ceil(this.valueToFloat(tds['0'].innerHTML)) + '';
                    var arr_1 = Math.ceil(this.valueToFloat(tds['1'].innerHTML)) + '';
                    var arr_2 = Math.ceil(this.valueToFloat(tds['2'].innerHTML)) + '';
                    var arr_3 = Math.ceil(this.valueToFloat(tds['3'].innerHTML)) + '';
                    var arr_4 = Math.ceil(this.valueToFloat(tds['5'].innerHTML)) + '';
                    var arr_5 = Math.ceil(this.valueToFloat(tds['6'].innerHTML)) + '';
                    var arr_6 = Math.ceil(this.valueToFloat(tds['7'].innerHTML)) + '';
                    var arr_7 = Math.ceil(this.valueToFloat(tds['8'].innerHTML)) + '';
                    var arr_8 = Math.ceil(this.valueToFloat(tds['10'].innerHTML)) + '';
                    var arr_9 = Math.ceil(this.valueToFloat(tds['11'].innerHTML)) + '';
                    var arr_10 = Math.ceil(this.valueToFloat(tds['12'].innerHTML)) + '';
                    var arr_11 = Math.ceil(this.valueToFloat(tds['13'].innerHTML)) + '';
                    var arr_12 = Math.ceil(this.valueToFloat(tds['15'].innerHTML)) + '';
                    var arr_13 = Math.ceil(this.valueToFloat(tds['16'].innerHTML)) + '';
                    var arr_14 = Math.ceil(this.valueToFloat(tds['17'].innerHTML)) + '';
                    var arr_15 = Math.ceil(this.valueToFloat(tds['18'].innerHTML)) + '';
                    
                    iframe.loadURL('activity:'+arr_0+':'+arr_1+':'+arr_2+':'+arr_3+':'+arr_4+':'+arr_5+':'+arr_6+':'+arr_7+':'+arr_8+':'+arr_9+':'+arr_10+':'+arr_11+':'+arr_12+':'+arr_13+':'+arr_14+':'+arr_15);
        },
        changeData: function(){
            var tds = document.getElementsByTagName('td');

            tds['17'].innerHTML = BP.addCommas(Math.ceil(this.valueToFloat(tds['17'].innerText)));
            tds['2'].innerHTML = BP.addCommas(Math.ceil(this.valueToFloat(tds['3'].innerText) * this.valueToFloat(tds['17'].innerText)));
            tds['0'].innerHTML = BP.addCommas(Math.ceil(this.valueToFloat(tds['2'].innerText)/52));
            tds['1'].innerHTML = BP.addCommas(Math.ceil(this.valueToFloat(tds['2'].innerText)/12));
            tds['7'].innerHTML = BP.addCommas(Math.ceil(this.valueToFloat(tds['8'].innerText) * this.valueToFloat(tds['17'].innerText)));
            tds['5'].innerHTML = BP.addCommas(Math.ceil(this.valueToFloat(tds['7'].innerText)/52));
            tds['6'].innerHTML = BP.addCommas(Math.ceil(this.valueToFloat(tds['7'].innerText)/12));
            tds['12'].innerHTML = BP.addCommas(Math.ceil(this.valueToFloat(tds['13'].innerText) * this.valueToFloat(tds['17'].innerText)));
            tds['10'].innerHTML = BP.addCommas(Math.ceil(this.valueToFloat(tds['12'].innerText)/52));
            tds['11'].innerHTML = BP.addCommas(Math.ceil(this.valueToFloat(tds['12'].innerText)/12));
            
            tds['15'].innerHTML = BP.addCommas(Math.ceil(this.valueToFloat(tds['17'].innerText)/52));
            tds['16'].innerHTML = BP.addCommas(Math.ceil(this.valueToFloat(tds['17'].innerText)/12));

            tds['3'].innerHTML = Math.ceil(this.valueToFloat(tds['3'].innerText));
            tds['8'].innerHTML = Math.ceil(this.valueToFloat(tds['8'].innerText));
            tds['13'].innerHTML = Math.ceil(this.valueToFloat(tds['13'].innerText));
            tds['18'].innerHTML = Math.ceil(this.valueToFloat(tds['18'].innerText));
        },
        valueToFloat:function(str){
            if(str == null || str == "" || str == "undefiend"){
                return 0;
            }
            str = str.replace(/[,]/g, "");
            return parseFloat(str);
        },
		
		subData:function(obj,num) {
			if(num == undefined) {
				num = 1;
			}
			$("input", $(obj).next(".ga-input")).val(parseInt($("input", $(obj).next(".ga-input")).val()) - num);
			$("input", $(obj).next(".ga-input")).change();
		},
		
		addData:function(obj,num) {
			if(num == undefined) {
				num = 1;
			}
			$("input", $(obj).prev(".ga-input")).val(parseInt($("input", $(obj).prev(".ga-input")).val()) + num);
			$("input", $(obj).prev(".ga-input")).change();
		}
    }
});