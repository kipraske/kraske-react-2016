var React = require('react');

var ajaxStates = require('./enum/ajaxStates.js');

var Header = require('./header.jsx');
var HeaderSkipLink = require('./misc/header-skip-link.jsx');
var Rollup = require('./content/rollup.jsx');
var Single = require('./content/single.jsx');
var None = require('./content/none.jsx');
var Menu = require('./content/menu.jsx');
var PostNav = require('./misc/post-navigation.jsx');
var Footer = require('./footer.jsx');

/**
 * Main Page Component
 *
 * Also controls the fancy color toggle on page elements
 */
class Page extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			colorPalette: 'color-palette-1',
			pageClass: ''
		}
	}

	componentWillReceiveProps(nextProps){
		var pageClass = nextProps.bodyClass || nextProps.initialPageClass;
		var newPaletteClass = pageClass.match(/color-palette-\d/)[0];
		var newClassList = pageClass.replace(/\s?color-palette-\d/g, '');
		this.setState({colorPalette: newPaletteClass});
		this.setState({pageClass: newClassList});
	}

	componentDidUpdate(){
		// It's not pretty, but we should scroll to the top of the page if we
		// "navigate" to another page with a render
		window.document.body.scrollTop = 0;

		// Using request animation Frame to ensure that each function is painted
		// before the next function begins to fire
		window.requestAnimationFrame( () => {
			this.clearPalette();
			window.requestAnimationFrame( () => {
				this.applyPalette();
			});
		});
	}

	clearPalette(){
		this.refs.pageContainer.className = this.state.pageClass + ' ' + 'color-palette-transition';
	}

	applyPalette(){
		this.refs.pageContainer.className = this.state.pageClass + ' ' + this.state.colorPalette;
	}

	render(){

		// If we passed in intial page html instead of a post object render
		// that instead of the "real" react app
		if (!this.props.hasServerData){
			var intialPageHTML = {__html: this.props.initialPage};
			return <div id="page" ref="pageContainer" className={this.props.initialPageClass} dangerouslySetInnerHTML={intialPageHTML} />
		}

		// This is the normal post-renderer react apps
		var contentElement;
		var contentHeader;
		var postNav;
		var isLoading = false;

		if (this.props.ajaxState === ajaxStates.LOADING){
			isLoading = true;
		}

		if (this.props.posts.length === 0){
			contentElement = <None menuItems={this.props.menu}/>;
		} else {
			switch (this.props.template.type){
				case 'menu':
					contentHeader = <h1 className="rollup-title">{this.props.template.title}</h1>;
					contentElement = <Menu menuItems={this.props.menu}/>;
					break;
				case 'rollup':
					contentHeader = <h1 className="rollup-title">{this.props.template.title}</h1>;
					contentElement = [];
					for (let post of this.props.posts){
						contentElement.push(<Rollup post={post} key={post.id}/>);
					}
					postNav = <PostNav content={this.props.postNav} />
					break;
				case 'single':
					let post = this.props.posts[0];
					contentElement = <Single post={post}/>;
			}
		}

		return (
			<div id="page" ref="pageContainer" className={this.state.pageClass}>
				<HeaderSkipLink />
				<Header isLoading={isLoading}/>
				<main id="content" className="site-content">
					{contentHeader}
					{contentElement}
					{postNav}
				</main>
				<Footer />
			</div>
		);
	}
}

module.exports = Page;
