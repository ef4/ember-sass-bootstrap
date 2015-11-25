/* jshint node: true */
'use strict';

var path = require('path');
var stew = require('broccoli-stew');

module.exports = {
  name: 'ember-sass-bootstrap',
  treeForStyles: function() {
    return stew.mv(bootstrapAssetPath('stylesheets'), '.');
  },
  treeForPublic: function() {
    return stew.mv(bootstrapAssetPath('fonts'), 'fonts');
  },
  treeForVendor: function() {
    return stew.mv(bootstrapAssetPath('javascripts'), 'bootstrap');
  },
  included: function(app) {
    var plugins = (app.options.bootstrap || {}).plugins;
    if (Array.isArray(plugins)) {
      plugins.forEach(function(name) {
        console.log("importing " + name);
        app.import('vendor/bootstrap/bootstrap/' + name + '.js');
      });
    } else if (typeof plugins === 'undefined' || plugins) {
      app.import('vendor/bootstrap/bootstrap.js');
    }
  }
};

function bootstrapAssetPath(which) {
  var bootstrapPath = require.resolve('bootstrap-sass');
  return path.join(path.dirname(bootstrapPath), '..', which);
}
