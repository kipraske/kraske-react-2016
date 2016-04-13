var React = require('react');

var Header = require('./header.jsx');
var Rollup = require('./content/rollup.jsx');
var Single = require('./content/single.jsx');
var None = require('./content/none.jsx');
var Footer = require('./footer.jsx');

const Page = (props) => {
	var numberOfPosts = props.posts.length;
	var contentElement;
	if (numberOfPosts > 1) {
		contentElement = <Rollup />;
	} else if (numberOfPosts === 1) {
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
