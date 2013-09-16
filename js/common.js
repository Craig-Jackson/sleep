$(function(){
	$('.clock').on('click', function(e){
		e.preventDefault();

		$(this).fadeOut(400);
		$('body').addClass('open');
		setTimeout(function(){ 
			changeStage('1'); 
			$('.sleep-timeline').addClass('in');
			$('.sleep-timeline li').first().next().addClass('active');
			var timelineMove = setInterval(timeline, 2000);

			$('.marker').each(function(){
				$(this).removeClass('hidden');
			});
		}, 400);
	});

	$(window).load(function(){ $('.info .info-inner').mCustomScrollbar(); });


	$('.nav-item').on('click', function(e){
		e.preventDefault();

		var stage = $(this).data('stage');
		changeStage(stage);
	});


	$('.marker').on({
		mouseenter: function(){
			var info = $(this).data('info');
			$(this).addClass('current');
			$('.info.'+info).addClass('current');
		},
		mouseleave: function(){
			var info = $(this).data('info');
			$(this).removeClass('current');
			$('.info.'+info).removeClass('current');
		}
	});
	$('.info').on({
		mouseenter: function(){
			var info = $(this).data('info');
			$(this).addClass('current');
			$('.marker.'+info).addClass('current');
		},
		mouseleave: function(){
			var info = $(this).data('info');
			$(this).removeClass('current');
			$('.marker.'+info).removeClass('current');
		}
	});

	$('.marker.brain').on('click', function(){ $('.info.brain').addClass('open'); });

	$('.info.brain .close').on('click', function(e){ e.preventDefault(); $('.info.brain').removeClass('open'); });

	$('.cycles-info').on('click', function(e){
		e.preventDefault();

		if(!$('.cycles-popup').hasClass('open')){ $('.cycles-popup').addClass('open'); }
		else if($('.cycles-popup').hasClass('open')){ $('.cycles-popup').removeClass('open'); }
	});
});


function changeStage(stage){
	if($('.content.active').data('stage') != stage){
		var current = $('.content.active');
		var next = $('.content[data-stage='+stage+']');
		var colour = 'colour-'+stage;		
		$('.container').attr('class', '').addClass('container').addClass(colour);

		if($('.nav-item.active').length > 0){
			$('.nav-item.active').removeClass('active');
			$('.nav-item[data-stage='+stage+']').addClass('active');
		}
		else{
			$('.nav-item[data-stage='+stage+']').addClass('active');
		}

		$(current).addClass('hide');

		setTimeout(function(){
			if($(current).hasClass('active')){ $(current).removeClass('active'); }
			dataChange(stage);
		}, 400);

		if($(next).hasClass('hide')){ $(next).removeClass('hide').addClass('active'); }
		else{ $(next).addClass('active'); }		
	}
}


function dataChange(select){
	var newSection = 'stage'+select;
	$.getJSON('data/data.json', function(data){
		$.each(data.stages, function(i,stage){
			if(i == newSection){
				var brain = this.info.brain;
				var body = this.info.body;
				var waves = this.info.waves;
				var hz = this.info.hz;
				var title = $('.content.active .title').text();

				$('.info.brain .popup-info').empty().append(brain);
				$('.info.brain .title').empty().append(title);
				$('.info.body .info-inner').empty().append(body);
				$('.info.waves .popup-info').empty().append(waves);
				$('.info.waves .hz').empty().append(hz);
			}			
		});
	});
}


function timeline(){
	if($('.sleep-timeline li.active').length > 0){
		var next = $('.sleep-timeline li.active').next();
		if(next.length > 0){
			$('.sleep-timeline li.active').removeClass('active');
			$(next).addClass('active');
		}
		else{
			$('.sleep-timeline li.active').removeClass('active');			
			$('.sleep-timeline li').first().next().addClass('active');
		}
	}
}