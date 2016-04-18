var React = require('react');

const Rollup = (props) => {
	var excerptHTML = {__html: props.post.excerpt};
	var postedOn;
	if (props.post.post_type === 'post'){
		var postedOnHTML = {__html: props.post.template_tags.posted_on};
		postedOn = (
			<div className="entry-meta" dangerouslySetInnerHTML={postedOnHTML} ></div>
		)
	}

	return (
		<article id={props.post.id} className={props.post.css_class}>
			<header classNAme="entry-header">
				<h2 className="entry-title"><a href={props.post.permalink}>{props.post.title}</a></h2>
				{postedOn}
			</header>
			<div className="entry-summary" dangerouslySetInnerHTML={excerptHTML}></div>
		</article>
	);
}

module.exports = Rollup;
