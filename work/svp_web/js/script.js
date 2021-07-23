$(function(){
	
	var scrollLeft,
		ice=$('#bgIce img'),
		sec1=$('#sec1_warming .warmingCont'),
		sec1Water=sec1.find('.water'),
		sec1Frame=sec1.find('.frame'),
		sec2=$('#sec2_help .helpCont'),
		sec3=$('#sec3_act .bgCloud'),
		sec3act1=$('#sec3_act #acts1'),
		sec3act2=$('#sec3_act #acts2');
	//horizontal scrollbar
	$('body').mCustomScrollbar({
		axis:"x",
		theme:"dark-thin",
		mouseWheel:{ deltaFactor: 55},
		callbacks:{
			onScroll:function(){
				$('#wrap #main .topBtn').fadeIn(300);
				if(scrollLeft==0){
					$('#wrap #main .topBtn').fadeOut(300);
				};
			},
			whileScrolling:function(){
				$('#wrap #main .topBtn').fadeOut(300);
				//scroll function
				scrollLeft=this.mcs.left;
				ice.eq(0).css('left',scrollLeft/20);
				ice.eq(1).css('left',scrollLeft/10);
				
				//sec1
				
				if(-scrollLeft>=1920 && -scrollLeft<9020){
					sec1.stop().css({'position':'fixed','left':0});
					sec1Frame.stop().css({'position':'fixed','left':0});
					
					sec1Frame.css({'borderWidth':(-1920-scrollLeft)/70});
					sec1.css({'backgroundColor':'rgba('+(253+(scrollLeft+1920)/200)+','+(218+(scrollLeft+1920)/80)+','+(161+(scrollLeft+1920)/200)+',1)'});
					//sec1Water.css('bottom',(-1920-scrollLeft)/7);
					$('#sec1_warming .water .deep').css('backgroundAttachment','fixed');
					sec1Water.css('height',(-scrollLeft-1920)/7)
					sec1Water.find('.surface').css('left',(scrollLeft+1920)/20)
					
					if(-scrollLeft>=7820){
						sec1Water.find('.deep .warmingInfo').css('paddingTop',140+(-scrollLeft-7820)/7)
						sec1Water.find('.deep .warmingInfo a').css({'position':'relative'})
					}else{
						sec1Water.find('.deep .warmingInfo').css('paddingTop',140)
						sec1Water.find('.deep .warmingInfo a').css({'position':'static'})
					};
					var sec1text=sec1Water.find('.deep .warmingInfo .wInfo').children();
					opacity(sec1text,0,5200);
					opacity(sec1text,1,6000);
					opacity(sec1text,2,6800);
					opacity(sec1text,3,7600);
					
				}else if(-scrollLeft>=9020){
					sec1.stop().css({'position':'relative','left':7100});//9020-1920
					sec1Frame.stop().css({'position':'absolute'});
					$('#sec1_warming .water .deep').css('backgroundAttachment','scroll');
				}else{
					sec1.stop().css({'position':'relative'});
					sec1Frame.stop().css({'position':'absolute'});
					sec1Frame.css({'borderWidth':0})
					$('#sec1_warming .water .deep').css('backgroundAttachment','scroll');
				};
				
				//sec2
				var sec2img=sec2.find('#sec2_bg img');
				var sec2contents=sec2.find('#sec2_contents').children();	
					
				if(-scrollLeft>=10840 && -scrollLeft<16760){
					sec2.stop().css({'position':'fixed','left':0});
					for(var i=0;i<11;i++){
						sec2img.eq(i).css('left',(scrollLeft+10840)/30);
					}; 
					opacity(sec2contents,0,10840);
					opacity(sec2contents,1,11640);
					opacity(sec2contents,2,12440);
					opacity(sec2contents,3,13240);
					opacity(sec2contents,4,14040);
				}else if(-scrollLeft>=16760){
					sec2.stop().css({'position':'relative','left':5920});//16760-10840,5920+1920=7840
				}else{
					sec2.stop().css({'position':'relative'});
					sec2contents.css('opacity',0)
				};
				
				function opacity(target,i,scrollNum){
					var tg=target.eq(i);
					if(-scrollLeft>=scrollNum){
						tg.css('opacity',(-scrollLeft-scrollNum)/500);
					}else{
						tg.css('opacity',0);
					};
				};
				//sec3
				var sec3Clouds=sec3.find('img');
				if(-scrollLeft>=18670){
					sec3.stop().css({'position':'fixed','left':0});
					sec3act1.css('left',(-18670-scrollLeft)/2)
					scrollClouds(0,50);
					scrollClouds(1,30);
					scrollClouds(2,70);
					scrollClouds(3,50);
					scrollClouds(4,40);
					scrollClouds(5,30);
				}else{
					sec3.stop().css({'position':'relative'});
				};
				//sec3 act2
				
				if(-scrollLeft>=25040 && -scrollLeft<28500){
					sec3act2.css('left',6500+(-25040-scrollLeft));
					sec3act2.find('.store').css('left',600-(-25040-scrollLeft));
					if(600-(-25040-scrollLeft)<=0){sec3act2.find('.store').css('left',0)};
				};
				
				
				
				function scrollClouds(i,moveNum){
						sec3Clouds.eq(i).css({'marginLeft':(scrollLeft+18670)/moveNum});
				};
			}
		}
	});
	
	$('#wrap #main .topBtn').on('click',function(){
		$('body').mCustomScrollbar("scrollTo","left");
		return false;
	});
	
	
	//sec1 popup
	var popup=$('#sec1_warming .popup');
	sec1.find('.water .deep .warmingInfo a').click(function(){
		if(popup.is(':visible')){
			return false;
		}else{
			popup.fadeIn(300);
		};
		return false;
	});
	popup.find('a.close').click(function(){
		popup.fadeOut(300);
		return false;
	});
	popup.find('a.next').click(function(){
		popup.find('.pop1').hide();
		popup.find('.pop2').show();
		return false;
	});
	popup.find('a.prev').click(function(){
		popup.find('.pop2').hide();
		popup.find('.pop1').show();
		return false;
	});
	
	//main animation-1 title
	
	var mainTit=[];
	
	$(window).load(function(){
		$('#svpTitle .title').each(function(i){
			mainTit.push([]);
			var child=$(this).children('img');
			child.each(function(j){
				mainTit[i][j]=$(this);
			});
		});
		mainTit=mainTit.concat(mainTit[0],mainTit[1],mainTit[2]);
		mainTit.splice(0,3);
		
		for(var n=0;n<17;n++){
			titShow(mainTit[n],n);
		}; 
		
	});
	
	function titShow(titImg,n){
		titImg.delay(150*n).animate({'opacity':1,'top':0},500);
		setInterval(function(){
			titImg.delay(3500).animate({'top':20},400).animate({'top':0},400);
		},500);
	};
	
	//main-animation-2 clouds
	var clouds=$('#main .bgCloud img'),
		cloud1=clouds.eq(0),
		cloud2=clouds.eq(1),
		cloud3=clouds.eq(2),
		cloud4=clouds.eq(3),
		cloud5=clouds.eq(4),
		cloud6=clouds.eq(5);
	cloudy(cloud1,50000);
	cloudy(cloud2,70000);
	cloudy(cloud3,100000);
	cloudy(cloud4,80000);
	cloudy(cloud5,60000);
	cloudy(cloud6,70000);
	function cloudy(tg,time){
		var restart=tg.width();
		tg.animate({'left':-restart-40},time,'linear',function(){
			$(this).css('left',2000);
			cloudy(tg,time);
		});
	};
	
	//store hover
	var products=$('#acts2 .products .productCont');
	
	products.on({mouseover:function(){
		$(this).stop().animate({'backgroundSize':'130%'},200,'linear');
	},mouseout:function(){
		$(this).stop().animate({'backgroundSize':'110%'},200,'linear');
	}});
	var actsDo=sec3act1.find('.actsDo');
	actsDo.hover(function(){
		$(this).find('.actImg img').attr('src',$(this).find('.actImg img').attr('src').replace('off','on'));
	},function(){
		$(this).find('.actImg img').attr('src',$(this).find('.actImg img').attr('src').replace('on','off'));
	})
	
	
});
