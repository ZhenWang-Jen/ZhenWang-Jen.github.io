/*
 * index.js
 * Copyright 2017 by Dan Mazzola and ABOR
 */

"use strict;"

const logoArray = [ '../images/works/asu/asu_fork150x150.png',
					'../images/works/asu/asu_sparky150x150.png',
					'../images/works/asu/asu_name150x150.png',
					'../images/works/asu/asu_seal150x150.png'   ];

var index 		= 0;
var logoElement = undefined;

function initialize() {
	logoElement = document.getElementById('logo');
	nextLogoImage();
}

function nextLogoImage() {
	logoElement.src = logoArray[index];
	index++;

	if (index === logoArray.length) {
		index = 0;
	}
}