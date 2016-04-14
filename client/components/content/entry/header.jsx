var React = require('react');

const Header = (props) => {
	var entryMeta;
	if (props.post_type === 'post'){
		entryMeta = (
			<div className="entry-meta">
				{props.meta}
			</div>
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
