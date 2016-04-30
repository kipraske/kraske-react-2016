/**
 * Main entry point for react components
 */

var React = require( 'react' );
var ReactDOM = require('react-dom');
var Router = require( './router.jsx' );
var isRunnable = require('../js/progressive.js');
var hasInitialData = (typeof initialReactData !== 'undefined');

if (isRunnable && hasInitialData){
  var reactRoot = document.getElementById( 'app-root' );
  var contentArea = document.querySelector( '.entry-content' );
  var innerContentArea;
  if (contentArea){
    var innerContentArea = contentArea.innerHTML;
  }
  ReactDOM.render(<Router initialData={initialReactData} initialContent={innerContentArea} />, reactRoot);
}
