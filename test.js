'use strict';

var svn = require("./index.js");
var svnPath = "D:\\passwd";
var svnAuthz = "d:\\authz";

var userList = svn.svnUser.read(svnPath);
console.log(userList);

var userGroup = svn.svnAuthz.readGroup(svnAuthz);
console.log(userGroup);

var aclGroup = svn.svnAuthz.readAcl(svnAuthz);
console.log(aclGroup);