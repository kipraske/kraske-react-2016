/**
 * Main entry point for react components
 */

var React = require( 'react' );
var ReactDOM = require('react-dom');
var Router = require( './router.jsx' );
ReactDOM.render(
	<Router />, document.getElementById( 'page' )
);
