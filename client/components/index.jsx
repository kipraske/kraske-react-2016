/**
 * Main entry point for react components
 */

var React = require( 'react' );
var ReactDOM = require('react-dom');
var Router = require( './router.jsx' );

var reactRoot = document.getElementById( 'app-root' )
ReactDOM.render(<Router initialPage={reactRoot.innerHTML} />, reactRoot);
