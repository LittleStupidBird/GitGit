var WIDTH = 300;
var HEIGHT = 220;
var DbPicTable = function(){
    this.x = 120;
    this.y = 150;
    this.r = 80;
    this.w = 18;
    this.bgcolor = '#dbdad4';
    this.prcolor = '#46d3bd';
    this.fontColor = '#554344';
    this.pointerLen = 100;

    this.name = null;
    this.goal = null;
    this.now = null;

    this.tag = 0;
};
DbPicTable.prototype.setDBData = function(name,goal,now){
    this.name = name;
    this.goal = goal;
    this.now = now;
};
DbPicTable.prototype.setStyle = function(obj){
    this.x = obj.x || 150;
    this.y = obj.y || 150;
    this.r = obj.r || 80;
    this.w = obj.w || 18;
    this.bgcolor = obj.bgcolor || '#dbdad4';
    this.prcolor = obj.prcolor || '#e86487';
    this.pointerLen = obj.pointerLen || 88;
};
DbPicTable.prototype.drawDashLine = function(cxt,x1,y1,x2,y2,dashLength){
    var xpos = x2 - x1;
    var ypos = y2 - y1;
    var numDashes = Math.floor(Math.sqrt(xpos*xpos + ypos*ypos)/dashLength);
    for(var i=0;i<numDashes;i++){
        if(i%2 == 0){
            cxt.moveTo(x1 + (xpos/numDashes) * i, y1 + (ypos/numDashes) * i);
        }else{
            cxt.lineTo(x1 + (xpos/numDashes) * i, y1 + (ypos/numDashes) * i);
        }
    }
};
DbPicTable.prototype.drawCircle = function(cxt,r,starAngle,endAngle,w,color){
    cxt.save();
    cxt.lineWidth = w;

    cxt.strokeStyle = color;
    cxt.beginPath();
    cxt.arc(this.x,this.y,r,starAngle,endAngle,false);
    cxt.stroke();
    cxt.closePath();
    cxt.restore();
};
DbPicTable.prototype.drawText = function(cxt,data,x,y,size){
    cxt.save();
    cxt.font = size + "px Itc md";
    cxt.fillStyle = this.fontColor; 
    cxt.textAlign = "center";
    cxt.textBaseline = 'middle';
    cxt.fillText(data,x,y);
    cxt.restore();
};
DbPicTable.prototype.drawHalfCircle = function(cxt){
    cxt.clearRect(0,0,WIDTH,HEIGHT);
    this.drawCircle(cxt,this.r,Math.PI,0,this.w,this.bgcolor);
    this.drawCircle(cxt,this.r/8,0,Math.PI*2,this.w/15,this.bgcolor);

    var angle = this.now/this.goal*Math.PI/4*3;
    angle = angle>=Math.PI?Math.PI:angle;
    if(this.tag < angle){
        this.tag += 0.05;
    }

    this.drawCircle(cxt,this.r,Math.PI,Math.PI+this.tag,this.w,this.prcolor);
    //pointer
    this.drawCircle(cxt,0.1,Math.PI,Math.PI*2,10,"#d31145");
    this.drawPointer(cxt,this.x,this.y,this.tag,"#d31145");
    //goal
    var gx = (this.pointerLen+120)*Math.cos(Math.PI/3);
    var gy = -(this.pointerLen+50)*Math.sin(Math.PI/3);
    cxt.save();
    cxt.translate(this.x,this.y);
    cxt.font = "15px Itc md";
    cxt.textAlign = "center";
    cxt.textBaseline = 'middle';
    cxt.fillStyle = this.fontColor; 
    cxt.fillText(BP.formatMoney(this.goal),gx,gy+6);

    cxt.font = "12px Itc md";
    cxt.fillText(BP.language.FULL_YEAR,gx,gy+24);
    cxt.fillText('0',-this.r-40,10);
    cxt.restore();

    //mark
    cxt.save();
    cxt.beginPath();
    cxt.translate(this.x,this.y);
    cxt.lineWidth = 0.02;
    cxt.rotate(Math.PI*3/4);
    cxt.strokeStyle = "#d31145";
    cxt.moveTo(-gx+15,0);
    cxt.lineTo(-gx-15,-5);
    cxt.lineTo(-gx+15,-5);
    cxt.fillStyle = "#d31145";
    cxt.fill();
    cxt.arc(-gx+15,-2.5,2.5,-gx+20,5,false);
    cxt.fill();
    cxt.closePath();
    cxt.stroke();
    cxt.restore();

    //nowdata
    this.drawText(cxt,BP.formatMoney(this.now),this.x,this.y+30,24);
    //type
    this.drawText(cxt,this.name,this.x,this.y+55,20);
};
DbPicTable.prototype.drawCircleTable = function(cxt){
    cxt.clearRect(0,0,WIDTH,HEIGHT);

    var x = this.x;
    var y = this.y;
    var r = this.r;
    var w = this.w;

    var angle = this.now/this.goal*Math.PI;
    angle = angle>Math.PI*4/3?Math.PI*4/3:angle;
    if(this.tag < angle){
        this.tag += 0.05;
    }

    //bg
    cxt.lineCap = 'round';
    this.drawCircle(cxt,this.r,Math.PI*5/6,Math.PI/6,this.w,this.bgcolor);
    //pr
    this.drawCircle(cxt,this.r,Math.PI*5/6,Math.PI*5/6+this.tag,this.w,this.prcolor);
    //num
    cxt.save();
    cxt.font = "24px Itc md";
    cxt.textAlign = "center";
    cxt.textBaseline = 'middle';
    cxt.fillStyle = this.fontColor; 
    
    if(this.name == "Case"){
        cxt.fillText(BP.keepDecimal(this.now,1),x,y);
    }else{
        cxt.fillText(BP.formatMoney(this.now),x,y);
    }
    //cxt.fillText(BP.formatMoney(this.now),x,y);
    cxt.font = "15px Itc md";
    // cxt.fillText(this.name,x,y+30);
    //if(this.name == "Avg.Active Agent"){
        //cxt.fillText(this.name.replace(" Agent",''),x,y+20);
        //cxt.fillText("Agent",x,y+40);
    //}else if(this.name == "Case/Avg.Active Agent"){
        //cxt.fillText(this.name.replace("Active Agent",''),x,y+20);
        //cxt.fillText("Active Agent",x-2,y+40);
    //}else{
        cxt.fillText(this.name,x,y+30);
    //}
    cxt.restore();

    //goal
    var gx = (this.pointerLen+20)*Math.cos(Math.PI/6);
    var gy = -(this.pointerLen+50)*Math.sin(Math.PI/6);
    cxt.save();
    cxt.translate(x,y);
    cxt.font = "15px Itc md";
    cxt.textAlign = "center";
    cxt.textBaseline = 'middle';
    cxt.fillStyle = this.fontColor; 

    if(this.name == "Case"){
        cxt.fillText(BP.keepDecimal(this.goal,1),gx,gy);
   }else{
        cxt.fillText(BP.formatMoney(this.goal),gx,gy);
   }
    cxt.font = "12px Itc md";
    cxt.fillText(BP.language.FULL_YEAR,gx,gy+18);
    cxt.fillText('0',-r-10,40);
    cxt.restore();

    //mark
    cxt.save();
    cxt.beginPath();
    cxt.translate(x,y);
    cxt.lineWidth = 2;
    cxt.rotate(Math.PI*6/7);
//    this.drawDashLine(cxt,-gx,0,-gx+30,0,3);
    cxt.strokeStyle = "#158d7a";
    cxt.moveTo(-gx+30,5);
    cxt.lineTo(-gx+15,5);
    cxt.lineTo(-gx+30,0);
    cxt.fillStyle = "#158d7a";
    cxt.fill();
    cxt.closePath();
    cxt.arc(-gx+30,2.5,2.5,-gx+20,15,false);
    cxt.fill();
    cxt.stroke();
    cxt.restore();
};

