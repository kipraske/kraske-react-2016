// TODO - need this template fleshed out too

var React = require('react');

const None = (props) => {
	return (
		<section className="no-results not-found">
			<header className="page-header">
				<h1 className="page-title"> Nothing Found </h1>
			</header>

			<div className="page-content">
				** THERE ISN'T ANY POSTS do you want to search? **
			</div>
		</section>
	);
}

module.exports = None;
