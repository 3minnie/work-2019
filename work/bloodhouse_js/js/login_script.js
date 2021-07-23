$(function(){
	$('.guideText').each(function(){
		var guideText=this.defaultValue;
		var el=$(this);
		
		if(el.val()==guideText){
			el.addClass('guide');
		};
		el.focus(function(){
			if(el.val()==guideText){
				el.val('');
				el.removeClass('guide');
			};
		});
		el.blur(function(){
			if(el.val()===''){
				el.val(guideText);
				el.addClass('guide');
			};
		});
	});
});