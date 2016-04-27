var React = require('react');
var Menu = require('./menu.jsx');

const None = (props) => {
	return (
		<section className="no-results not-found">
			<header className="page-header">
				<h1 className="rollup-title"> Nothing Found </h1>
			</header>

			<div className="page-content">
				<p> We can't seem to find what you were looking for. Here is the menu again so you can get to where you need to go.</p>
				<Menu menuItems={props.menuItems}/>
			</div>
		</section>
	);
}

module.exports = None;
