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
			initialPageMarkup: {
				__html: this.props.initialPage
			},
			posts: []
		}
	}

	componentDidMount() {
		var self = this;

		urlRouter( '*', function ( ctx ) {
			var pathName = ctx.pathname;
			var newQuery = ctx.querystring + 'return_instead=posts-json';
			var dataPath = pathName + '?' + newQuery;
			request
				.get( dataPath )
				.end( function( err, res ) {
					if (err) {
						console.error(err);
						return;
					}
					var returnPosts = JSON.parse(res.text);
					self.setState({
						hasServerData: true,
						posts: returnPosts
					});
					console.log(returnPosts);
				});
		});

		urlRouter({
			dispatch: false
		});
	}

	render() {
		if (this.state.hasServerData) {
			return <Page posts={this.state.posts} />
		} else {
			return <div dangerouslySetInnerHTML={this.state.initialPageMarkup} />
		}
	}

}

module.exports = Router;
