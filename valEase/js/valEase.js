/*
jQuery Value Easer v0.1
by Jeremy Kahn - jeremyckahn@gmail.com

Idea of animating a detached DOM element inspired from Ben Nadel:
http://www.bennadel.com/blog/2007-Using-jQuery-s-animate-Method-To-Power-Easing-Based-Iteration.htm

This plugin will call the jQuery animate() method on a value.  It lets you perform animation logic on
something that isn't in the DOM.  An example of where this is useful: animating something in an HTML5
canvas.  Shapes that are drawn in a canvas aren't in the DOM, and therefore can't have jquery.animate()
called on them.  However, you can call $.valEase to achieve the same effect.

Sample usage:

var obj = { prop : 5 };

$.valEase(
	obj, 'prop', {
	to: 20, 
	duration : 1500, 
	step: function(){
		console.log(obj.prop);
	}
});

*/

(function( $ ){

  $.valEase = function(obj, val, options) {
	
	var	dummy = $('<div>')
			.css({ 
				'left' : val || 0 
			});

	dummy.animate({
		'left': (options.to || 0)
	},
	
	$.extend(true, {
		'easing': 'swing',
		'duration': 1000
		},
		 
		options, {
			// This funtion cannot be overridden by the options.
			'step': function(index){
				options.step(index);
				obj[val] = index;
			}
		})
	);
	
	return this;
	
  };
})( jQuery );