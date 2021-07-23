$(function(){
	//menu click
	var clickMenuNum=0;
	$('.menu_click').click(function(){
		if(clickMenuNum==0){
			$('#m_gnb').animate({right:0},300);
			$(this).addClass('act');
			clickMenuNum=1;
		}else{
			$('#m_gnb').animate({right:'-250px'},300);
			$(this).removeClass('act');
			clickMenuNum=0;
		}
	});
	$(window).resize(function(){
		if(clickMenuNum==1){
			$('#m_gnb').animate({right:'-250px'},300);
			$('.menu_click').removeClass('act');
			clickMenuNum=0;
		};
	});
	//menu-depth2
	$('#header_menu #depth_1 ul.menu_1>li').hover(function(){
		if($('.depth_2').is(':visible')){
			$('.depth_2').hide();
			$('.depth_2',this).show();
		}else{
			$('.depth_2',this).stop().slideDown(500);
		};
	},function(){
		$('.depth_2:visible').animate({height:0},500,function(){
			$(this).hide().height(220);
		});
	}); 
	//search guidetext
	var searchText= $('.search_text');
	$('.search_text').each(function(){
		var guideText=this.defaultValue;
		searchText.css('color','#b3c2df');
		searchText.focus(function(){
			if(searchText.val()==guideText){
				searchText.val('');
				searchText.css('color','#fff');
			};
		});
		searchText.blur(function(){
			if(searchText.val()===''){
				searchText.val(guideText);
				searchText.css('color','#b3c2df');
			};
		});
	});
	
	//search options
	var searchNum=0;
	$('#search_category>a').click(function(){
		if(searchNum==0){
			$('#search_category .search_options').slideDown(100);
			$('#search_category>a').css({backgroundImage:'url(images/arrow_up.png)'});
			searchNum++;
		}else{
			$('#search_category .search_options').slideUp(100);
			$('#search_category>a').css({backgroundImage:'url(images/arrow_down.png)'});
			searchNum=0;
		};
		return false;
	});
	$('#search_category .search_options ul li').click(function(){
		var optionText=$(this).text();
		$('#search_category>a').text(optionText);
		$('#search_category .search_options').slideUp(100);
		$('#search_category>a').css({backgroundImage:'url(images/arrow_down.png)'});
		searchNum=0;
	});
	//submenu hover
	$('#submenu li').hover(function(){
		var prev=1;
		var i=$(this).index();
		
		if(i==4 && $('#submenu li').eq(6).is(':visible')==false){
			prev=3;
		};
		
		$('#submenu li').eq(i+prev).find('a').css({'backgroundPosition':'-1px center'});
	},function(){
		var prev=1;
		var i=$(this).index();
		if(i==4 && $('#submenu li').eq(6).is(':visible')==false){
		 prev=3;
		};
		
		$('#submenu li').eq(i+prev).find('a').css({'backgroundPosition':'0 center'});
	});
	//main1_1 today book hover event
	var selectBook=$('#main1_1 .contents #select_book>div');
	var bookInfo=$('#main1_1 .contents .main1_content');
	var todayTimerNum=0;
	var todayTimer;
	var main1Height=bookInfo.find('>.intro>p').not('.intro_tit');
	selectBook.click(function(){
		var i=$(this).index();
		
		selectBook.removeClass('select');
		$(this).addClass('select');
		
		bookInfo.removeClass('on');
		bookInfo.eq(i).addClass('on');
		
		var bookImg=$('#main1_1 .contents>div>a>img')
		bookImg.attr('src','images/b'+(i+1)+'.jpg');
		$('#main1_1 ul.btn li').find('img').attr('src','images/btn_gray.png').attr('alt','off');
		$('#main1_1 ul.btn li').eq(i).find('img').attr('src','images/btn_blue.png').attr('alt','on');
		if(i==0){
			$('#main1_1').css({background:'#e2b2a8'});	
		}else if(i==1){
			$('#main1_1').css({background:'#eacadb'});
		}else if(i==2){
			$('#main1_1').css({background:'#cccccc'});
		}else{
			$('#main1_1').css({background:'#b6c8e2'});
		};
		todayTimerNum=i;
	});

	$('#main1_1 ul.btn li').click(function(){
		var btnIndex=$(this).index();
		selectBook.eq(btnIndex).trigger('click');
		return false;
	});
	function todayInterval(){ 
		todayTimer=setInterval(function(){
			todayTimerNum++;
			if(todayTimerNum==4){todayTimerNum=0;};
			selectBook.eq(todayTimerNum).trigger('click');
		},3000);
	};
	todayInterval();
	
	$('#main1_1').hover(function(){
		clearInterval(todayTimer);
	},function(){
		todayInterval();
	});
	
	
	//main1_2 bestseller click event
	
	$('#main1_2 #chart li').eq(0).click(function(){
		$('#main1_2 ul').removeClass('showing');
		$('#main1_2 .best1_5').addClass('showing');
		$('#main1_2 #chart li').removeClass('bestOn');
		$(this).addClass('bestOn');
		return false;
	});
	$('#main1_2 #chart li').eq(1).click(function(){
		$('#main1_2 ul').removeClass('showing');
		$('#main1_2 .best6_10').addClass('showing');
		$('#main1_2 #chart li').removeClass('bestOn');
		$(this).addClass('bestOn');
		return false;
	});
	
	//main2 nowbooks click
	
	$('#main2 ul.btn li').click(function(){
		var nbIndex=$(this).index();
		var article=$(this).parents('article');
		$('ul.btn li', article).find('img').attr('src','images/btn_gray.png').attr('alt','off');
		$('img',this).attr('src','images/btn_blue.png').attr('alt','on');
		$('ul.now_list',article).hide();
		$('ul.now_list',article).eq(nbIndex).show();
		$('ul.pageBtn li',article).hide();
		$('ul.pageBtn li',article).eq(nbIndex).show();
		return false;
	});
	$('#main2').hover(function(){
		var hoverIndex=$('#main2 ul.btn li').has('img[alt=on]').index();
		var arrow=$('#main2 ul.pageBtn li').eq(hoverIndex);
		arrow.fadeIn(200);
		
	},function(){
		var hoverIndex=$('#main2 ul.btn li').has('img[alt=on]').index();
		var arrow=$('#main2 ul.pageBtn li').eq(hoverIndex);
		arrow.fadeOut(200);
	});
	if($(window).width()<=768){
		var main2Index=$('#main2 ul.btn li').has('img[alt=on]').index();
		var arrow=$('#main2 ul.pageBtn li').eq(main2Index);
		arrow.css('display','block');
		$('#main2 ul.pageBtn li').hover(function(){
			return false;
		},function(){
			return false
		});
		$('#main2 ul.pageBtn li').click(function(){
			$(this).css({opacity:.4});
		});
	};
	$('#main2 ul.pageBtn li').hover(function(){
		$(this).animate({opacity:.4},200);
	},function(){
		$(this).animate({opacity:.2},200);
	});
	$('#main2 ul.pageBtn li').click(function(){
		var arrowIndex=$(this).index();
		var num=1;
		if(arrowIndex==1){
			num=0;
		};
		$('#main2 ul.btn li').eq(num).trigger('click');
	});
	//menu 3-1 tab
	$('#main3_1 ul.new_list li').click(function(){
		var listIndex=$(this).index();
		$('#main3_1 ul.new_list li').removeClass('on');
		$(this).addClass('on');
		$('#main3_1 .new_contents').removeClass('on');
		$('#main3_1 .new_contents').eq(listIndex).addClass('on');
		return false;
	});
	
	
	//chyes, yesblog click
	$('#ch_yes').height($('#yesblog').height());
	$('#ch_yes ul.btn li,#yesblog ul.btn li').click(function(){
		var cbIndex=$(this).index();
		var article=$(this).parents('article');
		$('ul.btn li', article).find('img').attr('src','images/btn_gray.png').attr('alt','off');
		$('img',this).attr('src','images/btn_blue.png').attr('alt','on');
		$('ul.tag_list',article).hide();
		$('ul.tag_list',article).eq(cbIndex).show();
		$('ul.yes_contents',article).hide();
		$('ul.yes_contents',article).eq(cbIndex).show();
		$('ul.pageBtn li',article).hide();
		$('ul.pageBtn li',article).eq($(this).index()).show();
		return false;
	});
	$('#ch_yes, #yesblog').hover(function(){
		var hoverIndex=$('ul.btn li', this).has('img[alt=on]').index();
		var arrow=$('ul.pageBtn li', this).eq(hoverIndex);
		arrow.fadeIn(200);
	},function(){
		var hoverIndex=$('ul.btn li', this).has('img[alt=on]').index();
		var arrow=$('ul.pageBtn li', this).eq(hoverIndex);
		arrow.fadeOut(200);
	});
	if($(window).width()<=768){
		$('#ch_yes, #yesblog').each(function(){
			var snsIndex=$('ul.btn li', this).has('img[alt=on]').index();
			var arrow=$('ul.pageBtn li', this).eq(snsIndex);
			arrow.css('display','block');
			$('#ch_yes ul.pageBtn li, #yesblog ul.pageBtn li').hover(function(){
				return false;
			},function(){
				return false
			});
			$('ul.pageBtn li', this).click(function(){
				$(this).css({opacity:.4});
			});
		});
	};
	$('#ch_yes ul.pageBtn li, #yesblog ul.pageBtn li').hover(function(){
		$(this).animate({opacity:.4},200);
	},function(){
		$(this).animate({opacity:.2},200);
	});
		$('#ch_yes ul.pageBtn li, #yesblog ul.pageBtn li').click(function(){
		var arrowIndex=$(this).index();
		var num=1;
		if(arrowIndex==1){
			num=0;
		};
		$('+ul.btn>li',$(this).parent()).eq(num).trigger('click');
	});
	$(window).resize(function(){
		$('#ch_yes').height($('#yesblog').height());
	});
	$(window).trigger('resize');
});