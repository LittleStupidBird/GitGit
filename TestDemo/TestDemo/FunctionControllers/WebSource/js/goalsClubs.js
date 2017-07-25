var flag = {"AgentsLivesClub":"","AnnualConvention":"","CareerAgent":""};
function initGC(data){
	if(data.ClubsAwards){
		addClubTitle();
		addClubContent(data.ClubsAwards);
	}
	if(data.career){
		addCareerTitle();
		addCareerContent(data.career);
	}
}

//add Clubs&Awards title
function addClubTitle(){
	$('.container').append(
		$('<table class="AG-target"><tr><td>Club&Awards</td><td>Target</td></tr></table>')
	);
}

//add Career Agent title
function addCareerTitle(){
	$('.container').append(
		$('<table class="AG-target"><tr><td>Career Agent</td><td>Target</td></tr></table>')
	);
}

//add Clubs&Awards content
function addClubContent(data){
	$.each(data, addClubTable);
}

//add Career Agent content
function addCareerContent(data){
	$.each(data, addCareerTable);
}

//add table to Clubs&Awards content
function addClubTable(idx, data){
	var downList = [];
	
	$.each(data, function(idx, obj){
		downList.push([idx,obj]);
	});

	if(downList.length < 1){
		return;
	}else{
		var sum = getSum(downList[0][1]);
		var selectId = replaceAll(idx);
		
		var table = '<table class="AG-table"><tr>'+
				    '<td rowspan="'+ sum +'" width="230">' +idx+ '</td>'+
				    '<td rowspan="'+ sum +'" width="150">'+
				        '<select id="'+ selectId +'"></select>'+
				    '</td>';
		
		table += '<td width="130" id="'+ selectId+'0'+'">'+ downList[0][1][0].keyType +'</td>'+
				    '<td id="'+ selectId+ '1' +'">'+ downList[0][1][0].keyValue +'</td>'+
				 '</tr>';
		
		for(var i=1; i<sum; i++){
			table += '<tr>'+
					    '<td width="130" id="'+ selectId+(2*i)+'">'+ downList[0][1][i].keyType +'</td>'+
					    '<td id="'+ selectId+(2*i+1)+'">'+ downList[0][1][i].keyValue +'</td>'+
					'</tr>';
		}
			    
		table += '</table>';
		
		$('.container').append(table);
		
		for(var i=0; i<downList.length; i++){
			var selected = downList[i][1][0]["select"];
			
			if(selected == "0"){
				$('#' + selectId).append("<option value='"+downList[i][1][0]["clubAwardsCode"]+"'>"+downList[i][0]+"</option>");
			}else{
				$('#' + selectId).append("<option selected='selected' value='"+downList[i][1][0]["clubAwardsCode"]+"'>"+downList[i][0]+"</option>");
			}
		}
		
		//init downlist's data to html
		changeData2Html(selectId, data);
		
		$('#' + selectId).change(function(val){
			changeData2Html(selectId, data);
			sendData();
		});
	}
}

//add table to Career Agent content
function addCareerTable(idx, data){
	var selectId = replaceAll(idx);
	var checked = data[0].select;

	var table = '<table class="AG-table" id="'+ selectId +'Table">'+
				    '<tbody>'+
				    '<tr>'+
				        '<td style="text-align: left;width:180px;">';
	if(checked == "1"){
		table += '<input id="'+ selectId +'"type="radio" name="agent" checked>'+ idx +'</td>'; 
		flag["CareerAgent"] = idx;
	}else{
		table += '<input  id="'+ selectId +'"type="radio" name="agent">'+ idx +'</td>'; 
	}
	
	data.sort(compare);
	for(var i=0; i<data.length; i++){
		table += '<td>'+ data[i].keyType+'</td>'; 
		table += '<td>'+ data[i].keyValue+'</td>'; 
	}
	
	table += '</tr></tbody></table>';
	
	$('.container').append(table);
	
	//listen on radio
//	$('#' + selectId).change(function(val){
//		flag["CareerAgent"] = idx;
//		sendData();
//	});
	
	$('#' + selectId + 'Table').click(function(val){
		$('#' + selectId + 'Table input' ).attr("checked",true);
		flag["CareerAgent"] = idx;
		sendData();
	});
}

//when you change the downList you will change the data to html
function changeData2Html(selectId, obj){
	var checkedValue = $('#' + selectId).val();
	var checkedText = $('#' + selectId).find("option:selected").text(); 
	flag[selectId] = checkedValue;

	var data = obj[checkedText];
	
	for(var i=0; i<data.length; i++){
		$('#' + selectId + (2*i)).text(data[i].keyType);
		$('#' + selectId + (2*i+1)).text(data[i].keyValue);
	}
}

//sum the object in data
function getSum(data){
	var sum = 0;
	$.each(data, function(){
		sum++;
	});

	return sum;
}

//replace all
function replaceAll(str){
	var ret = str.replace(/\ /g,"");
	ret = ret.replace(/\'/g,"");
	
	return ret;
}

function compare(data,next){
	return data.keyType.charCodeAt(0) - next.keyType.charCodeAt(0);
}

//send checked data back
function sendData(data){
	var ret = flag.AgentsLivesClub + ":" + flag.AnnualConvention + ":" + flag.CareerAgent;
	
    var iFrame;
    iFrame = document.createElement("iframe");
    iFrame.setAttribute("src", "clubaward:" + ret);
    iFrame.setAttribute("style", "display:none;");
    iFrame.setAttribute("height", "0px");
    iFrame.setAttribute("width", "0px");
    iFrame.setAttribute("frameborder", "0");
    document.body.appendChild(iFrame);
    iFrame.parentNode.removeChild(iFrame);
    iFrame = null;
}