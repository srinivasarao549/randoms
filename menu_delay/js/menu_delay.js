/*global $:true */

$(function () {
	var menu,
		opener,
		levelOpeners,
		levels,
		isMenuOpen = false,
		FADE_SPEED = 250;
		
	function openMenu () {
		menu.fadeTo(FADE_SPEED, 1, function () {
			isMenuOpen = true;
		});
	}
	
	function closeAllLevels () {
		menu.find('.level').hide();
	}
	
	function closeMenu () {
		if (!isMenuOpen) {
			return;
		}
		
		menu.fadeTo(FADE_SPEED, 0, function () {
			closeAllLevels();
			isMenuOpen = false;
		});
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
		
	menu = $('.menu');
	opener = $('.opener');
	levelOpeners = $('li', menu);
	levels = $('.level');
	
	menu
		.css({
			'visibility': 'visible'
		})
		.fadeTo(0, 0);
	
	opener
		.mouseover(function (ev) {
			ev.preventDefault();
			openMenu();
		});
		
	levelOpeners
		.each(function (index, el) {
			var correspondingLevel;
				
			el = $(el);
			correspondingLevel = getLevelForOpener(el);
			
			correspondingLevel.position({
				'my': 'left top',
				'at': 'right top',
				'of': el,
				'offset': '5 8',
				'collision': 'none'
			});
		});
		
	levels.css({
		'visibility': 'visible',
		'display': 'none'
	});
		
	menu
		.delegate('li', 'mouseover', function () {
			var el = $(this);
			
			if (!el.is(':visible')) {
				return;
			}
			
			openLevelForOpener(el);
		})
		.bind('mouseleave', function (ev) {
			closeMenu();
		});
});