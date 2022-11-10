$(function(){
	//slide-slide
	
	var slideTimer,
		slide=$('#slide .slideList'),
		currentP=4,
		current=0,
		currentN=1,
		currentNn=2,
		currentNnn=3,
		slidebar=$('#slide .slideBar li'),
		slidebg=$('#slide .slidebg');
		
	var prevSlideP,
		prevSlide,
		prevSlideN,
		prevSlideNn,
		prevSlideNnn,
		bgUrl;
	
	slide.css('left',($(window).width()-528)/2);
	
	slideTimer=setInterval(sliding,3000);
	
	function sliding(){		
		prevSlideP=slide.find('li').eq(currentP);
		prevSlide=slide.find('li').eq(current);
		prevSlideN=slide.find('li').eq(currentN);
		prevSlideNn=slide.find('li').eq(currentNn);
		prevSlideNnn=slide.find('li').eq(currentNnn);
		
		slideMove(prevSlideP,0,'-186px');
		slideMove(prevSlide,'186px',0);
		slideMove(prevSlideN,'372px','186px');
		slideMove(prevSlideNn,'558px','372px');
		prevSlideNnn.css('left','558px');
		
		bgUrl=prevSlideN.find('img').attr('src');
		slidebg.css('backgroundImage','url('+bgUrl+')');
		
		currentP++;
		if(currentP==slide.find('li').size()){currentP=0;}
		current++;
		if(current==slide.find('li').size()){current=0;}
		currentN++;
		if(currentN==slide.find('li').size()){currentN=0;}
		currentNn++;
		if(currentNn==slide.find('li').size()){currentNn=0;}
		currentNnn++;
		if(currentNnn==slide.find('li').size()){currentNnn=0;}
		
		slidebar.removeClass('on');
		slidebar.eq(current).addClass('on');		
	};
	
	function slidingreverse(){	
		prevSlideP=slide.find('li').eq(currentP);
		prevSlide=slide.find('li').eq(current);
		prevSlideN=slide.find('li').eq(currentN);
		prevSlideNn=slide.find('li').eq(currentNn);
		prevSlideNnn=slide.find('li').eq(currentNnn);
		
		slideMove(prevSlideP,0,'186px');
		slideMove(prevSlide,'186px','372px');
		slideMove(prevSlideN,'372px','558px');
		prevSlideNn.css('left','-186px');
		slideMove(prevSlideNnn,'-186px',0);
		
		bgUrl=prevSlideP.find('img').attr('src');
		slidebg.css('backgroundImage','url('+bgUrl+')');
		
		currentP--;
		if(currentP<0){currentP=slide.find('li').size()-1;}
		current--;
		if(current<0){current=slide.find('li').size()-1;}
		currentN--;
		if(currentN<0){currentN=slide.find('li').size()-1;}
		currentNn--;
		if(currentNn<0){currentNn=slide.find('li').size()-1;}
		currentNnn--;
		if(currentNnn<0){currentNnn=slide.find('li').size()-1;}
		
		
		slidebar.removeClass('on');
		slidebar.eq(current).addClass('on');
	};
	
	
	function slideMove(tg,start,end){
		tg.css('left',start).stop().animate({'left':end},500)		
	};
	//touchstart,touchend
	$('#slide').on({'touchstart':function(){
		clearInterval(slideTimer);
	},'touchend':function(){
		slideTimer=setInterval(sliding,3000);
	}});
	$('#slide').on({'swipeleft':sliding,'swiperight':slidingreverse});

	//2 - ranking swipe
	var rankingSwipe=$('#ranking .ranking_swipe'),
		swipeTit=rankingSwipe.find('ul'),
		rankCategory=$('#ranking .rankingCt .rankingImg'),
		rankingSwipeNum=0;
		
		
	rankingSwipe.on({'swipeleft':rankingSwping,'swiperight':rankingSwpingRev})
	
	function rankingSwping(){
		$('body').on('touchmove', function(e){e.preventDefault()});  
		if(rankingSwipeNum>=2){
			rankingSwipeNum=2;
		}else{
			rankingSwipeNum++;
			$(this).stop().animate({'left':-320*rankingSwipeNum},300);
			var cateTxt=swipeTit.eq(rankingSwipeNum).data('tit');
			rankCategory.text(cateTxt);
		};
	};
	function rankingSwpingRev(){
		$('body').on('touchmove', function(e){e.preventDefault()});  
		if(rankingSwipeNum<=0){
			rankingSwipeNum=0;
		}else{
			rankingSwipeNum--;
			$(this).stop().animate({'left':-320*rankingSwipeNum},300);
			var cateTxt=swipeTit.eq(rankingSwipeNum).data('tit');
			rankCategory.text(cateTxt);
		};
	};
	//2,4 - ranking ranking3 width,ticketOpen width
	var rankingw,
		wm=$('.wm');
	if($(window).width()<=375 && $(window).width()>360){
		rankingw=345;
		wm.css({'marginLeft':16,'marginRight':16});
	};
	rankingSwipe.find('ul.ranking3').width(rankingw);
	
	//3 - event fadeInOut
	
	var eventImg=$('#event .eventFade li');
		eventNum=0;
	setInterval(function(){
		eventImg.eq(eventNum).fadeOut(500);
		eventNum++;
		if(eventNum==2){eventNum=0;}
		eventImg.eq(eventNum).fadeIn(500);
	},4000);	
	
	
	//4-ticket open
	var timgArea=$('#ticketOpen .ticketImg'),
		ticketImg;
		
	timgArea.each(function(){
		ticketImg=$(this).find('>a');
		
		if(timgArea.innerWidth()<ticketImg.width()){
		ticketImg.css('marginLeft',(timgArea.innerWidth()-ticketImg.width())/2);
	};
	});
		
	//menu click
	var gnb=$('#gnb');
	$('#header>a:eq(0), .ui-panel-dismiss').tap(function(){
		if(gnb.hasClass('ui-panel-closed')){
			$('.ui-content .menuBg').fadeIn(300);
		} else {
			$('.ui-content .menuBg').fadeOut(300);
		};
	});
});