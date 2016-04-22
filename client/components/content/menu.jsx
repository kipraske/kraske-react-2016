var React = require('react');

const Menu = (props) => {

	var menuItemHTML ={__html:props.menuItems};

	return (
		<nav id="site-navigation" className="main-navigation" role="navigation">
			<form role="search" method="get" className="search-form" action="http://local.react.dev/">
				<label>
				<span className="screen-reader-text">Search for:</span>
				<input type="search" className="search-field" placeholder="Search …" value="" name="s" />
				</label>
			<button type="submit" className="search-submit">🔎</button>
			</form>
			<div dangerouslySetInnerHTML={menuItemHTML} />
		</nav>
	);
}

module.exports = Menu;
