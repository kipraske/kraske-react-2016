var React = require('react');

var Header = require('./header.jsx');
var Rollup = require('./content/rollup.jsx');
var Single = require('./content/single.jsx');
var None = require('./content/none.jsx');
var Footer = require('./header.jsx');

const Page = (posts) => {
	var numberOfPosts = posts.length;
	<Header />
	if (posts.length > 1) {
		<Rollup />
	} else if (posts.length === 1) {
		<Single />
	} else {
		<None />
	}
	<Footer />
}

module.exports = Page;
