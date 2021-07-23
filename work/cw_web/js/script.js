$(function(){
	$("html, body").animate({ scrollTop: 0 },500);
	
	var totalWidth=$(window).outerWidth();
	//topBanner
	//topBanner slogan
	$('#topBanner #slogan>p>span').each(function(){
		var spanIdx=$(this).index(),
			delayTime=300,
			sloganTimer=1500;
		$(this).css('opacity',0);
		$(this).delay(delayTime+spanIdx*sloganTimer).animate({'opacity':1},sloganTimer);
	});
	
	//topBanner scroll btn
	setInterval(function(){
		$('#topBanner #scrollDown').animate({marginBottom:'-10px'},400,'easeOutQuad').animate({marginBottom:0},400,'easeInQuad');
	},800);
	
	$('#topBanner #scrollDown').click(function(){
		$('#topBanner').stop().animate({marginTop:'-100vh'},700,'easeOutCubic');
		$('#topBanner #topLogo').stop().fadeOut(200);
		if($('html, body').not(':animated')){
			bestInterval();
		};
	});
	
	//topBanner time scroll
	var scrollTime=6000;
	var delta=0;
	$(window).on('load',function(){
		if(delta>=0){
			$('#topBanner').delay(scrollTime).animate({marginTop:'-100vh'},700,'easeOutCubic');
			$('#topBanner #topLogo').delay(scrollTime+500).fadeOut(200);
			bestInterval();
		};
	});
	
	//topBanner mousewheel scroll
	$('#topBanner').on('mousewheel DOMMouseScroll',function(evt){
		if($('#topBanner #topLogo').is(':visible')){
			var e=evt.originalEvent;
			if(e.detail){
				delta=e.detail*-40;
			}else{
				delta=e.wheelDelta;
			};
			if(delta<0){ 
				$('#topBanner').stop().animate({marginTop:'-100vh'},700,'easeOutCubic');
				$('#topBanner #topLogo').stop().fadeOut(200);
				if($('html, body').not(':animated')){
					bestInterval();
				};
				
				return false;
				//마우스휠의 원래 기능 막기
			};
		};
	});
	
	//gnb - depth 1
	
	$('#headerGnb>ul>li,#gnb_bg').mouseover(function(){
		var ulHeight=$('#gnb_bg ul.depth_2_6').innerHeight();
		$('#gnb_bg').stop().animate({'height':ulHeight+10},300);
	});
	$('#headerGnb>ul>li,#gnb_bg').mouseout(function(){
		$('#gnb_bg').stop().animate({'height':0},300);
	});
	$('#headerGnb>ul>li, #gnb_bg .depth_2>ul').hover(function(){
		var i=$(this).index();
		var lineWidth=$('#headerGnb>ul>li').eq(i).find('a').width();
		var line=$('#headerGnb>ul>li').eq(i).find('span');
		line.stop().animate({width:lineWidth-1},200);
		$('#headerGnb>ul>li').eq(i).find('a').css('color','#f4181a');
	},function(){
		var i=$(this).index();
		var line=$('#headerGnb>ul>li').eq(i).find('span');
		line.stop().animate({'width':0},200);
		$('#headerGnb>ul>li').eq(i).find('a').css('color','inherit');	
	});
	
	
	//gnb - depth 2
	
	depth2Width();
	function depth2Width(){
		$('#gnb_bg .depth_2>ul').each(function(){
		var i=$(this).index();
		var liWidth=$('#headerGnb ul.depth_1>li').eq(i).width();
		var liMargin;
		if(totalWidth>1280){
			liMargin=63;
		}else {
			liMargin=0;
		}
		$(this).width(liWidth+liMargin);
	});
	};
	//mobile gnb-depth1
	var menuNum=0;
	$('.gnbBtn').click(function(){
		if(menuNum==0){
			$(this).addClass('on');
			$('#mobileGnb').animate({'right':'0'},500);
			menuNum=1;
		}else{
			$(this).removeClass('on');
			$('#mobileGnb').animate({'right':'-300px'},500);
			menuNum=0;
		};
	});
	//mobile gnb-depth2
	$('#mobileGnb ul.m_depth_1>li').hover(function(){
		if($('>ul',this).is(':visible')==true){
			$(this).css('borderBottom','1px solid rgba(255,255,255,0)')
		}else{
			$(this).css('borderBottom','1px solid rgba(255,255,255,.9)')
		};
		$('>span',this).css({'backgroundImage':'url(img/icon_drop_red.png)','backgroundColor':'#fff'});
	},function(){
		$(this).css('borderBottom','1px solid rgba(255,255,255,.3)')
		$('>span',this).css({'backgroundImage':'url(img/icon_drop.png)','backgroundColor':'#f4181a'});
	});
	$('#mobileGnb ul.m_depth_1>li').click(function(){
		if($('>ul',this).is(':visible')==true){
			$('span',this).css({'transform':'rotate(0deg)'});
			$('>ul',this).slideUp(500);
		}else{
		$('#mobileGnb ul.m_depth_1>li>span').css({'transform':'rotate(0deg)'});
		$('#mobileGnb ul.m_depth_1>li>ul').slideUp(500);
		$('#mobileGnb ul.m_depth_1>li>ul').css('bordeBottom','1px solid rgba(255,255,255,.3)')
		$('>ul',this).slideDown(500);
		$(this).css('borderBottom','1px solid rgba(255,255,255,0)');
		$('span',this).css({'transform':'rotate(45deg)'})
		};
	});
	
	
	
	//main1 - best product
	bestSlideLayout();
	function bestSlideLayout(){
		$('#bestSlide').height($('#bestSlide').width()*0.445);
		if($(window).width()<=1024 && $(window).width()>480){
			$('#bestSlide').height($('#bestSlide').width()*0.6024);
		}else if($(window).width()<=480){
			$('#bestSlide').height($('#bestSlide').width()*0.91);
		}
		
		if($(window).width()>480){
			$('.best05').height($('.best05').width()*0.452);
		}else if($(window).width()<=480){
			$('.best04>a>img').attr('src','img/best_04_small.jpg');
			$('.best05').height('auto');
			$('.best05').width('auto');
		};
	};
	
	//main1 - best product - slide
	 var current=0;
	var bestBtn=$('#controlBest ul.btnBest li');
	var bestSlide=$('#bestSlide>div');
	var timerBest;
	
	if($('#wrap').offset().top==0);
	
	function bestInterval(){ 
		timerBest=setInterval(function(){
			var prevSlide=bestSlide.eq(current);
			bestMove(prevSlide,0,'-100%');
			var prevBtn=bestBtn.eq(current);
			prevBtn.removeClass('on');

			current++;
			if(current==3){current=0;};
			var nextSlide=bestSlide.eq(current);
			bestMove(nextSlide,'100%',0);
			var nextBtn=bestBtn.eq(current);
			nextBtn.addClass('on'); 
		},5000);
	};
	$('#mainTop').hover(function(){
		clearInterval(timerBest);
	},function(){
		bestInterval();		
	});
	bestBtn.click(function(){
		btnClick=$(this).index();
		var prevEl=bestSlide.eq(current);
		var nextEl=bestSlide.eq(btnClick);
		
		bestBtn.removeClass('on');
		$(this).addClass('on');
		
		if(btnClick==current){
			return false;
		}else if(btnClick>current){	
			bestMove(prevEl,0,'-100%');
			bestMove(nextEl,'100%',0);
		}else{
			bestMove(prevEl,0,'100%');
			bestMove(nextEl,'-100%',0);
		}
		
		current=btnClick;
		return false;
	});
	function bestMove(tg, start, end){
		tg.css('left',start).stop().animate({left:end},700,'easeOutCubic');
	};
	
	var prevBest=$('#controlBest .prevBest');
	var nextBest=$('#controlBest .nextBest');
	nextBest.click(function(){
		var prevSlide=bestSlide.eq(current);
		bestMove(prevSlide,0,'-100%');
		var prevBtn=bestBtn.eq(current);
		prevBtn.removeClass('on');

		current++;
		if(current==3){current=0;};
		var nextSlide=bestSlide.eq(current);
		bestMove(nextSlide,'100%',0);
		var nextBtn=bestBtn.eq(current);
		nextBtn.addClass('on');
		return false;
	});
	prevBest.click(function(){
		var prevSlide=bestSlide.eq(current);
		bestMove(prevSlide,0,'100%');
		var prevBtn=bestBtn.eq(current);
		prevBtn.removeClass('on');

		current--;
		if(current==-3){current=0;};
		var nextSlide=bestSlide.eq(current);
		bestMove(nextSlide,'-100%',0);
		var nextBtn=bestBtn.eq(current);
		nextBtn.addClass('on');
		return false;
	});
	
	
	//section - more
	$('section a.more').hover(function(){
		$(this).css({'transform':'rotate(360deg)','opacity':1})
	},function(){
		$(this).css({'transform':'rotate(0deg)','opacity':.6})
	});
	//main2 - new product
	
	$('#newSlide ul li dl dt img').load(function(){
		$('#newSlide ul').height($('#newSlide ul li').height());
	});
	
	var newList;
	var out;
	var i=0,
		a=1,
		b=2,
		c=3,
		d=4;
		
	newListSlide();
	function newListSlide(){
		newList=$('#newSlide ul li');
		
		if($('#newSlide ul').width()>1320){
			out=36.36;
		}else if($('#newSlide ul').width()<=1320 && $('#newSlide ul').width()>530){
			out=35;
		}else{
			out=51;
		};
	};
	
	newListDefault();
	function newListDefault(){
		newList.css({left:out*3+'%'});
		newList.eq(i).css({left:out*(-1)+'%'});
		newList.eq(a).css({left:out*(0)});
		newList.eq(b).css({left:out+'%'},100);
		newList.eq(c).css({left:out*2+'%'});
	};
	var clickN=0;		
	$('#newSlide .nextNew').click(function(e){
		if(clickN==1){return false;}
		newList.eq(i).css({left:out*3+'%'});
		newList.eq(a).css({left:out*(0)}).animate({left:-out+'%'},clickTime,'easeOutCubic');
		newList.eq(b).css({left:out+'%'}).animate({left:0},clickTime,'easeOutCubic');
		newList.eq(c).css({left:out*2+'%'}).animate({left:out+'%'},clickTime,'easeOutCubic');
		newList.eq(d).css({left:out*3+'%'}).animate({left:out*2+'%'},clickTime,'easeOutCubic');
		i++;
		if(i==9){
			i=0;
		};
		a++;
		if(a==9){
			a=0;
		};
		b++;
		if(b==9){
			b=0;
		};
		c++;
		if(c==9){
			c=0;
		};
		d++;
		if(d==9){
			d=0;
		};
		clickN=1;
		setTimeout(function(){
			clickN=0;
		},300);
		return false;
	});
	
	var clickTime=300;
	$('#newSlide .prevNew').click(function(){
		if(clickN==1){return false;}
		newList.eq(i).css({left:-out+'%'}).animate({left:0},clickTime,'easeOutCubic');
		newList.eq(a).css({left:0}).animate({left:out+'%'},clickTime,'easeOutCubic');
		newList.eq(b).css({left:out+'%'}).animate({left:out*2+'%'},clickTime,'easeOutCubic');
		newList.eq(c).css({left:out*2+'%'}).animate({left:out*3+'%'},clickTime,'easeOutCubic');
		newList.eq(d).css({left:-out+'%'});
		i--;
		if(i==-9){
			i=0;
		};
		a--;
		if(a==-9){
			a=0;
		};
		b--;
		if(b==-9){
			b=0;
		};
		c--;
		if(c==-9){
			c=0;
		};
		d--;
		if(d==-9){
			d=0;
		};
		clickN=1;
		setTimeout(function(){
			clickN=0
		},clickTime);
		return false;
	});
	//newslide swipe;
	$('#newSlide').swipe({fingers:'all', swipeLeft:swipeLeft, swipeRight:swipeRight, allowPageScroll:"none"});

	function swipeRight(event, direction, distance, duration, fingerCount) {
		if(clickN==1){return false;}
		newList.eq(i).css({left:-out+'%'}).animate({left:0},clickTime,'easeOutCubic');
		newList.eq(a).css({left:0}).animate({left:out+'%'},clickTime,'easeOutCubic');
		newList.eq(b).css({left:out+'%'}).animate({left:out*2+'%'},clickTime,'easeOutCubic');
		newList.eq(c).css({left:out*2+'%'}).animate({left:out*3+'%'},clickTime,'easeOutCubic');
		newList.eq(d).css({left:-out+'%'});
		i--;
		if(i==-9){
			i=0;
		};
		a--;
		if(a==-9){
			a=0;
		};
		b--;
		if(b==-9){
			b=0;
		};
		c--;
		if(c==-9){
			c=0;
		};
		d--;
		if(d==-9){
			d=0;
		};
		clickN=1;
		setTimeout(function(){
			clickN=0
		},clickTime);
	};
	function swipeLeft(event, direction, distance, duration, fingerCount) {
		if(clickN==1){return false;}
		newList.eq(i).css({left:out*3+'%'});
		newList.eq(a).css({left:out*(0)}).animate({left:-out+'%'},clickTime,'easeOutCubic');
		newList.eq(b).css({left:out+'%'}).animate({left:0},clickTime,'easeOutCubic');
		newList.eq(c).css({left:out*2+'%'}).animate({left:out+'%'},clickTime,'easeOutCubic');
		newList.eq(d).css({left:out*3+'%'}).animate({left:out*2+'%'},clickTime,'easeOutCubic');
		i++;
		if(i==9){
			i=0;
		};
		a++;
		if(a==9){
			a=0;
		};
		b++;
		if(b==9){
			b=0;
		};
		c++;
		if(c==9){
			c=0;
		};
		d++;
		if(d==9){
			d=0;
		};
		clickN=1;
		setTimeout(function(){
			clickN=0;
		},300);
	};

	//main3 - cw news
	//shave.js
	shave('#cw_news li p', 70);
	if($(window).width()<1025){shave('#cw_news li p', 20)}
	//main4 - link, cs
	var setIntervalId;
	//sns
	$('#link_cs #sns>div').hover(function(){
		$(this).animate({'backgroundSize':'150%'},300);
		var arrow=$(this).find('span');
		var ar=parseInt(arrow.css('right'));
		arrow.animate({opacity:1},300);
		setIntervalId=setInterval(function(){
			arrow.animate({'right':ar+20},300).animate({'right':ar},300);
			return false;
		},600);	
	},function(){
		$(this).animate({'backgroundSize':'100%'},300);
		var arrow=$(this).find('span');
		arrow.animate({opacity:.5},300);
		clearInterval(setIntervalId);
	});
	//cs
	$('#link_cs #cs>div>div>a').hover(function(){
		$('img',this).attr('src','img/icon_cs_hover.png');
	},function(){
		$('img',this).attr('src','img/icon_cs.png');
	});
	
	//window resize
	$(window).resize(function(){
		totalWidth=$(window).width();
		depth2Width();
		bestSlideLayout();
		newListSlide();
		newListDefault();
		$('#newSlide ul').height($('#newSlide ul li').height());
		if($('#bestSlide').width()<464){
			$('.best04>a>img').attr('src','img/best_04_small.jpg');
		}else{
			$('.best04>a>img').attr('src','img/best_04.jpg');
		};
	});
	$(window).trigger('resize');
});