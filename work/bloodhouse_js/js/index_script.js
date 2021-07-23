$(function(){
	var interval=3000;
	$('#main2_banner').each(function(){
		var timer;
		var container=$(this);
		function swichImg(){
			var anchors=container.find('a');
			var first=anchors.eq(0);
			var second=anchors.eq(1);
			first.fadeOut().appendTo(container);
			second.fadeIn();
		};
		function startTimer(){
			timer=setInterval(swichImg,interval);
		};
		function stopTimer(){
			clearInterval(timer);
		};
		startTimer();
		container.hover(function(){
			stopTimer();
		},function(){
			startTimer();
		});
	});
	
	
	var current=0,
		slideTimer=setInterval(function(){
			var prev=$('#main_slide .slide_left li').eq(current);
			slideLeft(prev,0,'-100%');
			current++;
			if(current==5){current=0};
			var next=$('#main_slide .slide_left li').eq(current);
			slideLeft(next,'100%',0);
		},5000);
		
	function slideLeft(tg,start,end){
		tg.css('left',start).animate({'left':end},300,'swing');
		var btn=tg.parents('#main_slide').find('.slide_btn li');
		btn.removeClass('on');
		btn.eq(tg.index()).addClass('on');
	};
	var stopNum=0,
		stopBtn=$('#main_slide .slide_btn .btn_stop');
	stopBtn.click(function(){
		if(stopNum==0){
			clearInterval(slideTimer);
			stopBtn.find('a img').attr('src',stopBtn.find('a img').attr('src').replace('stop','play'));
			stopNum++;
		}else if(stopNum==1){
			slideTimer=setInterval(function(){
				var prev=$('#main_slide .slide_left li').eq(current);
				slideLeft(prev,0,'-100%');
				current++;
				if(current==5){current=0};
				var next=$('#main_slide .slide_left li').eq(current);
				slideLeft(next,'100%',0);
			},5000);
			stopBtn.find('a img').attr('src',stopBtn.find('a img').attr('src').replace('play','stop'));
			stopNum--;
		};
		return false;
	});
	
	var slideBtn=$('#main_slide .slide_btn li').not('.btn_stop');
	
	slideBtn.click(function(){
		
		var i=$(this).index();
		if(current<i){
			var prev=$('#main_slide .slide_left li').eq(current);
			slideLeft(prev,0,'-100%');
			var next=$('#main_slide .slide_left li').eq(i);
			slideLeft(next,'100%',0);
		}else if(current>i){
			var prev=$('#main_slide .slide_left li').eq(current);
			slideLeft(prev,0,'100%');
			var next=$('#main_slide .slide_left li').eq(i);
			slideLeft(next,'-100%',0);
		}else if(current==i){
			return false;
		};
		
		current=i;
		return false;
	});
});