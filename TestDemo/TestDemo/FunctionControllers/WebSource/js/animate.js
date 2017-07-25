define(['jquery','rotate','numType'],function($,rotate){
	return{
		circleAnimate:function(angles){
			$(function(){
				var needle = $(".needle");
				for(var i=0;i<needle.length;i++){
					needle.eq(i).rotate({
						angle:-100,
						duration:6000,
						animateTo:angles[i],
						callback:function(){
						}
					})
				}

			});
		},
		barAnimate: function () {
	   		
			$('.w_bar').each(function (val,e) {
				var move = $(this).find('.num_img').text()/$(this).find('.num').text()*300;
				move = move<300?move:300;
				$(this).find('.num_img').animate({
					left:move
				},1500);
				$(this).find('.t_bar').animate({
					width:move
				},5000);
			});
		},
		triAnimate: function () {
			$('.c_tag').each(function () {
				var fly = $(this).find('span').text()/$(this).find('input').attr('max')*100;
				$(this).find('span').animate({
					left:fly<167?fly:167
				},3000);
			})
		},

		caBarAnimate: function () {
			var span = $('.bar_char_span').find('span:first');
			var target = [];
			var paWidth = []

			target.push($(".bar_top span:last").text().split(',')[1]);

			var td = $("#clubs_awards_tb_mid tr").find('td:last');
			for(var i=0;i<td.length;i++){
				target.push(td.eq(i).text());
			}
			td = $("#clubs_awards_tb_btm tr").find('td:last');
			for(var i=0;i<td.length;i++){
				target.push(td.eq(i).text());
			}

			for(var i=0;i<span.length;i++){
				var data = span.eq(i).text().split(',')[1];
				paWidth.push(parseInt(data)/parseInt(target[i]));
			}
			var len = 0;
			$('.bar').each(function () {
				var allWidth = parseInt($(this).parent().css("width"));
				var nowWidth = allWidth * paWidth[len++];
				nowWidth = nowWidth<allWidth?nowWidth:allWidth;

				$(this).animate({
					width:nowWidth
				},3000);
			})
		}
	}
});