var React = require('react');

const Header = (props) => {
	var entryMeta;
	if (props.post_type === 'post'){
		var metaHTML = {__html: props.meta};
		entryMeta = (
			<div className="entry-meta" dangerouslySetInnerHTML={metaHTML} ></div>
		)
	}

	return(
		<header classNAme="entry-header">
			<h2 className="entry-title"><a href={props.permalink}>{props.title}</a></h2>
			{entryMeta}
		</header>
	);
}

module.exports = Header;
