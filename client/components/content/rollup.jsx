var React = require('react');
var Entry = {
	Header : require('./entry/header.jsx'),
	Footer : require('./entry/footer.jsx'),
	Summary : require('./entry/summary.jsx')
}

const Rollup = (props) => {
	return (
		<article id={props.post.id} className={props.post.css_class}>
			<Entry.Header
				title={props.post.title}
				permalink={props.post.permalink}
				meta={props.post.template_tags.posted_on}
				post_type={props.post.post_type}/>
			<Entry.Summary excerpt={props.post.excerpt} />
		</article>
	);
}

module.exports = Rollup;
