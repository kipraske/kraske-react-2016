/**
 * Main entry point for react components
 */

var React = require( 'react' );
var ReactDOM = require('react-dom');
var Router = require( './router.jsx' );

var reactRoot = document.getElementById( 'app-root' );
var pageRoot = document.getElementById( 'page' );
ReactDOM.render(<Router initialPage={pageRoot.innerHTML} initialBodyClass={pageRoot.className}/>, reactRoot);
