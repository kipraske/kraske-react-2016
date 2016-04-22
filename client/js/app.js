(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var Page = function (_React$Component) {
	_inherits(Page, _React$Component);

	function Page(props) {
		_classCallCheck(this, Page);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Page).call(this, props));

		_this.state = {
			colorPalette: 'color-palette-1',
			pageClass: ''
		};
		return _this;
	}

	_createClass(Page, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var pageClass = nextProps.pageClass;
			var newPaletteClass = pageClass.match(/color-palette-\d/)[0];
			var newClassList = pageClass.replace(/\s?color-palette-\d/g, '');
			this.setState({ colorPalette: newPaletteClass });
			this.setState({ pageClass: newClassList });
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			var _this2 = this;

			// Using request animation Frame to ensure that each function is painted
			// before the next function begins to fire
			window.requestAnimationFrame(function () {
				_this2.clearPalette();
				window.requestAnimationFrame(function () {
					_this2.applyPalette();
				});
			});
		}
	}, {
		key: 'clearPalette',
		value: function clearPalette() {
			this.refs.pageContainer.className = this.state.pageClass + ' ' + 'color-palette-transition';
		}
	}, {
		key: 'applyPalette',
		value: function applyPalette() {
			this.refs.pageContainer.className = this.state.pageClass + ' ' + this.state.colorPalette;
		}
	}, {
		key: 'render',
		value: function render() {

			// If we passed in intial page html instead of a post object render
			// that instead of the "real" react app
			if (!this.props.hasServerData) {
				var intialPageHTML = { __html: this.props.initialPage };
				return React.createElement('div', { id: 'page', ref: 'pageContainer', className: this.props.initialPageClass, dangerouslySetInnerHTML: intialPageHTML });
			}

			// This is the normal post-renderer react apps
			var numberOfPosts = this.props.posts.length;
			var contentElement;
			var contentHeader;

			if (this.props.posts.length === 0) {
				contentElement = React.createElement(None, null);
			} else {
				switch (this.props.template.type) {
					case 'menu':
						contentHeader = React.createElement(
							'h1',
							{ className: 'rollup-title' },
							this.props.template.title
						);
						contentElement = React.createElement(
							'div',
							null,
							' ** TODO menu template **'
						);
						break;
					case 'rollup':
						contentHeader = React.createElement(
							'h1',
							{ className: 'rollup-title' },
							this.props.template.title
						);
						contentElement = [];
						var _iteratorNormalCompletion = true;
						var _didIteratorError = false;
						var _iteratorError = undefined;

						try {
							for (var _iterator = this.props.posts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
								var _post = _step.value;

								contentElement.push(React.createElement(Rollup, { post: _post, key: _post.id }));
							}
						} catch (err) {
							_didIteratorError = true;
							_iteratorError = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion && _iterator.return) {
									_iterator.return();
								}
							} finally {
								if (_didIteratorError) {
									throw _iteratorError;
								}
							}
						}

						break;
					case 'single':
						var post = this.props.posts[0];
						contentElement = React.createElement(Single, { post: post });
				}
			}

			return React.createElement(
				'div',
				{ id: 'page', ref: 'pageContainer', className: this.state.pageClass },
				React.createElement(HeaderSkipLink, null),
				React.createElement(Header, null),
				React.createElement(
					'main',
					{ id: 'content', className: 'site-content' },
					contentHeader,
					contentElement
				),
				React.createElement(Footer, null)
			);
		}
	}]);

	return Page;
}(React.Component);

