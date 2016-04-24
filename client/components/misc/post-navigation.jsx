var React = require('react');

const PostNavigation = (props) => {

	// wordpress keeps the return_instead query var in the nav, but we don't want
	// to link to that. So strip that out!
	var navHTMLnoLinkQueryString = props.content.replace(/return_instead\=posts-json/g, "");
	var navigation_html = {__html: navHTMLnoLinkQueryString}

	return (
		<nav className="prev-next-posts" dangerouslySetInnerHTML={navigation_html} />
	);
}

module.exports = PostNavigation;
