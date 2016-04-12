/**
 * Bundling Static Dependencies so we don't have to recompile these large
 * libraries every time we use browserify. These were in global scope anyway
 * so putting them there is no big deal.
 */

var React = require( 'react' );
var ReactDOM = require('react-dom');
var page = require( 'page' );
var request = require( 'superagent' );
