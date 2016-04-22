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
	 * @return querystring with param appended.
	 */
	static updatePathWithNewQuery(newParam, path, existingQuerystring=''){
		var seperatorApersand = '';
		if (existingQuerystring){
			seperatorApersand = '&';
		}
		return path + '?' + existingQuerystring + seperatorApersand + newParam;
	}

	/**
	 * Helper function to parse response as JSON or stop the router and navigate
	 * to that url if that doesn't work usually because we have not set up a
	 * route on the server side but also if there is an error
	 *
	 * @param string jsonMaybe data string you want to parse
	 * @param bustUrl is the url you will navigate to if you fail to parse
	 *
	 * @return object decoded json data.
	 * @uses global window.location
	 * @uses global urlRouter
	 */
	 static parseJSONOrBust(jsonMaybe, bustUrl){
		 try {
			 var data = JSON.parse(jsonMaybe);
		 } catch(ex) {
			 urlRouter.stop();
			 window.location.href = bustUrl;
		 }
		 return data;
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

				var data = Router.parseJSONOrBust(res.text, ctx.canonicalPath);

				self.setState({
					hasServerData: true,
					posts: data.posts,
					bodyClass: data.body_class,
					template: data.template
				});
			});
		});

		// This starts the router
		urlRouter({
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
