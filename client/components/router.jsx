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

var ajaxStates = require( './enum/ajaxStates.js');
var Page = require( './Page.jsx' );

class Router extends React.Component {

	constructor(props) {
		super(props);

    this.state = {
			ajaxState: ajaxStates.INITIAL,
			posts: props.initialData.posts,
			menu: props.initialData.primary_menu,
			postNav: props.initialData.post_nav,
			bodyClass: props.initialData.body_class,
			template: props.initialData.template,
			ajaxState: ajaxStates.DONE,
		}

		// Separately load content, it is possibly lots of data
		if (props.initialData.posts.length === 1 ){
			this.state.posts[0].content = props.initialContent;
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

		// For a static homepage wordpress doesn't know to fetch the page instead
		// of the default rollup, so we can't use the react routing in this case
		urlRouter( '/', function ( ctx ) {
			urlRouter.stop();
			window.location.href = ctx.canonicalPath
			return;
		});

		// Menu is loaded on initial load and never changes, so we don't need
		// to go to the server to re-render that
		urlRouter('/menu', function ( ctx ) {
			self.setState({
				template: {
					type: 'menu',
					title: 'Menu'
				},
			});
		});

		urlRouter( '*', function ( ctx ) {
			if (self.state.ajaxState === ajaxStates.LOADING){
				return;
			}
			var dataPath = Router.updatePathWithNewQuery('return_instead=posts-json', ctx.pathname, ctx.querystring);
			self.setState({
				ajaxState: ajaxStates.LOADING
			});

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
						posts: data.posts,
						postNav: data.post_nav,
						bodyClass: data.body_class,
						template: data.template,
						ajaxState: ajaxStates.DONE,
					});
				});
		});

		urlRouter({
			// Prevents triggering routing on the initial page load
			dispatch: false
		});
	}

	render() {
			return (
				<Page {...this.state} />
			);
		}
}

module.exports = Router;
