'use strict';

var fs = require('fs');

exports.read = function(path){
	var file = fs.readFileSync(path, "utf8");
	
	if(file === '') {
		console.log(" no user found");
		return file;
	}
	
	console.log("to process the each user info");
	
	return process(file);


};

function processLine(line) {
	var pair = line.split("=");
	if(pair.length !== 2) {
		return null ;
	}
	return pair;
	
}

function process (str) {
	var result = [];
	var lines = str.toString().split("\r\n");
	
	for( var index =0 ;index < lines.length; index++) {
		var line = lines[index];
		if(line !== '' && line.charAt(0) !== '#') {
			var pair = processLine(line);
			if(pair !== null) {
				result.push({"name": pair[0].trim(), "pwd": pair[1].trim()});
			}
		}
	}
	
	return JSON.stringify(result);
	 
 }

