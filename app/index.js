'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

/*
var myGenerator = yeoman.generators.Base.extend({
    // Intro message
    init: function() {
        console.log("Welcome Here, we will build your app strcture and install dependencies then packages for you!!! Go take a coffe :p");
    },

    // this will create your app folder structure
    scaffoldFolders: function() {
        this.mkdir("dev");
        this.mkdir("dev/assets");
        this.mkdir("dev/assets/fonts");
        this.mkdir("dev/assets/images");
        this.mkdir("dev/components");
        this.mkdir("dev/js");
        this.mkdir("dev/styles");
        this.mkdir("dev/styles/compiled");
        this.mkdir("dev/vendors");

        this.mkdir("preprod");
        this.mkdir("preprod/assets");
        this.mkdir("preprod/assets/fonts");
        this.mkdir("preprod/assets/images");
        this.mkdir("preprod/components");
        this.mkdir("preprod/js");
        this.mkdir("preprod/styles");
        this.mkdir("preprod/vendors");

        this.mkdir("prod");

        this.mkdir("tests");
        this.mkdir("tests/e2e");
    },

    copyMainFiles: function() {
        this.src.copy("_index.html", "dev/index.html");
        this.src.copy("_modules.js", "dev/modules.js");
        this.src.copy("_routes.js", "dev/routes.js");
        this.src.copy("_bower.json", "bower.json");
        this.src.copy("_bowerrc", ".bowerrc");
        this.src.copy("_package.json", "package.json");
        this.src.copy("_gulpfile.js", "gulpfile.js");
    },

    // install dependencies and required packages
    install: function() {
        this.installDependencies();
    },
});

module.exports = myGenerator;
*/

/* --- New Generator based on Starter Angular or Static Website --- */
var myGenerator = module.exports = function myGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function(){
        this.installDependencies();
    });
};

util.inherits(myGenerator, yeoman.generators.Base);

// prompts user with which projects he could start
myGenerator.prototype.askFor = function askFor() {
    var cb = this.async();
    console.log(this.yeoman);

    var prompts = [
    {
        type: 'list',
        name: 'baseProject',
        message: 'What kind of project would like to start with?',
        choices: ['Static website', 'Angular app'],
        default: 'angularApp'
    },
    {
        type :'list',
        name: 'bootstrap',
        message: 'bootstrap or foundation?',
        choices: ['bootstrap', 'foundation'],
        default: 'foundation'
    },
    {
        type :'list',
        name: 'preprocessor',
        message: 'Which css preprocessors do you prefer?',
        choices: ['less', 'sass'],
        default: 'sass'
    },
    {
        type :'list',
        name: 'taskrunner',
        message: 'Taskrunner will help you to automate lots of things, choose one that suits your needs!!!',
        choices: ['grunt', 'gulp'],
        default: 'gulp'
    },
    ];

    this.prompt(prompts, function(props) {
        this.baseProject = props.baseProject;
        this.bootstrap  = props.bootstrap;
        this.preprocessor = props.preprocessor;
        this.taskrunner = props.taskrunner;
        cb();
    }.bind(this));
};

