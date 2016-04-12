/**
 *
 */

var React = require( 'react' );
var urlRouter = require( 'page' );
var request = require( 'superagent' );

var Page = require( './Page.jsx' );
class Router extends React.Component {

	constructor(props) {
		TODO - here I am 
	}

	componentDidMount() {

		var self = this;

		// page( '*', function ( ctx ) {
		// 	if ( ctx.state.pageData ) {
		// 		self.setState({ component: <Content data={ ctx.state.pageData } bodyClass="page" /> });
		// 	} else {
		// 		var admin = 'wp-admin';
		// 		var slug = ctx.pathname;
		//
		// 		if ( slug.indexOf( admin ) > -1 ) {
		// 			document.location.href = ctx.path;
		// 			return;
		// 		}
		//
		// 		if(slug.substr(-1) == '/') {
		// 			slug = slug.substr(0, slug.length - 1);
		// 		}
		// 		var part = slug.substring(slug.lastIndexOf('/') + 1);
		// 		var url = "/wp-json/posts/?type[]=page&filter[name]=" + part;
		// 		request
		// 			.get( url )
		// 			.end( function( err, res ) {
		// 				data = JSON.parse( res.text );
		// 				ctx.state.pageData = data;
		// 				ctx.save();
		// 				self.setState({ component: <Content data={ data } bodyClass="page" /> });
		// 			});
		// 	}
		// });

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

		urlRouter({
			dispatch: false
		});
	}

	render() {
		return (
			<Page posts={this.state.posts} />
		);
	}

}

module.exports = Router;
