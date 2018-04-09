'use strict';

/* 0. Initialization */
// Get height on Window resized
$(window).on('resize',function(){
    var slideHeight = $('.slick-track').innerHeight();
	return false;
});


// Show / hide menu
var menuItems = $('.header-top');
var pagenavItems = $('.page-nav');
$('.menu-icon').on('click', function () {
	if (menuItems.hasClass('menu-visible')) {
		menuItems.removeClass('menu-visible');
	} else {
		menuItems.addClass('menu-visible');
	}
});
// Smooth scroll <a> links 
var $root = $('html, body');
$('a.s-scroll').on('click',function() {
    var href = $.attr(this, 'href');
    $root.animate({
        scrollTop: $(href).offset().top
    }, 500, function () {
        window.location.hash = href;
    });
    return false;
});


// Scroll t onext/previou section
$('.p-footer a.down').on('click', function () {
	$.fn.fullpage.moveSectionDown();
});
$('.p-footer a.up').on('click', function () {
	$.fn.fullpage.moveSectionUp();
});


/* 2. Background for page / section */

var background = '#ccc';
var backgroundMask = 'rgba(255,255,255,0.92)';
var backgroundVideoUrl = 'none';

/* Background image as data attribut */
var list = $('.bg-img');

for (var i = 0; i < list.length; i++) {
	var src = list[i].getAttribute('data-image-src');
	list[i].style.backgroundImage = "url('" + src + "')";
	list[i].style.backgroundRepeat = "no-repeat";
	list[i].style.backgroundPosition = "right bottom";
	list[i].style.backgroundSize = "cover";
}

/* Background color as data attribut */
var list = $('.bg-color');
for (var i = 0; i < list.length; i++) {
	var src = list[i].getAttribute('data-bgcolor');
	list[i].style.backgroundColor = src;
}




/* Slide Background variables */
var isSlide = false;
var slideElem = $('.slide');
var arrowElem = $('.p-footer .arrow-d');
var pageElem = $('.section');

/* 3. Init all plugin on load */
$(document).ready(function() {
	
	// Gallery slideshow
	
	var pageSectionDivs = $('.fullpg .section');
	var pageSections = [];
	var pageAnchors = [];
	for (var i = 0; i < pageSectionDivs.length; i++) {
		pageSections.push(pageSectionDivs[i]);
	}
	window.asyncEach(pageSections, function(pageSection , cb){
		var anchor = pageSection.getAttribute('data-section');
		pageAnchors.push(anchor + "");
		cb();
	}, function(err){
		
		/** Init fullpage.js */
		$('#mainpage').fullpage({
			menu: '.qmenu',
	//		anchors: ['home',  'register', 'about-us', 'contact', 'message'],
			anchors: pageAnchors,
			verticalCentered: true,
			responsiveWidth: 481,
			scrollOverflow: false,
			css3: false,
			navigation: true,
			onLeave: function(index, nextIndex, direction){
				arrowElem.addClass('gone');
				pageElem.addClass('transition');
	//			$('.active').removeClass('transition');
				slideElem.removeClass('transition');
				isSlide = false;
			},
			afterLoad: function(anchorLink, index){
				arrowElem.removeClass('gone');
				pageElem.removeClass('transition');
				if(isSlide){
					slideElem.removeClass('transition');
				}
			},

			afterRender: function(){}
		});
		$('#fp-nav').css("margin-top",0);
	});

	
});


// Page Loader : hide loader when all are loaded
$(window).load(function(){
    $('#page-loader').addClass('hidden');
	$('.section').addClass('anim');
	var owl = $('.owl-carousel');
	owl.owlCarousel({
		autoplay: true,
		autoplayTimeout: 4000,
		items: 1,
		loop: true,
		nav: false,
		margin: 40,
		lazyLoad: true,
	});

	var rotate_words = $('.rotate-words'),
	interval = 3000;
	if(rotate_words.length) {
		var next_word_index = 0;
		interval = rotate_words.data("interval");
		if(Modernizr.csstransforms3d) {
				rotate_words.each(function(index, element) {
				$(element).find('span').eq(0).addClass('active');
				setInterval(function(){
					next_word_index = $(element).find('.active').next().length ? $(element).find('.active').next().index() : 0;
					$(element).find('.active').addClass('rotate-out').removeClass('rotate-in active');
					$(element).find('span').eq(next_word_index).addClass('rotate-in active').removeClass('rotate-out');
				},interval);
			});
		}
		else {
			rotate_words.each(function(index, element) {
				$(element).find('span').eq(0).addClass('active').show();
				setInterval(function(){
					next_word_index = $(element).find('.active').next().length ? $(element).find('.active').next().index() : 0;
					$(element).find('.active').removeClass('active').slideUp(500);
					$(element).find('span').eq(next_word_index).addClass('active').slideDown(500);
				},interval);
			});
		}
	}
});