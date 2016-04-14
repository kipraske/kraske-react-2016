var React = require('react');

const Footer = (props) => {
	return(
		<footer className="entry-footer">
			{props.entry_footer}
		</footer>
	);
}

module.exports = Footer;
