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
			colorPalette: 'color-palette-1'
		}
	}

	// Update Random Color Scheme
	getRandomPaletteClass(){
		const minPalette = 1;
		const maxPalette = 4;
		let randInt = Math.floor(Math.random() * (maxPalette - minPalette + 1) + minPalette);
		return 'color-palette-' + randInt;
	}

	postPaintUpdatePaletteClass(){
		var newPalette = this.getRandomPaletteClass();
		var pageContainer = this.refs.pageContainer;
		var colorPaletteRegex = /color-palette-\d/;
		var newClassList;
		if (!colorPaletteRegex.test(pageContainer.className)) {
			newClassList = pageContainer.className + ' ' + newPalette;
		} else {
			newClassList = pageContainer.className.replace(/color-palette-\d/, newPalette);
		}
		pageContainer.className = newClassList;
	}

	componentDidMount(){
		//this.postPaintUpdatePaletteClass();
	}

	componentWillUpdate(){
		//this.postPaintUpdatePaletteClass();
	}

	render(){

		// If we passed in intial page html instead of a post object render
		// that instead of the "real" react app
		if (typeof this.props.posts === 'undefined' && this.props.initialPage){
			var intialPageHTML = {__html: this.props.initialPage};
			return <div id="page" ref="pageContainer" className={this.props.pageClass} dangerouslySetInnerHTML={intialPageHTML} />
		}

		// This is the normal post-renderer react apps
		var numberOfPosts = this.props.posts.length;
		var contentElement;
		if (numberOfPosts > 1) {
			contentElement = [];
			for (let post of this.props.posts){
				contentElement.push(<Rollup post={post} key={post.id}/>);
			}
		} else if (numberOfPosts === 1) {
			let post = this.props.posts[0];
			contentElement = <Single post={post}/>;
		} else {
			contentElement = <None />;
		}

		return (
			<div id="page" ref="pageContainer" className={this.props.pageClass}>
				<HeaderSkipLink />
				<Header />
				<div id="content" className="site-content">
					<div id="primary" className="content-area">
						<main id="main" className="site-main" role="main">
						{contentElement}
						</main>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

module.exports = Page;
