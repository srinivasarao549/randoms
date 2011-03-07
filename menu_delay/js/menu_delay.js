/*global $:true, setTimeout:true, clearTimeout:true */

$(function () {
	var menu,
		opener,
		levelOpeners,
		levels,
		timeoutHandle,
		isMenuOpen = false,
		FADE_SPEED = 250,
		DELAY_TIME = 1000;
	
	/* Actions *************************************/
	function openMenu () {
		menu.fadeTo(FADE_SPEED, 1, function () {
			isMenuOpen = true;
		});
	}
	
	function closeAllLevels () {
		menu.find('.level').hide();
	}
	
	function cancelTimer () {
		if (timeoutHandle) {
			clearTimeout(timeoutHandle);
		}
	}
	
	function closeMenu () {
		if (!isMenuOpen) {
			return;
		}
		
		cancelTimer();
		
		function _close () {
			menu.fadeTo(FADE_SPEED, 0, function () {
				closeAllLevels();
				timeoutHandle = null;
				isMenuOpen = false;
			});
		}
		
		timeoutHandle = setTimeout(_close, DELAY_TIME);
	}
	
	function getLevelForOpener (opener) {
		var elClass = $.trim(opener.attr('class'));
		return menu.find('div.' + elClass);
	}
	
	function openLevelForOpener (opener) {
		if (!isMenuOpen) {
			return;
		}
		
		closeAllLevels();
		getLevelForOpener(opener).show();
	}
	/************************************* Actions */
	
	/* Setup ***************************************/
	menu = $('.menu');
	opener = $('.opener');
	levelOpeners = $('li', menu);
	levels = $('.level');
	
	menu
		.css({
			'visibility': 'visible'
		})
		.fadeTo(0, 0);
	
	levelOpeners
		.each(function (index, el) {
			var correspondingLevel;
				
			el = $(el);
			correspondingLevel = getLevelForOpener(el);
			
			correspondingLevel.position({
				'my': 'left top',
				'at': 'right top',
				'of': el,
				'offset': '5 8'
			});
		});
	
	levels.css({
		'visibility': 'visible',
		'display': 'none'
	});
	/*************************************** Setup */
	
	/* Event bindings ******************************/
	opener
		.mouseover(function (ev) {
			openMenu();
		});
	
	menu
		.delegate('li', 'mouseover', function (ev) {
			openLevelForOpener($(this));
		})
		.bind('mouseleave', function (ev) {
			closeMenu();
		})
		.bind('mouseover', function () {
			cancelTimer();
		});
	/****************************** Event bindings */
});