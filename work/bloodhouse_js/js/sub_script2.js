$(function(){
	$('.bar_menu2').hide();
	$('.bar_menu1>li>a').click(function(){
		var a=$(this);
		var list=a.next('.bar_menu2');
		
		if(a.is('.clickEvent')){
			a.removeClass('clickEvent');
		}else{
			$('.bar_menu1>li>a').removeClass('clickEvent');
			a.addClass('clickEvent');
		};
		if(list.is(':visible')){
			list.hide();
		}else{
			$('.bar_menu2').hide();
			list.show();
		}
		return false; 
	});
	
	var tab=$('#tab_ul>li>input:radio')
	var content=$('#area_paragraph>div')
	
	tab.on('click',function(e){
		
		var tg=$(this).parent('li');
				
		i=tg.index();
		
		content.css('display','none');
		content.eq(i).css('display','block');
	});
});