module.exports = Page;

},{"./content/none.jsx":2,"./content/rollup.jsx":3,"./content/single.jsx":4,"./footer.jsx":5,"./header.jsx":6,"./misc/header-skip-link.jsx":8,"react":"react"}],2:[function(require,module,exports){
"use strict";

// TODO - need this template fleshed out too

var React = require('react');

var None = function None(props) {
	return React.createElement(
		"section",
		{ className: "no-results not-found" },
		React.createElement(
			"header",
			{ className: "page-header" },
			React.createElement(
				"h1",
				{ className: "page-title" },
				" Nothing Found "
			)
		),
		React.createElement(
			"div",
			{ className: "page-content" },
			"** THERE ISN'T ANY POSTS do you want to search? **"
		)
	);
};

module.exports = None;

},{"react":"react"}],3:[function(require,module,exports){
'use strict';

var React = require('react');

var Rollup = function Rollup(props) {
	// wpautop...
	var excerptHTML = { __html: '<p>' + props.post.excerpt + '</p>' };

	var postedOn;
	if (props.post.post_type === 'post') {
		var postedOnHTML = { __html: props.post.template_tags.posted_on };
		postedOn = React.createElement('div', { className: 'entry-meta', dangerouslySetInnerHTML: postedOnHTML });
	}

	var iconHTML = { __html: props.post.template_tags.category.icon };

	var articleClass = props.post.css_class + ' rollup-item';

	return React.createElement(
		'article',
		{ id: props.post.id, className: articleClass },
		React.createElement(
			'header',
			{ classNAme: 'entry-header' },
			React.createElement(
				'h2',
				{ className: 'entry-title' },
				React.createElement(
					'a',
					{ href: props.post.permalink },
					props.post.title
				)
			),
			postedOn
		),
		React.createElement('div', { className: 'entry-cat-icon', dangerouslySetInnerHTML: iconHTML }),
		React.createElement('div', { className: 'entry-summary', dangerouslySetInnerHTML: excerptHTML })
	);
};

module.exports = Rollup;

},{"react":"react"}],4:[function(require,module,exports){
'use strict';

var React = require('react');

var Single = function Single(props) {
	var contentHTML = { __html: props.post.content };
	var postedOn;
	if (props.post.post_type === 'post') {
		var postedOnHTML = { __html: props.post.template_tags.posted_on };
		postedOn = React.createElement('div', { className: 'entry-meta', dangerouslySetInnerHTML: postedOnHTML });
	}

	return React.createElement(
		'article',
		{ id: props.post.id, className: props.post.css_class },
		React.createElement(
			'header',
			{ classNAme: 'entry-header' },
			React.createElement(
				'h1',
				{ className: 'entry-title' },
				props.post.title
			),
			postedOn
		),
		React.createElement('div', { className: 'entry-content', dangerouslySetInnerHTML: contentHTML })
	);
};

module.exports = Single;

},{"react":"react"}],5:[function(require,module,exports){
"use strict";

var React = require('react');

var Footer = function Footer(props) {
	return React.createElement(
		"footer",
		{ id: "colophon", className: "site-footer", role: "contentinfo" },
		React.createElement(
			"div",
			{ className: "site-info" },
			"Copyright © Kristofer Raske 2016 S.D.G. Powered by ",
			React.createElement(
				"a",
				{ href: "https://wordpress.org/" },
				" Wordpress "
			),
			" and ",
			React.createElement(
				"a",
				{ href: "https://facebook.github.io/react/" },
				" React.js "
			)
		)
	);
};

module.exports = Footer;

},{"react":"react"}],6:[function(require,module,exports){
"use strict";

var React = require('react');

var Header = function Header(props) {
	return React.createElement(
		"header",
		{ id: "masthead", className: "site-header", role: "banner" },
		React.createElement(
			"div",
			{ className: "site-logo" },
			React.createElement(
				"a",
				{ href: "/menu", rel: "home" },
				React.createElement("img", { src: "/wp-content/themes/kraske-react-2016/client/static/assets/site-logo.png", alt: "Site Logo" })
			)
		)
	);
};

module.exports = Header;

},{"react":"react"}],7:[function(require,module,exports){
'use strict';

/**
 * Main entry point for react components
 */

var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('./router.jsx');

var reactRoot = document.getElementById('app-root');
var pageRoot = document.getElementById('page');
ReactDOM.render(React.createElement(Router, { initialPage: pageRoot.innerHTML, initialBodyClass: pageRoot.className }), reactRoot);

},{"./router.jsx":9,"react":"react","react-dom":"react-dom"}],8:[function(require,module,exports){
"use strict";

var React = require('react');

var HeaderSkipLink = function HeaderSkipLink(props) {
	return React.createElement(
		"a",
		{ className: "skip-link screen-reader-text", href: "#content" },
		"Skip to content"
	);
};

module.exports = HeaderSkipLink;

},{"react":"react"}],9:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Wrapper component for React Application which manages state via the
 * wordpress URL. Using the 'page' library in npm we can hijack normal link
 * execution and instead use the event to get the new data for React to consume
 * all the while updating the current url using the History API to make it
 * appear that you have moved to a new page
 */

var React = require('react');
var urlRouter = require('page');
var request = require('superagent');

var Page = require('./Page.jsx');

