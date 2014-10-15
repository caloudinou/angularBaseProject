'use strict';

var util = require('util');
var yeoman = require('yeoman-generator');

var mySubGenerator = module.exports = function mySubGenerator(args, options, config) {
	yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(mySubGenerator, yeoman.generators.NamedBase);

mySubGenerator.prototype.generateModule = function generateModule() {
 		this.mkdir("dev/components/" + this.name);

  		var contentController	= "'use strict'; \n \n myApp.controller('" + this.name + "Ctrl', ['$scope', function($scope) { \n \n }]);",
 			contentDirective 	= "'use strict'; \n \n myApp.directive('"+ this.name + "Directive', function() { \n \n });",
 			contentFilter		= "'use strict'; \n \n myApp.filter('" + this.name + "Filter', function () { \n \n });",
 			contentService		= "'use strict'; \n \n myApp.factory('" + this.name + "Service', function() { \n \n });",
 			contentView			= "<div ng-controller='" + this.name + "Ctrl'> \n \n </div>";

 		this.dest.write("dev/components/" + this.name + "/controller.js", contentController);
 		this.dest.write("dev/components/" + this.name + "/directive.js", contentDirective);
 		this.dest.write("dev/components/" + this.name + "/filter.js", contentFilter);
 		this.dest.write("dev/components/" + this.name + "/service.js", contentService);
 		this.dest.write("dev/components/" + this.name + "/view.html", contentView);
};