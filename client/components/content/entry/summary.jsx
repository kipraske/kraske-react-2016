var React = require('react');

const Summary = (props) => {
	return(
		<div className="entry-summary">
			{props.excerpt}
		</div>
	);
}

module.exports = Summary;
