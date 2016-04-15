var React = require('react');
var Entry = {
	Header : require('./entry/header.jsx'),
	Footer : require('./entry/footer.jsx'),
}

const Single = (props) => {
	var contentHTML = {__html: props.post.content};
	return (
		<article id={props.post.id} className={props.post.css_class}>
			<Entry.Header
				title={props.post.title}
				permalink={props.post.permalink}
				meta={props.post.template_tags.posted_on}
				post_type={props.post.post_type}/>

			<div className="entry-content" dangerouslySetInnerHTML={contentHTML}></div>

			<Entry.Footer />
		</article>
	);
}

module.exports = Single;