var Router = function (_React$Component) {
	_inherits(Router, _React$Component);

	function Router(props) {
		_classCallCheck(this, Router);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Router).call(this, props));

		_this.state = {
			hasServerData: false,
			posts: []
		};
		return _this;
	}

	/**
  * Helper function to add Query String Parameter to end of url
  *
  * @return querystring with param appended.
  */


	_createClass(Router, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var self = this;

			urlRouter('*', function (ctx) {
				var dataPath = Router.updatePathWithNewQuery('return_instead=posts-json', ctx.pathname, ctx.querystring);
				request.get(dataPath).end(function (err, res) {
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
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(Page, { posts: this.state.posts,
				pageClass: this.state.bodyClass,
				template: this.state.template,
				hasServerData: this.state.hasServerData,
				initialPage: this.props.initialPage,
				initialPageClass: this.props.initialBodyClass });
		}
	}], [{
		key: 'updatePathWithNewQuery',
		value: function updatePathWithNewQuery(newParam, path) {
			var existingQuerystring = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

			var seperatorApersand = '';
			if (existingQuerystring) {
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

	}, {
		key: 'parseJSONOrBust',
		value: function parseJSONOrBust(jsonMaybe, bustUrl) {
			try {
				var data = JSON.parse(jsonMaybe);
			} catch (ex) {
				urlRouter.stop();
				window.location.href = bustUrl;
			}
			return data;
		}
	}]);

	return Router;
}(React.Component);

module.exports = Router;

},{"./Page.jsx":1,"page":"page","react":"react","superagent":"superagent"}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvY29tcG9uZW50cy9QYWdlLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2NvbnRlbnQvbm9uZS5qc3giLCJjbGllbnQvY29tcG9uZW50cy9jb250ZW50L3JvbGx1cC5qc3giLCJjbGllbnQvY29tcG9uZW50cy9jb250ZW50L3NpbmdsZS5qc3giLCJjbGllbnQvY29tcG9uZW50cy9mb290ZXIuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvaGVhZGVyLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2luZGV4LmpzeCIsImNsaWVudC9jb21wb25lbnRzL21pc2MvaGVhZGVyLXNraXAtbGluay5qc3giLCJjbGllbnQvY29tcG9uZW50cy9yb3V0ZXIuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQ0FBLElBQUksUUFBUSxRQUFRLE9BQVIsQ0FBUjs7QUFFSixJQUFJLFNBQVMsUUFBUSxjQUFSLENBQVQ7QUFDSixJQUFJLGlCQUFpQixRQUFRLDZCQUFSLENBQWpCO0FBQ0osSUFBSSxTQUFTLFFBQVEsc0JBQVIsQ0FBVDtBQUNKLElBQUksU0FBUyxRQUFRLHNCQUFSLENBQVQ7QUFDSixJQUFJLE9BQU8sUUFBUSxvQkFBUixDQUFQO0FBQ0osSUFBSSxTQUFTLFFBQVEsY0FBUixDQUFUOzs7Ozs7OztJQU9FOzs7QUFFTCxVQUZLLElBRUwsQ0FBWSxLQUFaLEVBQWtCO3dCQUZiLE1BRWE7O3FFQUZiLGlCQUdFLFFBRFc7O0FBRWpCLFFBQUssS0FBTCxHQUFhO0FBQ1osaUJBQWMsaUJBQWQ7QUFDQSxjQUFXLEVBQVg7R0FGRCxDQUZpQjs7RUFBbEI7O2NBRks7OzRDQVVxQixXQUFVO0FBQ25DLE9BQUksWUFBWSxVQUFVLFNBQVYsQ0FEbUI7QUFFbkMsT0FBSSxrQkFBa0IsVUFBVSxLQUFWLENBQWdCLGtCQUFoQixFQUFv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UUFBTDtNQUpYLEVBUjBCO0tBQXJCLENBRk4sQ0FGZ0M7SUFBakIsQ0FBaEI7OztBQUhtQixZQXlCbkIsQ0FBVTtBQUNULGNBQVUsS0FBVjtJQURELEVBekJtQjs7OzsyQkE4Qlg7QUFDUCxVQUNDLG9CQUFDLElBQUQsSUFBTSxPQUFPLEtBQUssS0FBTCxDQUFXLEtBQVg7QUFDWixlQUFXLEtBQUssS0FBTCxDQUFXLFNBQVg7QUFDWCxjQUFVLEtBQUssS0FBTCxDQUFXLFFBQVg7QUFDVixtQkFBZSxLQUFLLEtBQUwsQ0FBVyxhQUFYO0FBQ2YsaUJBQWEsS0FBSyxLQUFMLENBQVcsV0FBWDtBQUNiLHNCQUFrQixLQUFLLEtBQUwsQ0FBVyxnQkFBWCxFQUxuQixDQURELENBRE87Ozs7eUNBNURxQixVQUFVLE1BQTZCO09BQXZCLDRFQUFvQixrQkFBRzs7QUFDcEUsT0FBSSxvQkFBb0IsRUFBcEIsQ0FEZ0U7QUFFcEUsT0FBSSxtQkFBSixFQUF3QjtBQUN2Qix3QkFBb0IsR0FBcEIsQ0FEdUI7SUFBeEI7QUFHQSxVQUFPLE9BQU8sR0FBUCxHQUFhLG1CQUFiLEdBQW1DLGlCQUFuQyxHQUF1RCxRQUF2RCxDQUw2RDs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQW9CN0MsV0FBVyxTQUFRO0FBQ3pDLE9BQUk7QUFDSCxRQUFJLE9BQU8sS0FBSyxLQUFMLENBQVcsU0FBWCxDQUFQLENBREQ7SUFBSixDQUVFLE9BQU0sRUFBTixFQUFVO0FBQ1gsY0FBVSxJQUFWLEdBRFc7QUFFWCxXQUFPLFFBQVAsQ0FBZ0IsSUFBaEIsR0FBdUIsT0FBdkIsQ0FGVztJQUFWO0FBSUYsVUFBTyxJQUFQLENBUHlDOzs7O1FBbkN0QztFQUFlLE1BQU0sU0FBTjs7QUF1RnJCLE9BQU8sT0FBUCxHQUFpQixNQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgSGVhZGVyID0gcmVxdWlyZSgnLi9oZWFkZXIuanN4Jyk7XG52YXIgSGVhZGVyU2tpcExpbmsgPSByZXF1aXJlKCcuL21pc2MvaGVhZGVyLXNraXAtbGluay5qc3gnKTtcbnZhciBSb2xsdXAgPSByZXF1aXJlKCcuL2NvbnRlbnQvcm9sbHVwLmpzeCcpO1xudmFyIFNpbmdsZSA9IHJlcXVpcmUoJy4vY29udGVudC9zaW5nbGUuanN4Jyk7XG52YXIgTm9uZSA9IHJlcXVpcmUoJy4vY29udGVudC9ub25lLmpzeCcpO1xudmFyIEZvb3RlciA9IHJlcXVpcmUoJy4vZm9vdGVyLmpzeCcpO1xuXG4vKipcbiAqIE1haW4gUGFnZSBDb21wb25lbnRcbiAqXG4gKiBBbHNvIGNvbnRyb2xzIHRoZSBmYW5jeSBjb2xvciB0b2dnbGUgb24gcGFnZSBlbGVtZW50c1xuICovXG5jbGFzcyBQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuc3RhdGUgPSB7XG5cdFx0XHRjb2xvclBhbGV0dGU6ICdjb2xvci1wYWxldHRlLTEnLFxuXHRcdFx0cGFnZUNsYXNzOiAnJ1xuXHRcdH1cblx0fVxuXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXtcblx0XHR2YXIgcGFnZUNsYXNzID0gbmV4dFByb3BzLnBhZ2VDbGFzcztcblx0XHR2YXIgbmV3UGFsZXR0ZUNsYXNzID0gcGFnZUNsYXNzLm1hdGNoKC9jb2xvci1wYWxldHRlLVxcZC8pWzBdO1xuXHRcdHZhciBuZXdDbGFzc0xpc3QgPSBwYWdlQ2xhc3MucmVwbGFjZSgvXFxzP2NvbG9yLXBhbGV0dGUtXFxkL2csICcnKTtcblx0XHR0aGlzLnNldFN0YXRlKHtjb2xvclBhbGV0dGU6IG5ld1BhbGV0dGVDbGFzc30pO1xuXHRcdHRoaXMuc2V0U3RhdGUoe3BhZ2VDbGFzczogbmV3Q2xhc3NMaXN0fSk7XG5cdH1cblxuXHRjb21wb25lbnREaWRVcGRhdGUoKXtcblx0XHQvLyBVc2luZyByZXF1ZXN0IGFuaW1hdGlvbiBGcmFtZSB0byBlbnN1cmUgdGhhdCBlYWNoIGZ1bmN0aW9uIGlzIHBhaW50ZWRcblx0XHQvLyBiZWZvcmUgdGhlIG5leHQgZnVuY3Rpb24gYmVnaW5zIHRvIGZpcmVcblx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCAoKSA9PiB7XG5cdFx0XHR0aGlzLmNsZWFyUGFsZXR0ZSgpO1xuXHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSggKCkgPT4ge1xuXHRcdFx0XHR0aGlzLmFwcGx5UGFsZXR0ZSgpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRjbGVhclBhbGV0dGUoKXtcblx0XHR0aGlzLnJlZnMucGFnZUNvbnRhaW5lci5jbGFzc05hbWUgPSB0aGlzLnN0YXRlLnBhZ2VDbGFzcyArICcgJyArICdjb2xvci1wYWxldHRlLXRyYW5zaXRpb24nO1xuXHR9XG5cblx0YXBwbHlQYWxldHRlKCl7XG5cdFx0dGhpcy5yZWZzLnBhZ2VDb250YWluZXIuY2xhc3NOYW1lID0gdGhpcy5zdGF0ZS5wYWdlQ2xhc3MgKyAnICcgKyB0aGlzLnN0YXRlLmNvbG9yUGFsZXR0ZTtcblx0fVxuXG5cdHJlbmRlcigpe1xuXG5cdFx0Ly8gSWYgd2UgcGFzc2VkIGluIGludGlhbCBwYWdlIGh0bWwgaW5zdGVhZCBvZiBhIHBvc3Qgb2JqZWN0IHJlbmRlclxuXHRcdC8vIHRoYXQgaW5zdGVhZCBvZiB0aGUgXCJyZWFsXCIgcmVhY3QgYXBwXG5cdFx0aWYgKCF0aGlzLnByb3BzLmhhc1NlcnZlckRhdGEpe1xuXHRcdFx0dmFyIGludGlhbFBhZ2VIVE1MID0ge19faHRtbDogdGhpcy5wcm9wcy5pbml0aWFsUGFnZX07XG5cdFx0XHRyZXR1cm4gPGRpdiBpZD1cInBhZ2VcIiByZWY9XCJwYWdlQ29udGFpbmVyXCIgY2xhc3NOYW1lPXt0aGlzLnByb3BzLmluaXRpYWxQYWdlQ2xhc3N9IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtpbnRpYWxQYWdlSFRNTH0gLz5cblx0XHR9XG5cblx0XHQvLyBUaGlzIGlzIHRoZSBub3JtYWwgcG9zdC1yZW5kZXJlciByZWFjdCBhcHBzXG5cdFx0dmFyIG51bWJlck9mUG9zdHMgPSB0aGlzLnByb3BzLnBvc3RzLmxlbmd0aDtcblx0XHR2YXIgY29udGVudEVsZW1lbnQ7XG5cdFx0dmFyIGNvbnRlbnRIZWFkZXI7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5wb3N0cy5sZW5ndGggPT09IDApe1xuXHRcdFx0Y29udGVudEVsZW1lbnQgPSA8Tm9uZSAvPjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3dpdGNoICh0aGlzLnByb3BzLnRlbXBsYXRlLnR5cGUpe1xuXHRcdFx0XHRjYXNlICdtZW51Jzpcblx0XHRcdFx0XHRjb250ZW50SGVhZGVyID0gPGgxIGNsYXNzTmFtZT1cInJvbGx1cC10aXRsZVwiPnt0aGlzLnByb3BzLnRlbXBsYXRlLnRpdGxlfTwvaDE+O1xuXHRcdFx0XHRcdGNvbnRlbnRFbGVtZW50ID0gPGRpdj4gKiogVE9ETyBtZW51IHRlbXBsYXRlICoqPC9kaXY+O1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdyb2xsdXAnOlxuXHRcdFx0XHRcdGNvbnRlbnRIZWFkZXIgPSA8aDEgY2xhc3NOYW1lPVwicm9sbHVwLXRpdGxlXCI+e3RoaXMucHJvcHMudGVtcGxhdGUudGl0bGV9PC9oMT47XG5cdFx0XHRcdFx0Y29udGVudEVsZW1lbnQgPSBbXTtcblx0XHRcdFx0XHRmb3IgKGxldCBwb3N0IG9mIHRoaXMucHJvcHMucG9zdHMpe1xuXHRcdFx0XHRcdFx0Y29udGVudEVsZW1lbnQucHVzaCg8Um9sbHVwIHBvc3Q9e3Bvc3R9IGtleT17cG9zdC5pZH0vPik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdzaW5nbGUnOlxuXHRcdFx0XHRcdGxldCBwb3N0ID0gdGhpcy5wcm9wcy5wb3N0c1swXTtcblx0XHRcdFx0XHRjb250ZW50RWxlbWVudCA9IDxTaW5nbGUgcG9zdD17cG9zdH0vPjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBpZD1cInBhZ2VcIiByZWY9XCJwYWdlQ29udGFpbmVyXCIgY2xhc3NOYW1lPXt0aGlzLnN0YXRlLnBhZ2VDbGFzc30+XG5cdFx0XHRcdDxIZWFkZXJTa2lwTGluayAvPlxuXHRcdFx0XHQ8SGVhZGVyIC8+XG5cdFx0XHRcdDxtYWluIGlkPVwiY29udGVudFwiIGNsYXNzTmFtZT1cInNpdGUtY29udGVudFwiPlxuXHRcdFx0XHRcdHtjb250ZW50SGVhZGVyfVxuXHRcdFx0XHRcdHtjb250ZW50RWxlbWVudH1cblx0XHRcdFx0PC9tYWluPlxuXHRcdFx0XHQ8Rm9vdGVyIC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZTtcbiIsIi8vIFRPRE8gLSBuZWVkIHRoaXMgdGVtcGxhdGUgZmxlc2hlZCBvdXQgdG9vXG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IE5vbmUgPSAocHJvcHMpID0+IHtcblx0cmV0dXJuIChcblx0XHQ8c2VjdGlvbiBjbGFzc05hbWU9XCJuby1yZXN1bHRzIG5vdC1mb3VuZFwiPlxuXHRcdFx0PGhlYWRlciBjbGFzc05hbWU9XCJwYWdlLWhlYWRlclwiPlxuXHRcdFx0XHQ8aDEgY2xhc3NOYW1lPVwicGFnZS10aXRsZVwiPiBOb3RoaW5nIEZvdW5kIDwvaDE+XG5cdFx0XHQ8L2hlYWRlcj5cblxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYWdlLWNvbnRlbnRcIj5cblx0XHRcdFx0KiogVEhFUkUgSVNOJ1QgQU5ZIFBPU1RTIGRvIHlvdSB3YW50IHRvIHNlYXJjaD8gKipcblx0XHRcdDwvZGl2PlxuXHRcdDwvc2VjdGlvbj5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBOb25lO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgUm9sbHVwID0gKHByb3BzKSA9PiB7XG5cdC8vIHdwYXV0b3AuLi5cblx0dmFyIGV4Y2VycHRIVE1MID0ge19faHRtbDogJzxwPicgKyBwcm9wcy5wb3N0LmV4Y2VycHQgKyAnPC9wPid9O1xuXG5cdHZhciBwb3N0ZWRPbjtcblx0aWYgKHByb3BzLnBvc3QucG9zdF90eXBlID09PSAncG9zdCcpe1xuXHRcdHZhciBwb3N0ZWRPbkhUTUwgPSB7X19odG1sOiBwcm9wcy5wb3N0LnRlbXBsYXRlX3RhZ3MucG9zdGVkX29ufTtcblx0XHRwb3N0ZWRPbiA9IChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZW50cnktbWV0YVwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtwb3N0ZWRPbkhUTUx9ID48L2Rpdj5cblx0XHQpXG5cdH1cblxuXHR2YXIgaWNvbkhUTUwgPSB7X19odG1sOiBwcm9wcy5wb3N0LnRlbXBsYXRlX3RhZ3MuY2F0ZWdvcnkuaWNvbn07XG5cblx0dmFyIGFydGljbGVDbGFzcyA9IHByb3BzLnBvc3QuY3NzX2NsYXNzICsgJyByb2xsdXAtaXRlbSc7XG5cblx0cmV0dXJuIChcblx0XHQ8YXJ0aWNsZSBpZD17cHJvcHMucG9zdC5pZH0gY2xhc3NOYW1lPXthcnRpY2xlQ2xhc3N9PlxuXHRcdFx0PGhlYWRlciBjbGFzc05BbWU9XCJlbnRyeS1oZWFkZXJcIj5cblx0XHRcdFx0PGgyIGNsYXNzTmFtZT1cImVudHJ5LXRpdGxlXCI+PGEgaHJlZj17cHJvcHMucG9zdC5wZXJtYWxpbmt9Pntwcm9wcy5wb3N0LnRpdGxlfTwvYT48L2gyPlxuXHRcdFx0XHR7cG9zdGVkT259XG5cdFx0XHQ8L2hlYWRlcj5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZW50cnktY2F0LWljb25cIiBkYW5nZXJvdXNseVNldElubmVySFRNTD17aWNvbkhUTUx9PjwvZGl2PlxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJlbnRyeS1zdW1tYXJ5XCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e2V4Y2VycHRIVE1MfT48L2Rpdj5cblx0XHQ8L2FydGljbGU+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUm9sbHVwO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgU2luZ2xlID0gKHByb3BzKSA9PiB7XG5cdHZhciBjb250ZW50SFRNTCA9IHtfX2h0bWw6IHByb3BzLnBvc3QuY29udGVudH07XG5cdHZhciBwb3N0ZWRPbjtcblx0aWYgKHByb3BzLnBvc3QucG9zdF90eXBlID09PSAncG9zdCcpe1xuXHRcdHZhciBwb3N0ZWRPbkhUTUwgPSB7X19odG1sOiBwcm9wcy5wb3N0LnRlbXBsYXRlX3RhZ3MucG9zdGVkX29ufTtcblx0XHRwb3N0ZWRPbiA9IChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZW50cnktbWV0YVwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtwb3N0ZWRPbkhUTUx9ID48L2Rpdj5cblx0XHQpXG5cdH1cblxuXHRyZXR1cm4gKFxuXHRcdDxhcnRpY2xlIGlkPXtwcm9wcy5wb3N0LmlkfSBjbGFzc05hbWU9e3Byb3BzLnBvc3QuY3NzX2NsYXNzfT5cblx0XHRcdDxoZWFkZXIgY2xhc3NOQW1lPVwiZW50cnktaGVhZGVyXCI+XG5cdFx0XHRcdDxoMSBjbGFzc05hbWU9XCJlbnRyeS10aXRsZVwiPntwcm9wcy5wb3N0LnRpdGxlfTwvaDE+XG5cdFx0XHRcdHtwb3N0ZWRPbn1cblx0XHRcdDwvaGVhZGVyPlxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJlbnRyeS1jb250ZW50XCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e2NvbnRlbnRIVE1MfT48L2Rpdj5cblx0XHQ8L2FydGljbGU+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2luZ2xlO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgRm9vdGVyID0gKHByb3BzKSA9PiB7XG5cdHJldHVybiAoXG5cdFx0PGZvb3RlciBpZD1cImNvbG9waG9uXCIgY2xhc3NOYW1lPVwic2l0ZS1mb290ZXJcIiByb2xlPVwiY29udGVudGluZm9cIj5cblx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNpdGUtaW5mb1wiPlxuXHRcdFx0Q29weXJpZ2h0IMKpIEtyaXN0b2ZlciBSYXNrZSAyMDE2IFMuRC5HLiBQb3dlcmVkIGJ5IDxhIGhyZWY9XCJodHRwczovL3dvcmRwcmVzcy5vcmcvXCI+IFdvcmRwcmVzcyA8L2E+IGFuZCA8YSBocmVmPVwiaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvXCI+IFJlYWN0LmpzIDwvYT5cblx0XHQ8L2Rpdj5cblx0XHQ8L2Zvb3Rlcj5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGb290ZXI7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBIZWFkZXIgPSAocHJvcHMpID0+IHtcblx0cmV0dXJuIChcblx0XHQ8aGVhZGVyIGlkPVwibWFzdGhlYWRcIiBjbGFzc05hbWU9XCJzaXRlLWhlYWRlclwiIHJvbGU9XCJiYW5uZXJcIj5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2l0ZS1sb2dvXCI+XG5cdFx0XHQ8YSBocmVmPVwiL21lbnVcIiByZWw9XCJob21lXCI+XG5cdFx0XHRcdDxpbWcgc3JjPVwiL3dwLWNvbnRlbnQvdGhlbWVzL2tyYXNrZS1yZWFjdC0yMDE2L2NsaWVudC9zdGF0aWMvYXNzZXRzL3NpdGUtbG9nby5wbmdcIiBhbHQ9XCJTaXRlIExvZ29cIiAvPlxuXHRcdFx0PC9hPlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9oZWFkZXI+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyO1xuIiwiLyoqXG4gKiBNYWluIGVudHJ5IHBvaW50IGZvciByZWFjdCBjb21wb25lbnRzXG4gKi9cblxudmFyIFJlYWN0ID0gcmVxdWlyZSggJ3JlYWN0JyApO1xudmFyIFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG52YXIgUm91dGVyID0gcmVxdWlyZSggJy4vcm91dGVyLmpzeCcgKTtcblxudmFyIHJlYWN0Um9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnYXBwLXJvb3QnICk7XG52YXIgcGFnZVJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ3BhZ2UnICk7XG5SZWFjdERPTS5yZW5kZXIoPFJvdXRlciBpbml0aWFsUGFnZT17cGFnZVJvb3QuaW5uZXJIVE1MfSBpbml0aWFsQm9keUNsYXNzPXtwYWdlUm9vdC5jbGFzc05hbWV9Lz4sIHJlYWN0Um9vdCk7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBIZWFkZXJTa2lwTGluayA9IChwcm9wcykgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdDxhIGNsYXNzTmFtZT1cInNraXAtbGluayBzY3JlZW4tcmVhZGVyLXRleHRcIiBocmVmPVwiI2NvbnRlbnRcIj5Ta2lwIHRvIGNvbnRlbnQ8L2E+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyU2tpcExpbms7XG4iLCIvKipcbiAqIFdyYXBwZXIgY29tcG9uZW50IGZvciBSZWFjdCBBcHBsaWNhdGlvbiB3aGljaCBtYW5hZ2VzIHN0YXRlIHZpYSB0aGVcbiAqIHdvcmRwcmVzcyBVUkwuIFVzaW5nIHRoZSAncGFnZScgbGlicmFyeSBpbiBucG0gd2UgY2FuIGhpamFjayBub3JtYWwgbGlua1xuICogZXhlY3V0aW9uIGFuZCBpbnN0ZWFkIHVzZSB0aGUgZXZlbnQgdG8gZ2V0IHRoZSBuZXcgZGF0YSBmb3IgUmVhY3QgdG8gY29uc3VtZVxuICogYWxsIHRoZSB3aGlsZSB1cGRhdGluZyB0aGUgY3VycmVudCB1cmwgdXNpbmcgdGhlIEhpc3RvcnkgQVBJIHRvIG1ha2UgaXRcbiAqIGFwcGVhciB0aGF0IHlvdSBoYXZlIG1vdmVkIHRvIGEgbmV3IHBhZ2VcbiAqL1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCAncmVhY3QnICk7XG52YXIgdXJsUm91dGVyID0gcmVxdWlyZSggJ3BhZ2UnICk7XG52YXIgcmVxdWVzdCA9IHJlcXVpcmUoICdzdXBlcmFnZW50JyApO1xuXG52YXIgUGFnZSA9IHJlcXVpcmUoICcuL1BhZ2UuanN4JyApO1xuY2xhc3MgUm91dGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuXHRcdFx0aGFzU2VydmVyRGF0YTogZmFsc2UsXG5cdFx0XHRwb3N0czogW11cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogSGVscGVyIGZ1bmN0aW9uIHRvIGFkZCBRdWVyeSBTdHJpbmcgUGFyYW1ldGVyIHRvIGVuZCBvZiB1cmxcblx0ICpcblx0ICogQHJldHVybiBxdWVyeXN0cmluZyB3aXRoIHBhcmFtIGFwcGVuZGVkLlxuXHQgKi9cblx0c3RhdGljIHVwZGF0ZVBhdGhXaXRoTmV3UXVlcnkobmV3UGFyYW0sIHBhdGgsIGV4aXN0aW5nUXVlcnlzdHJpbmc9Jycpe1xuXHRcdHZhciBzZXBlcmF0b3JBcGVyc2FuZCA9ICcnO1xuXHRcdGlmIChleGlzdGluZ1F1ZXJ5c3RyaW5nKXtcblx0XHRcdHNlcGVyYXRvckFwZXJzYW5kID0gJyYnO1xuXHRcdH1cblx0XHRyZXR1cm4gcGF0aCArICc/JyArIGV4aXN0aW5nUXVlcnlzdHJpbmcgKyBzZXBlcmF0b3JBcGVyc2FuZCArIG5ld1BhcmFtO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhlbHBlciBmdW5jdGlvbiB0byBwYXJzZSByZXNwb25zZSBhcyBKU09OIG9yIHN0b3AgdGhlIHJvdXRlciBhbmQgbmF2aWdhdGVcblx0ICogdG8gdGhhdCB1cmwgaWYgdGhhdCBkb2Vzbid0IHdvcmsgdXN1YWxseSBiZWNhdXNlIHdlIGhhdmUgbm90IHNldCB1cCBhXG5cdCAqIHJvdXRlIG9uIHRoZSBzZXJ2ZXIgc2lkZSBidXQgYWxzbyBpZiB0aGVyZSBpcyBhbiBlcnJvclxuXHQgKlxuXHQgKiBAcGFyYW0gc3RyaW5nIGpzb25NYXliZSBkYXRhIHN0cmluZyB5b3Ugd2FudCB0byBwYXJzZVxuXHQgKiBAcGFyYW0gYnVzdFVybCBpcyB0aGUgdXJsIHlvdSB3aWxsIG5hdmlnYXRlIHRvIGlmIHlvdSBmYWlsIHRvIHBhcnNlXG5cdCAqXG5cdCAqIEByZXR1cm4gb2JqZWN0IGRlY29kZWQganNvbiBkYXRhLlxuXHQgKiBAdXNlcyBnbG9iYWwgd2luZG93LmxvY2F0aW9uXG5cdCAqIEB1c2VzIGdsb2JhbCB1cmxSb3V0ZXJcblx0ICovXG5cdCBzdGF0aWMgcGFyc2VKU09OT3JCdXN0KGpzb25NYXliZSwgYnVzdFVybCl7XG5cdFx0IHRyeSB7XG5cdFx0XHQgdmFyIGRhdGEgPSBKU09OLnBhcnNlKGpzb25NYXliZSk7XG5cdFx0IH0gY2F0Y2goZXgpIHtcblx0XHRcdCB1cmxSb3V0ZXIuc3RvcCgpO1xuXHRcdFx0IHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYnVzdFVybDtcblx0XHQgfVxuXHRcdCByZXR1cm4gZGF0YTtcbiBcdH1cblxuXHRjb21wb25lbnREaWRNb3VudCgpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHR1cmxSb3V0ZXIoICcqJywgZnVuY3Rpb24gKCBjdHggKSB7XG5cdFx0XHR2YXIgZGF0YVBhdGggPSBSb3V0ZXIudXBkYXRlUGF0aFdpdGhOZXdRdWVyeSgncmV0dXJuX2luc3RlYWQ9cG9zdHMtanNvbicsIGN0eC5wYXRobmFtZSwgY3R4LnF1ZXJ5c3RyaW5nKTtcblx0XHRcdHJlcXVlc3Rcblx0XHRcdC5nZXQoIGRhdGFQYXRoIClcblx0XHRcdC5lbmQoIGZ1bmN0aW9uKCBlcnIsIHJlcyApIHtcblx0XHRcdFx0aWYgKGVycikge1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgZGF0YSA9IFJvdXRlci5wYXJzZUpTT05PckJ1c3QocmVzLnRleHQsIGN0eC5jYW5vbmljYWxQYXRoKTtcblxuXHRcdFx0XHRzZWxmLnNldFN0YXRlKHtcblx0XHRcdFx0XHRoYXNTZXJ2ZXJEYXRhOiB0cnVlLFxuXHRcdFx0XHRcdHBvc3RzOiBkYXRhLnBvc3RzLFxuXHRcdFx0XHRcdGJvZHlDbGFzczogZGF0YS5ib2R5X2NsYXNzLFxuXHRcdFx0XHRcdHRlbXBsYXRlOiBkYXRhLnRlbXBsYXRlXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHQvLyBUaGlzIHN0YXJ0cyB0aGUgcm91dGVyXG5cdFx0dXJsUm91dGVyKHtcblx0XHRcdGRpc3BhdGNoOiBmYWxzZVxuXHRcdH0pO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PFBhZ2UgcG9zdHM9e3RoaXMuc3RhdGUucG9zdHN9XG5cdFx0XHRcdFx0cGFnZUNsYXNzPXt0aGlzLnN0YXRlLmJvZHlDbGFzc31cblx0XHRcdFx0XHR0ZW1wbGF0ZT17dGhpcy5zdGF0ZS50ZW1wbGF0ZX1cblx0XHRcdFx0XHRoYXNTZXJ2ZXJEYXRhPXt0aGlzLnN0YXRlLmhhc1NlcnZlckRhdGF9XG5cdFx0XHRcdFx0aW5pdGlhbFBhZ2U9e3RoaXMucHJvcHMuaW5pdGlhbFBhZ2V9XG5cdFx0XHRcdFx0aW5pdGlhbFBhZ2VDbGFzcz17dGhpcy5wcm9wcy5pbml0aWFsQm9keUNsYXNzfS8+XG5cdFx0XHQpO1xuXHRcdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSb3V0ZXI7XG4iXX0=
