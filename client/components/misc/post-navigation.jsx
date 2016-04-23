var React = require('react');

const PostNavigation = (props) => {
	var navigation_html = {__html:props.content}

	return (
		<nav className="prev-next-posts" dangerouslySetInnerHTML={navigation_html} />
	);
}

module.exports = PostNavigation;
