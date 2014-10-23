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
    
    var contentPackjson = '{\n\n "name": "myGenerator",\n\n"version": "0.1.0",\n\n"description": "test",\n\n"license": "MIT",\n\n"repository": "test",\n\n"author": "THORNG Sovanaryth",\n\n"main": "app/index.js",\n\n"engines": {\n\n"node": ">=0.10.0",\n\n"npm": ">=1.3"\n\n}' ;

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

        this.src.copy("_index.html", "dev/index.html");
        this.src.copy("_modules.js", "dev/modules.js");
        this.src.copy("_routes.js", "dev/routes.js");
        this.src.copy("_bower.json", "bower.json");
        this.src.copy("_bowerrc", ".bowerrc");
        //this.src.copy("_package.json", "package.json");
        this.src.copy("_gulpfile.js", "gulpfile.js");
    }

    switch (this.preprocessor) { 
        case 'less':
            if(this.taskrunner == 'gulp'){
                contentPackjson += ',"devDependencies": {"css-sprite": "^0.9.0-beta2", "gulp-recess": "^1.1.1", "gulp-less": "^1.3.6"}' ;
            }else{
                contentPackjson += ',"devDependencies": {"grunt-lesslint": "^1.1.13", "grunt-recess": "1.0.0", "assemble": "^0.4.42", "assemble-less": "^0.7.0", "grunt-less-imports": "^1.0.0", "grunt-less": "^0.1.7", "grunt-contrib-less": "^0.11.4" }' ;
            };
        break;
        
        case 'sass':
            if(this.taskrunner == 'gulp'){
                contentPackjson += ',"devDependencies": {"gulp-inc": "^0.1.1", "gulp-frontnote": "^0.1.0", "css-sprite": "^0.9.0-beta2", "gulp-ruby-sass": "^0.7.1", "gulp-sass": "^1.2.0", "gulp-sass-graph": "^1.0.0", "gulp-sassdoc": "^1.0.3", "gulp-scss-lint": "^0.1.4"}' ;
            }else{
                contentPackjson += ',"devDependencies": {"grunt-contrib-sass": "^0.8.1", "grunt-contrib-compass": "^1.0.1", "grunt-sass": "^0.16.0", "runt-sass-convert": "^0.2.0", "grunt-sass-directory-import": "^0.1.1"}' ;
            };
        break;
        };
    switch (this.taskrunner) { 
        case 'gulp':
        contentPackjson += ',"devDependencies": {"gulp-cache": "^0.2.4","gulp-cssmin": "^0.1.6","gulp-gzip": "0.0.8","gulp-imagemin": "^1.0.1","gulp-jshint": "^1.8.5","gulp-livereload": "^2.1.1","gulp-notify": "^2.0.0","gulp-rename": "^1.2.0","gulp-ruby-sass": "^0.7.1","gulp-uglify": "^1.0.1","gulp-webp": "^2.0.0" }' ;
        break;
        case 'grunt':
        contentPackjson += ',"devDependencies": {\n\n"grunt": "^0.4.5",\n\n"grunt-contrib-compress": "^0.12.0",\n\n"grunt-contrib-concat": "^0.5.0",\n\n"grunt-contrib-connect": "^0.8.0",\n\n"grunt-contrib-copy": "^0.7.0",\n\n"grunt-contrib-cssmin": "^0.10.0",\n\n"grunt-contrib-imagemin": "^0.8.1",\n\n"grunt-contrib-jshint": "^0.10.0",\n\n"grunt-contrib-uglify": "^0.6.0",\n\n"grunt-contrib-watch": "^0.6.1" }' ;
        break;
        };
    contentPackjson += '}';
    //var json= JSON.stringify( contentPackjson );
    this.dest.write("package.json", contentPackjson);
};
