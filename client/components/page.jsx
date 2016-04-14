var React = require('react');

var Header = require('./header.jsx');
var HeaderSkipLink = require('./misc/header-skip-link.jsx');
var Rollup = require('./content/rollup.jsx');
var Single = require('./content/single.jsx');
var None = require('./content/none.jsx');
var Footer = require('./footer.jsx');

const Page = (props) => {
	var numberOfPosts = props.posts.length;
	var contentElement;
	if (numberOfPosts > 1) {
		contentElement = [];
		for (let post of props.posts){
			contentElement.push(<Rollup post={post} key={post.id}/>);
		}
	} else if (numberOfPosts === 1) {
		let post = props.posts[0];
		contentElement = <Single post={post}/>;
	} else {
		contentElement = <None />;
	}

	return (
		<div>
			<HeaderSkipLink />
			<Header />
			<div id="content" className="site-content">
				<div id="primary" className="content-area">
					<main id="main" className="site-main" role="main">
						{contentElement}
					</main>
				</div>
			</div>
			<Footer />
		</div>
	);
}

module.exports = Page;
