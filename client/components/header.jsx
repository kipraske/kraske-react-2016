var React = require('react');

const Header = (props) => {
	var logoSrc = '/wp-content/themes/kraske-react-2016/client/static/assets/site-logo.png';
	var logoClass = 'site-logo';
	if (props.isLoading){
		logoSrc = '/wp-admin/images/wpspin_light-2x.gif';
		logoClass = 'site-logo loading';
	}

	return (
		<header id="masthead" className="site-header" role="banner">
			<div className={logoClass}>
				<a href="/menu" title="Menu">
					<img width="100" height="100" src={logoSrc} alt="Site Logo" />
				</a>
			</div>
		</header>
	);
}

module.exports = Header;
