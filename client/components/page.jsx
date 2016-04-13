var React = require('react');

var Header = require('./header.jsx');
var Rollup = require('./content/rollup.jsx');
var Single = require('./content/single.jsx');
var None = require('./content/none.jsx');
var Footer = require('./footer.jsx');

const Page = (posts) => {
	var numberOfPosts = posts.length;
	var contentElement;
	if (posts.length > 1) {
		contentElement = <Rollup />;
	} else if (posts.length === 1) {
		contentElement = <Single />;
	} else {
		contentElement = <None />;
	}

	return (
		<div>
			<Header />
			{contentElement}
			<Footer />
		</div>
	);
}

module.exports = Page;
