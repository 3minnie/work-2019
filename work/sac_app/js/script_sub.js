$(function(){
	$('.ui-content').css('min-height',$(window).innerHeight()-44-98);
	//sub_show day_listShow
	
	var calendar=new Date(),
		year=calendar.getYear()+1900,
		month=calendar.getMonth()+1,
		date=calendar.getDate(),
		dayNum=calendar.getDay(),
		day=['일','월','화','수','목','금','토'],
		nextD=$('.day_date .nextD');
		prevD=$('.day_date .prevD');
		dayList=$('.day_date .day_listShow ul'),
		dlw=dayList.find('li').width(),
		dayShowNum=11,
		maxdlml=dayList.find('li').size()/3-dayShowNum,
		mindlml=0,
		dlml=dlw*(date-1),
		today=$('.today');
	if(dlml>dlw*maxdlml){
		dlml=dlw*maxdlml;
	};
	$('.calendar_day .day_month .dayMtit span').text(month);
	if(month<10){
		month=String('0'+month)
	};
	
	
	$('.today_list>ul.today_show').hide();
	today.find('.t_year').text(year);	
	today.find('.t_month').text(month);	
	today.find('.t_month.monthly').text((calendar.getMonth()+1)+'월');	
	today.find('.t_date').text(date);	
	today.find('.t_day').text(day[dayNum]);	
		
	dayList.css('marginLeft',-dlml); 
	
	dayList.each(function(){
		$(this).find('li').eq(date-1).addClass('on');
	})
	
	
	//prev next click event
	
	nextD.on('tab click',function(){
		
		dlml+=dlw*dayShowNum;
		
		if(dlml>dlw*maxdlml){
			dlml=dlw*maxdlml;
		};
		
		$(this).siblings('.day_listShow').find('ul').stop().animate({marginLeft:-dlml},300);
		return false;
	});
	prevD.on('tab click',function(){
		
		dlml-=dlw*dayShowNum;
		
		if(dlml<0){
			dlml=0
		};
		
		$(this).siblings('.day_listShow').find('ul').stop().animate({marginLeft:-dlml},300);
		return false;
	});
	//drag <-vmouse
	var distanceStart=0,
		distanceEnd=0,
		distance=0;
	dayList.each(function(){
		$(this).on({'vmousedown':function(e){
			e.preventDefault;
			distanceStart=e.pageX;
		},'vmousemove':function(e){
			e.preventDefault;
			distanceEnd=e.pageX;
			distance=(distanceStart-distanceEnd)/15;
			dlml+=distance;
			if(dlml>dlw*maxdlml){
				dlml=dlw*maxdlml;
			}else if(dlml<0){
				dlml=0
			};
			$(this).stop().animate({marginLeft:-dlml},300);
		}});
	});
	//click date
	var thisDate,
		thisdayNum,
		thisDay,
		i,
		listHeight=$('.today_list').innerHeight();
		
	dayList.find('li').on({'tap':function(){
		$(this).siblings('li').removeClass('on');
		$(this).addClass('on');
		thisDate=$(this).find('a').text();
		i=thisDate%2;
		if(thisDate<10){
			thisDate=String('0'+thisDate)
		};
		$(this).parents('.calendar_day').siblings('.today').find('.t_date').text(thisDate);
		thisDay=Math.abs(date-thisDate)%7;
		//console.log('증가 ',(dayNum+thisDay)%7);
		//console.log('감소 ',(dayNum-thisDay)%7);
		//console.log('원래 dayNum값',dayNum);
		thisdayNum=(dayNum+thisDay)%7;	
		if(date-thisDate>0){
			thisdayNum=(dayNum-thisDay)%7;	
			if (dayNum==0){
				thisdayNum=7+(dayNum-thisDay)%7;	
			};
		};
		//console.log('바뀐 dayNum값',thisdayNum);
		
		$(this).parents('.calendar_day').siblings('.today').find('.t_day').text(day[thisdayNum]);	
		date=thisDate;
		dayNum=thisdayNum;
		return false;
	}});
	$.ajax({
		url:'data/data.json',
		dataType:'json',
		type:'get',
		error:function(){
			alert('데이터 불러오기 실패');
		},success:function(data){
			$.get('data/data.json',function(data){
				var sac=data.sac;
					
				//for in문!
				var date,
					dayList1=$('.day_date .day_listShow ul.tab1 li'),
					dayList2=$('.day_date .day_listShow ul.tab2 li'),
					dayList3=$('.day_date .day_listShow ul.tab3 li'),
					dateNum,
					showList;
					
				var calendar=new Date();
				dateNum=calendar.getDate()-1;
				
				dateShows(0,$('#tab1'));
				dateShows(1,$('#tab2'));
				dateShows(2,$('#tab3'));
				
				function dateShows(idx,tg){
					showList=tg.find('.today_list.daily ul.today_show');
					sacArray=sac[idx];
					for(var i in sacArray){
						var shows=sacArray[i];
						date=shows[dateNum];
						for(var j in date){
							var dateContents=date[j];
							if(dateContents.length==0){
								tg.find('.today_list.daily>ul.today_show').hide();
								tg.find('.today_list.daily>p.today_noshow').remove();
								tg.find('.today_list.daily').append('<p class="today_noshow">해당 조건에 맞는 공연/전시가 없습니다</p>');
								tg.find('.today_list.daily>p').css({'color':'#af9ea3','fontSize':14,'textAlign':'center','padding-top':10,'border-top':'1px solid #af9ea3','margin-bottom':30});
								tg.find('.today_list.daily').css('height',291);
								return false;
							};
							if(dateContents.length<3){
								tg.find('.today_list.daily').css('height',291);
							}else{
								tg.find('.today_list.daily').css('height','auto');
							}; 
							
	
							tg.find('.today_list.daily>ul.today_show').show();
							tg.find('.today_list.daily>p.today_noshow').remove();
							for(var k in dateContents){
								var showContents=dateContents[k];
								
								var imgSrc=showContents.imgsrc,
									tit=showContents.title,
									date=showContents.date;	
									
								var showListLi=showList.find('li').eq(k),
									showImg=showListLi.find('img'),
									showTit=showListLi.find('p.tinfoTit'),
									showDate=showListLi.find('p.tinfoDate');
									
									showList.find('li').show();
									showList.find('li').slice(dateContents.length).hide();
									showImg.attr('src',imgSrc);
									showTit.text(tit);
									showDate.text(date);
									
							};
						};
					};					
				};
					
				dayList1.on('tap',function(){
					dateNum=$(this).find('a').text()-1;
					dateShows(0,$('#tab1'));
					
					return false;
				});
				dayList2.on('tap',function(){
					dateNum=$(this).find('a').text()-1;
					dateShows(1,$('#tab2'));
					return false;
				});
				dayList3.on('tap',function(){
					dateNum=$(this).find('a').text()-1;
					dateShows(2,$('#tab3'));
					return false;
				});
			},'json');
		}
		
	});
	
	
	//click month prev next
	var monthInfo=$('.calendar_day .day_month'),
		monthTit=Number(monthInfo.find('.dayMtit span').text())%10,
		prevDm=monthInfo.find('.prevM'),
		nextDm=monthInfo.find('.nextM');
		
	nextDm.on({'tap':function(){
		monthTit++;
		if(monthTit>12){
			monthTit=12;
		};
		monthInfo.find('.dayMtit span').text(monthTit);
		return false;
	}});
	prevDm.on({'tap':function(){
		monthTit--;
		if(monthTit<=0){
			monthTit=1;
		};
		monthInfo.find('.dayMtit span').text(monthTit);
		return false;
	}});
	
	//monthList
	var monthList=$('.calendar_day .month_month .monthListShow ul'),
		mlw=monthList.find('li').width(),
		monthShowNum=5,
		mlml=mlw*(month-1);
		maxmlml=monthList.find('li').size()/3-monthShowNum,
		minmlml=0,
		nextM=monthList.parent().siblings('.nextM'),
		prevM=monthList.parent().siblings('.prevM');
		
	if(mlml>mlw*maxmlml){
		mlml=mlw*maxmlml;
	};
		
	monthList.css('marginLeft',-mlml+mlw*2); 
	monthList.each(function(){
		$(this).find('li').eq(month-1).addClass('on');
	});
	
	
	nextM.on('tab click',function(){
		
		mlml+=mlw*(monthShowNum-2);
		
		if(mlml>mlw*maxmlml){
			mlml=mlw*maxmlml;
		};
		
		$(this).siblings('.monthListShow').find('ul').stop().animate({marginLeft:-mlml},300);
		return false;
	});
	prevM.on('tab click',function(){
		
		mlml-=mlw*(monthShowNum-2);
		
		if(mlml<0){
			mlml=0
		};
		
		$(this).siblings('.monthListShow').find('ul').stop().animate({marginLeft:-mlml},300);
		return false;
	});
	
	var distanceMStart=0,
		distanceMEnd=0,
		distanceM=0;
		
	monthList.each(function(){
		$(this).on({'vmousedown':function(e){
			e.preventDefault;
			distanceMStart=e.pageX;
		},'vmousemove':function(e){
			e.preventDefault;
			distanceMEnd=e.pageX;
			distanceM=(distanceMStart-distanceMEnd)/15;
			mlml+=distanceM;
			if(mlml>mlw*maxmlml){
				mlml=mlw*maxmlml;
			}else if(mlml<0){
				mlml=0
			};

			$(this).stop().animate({marginLeft:-mlml},300);
		}});
	})
	var thisMonth;
	monthList.find('li').on({'tap':function(){
		$(this).siblings('li').removeClass('on');
		$(this).addClass('on');
		thisMonth=$(this).find('a').text();
		$(this).parents('.calendar_day').siblings('.today').find('.t_month.monthly').text(thisMonth);
		var thisList=$(this).parents('.calendar_day').siblings('.today_list.monthly');
		if($(this).hasClass('now')==false){
			thisList.find('>ul.monthly_show').hide();
			thisList.find('>p.monthly_noshow').remove();
			thisList.append('<p class="monthly_noshow">공연/전시를 준비중입니다.</p>');
			thisList.find('>p').css({'color':'#af9ea3','fontSize':14,'textAlign':'center','padding-top':10,'border-top':'1px solid #af9ea3','margin-bottom':60});
			thisList.css('height',291)
			return false;
		}else if($(this).hasClass('now')){
			thisList.css('height','auto');
			$('.today_list.monthly').each(function(){
				$(this).find('>ul.monthly_show').show();
				$(this).find('>p.monthly_noshow').remove();
			});
		};
		return false;
	}});
	
	//tab click effect
	var tab1=$('.tabArea1 ul li'),
		tab2=$('.tabArea2 ul li');
	tab1.on('tap',function(){
		tab1.removeClass('on');
		$(this).addClass('on');
	});
	tab2.on('tap',function(){
		$(this).siblings('li').removeClass('on');
		$(this).addClass('on');
	});
	
});