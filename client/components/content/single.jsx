var React = require('react');

const Single = (props) => {
	var contentHTML = {__html: props.post.content};
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
				<h1 className="entry-title">{props.post.title}</h1>
				{postedOn}
			</header>
			<div className="entry-content" dangerouslySetInnerHTML={contentHTML}></div>
		</article>
	);
}

module.exports = Single;
