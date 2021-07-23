$(function(){ 
	$("html, body").animate({ scrollTop: 0 },500);
	$('#main, #main #mainLogo, #main #mainLayout, #section>div').css('height',$(window).innerHeight())
	if($(window).width()>768){
		$('#section').css('width',$(window).width()-300)
	};
	var n=0;
	var h=$(window).innerHeight();
	if($(window).width>375){
		$('#main').height(h);
		$('#header').height(h);
		$('#section>div').height(h);
	}else{
		$('#main').height('h');
		$('#header').height('h');
		$('#section>div').height('h');
	};
	$(window).resize(function(){
		h=$(window).height();
		if($(window).width>375){
			$('#main').height(h);
			$('#header').height(h);
			$('#section>div').height(h);
		}else{
			$('#main').height(h);
			$('#header').height(h);
			$('#section>div').height(h);
		};
		if($(window).width()>768){
			$('#section').css('width',$(window).width()-300)
		};
	});
	$(window).trigger('resize');
	
	//logomove
	
	$('#main').on('mousemove',function(e){
		var moveTop=-e.pageY/20+20
		var moveLeft=-e.pageX/20+20
		var mainLogo=$('#main #mainLogo');
		if($(window).width()>768){
			logoMove('.logo1');
			function logoMove(logoClass){
				$(logoClass,mainLogo).css({'transform':'translate3d('+moveLeft+'px,'+moveTop+'px,0px)','marginLeft':-215});
			};
			setTimeout(function(){
				logoMove('.logo2');
			},50);
			setTimeout(function(){
				logoMove('.logo3');
			},100);
			setTimeout(function(){
				logoMove('.logo4');
			},150);
			setTimeout(function(){
				logoMove('.logo5');
			},200);
			setTimeout(function(){
				logoMove('.logo6');
			},250);
			setTimeout(function(){
				logoMove('.logo7');
			},300);
			setTimeout(function(){
				logoMove('.logo8');
			},350)
		};
	});
	
	//gnb_m_click fixed location
	var gnbmClick=$('#main #mainLayout .gnb_m_click');

	gnbmClick.click(function(){
		$('#main #gnb_m').fadeIn(300);
		$('#main .btnClose').delay(100).fadeIn(300);
		return false;
	});
	
	$('#main .btnClose').click(function(){
		$('#main .btnClose').fadeOut(300);
		$('#main #gnb_m').delay(100).fadeOut(300);
		return false;
	});
	$('#main #gnb_m li').not('.contact').find('a').click(function(){
		var gnbNum=$(this).attr('data-scroll');
		var height=$('#main').height();
		var scroll=$(window).scrollTop();
		$('html,body').scrollTop(height*(Number(gnbNum)+1));
		$('#main .btnClose').fadeOut(300);
		$('#main #gnb_m').delay(100).fadeOut(300);
		n=Number(gnbNum)+1;
		$('#header>#navbar>h2').removeClass('on');
		$('#header>#navbar>h2').eq(n-1).addClass('on');
		if(n==3 || n==4 || n==6){
			$('#main #mainLayout #tabBtn div a').css('color','#ffffff');
		}else{
			$('#main #mainLayout #tabBtn div a').css('color','#333333');
		};
		return false;
		
	});
	
	
	//point spin
	$('#main #mainLayout>span').mouseover(function(){
		setInterval(function(){
			$(this).css({transform:'rotate(360deg)'});
		},500);
	});
	
	//point color
	var pointNum1=Math.round(Math.random()*255);
	var pointNum2=Math.round(Math.random()*255);
	$('.point>span').css({'backgroundColor':'rgb('+pointNum1+','+pointNum2+','+255+')'});
	
	setInterval(function(){
		pointNum1=Math.round(Math.random()*255);
		pointNum2=Math.round(Math.random()*255);
		$('.point>span').animate({'backgroundColor':'rgb('+pointNum1+','+pointNum2+','+255+')'},200)
	},1000);
	
	//point location
	var w=$(window).innerWidth();
	var pt1=Math.round(Math.random()*h*.9);
	var pl1=Math.round(Math.random()*w);
	var pt2=Math.round(Math.random()*h*.9);
	var pl2=Math.round(Math.random()*w);
	var pt3=Math.round(Math.random()*h*.9);
	var pl3=Math.round(Math.random()*w);
	
	$('#main .point1>span').css({'top':pt1+'px','left':pl1+'px'});
	$('#main .point2>span').css({'top':pt2+'px','left':pl2+'px'});
	$('#main .point3>span').css({'top':pt3+'px','left':pl3+'px'});
	setInterval(function(){
		pt1=Math.round(Math.random()*h*.9);
		pl1=Math.round(Math.random()*w);
		pt2=Math.round(Math.random()*h*.9);
		pl2=Math.round(Math.random()*w);
		pt3=Math.round(Math.random()*h*.9);
		pl3=Math.round(Math.random()*w);
		$('#main .point1>span').css({'top':pt1+'px','left':pl1+'px'});
		$('#main .point2>span').css({'top':pt2+'px','left':pl2+'px'});
		$('#main .point3>span').css({'top':pt3+'px','left':pl3+'px'});
	},1000);
	
	//scroll down text
	$('#main #mainLayout #scrollInfo').hover(function(){
		$(this).animate({height:30},300,'easeOutCubic');
	},function(){
		$(this).animate({height:16},300,'easeOutCubic');
	});
	
	
	var mn=0;
	//스크롤했을때 skill bar+header fixed+workShow fixed
	$(window).on('scroll',function(e){
		e.preventDefault();
		var height=$('#main').height();
		var scroll=$(window).scrollTop();
		
		if(scroll>=height){
			$('#header').css({'position':'fixed'});
			$('#wrap').css({'position':'static'});
				if($(window).width()<=768){
					if(scroll>height*1.7 && scroll<height*6.7){
						$('#header').height('55%');
					}else{
						$('#header').height('100%');
					};					
				}else{
					$('#header').height('100%');
				};
			$('#section #cv #etc p.skills').each(function(){
				var skillNum=$(this).index()-7;
				var skillful;
				if(skillNum==0){skillful=95}
				else if(skillNum==1){skillful=88}
				else if(skillNum==2){skillful=93}
				else if(skillNum==3){skillful=95};
				$('span.skillbar span',this).delay((skillNum)*200).animate({'width':skillful+'%'},1000,'easeOutCubic')
			});
		}else{
			$('#header').css({'position':'absolute'});
			$('#wrap').css({'position':'relative'});
		};
		
		//navbar text change
		if(scroll>=height*0 && scroll<height*1){
			mn=0;
		}else if(scroll>=height*1 && scroll<height*2){
			$('#header>#navbar>h2').removeClass('on');
			$('#header>#navbar>h2').eq(0).addClass('on');
			mn=1;
		}else if(scroll>=height*2 && scroll<height*3){
			$('#header>#navbar>h2').removeClass('on');
			$('#header>#navbar>h2').eq(1).addClass('on');
			mn=2;
		}else if(scroll>=height*3 && scroll<height*4){
			$('#header>#navbar>h2').removeClass('on');
			$('#header>#navbar>h2').eq(2).addClass('on');
			mn=3;
		}else if(scroll>=height*4 && scroll<height*5){
			$('#header>#navbar>h2').removeClass('on');
			$('#header>#navbar>h2').eq(3).addClass('on');
			mn=4;
		}else if(scroll>=height*5 && scroll<height*6){
			$('#header>#navbar>h2').removeClass('on');
			$('#header>#navbar>h2').eq(4).addClass('on');
			mn=5;
		}else if(scroll>=height*6 && scroll<height*7){
			$('#header>#navbar>h2').removeClass('on');
			$('#header>#navbar>h2').eq(5).addClass('on');
			mn=6;
		}else if(scroll>=height*7){
			$('#header>#navbar>h2').removeClass('on');
			$('#header>#navbar>h2').eq(6).addClass('on');
			mn=7;
		};
	});
	
	function slide(tg,start,end){
		tg.css('bottom',start).stop().animate({'bottom':end},500,'easeOutCubic');
	};
	
	//메뉴 클릭하면 색깔 변하기
	$('#header>ul li').not('.contact').find('a').on('click',function(){
		$('#header>ul li').removeClass('on');
		console.log($('a',this).text())
		$(this).parent('li').addClass('on');
		$(this).parents('.works').addClass('on');
		$(this).parent('li').find('li:first').addClass('on');
	});
	
	
	var pos,
		slideNum,
		delta;
	
	
	
	//마우스휠하면 스크롤

	$('#main, #wrap').on('mousewheel DOMMouseScroll',function(evt){
		if($('html, body').is(':animated')){return false};
		
		var e=evt.originalEvent;
		
		slideNum=n-2;
		if(slideNum<0){slideNum=null}
		var prev;
		var next;
		
		if(e.detail){
			delta=e.detail*(-40);
		}else if(e.deltaY){
			delta=e.deltaY*(-120/323.75);
		}else{
			delta=e.wheelDelta;
		};
		if(delta>0){ 
			if(n>0){
				prev=$('#section .slide div.workShow').eq(slideNum);
				slide(prev,0,'100%');
				n--;
				slideNum=n-2;
				if(slideNum<0){slideNum=null}
				next=$('#section .slide div.workShow').eq(slideNum);
				slide(next,'-100%',0);
			};
		}else if(delta<0){
			if(n<$('#section>div').size()){
				prev=$('#section .slide div.workShow').eq(slideNum);
				slide(prev,0,'-100%');
				n++;
				slideNum=n-2;
				if(slideNum<0){slideNum=null}
				next=$('#section .slide div.workShow').eq(slideNum);
				slide(next,'100%',0);
			};
		};
		if(n>1){
			$('#section .slide').show();
		}else{
			$('#section .slide').hide();
		};
		pos=h*n;
		$('html, body').stop().animate({scrollTop:pos},500,'easeOutCubic');
		var gnb=$('#header>ul li a[data-scroll='+(n-1)+']');
		
		$('#header>ul li').removeClass('on');
		gnb.parent('li').addClass('on');
		gnb.parents('.works').addClass('on');
		gnb.parent('li').find('li:first').addClass('on');	
		
		if(n==3 || n==4 || n==6){
			$('#main #mainLayout #tabBtn div a').css('color','#ffffff');
		}else{
			$('#main #mainLayout #tabBtn div a').css('color','#333333');
		};
	});
	
	
	$('#main #mainLayout #scrollInfo').click(function(){
		n++;
		pos=h*n;
		$('html, body').stop().animate({scrollTop:pos},500,'easeOutCubic');
	});
	
	//메뉴 클릭하면 스크롤
	$('#header>ul li').not('.contact').find('a').click(function(){
		if($('html, body').is(':animated')){return false};
		var prevN=n;
		n=$(this).data('scroll')+1;
		var nextN=n;
			
		if(nextN>1){
			$('#section .slide').show();
		}else if(nextN<=1 || nextN>6){
			$('#section .slide').hide();
		};
		if(nextN-prevN>0){
			prev=$('#section .slide div.workShow').eq(prevN-2);
			slide(prev,0,'-100%');
			next=$('#section .slide div.workShow').eq(nextN-2);
			slide(next,'100%',0);
		}else if(nextN-prevN<0){
			prev=$('#section .slide div.workShow').eq(prevN-2);
			slide(prev,0,'100%');
			next=$('#section .slide div.workShow').eq(nextN-2);
			slide(next,'-100%',0);
		}else if(nextN==prevN){
			return false;
		};
		pos=h*(n);
		$('html, body').stop().animate({scrollTop:pos},500,'easeOutCubic');
		if(n>6){
			$('#section .slide').hide();
		};
		return false;
	});
	
	//tabBtn 클릭하면 스크롤
	var mainH=$('#main').height(),
		tabPos=mainH*mn;
	$('#main #mainLayout #tabBtn div').click(function(){
		if($(this).index()==0){
			if(mn>0){mn--;};
		}else{
			if(mn<$('#section>div').size()){mn++;};
		};
		tabPos=mainH*mn;
		console.log(mn);
		$('html, body').stop().animate({scrollTop:tabPos},500,'easeOutCubic');	
		$('#header>#navbar>h2').removeClass('on');
		$('#header>#navbar>h2').eq(mn-1).addClass('on');
		
		if(mn==3 || mn==4 || mn==6){
			$('#main #mainLayout #tabBtn div a').css('color','#ffffff');
		}else{
			$('#main #mainLayout #tabBtn div a').css('color','#333333');
		};
		return false;
	});
	
	//works1 img fadeIn Out
	var currentImg1=0;
	setInterval(function(){
		$('#works1 .workShow .innerImg img').eq(currentImg1).fadeOut(600);
		currentImg1++;
		if(currentImg1==$('#works1 .workShow .innerImg img').size()){
			currentImg1=0;
		};
		$('#works1 .workShow .innerImg img').eq(currentImg1).fadeIn(500);		
	},3000);
	
	//768
	var wWidth=$(window).width();
	if(wWidth<=768 && wWidth>375){
		$('#section>#works1').append($('<div class="slide"></div>'));
		$('#section>#cv').append($('.cv_bg'));
		var slideDiv=$('.slide');
		slideDiv.append($('.workShow'));
		
		$(window).on('scroll',function(e){
			e.preventDefault();
			var height=$(window).height();
			var scroll=$('html,body').scrollTop();
			if(scroll>=height*2){
				 $('#section .slide').css({'position':'fixed'});
			}else if(scroll<height*2 || scroll>height*6){
				 $('#section .slide').css({'position':'relative'});
			};
		});		
	};
	function slide(tg, start, end){
		tg.css('top',start).stop().animate({'top':end});
	};
	
	//work4 clouds
	
	var clouds=$('.workShow .bgCloud>img'),
		cloud1=clouds.eq(0),
		cloud2=clouds.eq(1),
		cloud3=clouds.eq(2),
		cloud4=clouds.eq(3),
		cloud5=clouds.eq(4),
		cloud6=clouds.eq(5);
	
	if($(window).width()>768){
		cloudy(cloud1,50000,2000);
		cloudy(cloud2,30000,2000);
		cloudy(cloud3,100000,2000);
		cloudy(cloud4,80000,2000);
		cloudy(cloud5,20000,2000);
		cloudy(cloud6,70000,2000); 
	}else if($(window).width()>375){
		cloudy(cloud1,50000,900);
		cloudy(cloud2,30000,900);
		cloudy(cloud3,100000,900);
		cloudy(cloud4,80000,900);
		cloudy(cloud5,20000,900);
		cloudy(cloud6,70000,900); 
	}else{
		cloudy(cloud1,10000,400);
		cloudy(cloud2,30000,400);
		cloudy(cloud3,60000,400);
		cloudy(cloud4,80000,400);
		cloudy(cloud5,20000,400);
		cloudy(cloud6,70000,400); 
	}
	function cloudy(tg,time,left){
		var restart=tg.width();
		tg.animate({'left':-restart-40},time,'linear',function(){
			$(this).css('left',left);
			cloudy(tg,time,left);
		});
	};
	
	//linkBtn click concepts
	var conceptBtn=$('#section div .workInfo .btnArea .linkBtn.concept'),
		popup=$('#popup'),
		popupImg=popup.find('.popBox .popContent img'),
		popupClose=popup.find('.popBox a');
	
	conceptBtn.on('click',function(){
		var src=$(this).find('a').attr('href');
		popupImg.attr('src',src);
		popup.show();
		return false;
	});
	popupClose.on('click',function(){
		popup.hide();
		return false;
	});
	
	//popup scroll
	
	popup.find('.popBox .popContent').mCustomScrollbar({
		 theme:"dark-thin",
		 mouseWheel:{ scrollAmount: 300 }
	});
	
	//link window open
	var linkBtn=$('#section div .workInfo .btnArea .linkBtn').not('.concept');
	linkBtn.filter('.view1920').click(function(){
		var work=$('a', this).attr('href');
		window.open(work,"work","width=1920,height=966,location=no,status=no,toolbar=no");
		return false;
	});
	linkBtn.filter('.view768').click(function(){
		var work=$('a', this).attr('href');
		window.open(work,"work","width=768,height=1024,location=no,status=no,toolbar=no");
		return false;
	});
	linkBtn.filter('.view375').click(function(){
		var work=$('a', this).attr('href');
		window.open(work,"work","width=375,height=667,location=no,status=no,toolbar=no");
		return false;
	});
	linkBtn.filter('.viewApp').click(function(){
		var work=$('a', this).attr('href');
		window.open(work,"work","width=375,height=812,location=no,menubar=no,status=no,toolbar=no");
		return false;
	});
});