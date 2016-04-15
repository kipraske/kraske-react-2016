var React = require('react');

const Summary = (props) => {
	var excerptHTML = {__html: props.excerpt};
	return(
		<div className="entry-summary" dangerouslySetInnerHTML={excerptHTML}></div>
	);
}

module.exports = Summary;
