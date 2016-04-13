/**
 *
 */

var React = require( 'react' );
var urlRouter = require( 'page' );
var request = require( 'superagent' );

var Page = require( './Page.jsx' );
class Router extends React.Component {

	constructor(props) {
		super(props);
    this.state = {
			posts: []
		}
	}

	componentWillMount() {
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
					self.setState({posts: returnPosts});
					console.log(returnPosts);
				});
		});

		urlRouter.start();
	}

	render() {
		return (
			<Page posts={this.state.posts} />
		);
	}

}

module.exports = Router;
