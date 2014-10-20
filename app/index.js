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
        this.src.copy("_package.json", "package.json");
        this.src.copy("_gulpfile.js", "gulpfile.js");
    }
};
