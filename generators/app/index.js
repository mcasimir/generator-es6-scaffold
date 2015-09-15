'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var camelize = require('camelize');
var slug = require('slug');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to ' + chalk.red('Es6 Scaffold') + ' generator!'
    ));

    var prompts = [{
      name: 'appName',
      message: 'What is your module\'s name ?',
      default: 'My Lib'
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.appSlug = slug(props.appName).toLowerCase();
      this.appModule = camelize(this.appSlug);
      done();
    }.bind(this));

  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_README.md'),
        this.destinationPath('README.md')
      );
    },

    projectfiles: function () {
      var _this = this;
      ['.editorconfig',
        '.gitignore',
        '.jshintrc',
        'gulpfile.js',
        'index.js',
        'es6/index.js',
        'test/myspec.specs.js'].forEach(function(file) {
        _this.fs.copy(
          _this.templatePath(file),
          _this.destinationPath(file)
        );
      });
    }
  },

  install: function () {
    this.installDependencies();
  }
});
