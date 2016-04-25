var React = require('react');

const Header = (props) => {
	return (
		<header id="masthead" className="site-header" role="banner">
			<div className="site-logo">
			<a href="/menu" title="Menu">
				<img src="/wp-content/themes/kraske-react-2016/client/static/assets/site-logo.png" alt="Site Logo" />
			</a>
			</div>
		</header>
	);
}

module.exports = Header;
