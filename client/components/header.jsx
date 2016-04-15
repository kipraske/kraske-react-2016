var React = require('react');

const Header = (props) => {
	return (
		<header id="masthead" className="site-header" role="banner">
			<div className="site-logo">
				**LOGO GOES HERE**
			</div>

			<nav id="site-navigation" className="main-navigation" role="navigation">
				<button className="menu-toggle" aria-controls="primary-menu" aria-expanded="false"></button>
					**MENU GOES HERE**
			</nav>
		</header>
	);
}

module.exports = Header;
