/**
* menu_roll - jQuery Plugin
*
* Version - 0.1
*
* Copyright (c) 2009 Terry M. Schmidt
*
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*
*/

$.fn.menu_roll = function (options) {
	
	// If the user defines options make sure to use them
	options = $.extend({
		rollOverColor : '#0099ff',
		speed		  : 200,
		easing		  : null
	}, options);
	
	// 1. Get the list of links that are going to be MenuRolled
	// 2. Create a copy and set the color the options.rollOverColor
	// 3. Add the new link before the original link and make sure the height is 0
	// 4. Add a hover watcher for the link container. When hovering show the new
	//    link, when unhovered show the original link.
	
	return this.each(function () {
		
		var $menu_item 		= $(this);
		var $originalLink	= $menu_item.find("a:first"),
			dimensions		= $originalLink.getDimensions(true);
		
		$originalLink.absolutize();
		
		var $newLink = $originalLink.clone();
		
		$originalLink.before($newLink);
		$newLink.css({ color : options.rollOverColor, top : '-' + dimensions.height + 'px' });
		$originalLink.parent().css({ width : dimensions.width, height : dimensions.height });
		
		$menu_item.hover(function () {
			$originalLink.stop().animate({ top : dimensions.height }, options.speed, options.easing);
			$newLink.stop().animate({ top : 0 }, options.speed, options.easing);
		}, function () {
			$originalLink.stop().animate({ top : 0 }, options.speed, options.easing);
			$newLink.stop().animate({ top : '-' + dimensions.height }, options.speed, options.easing);
		});
	});
	
}