var React = require('react');

const Single = (props) => {
	var contentHTML = {__html: props.post.content};
	var postedOn;
	var categoryList;
	var comments;
	if (props.post.post_type === 'post'){

		var postedOnHTML = {__html: props.post.template_tags.posted_on};
		postedOn = (
			<div className="posted-on" dangerouslySetInnerHTML={postedOnHTML} ></div>
		);

		var categoryListHTML = {__html: props.post.template_tags.category.list}
		categoryList = (
			<div className='post-category' dangerouslySetInnerHTML={categoryListHTML} ></div>
		);

		var commentsHTML = {__html: props.post.template_tags.comments};
		comments = (
			<footer className="entry-footer" dangerouslySetInnerHTML={commentsHTML} />
		);
	}


	return (
		<article id={props.post.id} className={props.post.css_class}>
			<header className="entry-header">
				<h1 className="entry-title">{props.post.title}</h1>
				{categoryList}
				{postedOn}
			</header>
			<div className="entry-content" dangerouslySetInnerHTML={contentHTML}></div>
			{comments}
		</article>
	);
}

module.exports = Single;
