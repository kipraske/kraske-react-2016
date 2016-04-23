/**
 * Wrapper component for React Application which manages state via the
 * wordpress URL. Using the 'page' library in npm we can hijack normal link
 * execution and instead use the event to get the new data for React to consume
 * all the while updating the current url using the History API to make it
 * appear that you have moved to a new page
 */

var React = require( 'react' );
var urlRouter = require( 'page' );
var request = require( 'superagent' );

var Page = require( './Page.jsx' );
class Router extends React.Component {

	constructor(props) {
		super(props);
    this.state = {
			hasServerData: false,
			posts: []
		}
	}

	/**
	 * Helper function to add Query String Parameter to end of url
	 *
	 * @returns querystring with param appended.
	 */
	static updatePathWithNewQuery(newParam, path, existingQuerystring=''){
		var seperatorApersand = '';
		if (existingQuerystring){
			if (existingQuerystring.indexOf(newParam) !== -1 ) {
				return path + '?' + existingQuerystring;
			} else {
				seperatorApersand = '&';
			}
		}
		return path + '?' + existingQuerystring + seperatorApersand + newParam;
	}

	componentDidMount() {
		var self = this;

		urlRouter( '*', function ( ctx ) {
			var dataPath = Router.updatePathWithNewQuery('return_instead=posts-json', ctx.pathname, ctx.querystring);
			request
				.get( dataPath )
				.end( function( err, res ) {
					if (err) {
						console.error(err);
						return;
					}

					try {
						var data = JSON.parse(res.text);
					} catch(ex) {
						urlRouter.stop();
						window.location.href = ctx.canonicalPath;
						return;
					}

					self.setState({
						hasServerData: true,
						posts: data.posts,
						menu: data.primary_menu,
						postNav: data.post_nav,
						bodyClass: data.body_class,
						template: data.template
					});
					console.log(data);
				});
		});

		urlRouter({
			// Prevents triggering routing on the initial page load
			dispatch: false
		});
	}

	render() {
			return (
				<Page posts={this.state.posts}
					pageClass={this.state.bodyClass}
					template={this.state.template}
					menu={this.state.menu}
					postNav={this.state.postNav}
					hasServerData={this.state.hasServerData}
					initialPage={this.props.initialPage}
					initialPageClass={this.props.initialBodyClass}/>
			);
		}
}

module.exports = Router;
