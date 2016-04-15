// TODO - probably needed to implement comments later, but at the moment
// let's not use this for now

var React = require('react');

const Footer = (props) => {
	var footerContentHTML = {__html: props.content};
	return(
		<footer className="entry-footer" dangerouslySetInnerHTML={footerContentHTML}></footer>
	);
}

module.exports = Footer;
