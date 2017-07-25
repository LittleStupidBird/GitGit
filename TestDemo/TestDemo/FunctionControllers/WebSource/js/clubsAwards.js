function addDiv(data){
    $.each(data, function(idx, obj) {
		addDiv2Html(idx, obj, data);
    });
}
function getHtml(id, data){
	var render = tppl($("#"+id).html());
	var html = render(data);
	
	return html;
}

function addBottomDiv(obj, data){
    $.each(obj, function(idx, item) {
		addDiv2Html(idx, item, data);
    });
} 

function addDiv2Html(idx, obj, data){
	var html = "";
	switch(idx){
		case "Top":
			if(!data["Top"]["MDRT Current Position"]){
				data["Top"]["MDRT Current Position"] = {};
				data["Top"]["MDRT Current Position"]["restValuePercent"] = "";
			}
			console.log(data);
			html = getHtml("ca-tmpl-top", data);
			$('#MDRT').append(html);
			break;
		case "Middle":
			html = getHtml("ca-tmpl-middle", data);
			$('#TopAgent').append(html);
			break;
		case "Bottom":
			addBottomDiv(obj, data);
			break;
		case "Agent's Lives Club":
			html = getHtml("ca-tmpl-bottom-club", data);
			$('#clubsAwards').append(html);
			break;
		case "Annual Convention":
			html = getHtml("ca-tmpl-bottom-convention", data);
			$('#clubsAwards').append(html);
			break;
		}
}