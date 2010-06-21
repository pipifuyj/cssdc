var selectedTooltip = null;
var tooltips = new Array();

//
// Custom Objects and related methods
//
function Tooltip(id, title, text, keepOpen) {
	this.id = id;
	this.title = title;
	this.text = text;
	this.keepOpen = false;
	
	this.copy = copy;
}

function copy() {
	return new Tooltip(this.id, this.title, this.text);
}

function getIndex(id) {
	for (var i=0; i<tooltips.length; i++) {
		if (id == tooltips[i].id) {
			return i;
		}
	}
	return -1;
}

function addTooltipIfNeeded(id, title, text) {
	for (var i=0; i<tooltips.length; i++) {
		if (id == tooltips[i].id) {
			return;
		}
	}
	tooltips.push(new Tooltip(id, title, text));
}

function Position(e) {
	if (!e) {
		var e = window.event;
	}
	
	if (e.pageX || e.pageY) {
		this.x = e.pageX;
		this.y = e.pageY;
	}
	else if (e.clientX || e.clientY) {
		if (document.documentElement && document.documentElement.scrollTop) {
			this.x = e.clientX + document.documentElement.scrollLeft;
			this.y = e.clientY + document.documentElement.scrollTop;
		}
		else {
			this.x = e.clientX + document.body.scrollLeft;
			this.y = e.clientY + document.body.scrollTop;
		}
	}
}

function TooltipHTML(hover) {
	if (hover) {
		this.div = document.getElementById('tooltipHoverDiv');
		this.title = document.getElementById('tooltipHoverTitle');
		this.text = document.getElementById('tooltipHoverText');
	} else {
		this.div = document.getElementById('tooltipDiv');
		this.title = document.getElementById('tooltipTitle');
		this.text = document.getElementById('tooltipText');
	}
}

//
// Event Handlers
//
function keepTooltip(id, title, text, e) {
	addTooltipIfNeeded(id, title, text);
	var position = new Position(e);
	show(id,1,position.x,position.y);
	return false;
}

function show(id, keepOpen, x, y) {
	selectedTooltip = tooltips[getIndex(id)].copy();
	selectedTooltip.keepOpen = keepOpen;
	
	var tooltipHtml = new TooltipHTML(!keepOpen);
	tooltipHtml.title.innerHTML = selectedTooltip.title;
	tooltipHtml.text.innerHTML = selectedTooltip.text;
	tooltipHtml.div.style.top = (10 + y) + 'px';
	tooltipHtml.div.style.left = (10 + x) + 'px';
	tooltipHtml.div.style.visibility = 'visible';
}

function hideTooltip(forceHide) {
	var tooltipHtml = new TooltipHTML(!selectedTooltip.keepOpen);
	tooltipHtml.div.style.visibility = 'hidden';
	selectedTooltip = null;
	return false;
}