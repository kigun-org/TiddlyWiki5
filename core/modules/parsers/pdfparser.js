/*\
title: $:/core/modules/parsers/pdfparser.js
type: application/javascript
module-type: parser

The PDF parser embeds a PDF viewer

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var ImageParser = function(type,text,options) {
	var element = {
			type: "element",
			tag: "iframe",
			attributes: {}
		},
		src;
	if(options._canonical_uri) {
		element.attributes.src = {type: "string", value: options._canonical_uri};
	} else if(text) {
		const array = Uint8Array.from(atob(text), c => c.charCodeAt(0));
		const blob = new Blob([array], {type: 'application/pdf'});
		const uri = URL.createObjectURL(blob);
		element.attributes.src = {type: "string", value: uri};
	}
	this.tree = [element];
	this.source = text;
	this.type = type;
};

exports["application/pdf"] = ImageParser;

})();

