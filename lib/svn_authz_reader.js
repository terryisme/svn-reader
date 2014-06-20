'use strict';

var fs = require('fs');
var groupResult = [];
var aclResult = [];

exports.readGroup = function(path) {
	var file = fs.readFileSync(path, "utf8");

	if (file === '') {
		console.log(" no authz found");
		return file;
	}

	process(file);

	return JSON.stringify(groupResult);

};

exports.readAcl = function(path) {
	var file = fs.readFileSync(path, "utf8");

	if (file === '') {
		console.log(" no authz found");
		return file;
	}

	process(file);

	return JSON.stringify(aclResult);
};

function processLine(line) {
	var pair = line.split("=");
	if (pair.length !== 2) {
		return null;
	}
	return pair;

}

function process(str) {

	var lines = str.toString().split("\r\n");

	var isGroup = false;
	var isAcl = false;
	
	var aclObj = {
			path : "",
			acl : []
		};

	
	for (var index = 0; index < lines.length; index++) {
		var line = lines[index].trim();
		var firstChar = line.charAt(0);
		
		
		if (line !== '' && firstChar !== '#') {
			if (line === "[groups]") {// groups
				isGroup = true;
				isAcl = false;
				continue;
			}

			if (firstChar === "[" && line.indexOf(":/") > 0) {
				isGroup = false;
				isAcl = true;

				var groupName = line.substr(1, line.length - 2);
				
				if (aclObj.path === '') {
					aclObj.path = groupName;
					
				} else {
					aclResult.push(aclObj);
					
					aclObj = {
						path : "",
						acl : []
					};
				}

				continue;
			}
			
			var pair;
			if (isGroup) {
				pair = processLine(line);
				if (pair !== null) {
					groupResult.push({
						"name" : pair[0].trim(),
						"users" : pair[1].trim().split(",")
					});
				}
			} else if (isAcl) {
				pair = processLine(line);
				if(firstChar === '@') {
					aclObj.acl.push({
						"group" : pair[0].substr(1, pair[0].length - 1),
						"permission" : pair[1]
					});
				}

			}

		}
	}

}
