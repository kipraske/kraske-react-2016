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

	componentDidMount() {
		var self = this;

		urlRouter( '*', function ( ctx ) {
			var pathName = ctx.pathname;
			var seperatorApersand = '';
			if (ctx.querystring){
				seperatorApersand = '&';
			}
			var newQuery = '?' + ctx.querystring + seperatorApersand + 'return_instead=posts-json';
			var dataPath = pathName + newQuery;
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
					hasServerData={this.state.hasServerData}
					initialPage={this.props.initialPage}
					initialPageClass={this.props.initialBodyClass}/>
			);
		}
}

module.exports = Router;
