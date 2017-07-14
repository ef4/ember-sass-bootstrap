/* eslint-env node */
'use strict';

const path = require('path');
const stew = require('broccoli-stew');

module.exports = {
  name: 'ember-sass-bootstrap',

  treeForStyles() {
    return stew.mv(bootstrapAssetPath('stylesheets'), '.');
  },

  treeForPublic() {
    return stew.mv(bootstrapAssetPath('fonts'), 'fonts');
  },

  treeForVendor() {
    return stew.mv(bootstrapAssetPath('javascripts'), 'bootstrap');
  },

  included(app) {
    while (app.app) {
      app = app.app;
    }

    let plugins = (app.options.bootstrap || {}).plugins;
    if (Array.isArray(plugins)) {
      plugins.forEach(name => app.import('vendor/bootstrap/bootstrap/' + name + '.js'));
    } else if (typeof plugins === 'undefined' || plugins) {
      app.import('vendor/bootstrap/bootstrap.js');
    }
  }
};

function bootstrapAssetPath(which) {
  let bootstrapPath = require.resolve('bootstrap-sass');
  return path.join(path.dirname(bootstrapPath), '..', which);
}
