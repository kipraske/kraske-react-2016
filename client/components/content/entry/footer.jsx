var React = require('react');

const Footer = (props) => {
	return(
		<footer className="entry-footer">
			{props.content}
		</footer>
	);
}

module.exports = Footer;