// build the project folder structure depending on the user choice
//choice site static
myGenerator.prototype.build = function build() {
    this.mkdir("dev");
    this.mkdir("dev/assets");
    this.mkdir("dev/assets/fonts");
    this.mkdir("dev/assets/images");
    this.mkdir("dev/js");
    this.mkdir("dev/styles");
    this.mkdir("dev/styles/compiled");
    this.mkdir("dev/vendors");
    this.mkdir("prod");
        
    //definition to the end line & the space
    var br = '\n';
    var space = '    ';
        
    //create content to package.json
    var contentPackjson = '{'
                        +br+'"name": "myGenerator",'
                        +br+'"version": "0.1.0",'
                        +br+'"description": "test",'
                        +br+'"license": "MIT",'
                        +br+'"repository": "test",'
                        +br+'"author": "THORNG Sovanaryth",'
                        +br+'"main": "app/index.js",'
                        +br+'"engines": {'
                        +br+'"node": ">=0.10.0",'
                        +br+'"npm": ">=1.3"'
                        +br+'}' ;
        
    //create content to bower.json
    var contentBowerjson = '{'
                        +br+'"name": "ProjectFront",'
                        +br+'"version": "0.0.1",'
                        +br+'  "authors": ['
                        +br+'"sthorng <sthorng@kadrige.com>"'
                        +br+'],'
                        +br+'"description": "html5 framework,';
    
        
    // description compared to choice   
    if(this.baseProject == "Angular app"){
        contentBowerjson += ' angular lib,';
    }
    switch (this.bootstrap)
    {
        case 'bootstrap':
        contentBowerjson +=' bootstrap,';

        break;
        case 'foundation':
        contentBowerjson += 'fondation,';
    }


    contentBowerjson += ' jquery, css icons",'
                     +br+ '"moduleType": ['
                     +br+  '"globals"'
                     +br+ '],'
                     +br+ '"keywords": ['
                     +br+ '"jquery",'
                     +br+ '"responsive",'
                     +br+ '"css3",'
                     +br+ '"html5",';

    //keywords compared to choice   
    if(this.baseProject == "Angular app"){
            contentBowerjson += br+'"angular",'
                                +br+'"webapp",';
    }
    switch (this.bootstrap)
    {
        case 'bootstrap':
        contentBowerjson += br+'"bootstrap"';

        break;
        case 'foundation':
        contentBowerjson += br+'"foundation"';
    }

    contentBowerjson += br+'],'
                        +br+'"license": "MIT",'
                        +br+'"ignore": ['
                        +br+'"**/.*",'
                        +br+'"node_modules",'
                        +br+'"bower_components",'
                        +br+'"dev/vendors",'
                        +br+'"test",'
                        +br+'"tests"'
                        +br+'],'
                        +br+'"dependencies": {';

    //keywords compared to choice   
    if(this.baseProject == "Angular app"){
            contentBowerjson += br+'"angular": "~1.3.0",'
                                +br+'"angular-animate": "~1.3.0",'
                                +br+'"angular-cookies": "~1.3.0",'
                                +br+'"angular-loader": "~1.3.0",'
                                +br+'"angular-mocks": "~1.3.0",'
                                +br+'"angular-resource": "~1.3.0",'
                                +br+'"angular-route": "~1.3.0",'
                                +br+'"angular-sanitize": "~1.3.0",'
                                +br+'"angular-scenario": "~1.3.0",'
                                +br+'"angular-touch": "~1.3.0",';
    }
    switch (this.bootstrap)
    {
        case 'bootstrap':
            contentBowerjson += br+'"bootstrap": "~3.3.0",'; 
        break;
        case 'foundation':
            contentBowerjson += br+'"foundation": "zurb/bower-foundation#~5.4.3",';
    }




    contentBowerjson += br+'"fontawesome": "~4.2.0",'
                    +br+'"jquery": "~2.0.3",' 
                    +br+'"jquery-ui": "~1.11.1",'
                    +br+'"underscore": "~1.5.2"'
                    +br+'}'
                    +br+'}';  
    
//choice site angular
    if(this.baseProject == "Angular app") {
        this.mkdir("dev/components");

        this.mkdir("preprod");
        this.mkdir("preprod/assets");
        this.mkdir("preprod/assets/fonts");
        this.mkdir("preprod/assets/images");
        this.mkdir("preprod/components");
        this.mkdir("preprod/js");
        this.mkdir("preprod/styles");
        this.mkdir("preprod/vendors");

        this.mkdir("tests");
        this.mkdir("tests/e2e");

        //this.src.copy("_index.html", "dev/index.html");
        this.src.copy("_modules.js", "dev/modules.js");
        this.src.copy("_routes.js", "dev/routes.js");
        //this.src.copy("_bower.json", "bower.json");
        this.src.copy("_bowerrc", ".bowerrc");
        //this.src.copy("_package.json", "package.json");
        this.src.copy("_gulpfile.js", "gulpfile.js");
    }
    //incrementing the content according to the choice dependencies
    switch (this.preprocessor) { 
        case 'less':
            if(this.taskrunner == 'gulp'){
                contentPackjson += ',"devDependencies": {'
                                +br+'"css-sprite": "^0.9.0-beta2", '
                                +br+'"gulp-recess": "^1.1.1", '
                                +br+'"gulp-less": "^1.3.6"}' ;
            }else{
                contentPackjson += ',"devDependencies": {'
                                +br+'"grunt-lesslint": "^1.1.13", '
                                +br+'"grunt-recess": "1.0.0", '
                                +br+'"assemble": "^0.4.42", '
                                +br+'"assemble-less": "^0.7.0", '
                                +br+'"grunt-less-imports": "^1.0.0", '
                                +br+'"grunt-less": "^0.1.7", '
                                +br+'"grunt-contrib-less": "^0.11.4" }' ;
            };
        break;
        
        case 'sass':
            if(this.taskrunner == 'gulp'){
                contentPackjson += ',"devDependencies": {'
                                +br+'"gulp-inc": "^0.1.1", '
                                +br+'"gulp-frontnote": "^0.1.0", '
                                +br+'"css-sprite": "^0.9.0-beta2", '
                                +br+'"gulp-ruby-sass": "^0.7.1", '
                                +br+'"gulp-sass": "^1.2.0", '
                                +br+'"gulp-sass-graph": "^1.0.0", '
                                +br+'"gulp-sassdoc": "^1.0.3", '
                                +br+'"gulp-scss-lint": "^0.1.4"}' ;
            }else{
                contentPackjson += ',"devDependencies": {'
                                +br+'"grunt-contrib-sass": "^0.8.1", '
                                +br+'"grunt-contrib-compass": "^1.0.1", '
                                +br+'"grunt-sass": "^0.16.0", '
                                +br+'"runt-sass-convert": "^0.2.0", '
                                +br+'"grunt-sass-directory-import": "^0.1.1"}' ;
            };
        break;
        };
    switch (this.taskrunner) { 
        case 'gulp':
        contentPackjson += ',"devDependencies": {'
                        +br+'"gulp-cache": "^0.2.4",'
                        +br+'"gulp-cssmin": "^0.1.6",'
                        +br+'"gulp-gzip": "0.0.8",'
                        +br+'"gulp-imagemin": "^1.0.1",'
                        +br+'"gulp-jshint": "^1.8.5",'
                        +br+'"gulp-livereload": "^2.1.1",'
                        +br+'"gulp-notify": "^2.0.0",'
                        +br+'"gulp-rename": "^1.2.0",'
                        +br+'"gulp-ruby-sass": "^0.7.1",'
                        +br+'"gulp-uglify": "^1.0.1",'
                        +br+'"gulp-webp": "^2.0.0" }' ;
        break;
        case 'grunt':
        contentPackjson += ',"devDependencies": {'
                        +br+'"grunt": "^0.4.5",'
                        +br+'"grunt-contrib-compress": "^0.12.0",'
                        +br+'"grunt-contrib-concat": "^0.5.0",'
                        +br+'"grunt-contrib-connect": "^0.8.0",'
                        +br+'"grunt-contrib-copy": "^0.7.0",'
                        +br+'"grunt-contrib-cssmin": "^0.10.0",'
                        +br+'"grunt-contrib-imagemin": "^0.8.1",'
                        +br+'"grunt-contrib-jshint": "^0.10.0",'
                        +br+'"grunt-contrib-uglify": "^0.6.0",'
                        +br+'"grunt-contrib-watch": "^0.6.1" }' ;
        break;
        };
    contentPackjson += '}';
        
        
    //create the package.json
    this.dest.write("package.json", contentPackjson);
    
    //create the bower.json
    this.dest.write("bower.json", contentBowerjson);
        
    //create content to index.html
    var  ChoiceHead = '';
     
    if(this.baseProject == "Angular app")
    { 
        ChoiceHead += space+space+'<script src="vendors/angular/angular.js"></script>'
                +br+space+space+'<script src="vendors/angular-animate/angular-animate.js"></script>'
                +br+space+space+'<script src="vendors/angular-cookies/angular-cookies.js"></script>'
                +br+space+space+'<script src="vendors/angular-loader/angular-loader.js"></script>'
                +br+space+space+'<script src="vendors/angular-mocks/angular-mocks.js"></script>'
                +br+space+space+'<script src="vendors/angular-resource/angular-resource.js"></script>'
                +br+space+space+'<script src="vendors/angular-route/angular-route.js"></script>'
                +br+space+space+'<script src="vendors/angular-sanitize/angular-sanitize.js"></script>'
                +br+space+space+'<script src="vendors/angular-scenario/angular-scenario.js"></script>'
                +br+space+space+'<script src="vendors/angular-touch/angular-touch.js"></script>'
                +br+space+space+'<script src="modules.js"></script>'
                +br+space+space+'<script src="routes.js"></script>';
    };
    switch (this.bootstrap)
    {
        case 'bootstrap':
            ChoiceHead += space+space+'<link rel="stylesheet" href="vendors/bootstrap/css/bootstrap.min.css">'
                        +br+space+space+'<script src="vendors/bootstrap/js/bootstrap.min.js"></script>';
            
        break;
        case 'foundation':
            ChoiceHead += space+space+'<link rel="stylesheet" href="vendors/foundation/css/foundation.css" />'
                        +br+space+space+'<link rel="stylesheet" href="vendors/foundation/css/normalize.css" />'
                        +br+space+space+'<script src="vendors/foundation/js/foundation.js"></script>'
                        +br+space+space+'<script>'
                        +br+space+space+space+'$(document).foundation();'
                        +br+space+space+'</script>';
        break;
    };
        
    var contentIndexHtmlHead = '<!DOCTYPE html>'
                            +br+
                            +br+'<html lang="fr">'
                            +br+
                            +br+space+'<head>'
                            +br+space+space+'<meta charset="UTF-8">'
                            +br+space+space+'<title>New Project</title>'
                            +br+space+space+'<meta name="description" content="">'
                            +br+space+space+'<meta name="keywords" content="">'
                            +br+space+space+'<meta name="author" content="Cegedim Kadrige">'
                            +br+ChoiceHead
                            +br+space+space+'<meta name="viewport" content="width=device-width, initial-scale=1">'
                            +br+space+space+'<script src="vendors/fastclick/lib/fastclick.js"></script>'
                            +br+space+space+'<script src="vendors/modernizr/modernizr.js"></script>'
                            +br+space+space+'<script src="vendors/jquery/jquery.js"></script>'
                            +br+space+space+'<script src="vendors/jquery-ui/jquery-ui.js"></script>'
                            +br+space+'</head>'+br;
    var Header = space+space+'<header>'+br+space+space+'</header>'+br;
    var Section = space+space+'<section>'+br+space+space+'</section>'+br;
    var Footer = space+space+'<footer>'+br+space+space+'</footer>'+br;
    var contentIndexHtmlBody = +br+space+'<body>'
                            +br+Header
                            +Section
                            +Footer
                            +br+space+'</body>'+br;
        
    var contentIndexHtmlEnd = '</html>';
    
    //create the file index.html
    this.dest.write("dev/index.html", (contentIndexHtmlHead+contentIndexHtmlBody+contentIndexHtmlEnd));
};
