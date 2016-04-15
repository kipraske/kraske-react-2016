var React = require('react');

const Header = (props) => {
	return (
		<header id="masthead" className="site-header" role="banner">
			<div className="site-logo">
			<a href="/" rel="home">
				<img src="/wp-content/themes/kraske-react-2016/client/static/assets/site-logo.png" alt="Site Logo" />
			</a>
			</div>

			<nav id="site-navigation" className="main-navigation" role="navigation">
				<button className="menu-toggle" aria-controls="primary-menu" aria-expanded="false"></button>
					<div className="menu-primary-container"> **MENU GOES HERE** </div>
					<form className="search-form"> **SEARCHFORM GOES HERE** </form>
			</nav>
		</header>
	);
}

module.exports = Header;
