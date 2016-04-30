(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var ajaxStates = require('./enum/ajaxStates.js');

var Header = require('./header.jsx');
var HeaderSkipLink = require('./misc/header-skip-link.jsx');
var Rollup = require('./content/rollup.jsx');
var Single = require('./content/single.jsx');
var None = require('./content/none.jsx');
var Menu = require('./content/menu.jsx');
var PostNav = require('./misc/post-navigation.jsx');
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
			colorPalette: _this.palleteClassfromPageClass(props.bodyClass),
			pageClass: _this.pageClasswithoutPalleteClass(props.bodyClass)
		};
		return _this;
	}

	_createClass(Page, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			this.setState({
				colorPalette: this.palleteClassfromPageClass(nextProps.bodyClass),
				pageClass: this.pageClasswithoutPalleteClass(nextProps.bodyClass)
			});
		}
	}, {
		key: 'componentWillMount',
		value: function componentWillMount() {
			var _this2 = this;

			window.requestAnimationFrame(function () {
				_this2.applyPalette();
			});
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			var _this3 = this;

			// It's not pretty, but we should scroll to the top of the page if we
			// "navigate" to another page with a render
			window.document.body.scrollTop = 0;

			// Using request animation Frame to ensure that each function is painted
			// before the next function begins to fire
			window.requestAnimationFrame(function () {
				_this3.clearPalette();
				window.requestAnimationFrame(function () {
					_this3.applyPalette();
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
		key: 'palleteClassfromPageClass',
		value: function palleteClassfromPageClass(pageClass) {
			return pageClass.match(/color-palette-\d/)[0];
		}
	}, {
		key: 'pageClasswithoutPalleteClass',
		value: function pageClasswithoutPalleteClass(pageClass) {
			return pageClass.replace(/\s?color-palette-\d/g, '');
		}
	}, {
		key: 'render',
		value: function render() {
			var contentElement;
			var contentHeader;
			var postNav;
			var isLoading = false;

			if (this.props.ajaxState === ajaxStates.LOADING) {
				isLoading = true;
			}

			if (this.props.posts.length === 0) {
				contentElement = React.createElement(None, { menuItems: this.props.menu });
			} else {
				switch (this.props.template.type) {
					case 'menu':
						contentHeader = React.createElement(
							'h1',
							{ className: 'rollup-title' },
							this.props.template.title
						);
						contentElement = React.createElement(Menu, { menuItems: this.props.menu });
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

						postNav = React.createElement(PostNav, { content: this.props.postNav });
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
				React.createElement(Header, { isLoading: isLoading }),
				React.createElement(
					'main',
					{ id: 'content', className: 'site-content' },
					contentHeader,
					contentElement,
					postNav
				),
				React.createElement(Footer, null)
			);
		}
	}]);

	return Page;
}(React.Component);

module.exports = Page;

},{"./content/menu.jsx":2,"./content/none.jsx":3,"./content/rollup.jsx":4,"./content/single.jsx":5,"./enum/ajaxStates.js":6,"./footer.jsx":7,"./header.jsx":8,"./misc/header-skip-link.jsx":10,"./misc/post-navigation.jsx":11,"react":"react"}],2:[function(require,module,exports){
"use strict";

var React = require('react');

var Menu = function Menu(props) {

	var menuItemHTML = { __html: props.menuItems };

	return React.createElement(
		"nav",
		{ id: "site-navigation", className: "main-navigation", role: "navigation" },
		React.createElement(
			"form",
			{ role: "search", method: "get", className: "search-form", action: "/" },
			React.createElement(
				"label",
				null,
				React.createElement(
					"span",
					{ className: "screen-reader-text" },
					"Search for:"
				),
				React.createElement("input", { type: "search", className: "search-field", placeholder: "Search …", name: "s" })
			),
			React.createElement(
				"button",
				{ type: "submit", className: "search-submit" },
				"🔎"
			)
		),
		React.createElement("div", { dangerouslySetInnerHTML: menuItemHTML })
	);
};

module.exports = Menu;

},{"react":"react"}],3:[function(require,module,exports){
'use strict';

var React = require('react');
var Menu = require('./menu.jsx');

var None = function None(props) {
	return React.createElement(
		'section',
		{ className: 'no-results not-found' },
		React.createElement(
			'header',
			{ className: 'page-header' },
			React.createElement(
				'h1',
				{ className: 'rollup-title' },
				' Nothing Found '
			)
		),
		React.createElement(
			'div',
			{ className: 'page-content' },
			React.createElement(
				'p',
				null,
				' We can\'t seem to find what you were looking for. Here is the menu again so you can get to where you need to go.'
			),
			React.createElement(Menu, { menuItems: props.menuItems })
		)
	);
};

module.exports = None;

},{"./menu.jsx":2,"react":"react"}],4:[function(require,module,exports){
'use strict';

var React = require('react');

var Rollup = function Rollup(props) {
	// wpautop...
	var excerptHTML = { __html: '<p>' + props.post.excerpt + '</p>' };

	var postedOn;
	if (props.post.post_type === 'post') {
		var postedOnHTML = { __html: props.post.template_tags.posted_on };
		postedOn = React.createElement('span', { className: 'posted-on', dangerouslySetInnerHTML: postedOnHTML });
	}

	var iconHTML = { __html: props.post.template_tags.category.icon };

	var articleClass = props.post.css_class + ' rollup-item';

	return React.createElement(
		'article',
		{ id: props.post.id, className: articleClass },
		React.createElement(
			'header',
			{ className: 'entry-header' },
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

},{"react":"react"}],5:[function(require,module,exports){
'use strict';

var React = require('react');

var Single = function Single(props) {
	var contentHTML = { __html: props.post.content };
	var postedOn;
	var categoryList;
	var comments;
	if (props.post.post_type === 'post') {

		var postedOnHTML = { __html: props.post.template_tags.posted_on };
		postedOn = React.createElement('div', { className: 'posted-on', dangerouslySetInnerHTML: postedOnHTML });

		var categoryListHTML = { __html: props.post.template_tags.category.list };
		categoryList = React.createElement('div', { className: 'post-category', dangerouslySetInnerHTML: categoryListHTML });

		var commentsHTML = { __html: props.post.template_tags.comments };
		comments = React.createElement('footer', { className: 'entry-footer', dangerouslySetInnerHTML: commentsHTML });
	}

	return React.createElement(
		'article',
		{ id: props.post.id, className: props.post.css_class },
		React.createElement(
			'header',
			{ className: 'entry-header' },
			React.createElement(
				'h1',
				{ className: 'entry-title' },
				props.post.title
			),
			categoryList,
			postedOn
		),
		React.createElement('div', { className: 'entry-content', dangerouslySetInnerHTML: contentHTML }),
		comments
	);
};

module.exports = Single;

},{"react":"react"}],6:[function(require,module,exports){
"use strict";

var ajaxStates = {
	INITIAL: 0,
	LOADING: 3,
	DONE: 4
};

module.exports = ajaxStates;

},{}],7:[function(require,module,exports){
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

},{"react":"react"}],8:[function(require,module,exports){
'use strict';

var React = require('react');

var Header = function Header(props) {
	var logoSrc = '/wp-content/themes/kraske-react-2016/client/static/assets/site-logo.png';
	var logoClass = 'site-logo';
	if (props.isLoading) {
		logoSrc = '/wp-content/themes/kraske-react-2016/client/static/assets/loading.svg';
		logoClass = 'site-logo loading';
	}

	return React.createElement(
		'header',
		{ id: 'masthead', className: 'site-header', role: 'banner' },
		React.createElement(
			'div',
			{ className: logoClass },
			React.createElement(
				'a',
				{ href: '/menu', title: 'Menu' },
				React.createElement('img', { width: '100', height: '100', src: logoSrc, alt: 'Site Logo' })
			)
		)
	);
};

module.exports = Header;

},{"react":"react"}],9:[function(require,module,exports){
'use strict';

/**
 * Main entry point for react components
 */

var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('./router.jsx');
var isRunnable = require('../js/progressive.js');
var hasInitialData = typeof initialReactData !== 'undefined';

if (isRunnable && hasInitialData) {
  var reactRoot = document.getElementById('app-root');
  var contentArea = document.querySelector('.entry-content');
  var innerContentArea;
  if (contentArea) {
    var innerContentArea = contentArea.innerHTML;
  }
  ReactDOM.render(React.createElement(Router, { initialData: initialReactData, initialContent: innerContentArea }), reactRoot);
}

},{"../js/progressive.js":13,"./router.jsx":12,"react":"react","react-dom":"react-dom"}],10:[function(require,module,exports){
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

},{"react":"react"}],11:[function(require,module,exports){
"use strict";

var React = require('react');

var PostNavigation = function PostNavigation(props) {

	// wordpress keeps the return_instead query var in the nav, but we don't want
	// to link to that. So strip that out!
	var navHTMLnoLinkQueryString = props.content.replace(/return_instead\=posts-json/g, "");
	var navigation_html = { __html: navHTMLnoLinkQueryString };

	return React.createElement("div", { className: "prev-next-posts", dangerouslySetInnerHTML: navigation_html });
};

module.exports = PostNavigation;

},{"react":"react"}],12:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var ajaxStates = require('./enum/ajaxStates.js');
var Page = require('./Page.jsx');

var Router = function (_React$Component) {
	_inherits(Router, _React$Component);

	function Router(props) {
		_classCallCheck(this, Router);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Router).call(this, props));

		_this.state = _defineProperty({
			ajaxState: ajaxStates.INITIAL,
			posts: props.initialData.posts,
			menu: props.initialData.primary_menu,
			postNav: props.initialData.post_nav,
			bodyClass: props.initialData.body_class,
			template: props.initialData.template
		}, 'ajaxState', ajaxStates.DONE);

		// Separately load content, it is possibly lots of data
		if (props.initialData.posts.length === 1) {
			_this.state.posts[0].content = props.initialContent;
		}
		return _this;
	}

	/**
  * Helper function to add Query String Parameter to end of url
  *
  * @returns querystring with param appended.
  */


	_createClass(Router, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var self = this;

			// By default our return-instead will return the default posts rollup
			// regardless of static homepage setting. So we need to manually go
			// to the homepage on the client to get the right content
			urlRouter('/', function (ctx) {
				urlRouter('/home');
			});

			// Menu is loaded on initial load and never changes, so we don't need
			// to go to the server to re-render that
			urlRouter('/menu', function (ctx) {
				self.setState({
					template: {
						type: 'menu',
						title: 'Menu'
					}
				});
			});

			// Crux of theme router. All links are have a special query string appended
			// which let's wordpress know to return post data instead of the entire
			// page reload. If wordpress doesn't return data, the router is torn down
			// and you navigate normally
			urlRouter('*', function (ctx) {
				if (self.state.ajaxState === ajaxStates.LOADING) {
					return;
				}
				var dataPath = Router.updatePathWithNewQuery('return_instead=posts-json', ctx.pathname, ctx.querystring);
				self.setState({
					ajaxState: ajaxStates.LOADING
				});

				request.get(dataPath).end(function (err, res) {
					if (err) {
						console.error(err);
						return;
					}

					try {
						var data = JSON.parse(res.text);
					} catch (ex) {
						urlRouter.stop();
						window.location.href = ctx.canonicalPath;
						return;
					}

					self.setState({
						posts: data.posts,
						postNav: data.post_nav,
						bodyClass: data.body_class,
						template: data.template,
						ajaxState: ajaxStates.DONE
					});
				});
			});

			urlRouter({
				// Prevents triggering routing on the initial page load
				dispatch: false
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(Page, this.state);
		}
	}], [{
		key: 'updatePathWithNewQuery',
		value: function updatePathWithNewQuery(newParam, path) {
			var existingQuerystring = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

			var seperatorApersand = '';
			if (existingQuerystring) {
				if (existingQuerystring.indexOf(newParam) !== -1) {
					return path + '?' + existingQuerystring;
				} else {
					seperatorApersand = '&';
				}
			}
			return path + '?' + existingQuerystring + seperatorApersand + newParam;
		}
	}]);

	return Router;
}(React.Component);

module.exports = Router;

},{"./Page.jsx":1,"./enum/ajaxStates.js":6,"page":"page","react":"react","superagent":"superagent"}],13:[function(require,module,exports){
'use strict';

/**
 * Module to determine whether to load up react or not
 */

var useJS = true;

if (typeof window.requestAnimationFrame !== 'function') {
  useJS = false;
}

module.exports = useJS;

},{}]},{},[9])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvY29tcG9uZW50cy9QYWdlLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2NvbnRlbnQvbWVudS5qc3giLCJjbGllbnQvY29tcG9uZW50cy9jb250ZW50L25vbmUuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvY29udGVudC9yb2xsdXAuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvY29udGVudC9zaW5nbGUuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvZW51bS9hamF4U3RhdGVzLmpzIiwiY2xpZW50L2NvbXBvbmVudHMvZm9vdGVyLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2hlYWRlci5qc3giLCJjbGllbnQvY29tcG9uZW50cy9pbmRleC5qc3giLCJjbGllbnQvY29tcG9uZW50cy9taXNjL2hlYWRlci1za2lwLWxpbmsuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvbWlzYy9wb3N0LW5hdmlnYXRpb24uanN4IiwiY2xpZW50L2NvbXBvbmVudHMvcm91dGVyLmpzeCIsImNsaWVudC9qcy9wcm9ncmVzc2l2ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUNBQSxJQUFJLFFBQVEsUUFBUSxPQUFSLENBQVI7O0FBRUosSUFBSSxhQUFhLFFBQVEsc0JBQVIsQ0FBYjs7QUFFSixJQUFJLFNBQVMsUUFBUSxjQUFSLENBQVQ7QUFDSixJQUFJLGlCQUFpQixRQUFRLDZCQUFSLENBQWpCO0FBQ0osSUFBSSxTQUFTLFFBQVEsc0JBQVIsQ0FBVDtBQUNKLElBQUksU0FBUyxRQUFRLHNCQUFSLENBQVQ7QUFDSixJQUFJLE9BQU8sUUFBUSxvQkFBUixDQUFQO0FBQ0osSUFBSSxPQUFPLFFBQVEsb0JBQVIsQ0FBUDtBQUNKLElBQUksVUFBVSxRQUFRLDRCQUFSLENBQVY7QUFDSixJQUFJLFNBQVMsUUFBUSxjQUFSLENBQVQ7Ozs7Ozs7O0lBT0U7OztBQUVMLFVBRkssSUFFTCxDQUFZLEtBQVosRUFBa0I7d0JBRmIsTUFFYTs7cUVBRmIsaUJBR0UsUUFEVzs7QUFHakIsUUFBSyxLQUFMLEdBQWE7QUFDWixpQkFBYyxNQUFLLHlCQUFMLENBQStCLE1BQU0sU0FBTixDQUE3QztBQUNBLGNBQVcsTUFBSyw0QkFBTCxDQUFrQyxNQUFNLFNBQU4sQ0FBN0M7R0FGRCxDQUhpQjs7RUFBbEI7O2NBRks7OzRDQVdxQixXQUFVO0FBQ25DLFFBQUssUUFBTCxDQUFjO0FBQ2Isa0JBQWMsS0FBSyx5QkFBTCxDQUErQixVQUFVLFNBQVYsQ0FBN0M7QUFDQSxlQUFXLEtBQUssNEJBQUwsQ0FBa0MsVUFBVSxTQUFWLENBQTdDO0lBRkQsRUFEbUM7Ozs7dUNBT2hCOzs7QUFDbkIsVUFBTyxxQkFBUCxDQUE4QixZQUFNO0FBQ25DLFdBQUssWUFBTCxHQURtQztJQUFOLENBQTlCLENBRG1COzs7O3VDQU1BOzs7OztBQUduQixVQUFPLFFBQVAsQ0FBZ0IsSUFBaEIsQ0FBcUIsU0FBckIsR0FBaUMsQ0FBakM7Ozs7QUFIbUIsU0FPbkIsQ0FBTyxxQkFBUCxDQUE4QixZQUFNO0FBQ25DLFdBQUssWUFBTCxHQURtQztBQUVuQyxXQUFPLHFCQUFQLENBQThCLFlBQU07QUFDbkMsWUFBSyxZQUFMLEdBRG1DO0tBQU4sQ0FBOUIsQ0FGbUM7SUFBTixDQUE5QixDQVBtQjs7OztpQ0FlTjtBQUNiLFFBQUssSUFBTCxDQUFVLGFBQVYsQ0FBd0IsU0FBeEIsR0FBb0MsS0FBSyxLQUFMLENBQVcsU0FBWCxHQUF1QixHQUF2QixHQUE2QiwwQkFBN0IsQ0FEdkI7Ozs7aUNBSUE7QUFDYixRQUFLLElBQUwsQ0FBVSxhQUFWLENBQXdCLFNBQXhCLEdBQW9DLEtBQUssS0FBTCxDQUFXLFNBQVgsR0FBdUIsR0FBdkIsR0FBNkIsS0FBSyxLQUFMLENBQVcsWUFBWCxDQURwRDs7Ozs0Q0FJWSxXQUFVO0FBQ25DLFVBQU8sVUFBVSxLQUFWLENBQWdCLGtCQUFoQixFQUFvQyxDQUFwQyxDQUFQLENBRG1DOzs7OytDQUlQLFdBQVU7QUFDdEMsVUFBTyxVQUFVLE9BQVYsQ0FBa0Isc0JBQWxCLEVBQTBDLEVBQTFDLENBQVAsQ0FEc0M7Ozs7MkJBSS9CO0FBQ1AsT0FBSSxjQUFKLENBRE87QUFFUCxPQUFJLGFBQUosQ0FGTztBQUdQLE9BQUksT0FBSixDQUhPO0FBSVAsT0FBSSxZQUFZLEtBQVosQ0FKRzs7QUFNUCxPQUFJLEtBQUssS0FBTCxDQUFXLFNBQVgsS0FBeUIsV0FBVyxPQUFYLEVBQW1CO0FBQy9DLGdCQUFZLElBQVosQ0FEK0M7SUFBaEQ7O0FBSUEsT0FBSSxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLE1BQWpCLEtBQTRCLENBQTVCLEVBQThCO0FBQ2pDLHFCQUFpQixvQkFBQyxJQUFELElBQU0sV0FBVyxLQUFLLEtBQUwsQ0FBVyxJQUFYLEVBQWpCLENBQWpCLENBRGlDO0lBQWxDLE1BRU87QUFDTixZQUFRLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsSUFBcEI7QUFDUCxVQUFLLE1BQUw7QUFDQyxzQkFBZ0I7O1NBQUksV0FBVSxjQUFWLEVBQUo7T0FBOEIsS0FBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixLQUFwQjtPQUE5QyxDQUREO0FBRUMsdUJBQWlCLG9CQUFDLElBQUQsSUFBTSxXQUFXLEtBQUssS0FBTCxDQUFXLElBQVgsRUFBakIsQ0FBakIsQ0FGRDtBQUdDLFlBSEQ7QUFERCxVQUtNLFFBQUw7QUFDQyxzQkFBZ0I7O1NBQUksV0FBVSxjQUFWLEVBQUo7T0FBOEIsS0FBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixLQUFwQjtPQUE5QyxDQUREO0FBRUMsdUJBQWlCLEVBQWpCLENBRkQ7Ozs7OztBQUdDLDRCQUFpQixLQUFLLEtBQUwsQ0FBVyxLQUFYLDBCQUFqQixvR0FBa0M7WUFBekIsb0JBQXlCOztBQUNqQyx1QkFBZSxJQUFmLENBQW9CLG9CQUFDLE1BQUQsSUFBUSxNQUFNLEtBQU4sRUFBWSxLQUFLLE1BQUssRUFBTCxFQUF6QixDQUFwQixFQURpQztRQUFsQzs7Ozs7Ozs7Ozs7Ozs7T0FIRDs7QUFNQyxnQkFBVSxvQkFBQyxPQUFELElBQVMsU0FBUyxLQUFLLEtBQUwsQ0FBVyxPQUFYLEVBQWxCLENBQVYsQ0FORDtBQU9DLFlBUEQ7QUFMRCxVQWFNLFFBQUw7QUFDQyxVQUFJLE9BQU8sS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixDQUFqQixDQUFQLENBREw7QUFFQyx1QkFBaUIsb0JBQUMsTUFBRCxJQUFRLE1BQU0sSUFBTixFQUFSLENBQWpCLENBRkQ7QUFiRCxLQURNO0lBRlA7O0FBc0JBLFVBQ0M7O01BQUssSUFBRyxNQUFILEVBQVUsS0FBSSxlQUFKLEVBQW9CLFdBQVcsS0FBSyxLQUFMLENBQVcsU0FBWCxFQUE5QztJQUNDLG9CQUFDLGNBQUQsT0FERDtJQUVDLG9CQUFDLE1BQUQsSUFBUSxXQUFXLFNBQVgsRUFBUixDQUZEO0lBR0M7O09BQU0sSUFBRyxTQUFILEVBQWEsV0FBVSxjQUFWLEVBQW5CO0tBQ0UsYUFERjtLQUVFLGNBRkY7S0FHRSxPQUhGO0tBSEQ7SUFRQyxvQkFBQyxNQUFELE9BUkQ7SUFERCxDQWhDTzs7OztRQXZESDtFQUFhLE1BQU0sU0FBTjs7QUFzR25CLE9BQU8sT0FBUCxHQUFpQixJQUFqQjs7Ozs7QUN4SEEsSUFBSSxRQUFRLFFBQVEsT0FBUixDQUFSOztBQUVKLElBQU0sT0FBTyxTQUFQLElBQU8sQ0FBQyxLQUFELEVBQVc7O0FBRXZCLEtBQUksZUFBYyxFQUFDLFFBQU8sTUFBTSxTQUFOLEVBQXRCLENBRm1COztBQUl2QixRQUNDOztJQUFLLElBQUcsaUJBQUgsRUFBcUIsV0FBVSxpQkFBVixFQUE0QixNQUFLLFlBQUwsRUFBdEQ7RUFDQzs7S0FBTSxNQUFLLFFBQUwsRUFBYyxRQUFPLEtBQVAsRUFBYSxXQUFVLGFBQVYsRUFBd0IsUUFBTyxHQUFQLEVBQXpEO0dBQ0M7OztJQUNBOztPQUFNLFdBQVUsb0JBQVYsRUFBTjs7S0FEQTtJQUVBLCtCQUFPLE1BQUssUUFBTCxFQUFjLFdBQVUsY0FBVixFQUF5QixhQUFZLFVBQVosRUFBdUIsTUFBSyxHQUFMLEVBQXJFLENBRkE7SUFERDtHQUtBOztNQUFRLE1BQUssUUFBTCxFQUFjLFdBQVUsZUFBVixFQUF0Qjs7SUFMQTtHQUREO0VBUUMsNkJBQUsseUJBQXlCLFlBQXpCLEVBQUwsQ0FSRDtFQURELENBSnVCO0NBQVg7O0FBa0JiLE9BQU8sT0FBUCxHQUFpQixJQUFqQjs7Ozs7QUNwQkEsSUFBSSxRQUFRLFFBQVEsT0FBUixDQUFSO0FBQ0osSUFBSSxPQUFPLFFBQVEsWUFBUixDQUFQOztBQUVKLElBQU0sT0FBTyxTQUFQLElBQU8sQ0FBQyxLQUFELEVBQVc7QUFDdkIsUUFDQzs7SUFBUyxXQUFVLHNCQUFWLEVBQVQ7RUFDQzs7S0FBUSxXQUFVLGFBQVYsRUFBUjtHQUNDOztNQUFJLFdBQVUsY0FBVixFQUFKOztJQUREO0dBREQ7RUFLQzs7S0FBSyxXQUFVLGNBQVYsRUFBTDtHQUNDOzs7O0lBREQ7R0FFQyxvQkFBQyxJQUFELElBQU0sV0FBVyxNQUFNLFNBQU4sRUFBakIsQ0FGRDtHQUxEO0VBREQsQ0FEdUI7Q0FBWDs7QUFlYixPQUFPLE9BQVAsR0FBaUIsSUFBakI7Ozs7O0FDbEJBLElBQUksUUFBUSxRQUFRLE9BQVIsQ0FBUjs7QUFFSixJQUFNLFNBQVMsU0FBVCxNQUFTLENBQUMsS0FBRCxFQUFXOztBQUV6QixLQUFJLGNBQWMsRUFBQyxRQUFRLFFBQVEsTUFBTSxJQUFOLENBQVcsT0FBWCxHQUFxQixNQUE3QixFQUF2QixDQUZxQjs7QUFJekIsS0FBSSxRQUFKLENBSnlCO0FBS3pCLEtBQUksTUFBTSxJQUFOLENBQVcsU0FBWCxLQUF5QixNQUF6QixFQUFnQztBQUNuQyxNQUFJLGVBQWUsRUFBQyxRQUFRLE1BQU0sSUFBTixDQUFXLGFBQVgsQ0FBeUIsU0FBekIsRUFBeEIsQ0FEK0I7QUFFbkMsYUFDQyw4QkFBTSxXQUFVLFdBQVYsRUFBc0IseUJBQXlCLFlBQXpCLEVBQTVCLENBREQsQ0FGbUM7RUFBcEM7O0FBT0EsS0FBSSxXQUFXLEVBQUMsUUFBUSxNQUFNLElBQU4sQ0FBVyxhQUFYLENBQXlCLFFBQXpCLENBQWtDLElBQWxDLEVBQXBCLENBWnFCOztBQWN6QixLQUFJLGVBQWUsTUFBTSxJQUFOLENBQVcsU0FBWCxHQUF1QixjQUF2QixDQWRNOztBQWdCekIsUUFDQzs7SUFBUyxJQUFJLE1BQU0sSUFBTixDQUFXLEVBQVgsRUFBZSxXQUFXLFlBQVgsRUFBNUI7RUFDQzs7S0FBUSxXQUFVLGNBQVYsRUFBUjtHQUNDOztNQUFJLFdBQVUsYUFBVixFQUFKO0lBQTRCOztPQUFHLE1BQU0sTUFBTSxJQUFOLENBQVcsU0FBWCxFQUFUO0tBQWdDLE1BQU0sSUFBTixDQUFXLEtBQVg7S0FBNUQ7SUFERDtHQUVFLFFBRkY7R0FERDtFQUtDLDZCQUFLLFdBQVUsZ0JBQVYsRUFBMkIseUJBQXlCLFFBQXpCLEVBQWhDLENBTEQ7RUFNQyw2QkFBSyxXQUFVLGVBQVYsRUFBMEIseUJBQXlCLFdBQXpCLEVBQS9CLENBTkQ7RUFERCxDQWhCeUI7Q0FBWDs7QUE0QmYsT0FBTyxPQUFQLEdBQWlCLE1BQWpCOzs7OztBQzlCQSxJQUFJLFFBQVEsUUFBUSxPQUFSLENBQVI7O0FBRUosSUFBTSxTQUFTLFNBQVQsTUFBUyxDQUFDLEtBQUQsRUFBVztBQUN6QixLQUFJLGNBQWMsRUFBQyxRQUFRLE1BQU0sSUFBTixDQUFXLE9BQVgsRUFBdkIsQ0FEcUI7QUFFekIsS0FBSSxRQUFKLENBRnlCO0FBR3pCLEtBQUksWUFBSixDQUh5QjtBQUl6QixLQUFJLFFBQUosQ0FKeUI7QUFLekIsS0FBSSxNQUFNLElBQU4sQ0FBVyxTQUFYLEtBQXlCLE1BQXpCLEVBQWdDOztBQUVuQyxNQUFJLGVBQWUsRUFBQyxRQUFRLE1BQU0sSUFBTixDQUFXLGFBQVgsQ0FBeUIsU0FBekIsRUFBeEIsQ0FGK0I7QUFHbkMsYUFDQyw2QkFBSyxXQUFVLFdBQVYsRUFBc0IseUJBQXlCLFlBQXpCLEVBQTNCLENBREQsQ0FIbUM7O0FBT25DLE1BQUksbUJBQW1CLEVBQUMsUUFBUSxNQUFNLElBQU4sQ0FBVyxhQUFYLENBQXlCLFFBQXpCLENBQWtDLElBQWxDLEVBQTVCLENBUCtCO0FBUW5DLGlCQUNDLDZCQUFLLFdBQVUsZUFBVixFQUEwQix5QkFBeUIsZ0JBQXpCLEVBQS9CLENBREQsQ0FSbUM7O0FBWW5DLE1BQUksZUFBZSxFQUFDLFFBQVEsTUFBTSxJQUFOLENBQVcsYUFBWCxDQUF5QixRQUF6QixFQUF4QixDQVorQjtBQWFuQyxhQUNDLGdDQUFRLFdBQVUsY0FBVixFQUF5Qix5QkFBeUIsWUFBekIsRUFBakMsQ0FERCxDQWJtQztFQUFwQzs7QUFtQkEsUUFDQzs7SUFBUyxJQUFJLE1BQU0sSUFBTixDQUFXLEVBQVgsRUFBZSxXQUFXLE1BQU0sSUFBTixDQUFXLFNBQVgsRUFBdkM7RUFDQzs7S0FBUSxXQUFVLGNBQVYsRUFBUjtHQUNDOztNQUFJLFdBQVUsYUFBVixFQUFKO0lBQTZCLE1BQU0sSUFBTixDQUFXLEtBQVg7SUFEOUI7R0FFRSxZQUZGO0dBR0UsUUFIRjtHQUREO0VBTUMsNkJBQUssV0FBVSxlQUFWLEVBQTBCLHlCQUF5QixXQUF6QixFQUEvQixDQU5EO0VBT0UsUUFQRjtFQURELENBeEJ5QjtDQUFYOztBQXFDZixPQUFPLE9BQVAsR0FBaUIsTUFBakI7Ozs7O0FDdkNBLElBQU0sYUFBYTtBQUNsQixVQUFTLENBQVQ7QUFDQSxVQUFVLENBQVY7QUFDQSxPQUFPLENBQVA7Q0FISzs7QUFNTixPQUFPLE9BQVAsR0FBaUIsVUFBakI7Ozs7O0FDTkEsSUFBSSxRQUFRLFFBQVEsT0FBUixDQUFSOztBQUVKLElBQU0sU0FBUyxTQUFULE1BQVMsQ0FBQyxLQUFELEVBQVc7QUFDekIsUUFDQzs7SUFBUSxJQUFHLFVBQUgsRUFBYyxXQUFVLGFBQVYsRUFBd0IsTUFBSyxhQUFMLEVBQTlDO0VBQ0E7O0tBQUssV0FBVSxXQUFWLEVBQUw7O0dBQ29EOztNQUFHLE1BQUssd0JBQUwsRUFBSDs7SUFEcEQ7O0dBQ3lHOztNQUFHLE1BQUssbUNBQUwsRUFBSDs7SUFEekc7R0FEQTtFQURELENBRHlCO0NBQVg7O0FBVWYsT0FBTyxPQUFQLEdBQWlCLE1BQWpCOzs7OztBQ1pBLElBQUksUUFBUSxRQUFRLE9BQVIsQ0FBUjs7QUFFSixJQUFNLFNBQVMsU0FBVCxNQUFTLENBQUMsS0FBRCxFQUFXO0FBQ3pCLEtBQUksVUFBVSx5RUFBVixDQURxQjtBQUV6QixLQUFJLFlBQVksV0FBWixDQUZxQjtBQUd6QixLQUFJLE1BQU0sU0FBTixFQUFnQjtBQUNuQixZQUFVLHVFQUFWLENBRG1CO0FBRW5CLGNBQVksbUJBQVosQ0FGbUI7RUFBcEI7O0FBS0EsUUFDQzs7SUFBUSxJQUFHLFVBQUgsRUFBYyxXQUFVLGFBQVYsRUFBd0IsTUFBSyxRQUFMLEVBQTlDO0VBQ0M7O0tBQUssV0FBVyxTQUFYLEVBQUw7R0FDQzs7TUFBRyxNQUFLLE9BQUwsRUFBYSxPQUFNLE1BQU4sRUFBaEI7SUFDQyw2QkFBSyxPQUFNLEtBQU4sRUFBWSxRQUFPLEtBQVAsRUFBYSxLQUFLLE9BQUwsRUFBYyxLQUFJLFdBQUosRUFBNUMsQ0FERDtJQUREO0dBREQ7RUFERCxDQVJ5QjtDQUFYOztBQW1CZixPQUFPLE9BQVAsR0FBaUIsTUFBakI7Ozs7Ozs7OztBQ2pCQSxJQUFJLFFBQVEsUUFBUyxPQUFULENBQVI7QUFDSixJQUFJLFdBQVcsUUFBUSxXQUFSLENBQVg7QUFDSixJQUFJLFNBQVMsUUFBUyxjQUFULENBQVQ7QUFDSixJQUFJLGFBQWEsUUFBUSxzQkFBUixDQUFiO0FBQ0osSUFBSSxpQkFBa0IsT0FBTyxnQkFBUCxLQUE0QixXQUE1Qjs7QUFFdEIsSUFBSSxjQUFjLGNBQWQsRUFBNkI7QUFDL0IsTUFBSSxZQUFZLFNBQVMsY0FBVCxDQUF5QixVQUF6QixDQUFaLENBRDJCO0FBRS9CLE1BQUksY0FBYyxTQUFTLGFBQVQsQ0FBd0IsZ0JBQXhCLENBQWQsQ0FGMkI7QUFHL0IsTUFBSSxnQkFBSixDQUgrQjtBQUkvQixNQUFJLFdBQUosRUFBZ0I7QUFDZCxRQUFJLG1CQUFtQixZQUFZLFNBQVosQ0FEVDtHQUFoQjtBQUdBLFdBQVMsTUFBVCxDQUFnQixvQkFBQyxNQUFELElBQVEsYUFBYSxnQkFBYixFQUErQixnQkFBZ0IsZ0JBQWhCLEVBQXZDLENBQWhCLEVBQTZGLFNBQTdGLEVBUCtCO0NBQWpDOzs7OztBQ1ZBLElBQUksUUFBUSxRQUFRLE9BQVIsQ0FBUjs7QUFFSixJQUFNLGlCQUFpQixTQUFqQixjQUFpQixDQUFDLEtBQUQsRUFBVztBQUNqQyxRQUNDOztJQUFHLFdBQVUsOEJBQVYsRUFBeUMsTUFBSyxVQUFMLEVBQTVDOztFQURELENBRGlDO0NBQVg7O0FBTXZCLE9BQU8sT0FBUCxHQUFpQixjQUFqQjs7Ozs7QUNSQSxJQUFJLFFBQVEsUUFBUSxPQUFSLENBQVI7O0FBRUosSUFBTSxpQkFBaUIsU0FBakIsY0FBaUIsQ0FBQyxLQUFELEVBQVc7Ozs7QUFJakMsS0FBSSwyQkFBMkIsTUFBTSxPQUFOLENBQWMsT0FBZCxDQUFzQiw2QkFBdEIsRUFBcUQsRUFBckQsQ0FBM0IsQ0FKNkI7QUFLakMsS0FBSSxrQkFBa0IsRUFBQyxRQUFRLHdCQUFSLEVBQW5CLENBTDZCOztBQU9qQyxRQUNDLDZCQUFLLFdBQVUsaUJBQVYsRUFBNEIseUJBQXlCLGVBQXpCLEVBQWpDLENBREQsQ0FQaUM7Q0FBWDs7QUFZdkIsT0FBTyxPQUFQLEdBQWlCLGNBQWpCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05BLElBQUksUUFBUSxRQUFTLE9BQVQsQ0FBUjtBQUNKLElBQUksWUFBWSxRQUFTLE1BQVQsQ0FBWjtBQUNKLElBQUksVUFBVSxRQUFTLFlBQVQsQ0FBVjs7QUFFSixJQUFJLGFBQWEsUUFBUyxzQkFBVCxDQUFiO0FBQ0osSUFBSSxPQUFPLFFBQVMsWUFBVCxDQUFQOztJQUVFOzs7QUFFTCxVQUZLLE1BRUwsQ0FBWSxLQUFaLEVBQW1CO3dCQUZkLFFBRWM7O3FFQUZkLG1CQUdFLFFBRFk7O0FBR2hCLFFBQUssS0FBTDtBQUNELGNBQVcsV0FBVyxPQUFYO0FBQ1gsVUFBTyxNQUFNLFdBQU4sQ0FBa0IsS0FBbEI7QUFDUCxTQUFNLE1BQU0sV0FBTixDQUFrQixZQUFsQjtBQUNOLFlBQVMsTUFBTSxXQUFOLENBQWtCLFFBQWxCO0FBQ1QsY0FBVyxNQUFNLFdBQU4sQ0FBa0IsVUFBbEI7QUFDWCxhQUFVLE1BQU0sV0FBTixDQUFrQixRQUFsQjtrQkFDQyxXQUFXLElBQVgsQ0FQVjs7O0FBSGdCLE1BY2QsTUFBTSxXQUFOLENBQWtCLEtBQWxCLENBQXdCLE1BQXhCLEtBQW1DLENBQW5DLEVBQXNDO0FBQ3pDLFNBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsQ0FBakIsRUFBb0IsT0FBcEIsR0FBOEIsTUFBTSxjQUFOLENBRFc7R0FBMUM7ZUFka0I7RUFBbkI7Ozs7Ozs7OztjQUZLOztzQ0FzQ2U7QUFDbkIsT0FBSSxPQUFPLElBQVA7Ozs7O0FBRGUsWUFNbkIsQ0FBVyxHQUFYLEVBQWdCLFVBQVcsR0FBWCxFQUFpQjtBQUNoQyxjQUFVLE9BQVYsRUFEZ0M7SUFBakIsQ0FBaEI7Ozs7QUFObUIsWUFZbkIsQ0FBVSxPQUFWLEVBQW1CLFVBQVcsR0FBWCxFQUFpQjtBQUNuQyxTQUFLLFFBQUwsQ0FBYztBQUNiLGVBQVU7QUFDVCxZQUFNLE1BQU47QUFDQSxhQUFPLE1BQVA7TUFGRDtLQURELEVBRG1DO0lBQWpCLENBQW5COzs7Ozs7QUFabUIsWUF5Qm5CLENBQVcsR0FBWCxFQUFnQixVQUFXLEdBQVgsRUFBaUI7QUFDaEMsUUFBSSxLQUFLLEtBQUwsQ0FBVyxTQUFYLEtBQXlCLFdBQVcsT0FBWCxFQUFtQjtBQUMvQyxZQUQrQztLQUFoRDtBQUdBLFFBQUksV0FBVyxPQUFPLHNCQUFQLENBQThCLDJCQUE5QixFQUEyRCxJQUFJLFFBQUosRUFBYyxJQUFJLFdBQUosQ0FBcEYsQ0FKNEI7QUFLaEMsU0FBSyxRQUFMLENBQWM7QUFDYixnQkFBVyxXQUFXLE9BQVg7S0FEWixFQUxnQzs7QUFTaEMsWUFDRSxHQURGLENBQ08sUUFEUCxFQUVFLEdBRkYsQ0FFTyxVQUFVLEdBQVYsRUFBZSxHQUFmLEVBQXFCO0FBQzFCLFNBQUksR0FBSixFQUFTO0FBQ1IsY0FBUSxLQUFSLENBQWMsR0FBZCxFQURRO0FBRVIsYUFGUTtNQUFUOztBQUtBLFNBQUk7QUFDSCxVQUFJLE9BQU8sS0FBSyxLQUFMLENBQVcsSUFBSSxJQUFKLENBQWxCLENBREQ7TUFBSixDQUVFLE9BQU0sRUFBTixFQUFVO0FBQ1gsZ0JBQVUsSUFBVixHQURXO0FBRVgsYUFBTyxRQUFQLENBQWdCLElBQWhCLEdBQXVCLElBQUksYUFBSixDQUZaO0FBR1gsYUFIVztNQUFWOztBQU1GLFVBQUssUUFBTCxDQUFjO0FBQ2IsYUFBTyxLQUFLLEtBQUw7QUFDUCxlQUFTLEtBQUssUUFBTDtBQUNULGlCQUFXLEtBQUssVUFBTDtBQUNYLGdCQUFVLEtBQUssUUFBTDtBQUNWLGlCQUFXLFdBQVcsSUFBWDtNQUxaLEVBZDBCO0tBQXJCLENBRlAsQ0FUZ0M7SUFBakIsQ0FBaEIsQ0F6Qm1COztBQTREbkIsYUFBVTs7QUFFVCxjQUFVLEtBQVY7SUFGRCxFQTVEbUI7Ozs7MkJBa0VYO0FBQ1AsVUFDQyxvQkFBQyxJQUFELEVBQVUsS0FBSyxLQUFMLENBRFgsQ0FETzs7Ozt5Q0E5RXFCLFVBQVUsTUFBNkI7T0FBdkIsNEVBQW9CLGtCQUFHOztBQUNwRSxPQUFJLG9CQUFvQixFQUFwQixDQURnRTtBQUVwRSxPQUFJLG1CQUFKLEVBQXdCO0FBQ3ZCLFFBQUksb0JBQW9CLE9BQXBCLENBQTRCLFFBQTVCLE1BQTBDLENBQUMsQ0FBRCxFQUFLO0FBQ2xELFlBQU8sT0FBTyxHQUFQLEdBQWEsbUJBQWIsQ0FEMkM7S0FBbkQsTUFFTztBQUNOLHlCQUFvQixHQUFwQixDQURNO0tBRlA7SUFERDtBQU9BLFVBQU8sT0FBTyxHQUFQLEdBQWEsbUJBQWIsR0FBbUMsaUJBQW5DLEdBQXVELFFBQXZELENBVDZEOzs7O1FBMUJoRTtFQUFlLE1BQU0sU0FBTjs7QUErR3JCLE9BQU8sT0FBUCxHQUFpQixNQUFqQjs7Ozs7Ozs7O0FDMUhBLElBQUksUUFBUSxJQUFSOztBQUVKLElBQUksT0FBTyxPQUFPLHFCQUFQLEtBQWlDLFVBQXhDLEVBQXFEO0FBQ3hELFVBQVEsS0FBUixDQUR3RDtDQUF6RDs7QUFJQSxPQUFPLE9BQVAsR0FBaUIsS0FBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIGFqYXhTdGF0ZXMgPSByZXF1aXJlKCcuL2VudW0vYWpheFN0YXRlcy5qcycpO1xuXG52YXIgSGVhZGVyID0gcmVxdWlyZSgnLi9oZWFkZXIuanN4Jyk7XG52YXIgSGVhZGVyU2tpcExpbmsgPSByZXF1aXJlKCcuL21pc2MvaGVhZGVyLXNraXAtbGluay5qc3gnKTtcbnZhciBSb2xsdXAgPSByZXF1aXJlKCcuL2NvbnRlbnQvcm9sbHVwLmpzeCcpO1xudmFyIFNpbmdsZSA9IHJlcXVpcmUoJy4vY29udGVudC9zaW5nbGUuanN4Jyk7XG52YXIgTm9uZSA9IHJlcXVpcmUoJy4vY29udGVudC9ub25lLmpzeCcpO1xudmFyIE1lbnUgPSByZXF1aXJlKCcuL2NvbnRlbnQvbWVudS5qc3gnKTtcbnZhciBQb3N0TmF2ID0gcmVxdWlyZSgnLi9taXNjL3Bvc3QtbmF2aWdhdGlvbi5qc3gnKTtcbnZhciBGb290ZXIgPSByZXF1aXJlKCcuL2Zvb3Rlci5qc3gnKTtcblxuLyoqXG4gKiBNYWluIFBhZ2UgQ29tcG9uZW50XG4gKlxuICogQWxzbyBjb250cm9scyB0aGUgZmFuY3kgY29sb3IgdG9nZ2xlIG9uIHBhZ2UgZWxlbWVudHNcbiAqL1xuY2xhc3MgUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblxuXHRcdHRoaXMuc3RhdGUgPSB7XG5cdFx0XHRjb2xvclBhbGV0dGU6IHRoaXMucGFsbGV0ZUNsYXNzZnJvbVBhZ2VDbGFzcyhwcm9wcy5ib2R5Q2xhc3MpLFxuXHRcdFx0cGFnZUNsYXNzOiB0aGlzLnBhZ2VDbGFzc3dpdGhvdXRQYWxsZXRlQ2xhc3MocHJvcHMuYm9keUNsYXNzKVxuXHRcdH1cblx0fVxuXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGNvbG9yUGFsZXR0ZTogdGhpcy5wYWxsZXRlQ2xhc3Nmcm9tUGFnZUNsYXNzKG5leHRQcm9wcy5ib2R5Q2xhc3MpLFxuXHRcdFx0cGFnZUNsYXNzOiB0aGlzLnBhZ2VDbGFzc3dpdGhvdXRQYWxsZXRlQ2xhc3MobmV4dFByb3BzLmJvZHlDbGFzcylcblx0XHR9KTtcblx0fVxuXG5cdGNvbXBvbmVudFdpbGxNb3VudCgpe1xuXHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoICgpID0+IHtcblx0XHRcdHRoaXMuYXBwbHlQYWxldHRlKCk7XG5cdFx0fSk7XG5cdH1cblxuXHRjb21wb25lbnREaWRVcGRhdGUoKXtcblx0XHQvLyBJdCdzIG5vdCBwcmV0dHksIGJ1dCB3ZSBzaG91bGQgc2Nyb2xsIHRvIHRoZSB0b3Agb2YgdGhlIHBhZ2UgaWYgd2Vcblx0XHQvLyBcIm5hdmlnYXRlXCIgdG8gYW5vdGhlciBwYWdlIHdpdGggYSByZW5kZXJcblx0XHR3aW5kb3cuZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSAwO1xuXG5cdFx0Ly8gVXNpbmcgcmVxdWVzdCBhbmltYXRpb24gRnJhbWUgdG8gZW5zdXJlIHRoYXQgZWFjaCBmdW5jdGlvbiBpcyBwYWludGVkXG5cdFx0Ly8gYmVmb3JlIHRoZSBuZXh0IGZ1bmN0aW9uIGJlZ2lucyB0byBmaXJlXG5cdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSggKCkgPT4ge1xuXHRcdFx0dGhpcy5jbGVhclBhbGV0dGUoKTtcblx0XHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoICgpID0+IHtcblx0XHRcdFx0dGhpcy5hcHBseVBhbGV0dGUoKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0Y2xlYXJQYWxldHRlKCl7XG5cdFx0dGhpcy5yZWZzLnBhZ2VDb250YWluZXIuY2xhc3NOYW1lID0gdGhpcy5zdGF0ZS5wYWdlQ2xhc3MgKyAnICcgKyAnY29sb3ItcGFsZXR0ZS10cmFuc2l0aW9uJztcblx0fVxuXG5cdGFwcGx5UGFsZXR0ZSgpe1xuXHRcdHRoaXMucmVmcy5wYWdlQ29udGFpbmVyLmNsYXNzTmFtZSA9IHRoaXMuc3RhdGUucGFnZUNsYXNzICsgJyAnICsgdGhpcy5zdGF0ZS5jb2xvclBhbGV0dGU7XG5cdH1cblxuXHRwYWxsZXRlQ2xhc3Nmcm9tUGFnZUNsYXNzKHBhZ2VDbGFzcyl7XG5cdFx0cmV0dXJuIHBhZ2VDbGFzcy5tYXRjaCgvY29sb3ItcGFsZXR0ZS1cXGQvKVswXTtcblx0fVxuXG5cdHBhZ2VDbGFzc3dpdGhvdXRQYWxsZXRlQ2xhc3MocGFnZUNsYXNzKXtcblx0XHRyZXR1cm4gcGFnZUNsYXNzLnJlcGxhY2UoL1xccz9jb2xvci1wYWxldHRlLVxcZC9nLCAnJyk7XG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHR2YXIgY29udGVudEVsZW1lbnQ7XG5cdFx0dmFyIGNvbnRlbnRIZWFkZXI7XG5cdFx0dmFyIHBvc3ROYXY7XG5cdFx0dmFyIGlzTG9hZGluZyA9IGZhbHNlO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMuYWpheFN0YXRlID09PSBhamF4U3RhdGVzLkxPQURJTkcpe1xuXHRcdFx0aXNMb2FkaW5nID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5wcm9wcy5wb3N0cy5sZW5ndGggPT09IDApe1xuXHRcdFx0Y29udGVudEVsZW1lbnQgPSA8Tm9uZSBtZW51SXRlbXM9e3RoaXMucHJvcHMubWVudX0vPjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3dpdGNoICh0aGlzLnByb3BzLnRlbXBsYXRlLnR5cGUpe1xuXHRcdFx0XHRjYXNlICdtZW51Jzpcblx0XHRcdFx0XHRjb250ZW50SGVhZGVyID0gPGgxIGNsYXNzTmFtZT1cInJvbGx1cC10aXRsZVwiPnt0aGlzLnByb3BzLnRlbXBsYXRlLnRpdGxlfTwvaDE+O1xuXHRcdFx0XHRcdGNvbnRlbnRFbGVtZW50ID0gPE1lbnUgbWVudUl0ZW1zPXt0aGlzLnByb3BzLm1lbnV9Lz47XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ3JvbGx1cCc6XG5cdFx0XHRcdFx0Y29udGVudEhlYWRlciA9IDxoMSBjbGFzc05hbWU9XCJyb2xsdXAtdGl0bGVcIj57dGhpcy5wcm9wcy50ZW1wbGF0ZS50aXRsZX08L2gxPjtcblx0XHRcdFx0XHRjb250ZW50RWxlbWVudCA9IFtdO1xuXHRcdFx0XHRcdGZvciAobGV0IHBvc3Qgb2YgdGhpcy5wcm9wcy5wb3N0cyl7XG5cdFx0XHRcdFx0XHRjb250ZW50RWxlbWVudC5wdXNoKDxSb2xsdXAgcG9zdD17cG9zdH0ga2V5PXtwb3N0LmlkfS8+KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cG9zdE5hdiA9IDxQb3N0TmF2IGNvbnRlbnQ9e3RoaXMucHJvcHMucG9zdE5hdn0gLz5cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnc2luZ2xlJzpcblx0XHRcdFx0XHRsZXQgcG9zdCA9IHRoaXMucHJvcHMucG9zdHNbMF07XG5cdFx0XHRcdFx0Y29udGVudEVsZW1lbnQgPSA8U2luZ2xlIHBvc3Q9e3Bvc3R9Lz47XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgaWQ9XCJwYWdlXCIgcmVmPVwicGFnZUNvbnRhaW5lclwiIGNsYXNzTmFtZT17dGhpcy5zdGF0ZS5wYWdlQ2xhc3N9PlxuXHRcdFx0XHQ8SGVhZGVyU2tpcExpbmsgLz5cblx0XHRcdFx0PEhlYWRlciBpc0xvYWRpbmc9e2lzTG9hZGluZ30vPlxuXHRcdFx0XHQ8bWFpbiBpZD1cImNvbnRlbnRcIiBjbGFzc05hbWU9XCJzaXRlLWNvbnRlbnRcIj5cblx0XHRcdFx0XHR7Y29udGVudEhlYWRlcn1cblx0XHRcdFx0XHR7Y29udGVudEVsZW1lbnR9XG5cdFx0XHRcdFx0e3Bvc3ROYXZ9XG5cdFx0XHRcdDwvbWFpbj5cblx0XHRcdFx0PEZvb3RlciAvPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2U7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBNZW51ID0gKHByb3BzKSA9PiB7XG5cblx0dmFyIG1lbnVJdGVtSFRNTCA9e19faHRtbDpwcm9wcy5tZW51SXRlbXN9O1xuXG5cdHJldHVybiAoXG5cdFx0PG5hdiBpZD1cInNpdGUtbmF2aWdhdGlvblwiIGNsYXNzTmFtZT1cIm1haW4tbmF2aWdhdGlvblwiIHJvbGU9XCJuYXZpZ2F0aW9uXCI+XG5cdFx0XHQ8Zm9ybSByb2xlPVwic2VhcmNoXCIgbWV0aG9kPVwiZ2V0XCIgY2xhc3NOYW1lPVwic2VhcmNoLWZvcm1cIiBhY3Rpb249XCIvXCI+XG5cdFx0XHRcdDxsYWJlbD5cblx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwic2NyZWVuLXJlYWRlci10ZXh0XCI+U2VhcmNoIGZvcjo8L3NwYW4+XG5cdFx0XHRcdDxpbnB1dCB0eXBlPVwic2VhcmNoXCIgY2xhc3NOYW1lPVwic2VhcmNoLWZpZWxkXCIgcGxhY2Vob2xkZXI9XCJTZWFyY2gg4oCmXCIgbmFtZT1cInNcIiAvPlxuXHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0PGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3NOYW1lPVwic2VhcmNoLXN1Ym1pdFwiPvCflI48L2J1dHRvbj5cblx0XHRcdDwvZm9ybT5cblx0XHRcdDxkaXYgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e21lbnVJdGVtSFRNTH0gLz5cblx0XHQ8L25hdj5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBNZW51O1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBNZW51ID0gcmVxdWlyZSgnLi9tZW51LmpzeCcpO1xuXG5jb25zdCBOb25lID0gKHByb3BzKSA9PiB7XG5cdHJldHVybiAoXG5cdFx0PHNlY3Rpb24gY2xhc3NOYW1lPVwibm8tcmVzdWx0cyBub3QtZm91bmRcIj5cblx0XHRcdDxoZWFkZXIgY2xhc3NOYW1lPVwicGFnZS1oZWFkZXJcIj5cblx0XHRcdFx0PGgxIGNsYXNzTmFtZT1cInJvbGx1cC10aXRsZVwiPiBOb3RoaW5nIEZvdW5kIDwvaDE+XG5cdFx0XHQ8L2hlYWRlcj5cblxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYWdlLWNvbnRlbnRcIj5cblx0XHRcdFx0PHA+IFdlIGNhbid0IHNlZW0gdG8gZmluZCB3aGF0IHlvdSB3ZXJlIGxvb2tpbmcgZm9yLiBIZXJlIGlzIHRoZSBtZW51IGFnYWluIHNvIHlvdSBjYW4gZ2V0IHRvIHdoZXJlIHlvdSBuZWVkIHRvIGdvLjwvcD5cblx0XHRcdFx0PE1lbnUgbWVudUl0ZW1zPXtwcm9wcy5tZW51SXRlbXN9Lz5cblx0XHRcdDwvZGl2PlxuXHRcdDwvc2VjdGlvbj5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBOb25lO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgUm9sbHVwID0gKHByb3BzKSA9PiB7XG5cdC8vIHdwYXV0b3AuLi5cblx0dmFyIGV4Y2VycHRIVE1MID0ge19faHRtbDogJzxwPicgKyBwcm9wcy5wb3N0LmV4Y2VycHQgKyAnPC9wPid9O1xuXG5cdHZhciBwb3N0ZWRPbjtcblx0aWYgKHByb3BzLnBvc3QucG9zdF90eXBlID09PSAncG9zdCcpe1xuXHRcdHZhciBwb3N0ZWRPbkhUTUwgPSB7X19odG1sOiBwcm9wcy5wb3N0LnRlbXBsYXRlX3RhZ3MucG9zdGVkX29ufTtcblx0XHRwb3N0ZWRPbiA9IChcblx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cInBvc3RlZC1vblwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtwb3N0ZWRPbkhUTUx9IC8+XG5cdFx0KVxuXHR9XG5cblx0dmFyIGljb25IVE1MID0ge19faHRtbDogcHJvcHMucG9zdC50ZW1wbGF0ZV90YWdzLmNhdGVnb3J5Lmljb259O1xuXG5cdHZhciBhcnRpY2xlQ2xhc3MgPSBwcm9wcy5wb3N0LmNzc19jbGFzcyArICcgcm9sbHVwLWl0ZW0nO1xuXG5cdHJldHVybiAoXG5cdFx0PGFydGljbGUgaWQ9e3Byb3BzLnBvc3QuaWR9IGNsYXNzTmFtZT17YXJ0aWNsZUNsYXNzfT5cblx0XHRcdDxoZWFkZXIgY2xhc3NOYW1lPVwiZW50cnktaGVhZGVyXCI+XG5cdFx0XHRcdDxoMiBjbGFzc05hbWU9XCJlbnRyeS10aXRsZVwiPjxhIGhyZWY9e3Byb3BzLnBvc3QucGVybWFsaW5rfT57cHJvcHMucG9zdC50aXRsZX08L2E+PC9oMj5cblx0XHRcdFx0e3Bvc3RlZE9ufVxuXHRcdFx0PC9oZWFkZXI+XG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImVudHJ5LWNhdC1pY29uXCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e2ljb25IVE1MfT48L2Rpdj5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZW50cnktc3VtbWFyeVwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtleGNlcnB0SFRNTH0+PC9kaXY+XG5cdFx0PC9hcnRpY2xlPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJvbGx1cDtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IFNpbmdsZSA9IChwcm9wcykgPT4ge1xuXHR2YXIgY29udGVudEhUTUwgPSB7X19odG1sOiBwcm9wcy5wb3N0LmNvbnRlbnR9O1xuXHR2YXIgcG9zdGVkT247XG5cdHZhciBjYXRlZ29yeUxpc3Q7XG5cdHZhciBjb21tZW50cztcblx0aWYgKHByb3BzLnBvc3QucG9zdF90eXBlID09PSAncG9zdCcpe1xuXG5cdFx0dmFyIHBvc3RlZE9uSFRNTCA9IHtfX2h0bWw6IHByb3BzLnBvc3QudGVtcGxhdGVfdGFncy5wb3N0ZWRfb259O1xuXHRcdHBvc3RlZE9uID0gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwb3N0ZWQtb25cIiBkYW5nZXJvdXNseVNldElubmVySFRNTD17cG9zdGVkT25IVE1MfSA+PC9kaXY+XG5cdFx0KTtcblxuXHRcdHZhciBjYXRlZ29yeUxpc3RIVE1MID0ge19faHRtbDogcHJvcHMucG9zdC50ZW1wbGF0ZV90YWdzLmNhdGVnb3J5Lmxpc3R9XG5cdFx0Y2F0ZWdvcnlMaXN0ID0gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9J3Bvc3QtY2F0ZWdvcnknIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtjYXRlZ29yeUxpc3RIVE1MfSA+PC9kaXY+XG5cdFx0KTtcblxuXHRcdHZhciBjb21tZW50c0hUTUwgPSB7X19odG1sOiBwcm9wcy5wb3N0LnRlbXBsYXRlX3RhZ3MuY29tbWVudHN9O1xuXHRcdGNvbW1lbnRzID0gKFxuXHRcdFx0PGZvb3RlciBjbGFzc05hbWU9XCJlbnRyeS1mb290ZXJcIiBkYW5nZXJvdXNseVNldElubmVySFRNTD17Y29tbWVudHNIVE1MfSAvPlxuXHRcdCk7XG5cdH1cblxuXG5cdHJldHVybiAoXG5cdFx0PGFydGljbGUgaWQ9e3Byb3BzLnBvc3QuaWR9IGNsYXNzTmFtZT17cHJvcHMucG9zdC5jc3NfY2xhc3N9PlxuXHRcdFx0PGhlYWRlciBjbGFzc05hbWU9XCJlbnRyeS1oZWFkZXJcIj5cblx0XHRcdFx0PGgxIGNsYXNzTmFtZT1cImVudHJ5LXRpdGxlXCI+e3Byb3BzLnBvc3QudGl0bGV9PC9oMT5cblx0XHRcdFx0e2NhdGVnb3J5TGlzdH1cblx0XHRcdFx0e3Bvc3RlZE9ufVxuXHRcdFx0PC9oZWFkZXI+XG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImVudHJ5LWNvbnRlbnRcIiBkYW5nZXJvdXNseVNldElubmVySFRNTD17Y29udGVudEhUTUx9PjwvZGl2PlxuXHRcdFx0e2NvbW1lbnRzfVxuXHRcdDwvYXJ0aWNsZT5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTaW5nbGU7XG4iLCJjb25zdCBhamF4U3RhdGVzID0ge1xuXHRJTklUSUFMOiAwLFxuXHRMT0FESU5HIDogMyxcblx0RE9ORSA6IDRcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhamF4U3RhdGVzO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgRm9vdGVyID0gKHByb3BzKSA9PiB7XG5cdHJldHVybiAoXG5cdFx0PGZvb3RlciBpZD1cImNvbG9waG9uXCIgY2xhc3NOYW1lPVwic2l0ZS1mb290ZXJcIiByb2xlPVwiY29udGVudGluZm9cIj5cblx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNpdGUtaW5mb1wiPlxuXHRcdFx0Q29weXJpZ2h0IMKpIEtyaXN0b2ZlciBSYXNrZSAyMDE2IFMuRC5HLiBQb3dlcmVkIGJ5IDxhIGhyZWY9XCJodHRwczovL3dvcmRwcmVzcy5vcmcvXCI+IFdvcmRwcmVzcyA8L2E+IGFuZCA8YSBocmVmPVwiaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvXCI+IFJlYWN0LmpzIDwvYT5cblx0XHQ8L2Rpdj5cblx0XHQ8L2Zvb3Rlcj5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGb290ZXI7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBIZWFkZXIgPSAocHJvcHMpID0+IHtcblx0dmFyIGxvZ29TcmMgPSAnL3dwLWNvbnRlbnQvdGhlbWVzL2tyYXNrZS1yZWFjdC0yMDE2L2NsaWVudC9zdGF0aWMvYXNzZXRzL3NpdGUtbG9nby5wbmcnO1xuXHR2YXIgbG9nb0NsYXNzID0gJ3NpdGUtbG9nbyc7XG5cdGlmIChwcm9wcy5pc0xvYWRpbmcpe1xuXHRcdGxvZ29TcmMgPSAnL3dwLWNvbnRlbnQvdGhlbWVzL2tyYXNrZS1yZWFjdC0yMDE2L2NsaWVudC9zdGF0aWMvYXNzZXRzL2xvYWRpbmcuc3ZnJztcblx0XHRsb2dvQ2xhc3MgPSAnc2l0ZS1sb2dvIGxvYWRpbmcnO1xuXHR9XG5cblx0cmV0dXJuIChcblx0XHQ8aGVhZGVyIGlkPVwibWFzdGhlYWRcIiBjbGFzc05hbWU9XCJzaXRlLWhlYWRlclwiIHJvbGU9XCJiYW5uZXJcIj5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtsb2dvQ2xhc3N9PlxuXHRcdFx0XHQ8YSBocmVmPVwiL21lbnVcIiB0aXRsZT1cIk1lbnVcIj5cblx0XHRcdFx0XHQ8aW1nIHdpZHRoPVwiMTAwXCIgaGVpZ2h0PVwiMTAwXCIgc3JjPXtsb2dvU3JjfSBhbHQ9XCJTaXRlIExvZ29cIiAvPlxuXHRcdFx0XHQ8L2E+XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L2hlYWRlcj5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBIZWFkZXI7XG4iLCIvKipcbiAqIE1haW4gZW50cnkgcG9pbnQgZm9yIHJlYWN0IGNvbXBvbmVudHNcbiAqL1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCAncmVhY3QnICk7XG52YXIgUmVhY3RET00gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcbnZhciBSb3V0ZXIgPSByZXF1aXJlKCAnLi9yb3V0ZXIuanN4JyApO1xudmFyIGlzUnVubmFibGUgPSByZXF1aXJlKCcuLi9qcy9wcm9ncmVzc2l2ZS5qcycpO1xudmFyIGhhc0luaXRpYWxEYXRhID0gKHR5cGVvZiBpbml0aWFsUmVhY3REYXRhICE9PSAndW5kZWZpbmVkJyk7XG5cbmlmIChpc1J1bm5hYmxlICYmIGhhc0luaXRpYWxEYXRhKXtcbiAgdmFyIHJlYWN0Um9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnYXBwLXJvb3QnICk7XG4gIHZhciBjb250ZW50QXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICcuZW50cnktY29udGVudCcgKTtcbiAgdmFyIGlubmVyQ29udGVudEFyZWE7XG4gIGlmIChjb250ZW50QXJlYSl7XG4gICAgdmFyIGlubmVyQ29udGVudEFyZWEgPSBjb250ZW50QXJlYS5pbm5lckhUTUw7XG4gIH1cbiAgUmVhY3RET00ucmVuZGVyKDxSb3V0ZXIgaW5pdGlhbERhdGE9e2luaXRpYWxSZWFjdERhdGF9IGluaXRpYWxDb250ZW50PXtpbm5lckNvbnRlbnRBcmVhfSAvPiwgcmVhY3RSb290KTtcbn1cbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IEhlYWRlclNraXBMaW5rID0gKHByb3BzKSA9PiB7XG5cdHJldHVybiAoXG5cdFx0PGEgY2xhc3NOYW1lPVwic2tpcC1saW5rIHNjcmVlbi1yZWFkZXItdGV4dFwiIGhyZWY9XCIjY29udGVudFwiPlNraXAgdG8gY29udGVudDwvYT5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBIZWFkZXJTa2lwTGluaztcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IFBvc3ROYXZpZ2F0aW9uID0gKHByb3BzKSA9PiB7XG5cblx0Ly8gd29yZHByZXNzIGtlZXBzIHRoZSByZXR1cm5faW5zdGVhZCBxdWVyeSB2YXIgaW4gdGhlIG5hdiwgYnV0IHdlIGRvbid0IHdhbnRcblx0Ly8gdG8gbGluayB0byB0aGF0LiBTbyBzdHJpcCB0aGF0IG91dCFcblx0dmFyIG5hdkhUTUxub0xpbmtRdWVyeVN0cmluZyA9IHByb3BzLmNvbnRlbnQucmVwbGFjZSgvcmV0dXJuX2luc3RlYWRcXD1wb3N0cy1qc29uL2csIFwiXCIpO1xuXHR2YXIgbmF2aWdhdGlvbl9odG1sID0ge19faHRtbDogbmF2SFRNTG5vTGlua1F1ZXJ5U3RyaW5nfVxuXG5cdHJldHVybiAoXG5cdFx0PGRpdiBjbGFzc05hbWU9XCJwcmV2LW5leHQtcG9zdHNcIiBkYW5nZXJvdXNseVNldElubmVySFRNTD17bmF2aWdhdGlvbl9odG1sfSAvPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBvc3ROYXZpZ2F0aW9uO1xuIiwiLyoqXG4gKiBXcmFwcGVyIGNvbXBvbmVudCBmb3IgUmVhY3QgQXBwbGljYXRpb24gd2hpY2ggbWFuYWdlcyBzdGF0ZSB2aWEgdGhlXG4gKiB3b3JkcHJlc3MgVVJMLiBVc2luZyB0aGUgJ3BhZ2UnIGxpYnJhcnkgaW4gbnBtIHdlIGNhbiBoaWphY2sgbm9ybWFsIGxpbmtcbiAqIGV4ZWN1dGlvbiBhbmQgaW5zdGVhZCB1c2UgdGhlIGV2ZW50IHRvIGdldCB0aGUgbmV3IGRhdGEgZm9yIFJlYWN0IHRvIGNvbnN1bWVcbiAqIGFsbCB0aGUgd2hpbGUgdXBkYXRpbmcgdGhlIGN1cnJlbnQgdXJsIHVzaW5nIHRoZSBIaXN0b3J5IEFQSSB0byBtYWtlIGl0XG4gKiBhcHBlYXIgdGhhdCB5b3UgaGF2ZSBtb3ZlZCB0byBhIG5ldyBwYWdlXG4gKi9cblxudmFyIFJlYWN0ID0gcmVxdWlyZSggJ3JlYWN0JyApO1xudmFyIHVybFJvdXRlciA9IHJlcXVpcmUoICdwYWdlJyApO1xudmFyIHJlcXVlc3QgPSByZXF1aXJlKCAnc3VwZXJhZ2VudCcgKTtcblxudmFyIGFqYXhTdGF0ZXMgPSByZXF1aXJlKCAnLi9lbnVtL2FqYXhTdGF0ZXMuanMnKTtcbnZhciBQYWdlID0gcmVxdWlyZSggJy4vUGFnZS5qc3gnICk7XG5cbmNsYXNzIFJvdXRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuXHRcdFx0YWpheFN0YXRlOiBhamF4U3RhdGVzLklOSVRJQUwsXG5cdFx0XHRwb3N0czogcHJvcHMuaW5pdGlhbERhdGEucG9zdHMsXG5cdFx0XHRtZW51OiBwcm9wcy5pbml0aWFsRGF0YS5wcmltYXJ5X21lbnUsXG5cdFx0XHRwb3N0TmF2OiBwcm9wcy5pbml0aWFsRGF0YS5wb3N0X25hdixcblx0XHRcdGJvZHlDbGFzczogcHJvcHMuaW5pdGlhbERhdGEuYm9keV9jbGFzcyxcblx0XHRcdHRlbXBsYXRlOiBwcm9wcy5pbml0aWFsRGF0YS50ZW1wbGF0ZSxcblx0XHRcdGFqYXhTdGF0ZTogYWpheFN0YXRlcy5ET05FLFxuXHRcdH1cblxuXHRcdC8vIFNlcGFyYXRlbHkgbG9hZCBjb250ZW50LCBpdCBpcyBwb3NzaWJseSBsb3RzIG9mIGRhdGFcblx0XHRpZiAocHJvcHMuaW5pdGlhbERhdGEucG9zdHMubGVuZ3RoID09PSAxICl7XG5cdFx0XHR0aGlzLnN0YXRlLnBvc3RzWzBdLmNvbnRlbnQgPSBwcm9wcy5pbml0aWFsQ29udGVudDtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogSGVscGVyIGZ1bmN0aW9uIHRvIGFkZCBRdWVyeSBTdHJpbmcgUGFyYW1ldGVyIHRvIGVuZCBvZiB1cmxcblx0ICpcblx0ICogQHJldHVybnMgcXVlcnlzdHJpbmcgd2l0aCBwYXJhbSBhcHBlbmRlZC5cblx0ICovXG5cdHN0YXRpYyB1cGRhdGVQYXRoV2l0aE5ld1F1ZXJ5KG5ld1BhcmFtLCBwYXRoLCBleGlzdGluZ1F1ZXJ5c3RyaW5nPScnKXtcblx0XHR2YXIgc2VwZXJhdG9yQXBlcnNhbmQgPSAnJztcblx0XHRpZiAoZXhpc3RpbmdRdWVyeXN0cmluZyl7XG5cdFx0XHRpZiAoZXhpc3RpbmdRdWVyeXN0cmluZy5pbmRleE9mKG5ld1BhcmFtKSAhPT0gLTEgKSB7XG5cdFx0XHRcdHJldHVybiBwYXRoICsgJz8nICsgZXhpc3RpbmdRdWVyeXN0cmluZztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNlcGVyYXRvckFwZXJzYW5kID0gJyYnO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcGF0aCArICc/JyArIGV4aXN0aW5nUXVlcnlzdHJpbmcgKyBzZXBlcmF0b3JBcGVyc2FuZCArIG5ld1BhcmFtO1xuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFx0Ly8gQnkgZGVmYXVsdCBvdXIgcmV0dXJuLWluc3RlYWQgd2lsbCByZXR1cm4gdGhlIGRlZmF1bHQgcG9zdHMgcm9sbHVwXG5cdFx0Ly8gcmVnYXJkbGVzcyBvZiBzdGF0aWMgaG9tZXBhZ2Ugc2V0dGluZy4gU28gd2UgbmVlZCB0byBtYW51YWxseSBnb1xuXHRcdC8vIHRvIHRoZSBob21lcGFnZSBvbiB0aGUgY2xpZW50IHRvIGdldCB0aGUgcmlnaHQgY29udGVudFxuXHRcdHVybFJvdXRlciggJy8nLCBmdW5jdGlvbiAoIGN0eCApIHtcblx0XHRcdHVybFJvdXRlcignL2hvbWUnKTtcblx0XHR9KTtcblxuXHRcdC8vIE1lbnUgaXMgbG9hZGVkIG9uIGluaXRpYWwgbG9hZCBhbmQgbmV2ZXIgY2hhbmdlcywgc28gd2UgZG9uJ3QgbmVlZFxuXHRcdC8vIHRvIGdvIHRvIHRoZSBzZXJ2ZXIgdG8gcmUtcmVuZGVyIHRoYXRcblx0XHR1cmxSb3V0ZXIoJy9tZW51JywgZnVuY3Rpb24gKCBjdHggKSB7XG5cdFx0XHRzZWxmLnNldFN0YXRlKHtcblx0XHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0XHR0eXBlOiAnbWVudScsXG5cdFx0XHRcdFx0dGl0bGU6ICdNZW51J1xuXHRcdFx0XHR9LFxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHQvLyBDcnV4IG9mIHRoZW1lIHJvdXRlci4gQWxsIGxpbmtzIGFyZSBoYXZlIGEgc3BlY2lhbCBxdWVyeSBzdHJpbmcgYXBwZW5kZWRcblx0XHQvLyB3aGljaCBsZXQncyB3b3JkcHJlc3Mga25vdyB0byByZXR1cm4gcG9zdCBkYXRhIGluc3RlYWQgb2YgdGhlIGVudGlyZVxuXHRcdC8vIHBhZ2UgcmVsb2FkLiBJZiB3b3JkcHJlc3MgZG9lc24ndCByZXR1cm4gZGF0YSwgdGhlIHJvdXRlciBpcyB0b3JuIGRvd25cblx0XHQvLyBhbmQgeW91IG5hdmlnYXRlIG5vcm1hbGx5XG5cdFx0dXJsUm91dGVyKCAnKicsIGZ1bmN0aW9uICggY3R4ICkge1xuXHRcdFx0aWYgKHNlbGYuc3RhdGUuYWpheFN0YXRlID09PSBhamF4U3RhdGVzLkxPQURJTkcpe1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR2YXIgZGF0YVBhdGggPSBSb3V0ZXIudXBkYXRlUGF0aFdpdGhOZXdRdWVyeSgncmV0dXJuX2luc3RlYWQ9cG9zdHMtanNvbicsIGN0eC5wYXRobmFtZSwgY3R4LnF1ZXJ5c3RyaW5nKTtcblx0XHRcdHNlbGYuc2V0U3RhdGUoe1xuXHRcdFx0XHRhamF4U3RhdGU6IGFqYXhTdGF0ZXMuTE9BRElOR1xuXHRcdFx0fSk7XG5cblx0XHRcdHJlcXVlc3Rcblx0XHRcdFx0LmdldCggZGF0YVBhdGggKVxuXHRcdFx0XHQuZW5kKCBmdW5jdGlvbiggZXJyLCByZXMgKSB7XG5cdFx0XHRcdFx0aWYgKGVycikge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnIpO1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHR2YXIgZGF0YSA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuXHRcdFx0XHRcdH0gY2F0Y2goZXgpIHtcblx0XHRcdFx0XHRcdHVybFJvdXRlci5zdG9wKCk7XG5cdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGN0eC5jYW5vbmljYWxQYXRoO1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHNlbGYuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdFx0cG9zdHM6IGRhdGEucG9zdHMsXG5cdFx0XHRcdFx0XHRwb3N0TmF2OiBkYXRhLnBvc3RfbmF2LFxuXHRcdFx0XHRcdFx0Ym9keUNsYXNzOiBkYXRhLmJvZHlfY2xhc3MsXG5cdFx0XHRcdFx0XHR0ZW1wbGF0ZTogZGF0YS50ZW1wbGF0ZSxcblx0XHRcdFx0XHRcdGFqYXhTdGF0ZTogYWpheFN0YXRlcy5ET05FLFxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdHVybFJvdXRlcih7XG5cdFx0XHQvLyBQcmV2ZW50cyB0cmlnZ2VyaW5nIHJvdXRpbmcgb24gdGhlIGluaXRpYWwgcGFnZSBsb2FkXG5cdFx0XHRkaXNwYXRjaDogZmFsc2Vcblx0XHR9KTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxQYWdlIHsuLi50aGlzLnN0YXRlfSAvPlxuXHRcdFx0KTtcblx0XHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUm91dGVyO1xuIiwiLyoqXG4gKiBNb2R1bGUgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgdG8gbG9hZCB1cCByZWFjdCBvciBub3RcbiAqL1xuXG52YXIgdXNlSlMgPSB0cnVlO1xuXG5pZiAodHlwZW9mIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgIT09ICdmdW5jdGlvbicgKSB7XG5cdHVzZUpTID0gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdXNlSlM7XG4iXX0=
