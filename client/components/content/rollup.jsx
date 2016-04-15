var React = require('react');
var Entry = {
	Header : require('./entry/header.jsx'),
	Footer : require('./entry/footer.jsx'),
}

const Rollup = (props) => {
	var excerptHTML = {__html: props.post.excerpt};

	return (
		<article id={props.post.id} className={props.post.css_class}>
			<Entry.Header
				title={props.post.title}
				permalink={props.post.permalink}
				meta={props.post.template_tags.posted_on}
				post_type={props.post.post_type}/>
			<div className="entry-summary" dangerouslySetInnerHTML={excerptHTML}></div>
		</article>
	);
}

module.exports = Rollup;