DbPicTable.prototype.drawLCircleTable = function(cxt){
    cxt.clearRect(0,0,WIDTH,HEIGHT);

    var x = this.x;
    var y = this.y;
    var r = this.r;
    var w = this.w;

    var angle = this.now/this.goal*Math.PI;
    angle = angle>Math.PI*4/3?Math.PI*4/3:angle;
    if(this.tag < angle){
        this.tag += 0.05;
    }

    //bg
    cxt.lineCap = 'round';
    this.drawCircle(cxt,this.r-10,Math.PI*5/6,Math.PI/6,this.w,this.bgcolor);
    //pr
    this.drawCircle(cxt,this.r-10,Math.PI*5/6,Math.PI*5/6+this.tag,this.w,this.prcolor);
    //num
    cxt.save();
    cxt.font = "24px Itc md";
    cxt.textAlign = "center";
    cxt.textBaseline = 'middle';
    cxt.fillStyle = this.fontColor; 
    if(this.name == "Case/Avg.Active Agent"){
        cxt.fillText(this.now,x,y);
    }else{
        cxt.fillText(BP.formatMoney(this.now),x,y);
    }
    cxt.font = "15px Itc md";

    if(this.name == "Avg.Active Agent"){
        cxt.fillText(this.name.replace(" Agent",''),x,y+20);
        cxt.fillText("Agent",x,y+40);
    }else if(this.name == "Case/Avg.Active Agent"){
        cxt.fillText(this.name.replace("Active Agent",''),x,y+20);
        cxt.fillText("Active Agent",x-2,y+40);
    }else if(this.name == "Active New Agents"){
        cxt.fillText(this.name.replace("New Agents",''),x,y+20);
        cxt.fillText("New Agents",x-2,y+40);
    }else{
    	cxt.fillText(this.name,x,y+30);
    }
    cxt.restore();

    //goal
    var gx = (this.pointerLen+10)*Math.cos(Math.PI/6);
    var gy = -(this.pointerLen+50)*Math.sin(Math.PI/6);
    cxt.save();
    cxt.translate(x,y);
    cxt.font = "15px Itc md";
    cxt.textAlign = "center";
    cxt.textBaseline = 'middle';
    cxt.fillStyle = this.fontColor; 

    if(this.name == "Case/Avg.Active Agent"){
        cxt.fillText(this.goal,gx,gy);
    }else{
        cxt.fillText(BP.formatMoney(this.goal),gx,gy);
    }

    cxt.font = "12px Itc md";
    cxt.fillText(BP.language.FULL_YEAR,gx,gy+18);
    cxt.fillText('0',-r,40);
    cxt.restore();

    //mark
    cxt.save();
    cxt.beginPath();
    cxt.translate(x,y);
    cxt.lineWidth = 2;
    cxt.rotate(Math.PI*6/7);
//    this.drawDashLine(cxt,-gx,0,-gx+30,0,3);
    cxt.strokeStyle = "#158d7a";
    cxt.moveTo(-gx+30,5);
    cxt.lineTo(-gx+15,5);
    cxt.lineTo(-gx+30,0);
    cxt.fillStyle = "#158d7a";
    cxt.fill();
    cxt.arc(-gx+30,2.5,2.5,-gx+20,15,false);
    cxt.fill();
    cxt.closePath();
    cxt.stroke();
    cxt.restore();
};

DbPicTable.prototype.drawPointer = function(cxt,x,y,tag,color){
    cxt.save();
    cxt.translate(x,y);
    cxt.rotate(tag);

    cxt.strokeStyle = color;
    cxt.beginPath();
    cxt.moveTo(0,5);
    cxt.lineTo(-(this.pointerLen+35),0);
    cxt.lineTo(0,-5);
    cxt.lineTo(0,0);
    cxt.fillStyle = color;
    cxt.fill();
    cxt.stroke();
    cxt.closePath();
    cxt.restore();
};