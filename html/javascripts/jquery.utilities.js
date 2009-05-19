$.fn.absolutize = function() {
	
	return this.each(function () {
		
		var $element = $(this);
		
		if ($element.css('position') == 'absolute') {
			return $element;
		}
		
		if ($element.parent().css('position') == 'relative') {
			var top 	= 0,
				left 	= 0,
				width	= $element[0].clientWidth,
				height	= $element[0].clientHeight;
			
			$element.css({
				position: 'absolute',
				top: top,
				left: left,
				width: width,
				height: height
			}).parent().css({
				width: width,
				height: height
			});
		} else {
			var offsets	= $element.offset();
			var top		= offsets.top,
				left	= offsets.left,
				width	= $element[0].clientWidth,
				height	= $element[0].clientHeight;

			this._originalLeft 	 = left - (parseFloat($element.css('left')) || 0);
			this._originalTop	 = top - (parseFloat($element.css('top')) || 0);
			this._originalWidth  = (parseFloat($element.css('width')) || 0);
			this._originalHeight = (parseFloat($element.css('height')) || 0);

			$element.css({
				position : 'absolute',
				top		 : top,
				left	 : left,
				width	 : width,
				height	 : height
			});
		}
		
		return $element;
	});
	
}

$.fn.to_f = function(value) {
	return parseFloat(value);
}

$.fn.to_i = function(value) {
	return parseInt(value);
}

$.fn.padding = function(value) {
	var $this = $(this);
	var paddingLeft 	= ($this.css('paddingLeft') || 0),
		paddingRight 	= ($this.css('paddingRight') || 0),
		paddingTop		= ($this.css('paddingTop') || 0),
		paddingBottom	= ($this.css('paddingBottom') || 0);
	
	var padding = {
		y 		: $this.to_i(paddingTop) + $this.to_i(paddingBottom),
		x 		: $this.to_i(paddingRight) + $this.to_i(paddingLeft),
		top 	: $this.to_i(paddingTop),
		bottom	: $this.to_i(paddingBottom),
		left 	: $this.to_i(paddingLeft),
		right	: $this.to_i(paddingRight)
	}
	
	return padding;
}

$.fn.margin = function(value) {
	var $this = $(this);
	var marginLeft 		= ($this.css('marginLeft') || 0),
		marginRight 	= ($this.css('marginRight') || 0),
		marginTop	 	= ($this.css('marginTop') || 0),
		marginBottom	= ($this.css('marginBottom') || 0);
	
	var margin = {
		y 		: $this.to_i(marginTop) + $this.to_i(marginBottom),
		x 		: $this.to_i(marginRight) + $this.to_i(marginLeft),
		top 	: $this.to_i(marginTop),
		bottom	: $this.to_i(marginBottom),
		left 	: $this.to_i(marginLeft),
		right	: $this.to_i(marginRight)
	}
	
	return margin;
}

$.fn.border = function(value) {
	var $this = $(this);
	var borderLeft 		= ($this.css('borderLeftWidth') || 0),
		borderRight 	= ($this.css('borderRightWidth') || 0),
		borderTop	 	= ($this.css('borderTopWidth') || 0),
		borderBottom	= ($this.css('borderBottomWidth') || 0);
	
	var border = {
		y 		: $this.to_i(borderTop) + $this.to_i(borderBottom),
		x 		: $this.to_i(borderRight) + $this.to_i(borderLeft),
		top 	: $this.to_i(borderTop),
		bottom	: $this.to_i(borderBottom),
		left 	: $this.to_i(borderLeft),
		right	: $this.to_i(borderRight)
	}
	
	return border;
}

$.fn.getDimensions = function(options) {
	if (options instanceof Object) {
		options = $.extend({
			includeMargins : false
		}, options)
	} else {
		options = { includeMargins : options }
	}
	
	var dimensions = {};
	
	this.each(function () {
		var $this 	= $(this);
		var width 	= $this.padding().x + $this.to_i($this.css('width')),
			height 	= $this.to_i($this.padding().y) + $this.to_i($this.css('height'));
		
		if (options.includeMargins) {
			width  += $this.margin().x;
			height += $this.margin().y;
		}
		
		dimensions = {
			width  : width,
			height : height,
			x	   : width,
			y	   : height
		}
	});
	
	return dimensions;
}