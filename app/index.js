'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var myGenerator = yeoman.generators.Base.extend({
    // Intro message
    init: function() {
        this.helperMethod = function () {
            console.log("Welcome Here, we will build your app strcture and install dependencies then packages for you!!! Go take a coffe :p");
        };
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
