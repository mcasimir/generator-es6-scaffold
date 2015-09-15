'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('es6 scaffold:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: true })
      .withPrompts({ appName: 'My Lib' })
      .on('end', done);
  });

  it('creates files', function () {

    assert.file([
      'README.md',
      'package.json',
      '.editorconfig',
      '.gitignore',
      '.jshintrc',
      'gulpfile.js',
      'index.js',
      'es6/index.js',
      'test/myspec.specs.js'
    ]);

    var contents = require('fs').readFileSync(path.join(__dirname, 'temp', 'README.md'));
    //
    // //assert.fileContent('README.md', /My Lib/);
    // assert.fileContent('package.json', /my-lib/);
  });
});
