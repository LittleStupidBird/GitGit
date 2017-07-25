
var Agent = function(){
    this.DB_STA = 1;
    this.M_STA = 1;
    this.P_STA = 1;
    this.A_STA = 1;
    this.CA_STA = 1;
    this.G_STA = 1;
    this.sel_code = [];
    this.dashboardData = "";
    this.monthlyData = "";
    this.productData = "";
    this.activityData = "";
    this.mdrtData = "";
    this.goalsettingData = "";
    this.saveGSData = '';
};

Agent.prototype.getDashboardData = function (data) {
    this.dashboardData = data;
};
Agent.prototype.getmonthlyData = function (data) {
    this.monthlyData = data;
};
Agent.prototype.getProductData = function (data) {
    this.productData = data;
};
Agent.prototype.getActivityData = function (data) {
    this.activityData = data;
};
Agent.prototype.getMdrtData = function (data) {
    this.mdrtData = data;
};
Agent.prototype.getGoalsettingData = function (data) {
    this.goalsettingData = data;
};
Agent.prototype.updateDashboard = function(){
    //loading times
    if(!this.DB_STA){
        return;
    }
    var data = $.parseJSON(this.dashboardData);
    this.sel_code = [];

    for(var i in data){
        if(data[i] != null){
            this.sel_code.push(i);
        }
    }
    if(this.sel_code.length>1){
        var select = "";
        for(var i=0;i<this.sel_code.length;i++){
            if(this.sel_code[i]=="agency"){
                select += '<option selected>'+this.sel_code[i]+'</option>';
            }else{
                select += '<option>'+this.sel_code[i]+'</option>';
            }
        }
        $("#sel").append(select);
    }

    var obj={};
    obj.val = data[this.sel_code[0]];
    var render = tppl($("#dashboard-tmpl").html());
    var html = render(obj);
    $("#dashboard .content").append(html);

    var angleObj = this.getAngles(data);
    this.rotateFunc(angleObj[0]);

    var rotateFunc = this.rotateFunc;
    $("#sel").change(function(){
        var val = $(this).val();
        var index = $(this).get(0).selectedIndex;
        obj.val = data[val];
        $("#tmpl1").remove();

        var html = render(obj);
        $("#dashboard .content").append(html);
        rotateFunc(angleObj[index]);
    });
    this.DB_STA = 0;
};
Agent.prototype.updateMonthly = function () {
    if(!this.M_STA){
        return;
    }
    var data = $.parseJSON(this.monthlyData);
    var code = [];
    for(var i in data){
        code.push(data[i]);
    }
    var obj = {};
    obj.val = code[0].FYC;//json
    var render = tppl($("#monthly-tmpl").html());
    var html = render(obj.val);
    $("#monthly .content").append(html);
    this.M_STA = 0;
};
Agent.prototype.updateProduct = function () {
    var data = $.parseJSON(this.productData);
    var code = [];
    for(var i in data){
        code.push(i);
    }

    var obj = {};
    obj.val = data[code[0]].FYC;//json
    var render = tppl($("#product-tmpl").html());
    var html = render(obj.val);
    $("#by_product .content").append(html);
    $("#by_product .by_product_btn a").bind("click", function () {
        $("#by_product_tb").remove();
        var text = $(this).text();
        obj.val = data[code[0]][text];
        html = render(obj.val);
        $("#by_product .content").append(html);
    })
};
Agent.prototype.updateGoalsetting = function () {
    if(!this.G_STA){
        return;
    }
    var data = $.parseJSON(this.goalsettingData);
    this.sel_code = [];
    for(var i in data){
        if(data[i] != null){
            this.sel_code.push(i);
        }
    }
    if(this.sel_code.length>1){
        var select = "";
        for(var i=0;i<this.sel_code.length;i++){
            if(this.sel_code[i]=="agency"){
                select += '<option selected>'+this.sel_code[i]+'</option>';
            }else if(this.sel_code[i]!="agent"){
                select += '<option>'+this.sel_code[i]+'</option>';
            }
        }
        $("#sel-goal").append(select);
    }
    var obj = {};
    obj.val = data[this.sel_code[0]];
    var render = tppl($("#goalsetting-tmpl").html());
    var html = render(obj.val);
    $("#goal_setting .content").append(html);
    $("#sel-goal").change(function () {
        $("#goal_setting .title").text("My Agency");
        var val = $(this).val();
        obj.val = data[val];
        $("#goal-tmpl").remove();
        var html = render(obj.val);
        $("#goal_setting .content").append(html);
        $.mobile.pageContainer.trigger("create");
        //$("#goal_setting .title").css("top","85px");
        //$("#sel-goal").css("position","absolute");
        //$("#sel-goal").css("top","-97px");
        //$("#sel-goal").css("right","10px");
        //$("#goal_setting .ui-page").css("background-color","#fff");
        //$("#goal_setting").html(content).trigger('create')
    });

    this.G_STA = 0;
};
Agent.prototype.updateGoalmeData = function () {
    var data = $.parseJSON(this.goalsettingData);
    var render = tppl($("#goalme-tmpl").html());
    var html = render(data.agent);
    $("#goal_me .content").append(html);
};
Agent.prototype.saveGoalsettingData = function () {
    var data = {};
    var val = $("#goal_setting .goal_tb tr:nth-child(2) input");
    var key = $("#goal_setting .goal_tb tr:nth-child(2) span");
    for(var i=0;i<val.length;i++){
        data[key.eq(i).text()] = val.eq(i).val();
    }
    data = JSON.stringify(data);

    return data;
};

Agent.prototype.getAngles = function (data) {
    var anglsObj = [];
    for(var i in data){
        var angles = [];
        if(data[i] != null){
            for(var j in data[i]){
                var num = data[i][j].num;
                var fullyear = data[i][j].fullyear;
                var angle = 9000*num/fullyear;
                angles.push(angle);
            }
        }
        anglsObj.push(angles);
    }
    return anglsObj;
};
Agent.prototype.rotateFunc = function (angles) {
    var i=0;
    $(".needle").each(function(){
        $(this).rotate({
            angle: -110,
            duration: 6000,
            animateTo: angles[i++],
            callback: function(){
            }
        });
    });
};

function sendURL(url) {
    var iFrame;
    iFrame = document.createElement("iframe");
    iFrame.setAttribute("src", url);
    iFrame.setAttribute("style", "display:none;");
    iFrame.setAttribute("height", "0px");
    iFrame.setAttribute("width", "0px");
    iFrame.setAttribute("frameborder", "0");
    document.body.appendChild(iFrame);
    iFrame.parentNode.removeChild(iFrame);
    iFrame = null;
}