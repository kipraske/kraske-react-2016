var React = require('react');

var Header = require('./header.jsx');
var HeaderSkipLink = require('./misc/header-skip-link.jsx');
var Rollup = require('./content/rollup.jsx');
var Single = require('./content/single.jsx');
var None = require('./content/none.jsx');
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
		var pageClass = nextProps.pageClass;
		var newPaletteClass = pageClass.match(/color-palette-\d/)[0];
		var newClassList = pageClass.replace(/\s?color-palette-\d/g, '');
		this.setState({colorPalette: newPaletteClass});
		this.setState({pageClass: newClassList});
	}

	componentDidUpdate(){
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
		var numberOfPosts = this.props.posts.length;
		var contentElement;
		var contentHeader;

		if (this.props.posts.length === 0){
			contentElement = <None />;
		} else {
			switch (this.props.template.type){
				case 'menu':
					contentHeader = <h1 className="rollup-title">{this.props.template.title}</h1>;
					contentElement = <div> ** TODO menu template **</div>;
					break;
				case 'rollup':
					contentHeader = <h1 className="rollup-title">{this.props.template.title}</h1>;
					contentElement = [];
					for (let post of this.props.posts){
						contentElement.push(<Rollup post={post} key={post.id}/>);
					}
					break;
				case 'single':
					let post = this.props.posts[0];
					contentElement = <Single post={post}/>;
			}
		}

		return (
			<div id="page" ref="pageContainer" className={this.state.pageClass}>
				<HeaderSkipLink />
				<Header />
				<main id="content" className="site-content">
					{contentHeader}
					{contentElement}
				</main>
				<Footer />
			</div>
		);
	}
}

module.exports = Page;
