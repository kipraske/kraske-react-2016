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
			colorPalette: 'color-palette-1',
			pageClass: ''
		};
		return _this;
	}

	_createClass(Page, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var pageClass = nextProps.bodyClass || nextProps.initialPageClass;
			var newPaletteClass = pageClass.match(/color-palette-\d/)[0];
			var newClassList = pageClass.replace(/\s?color-palette-\d/g, '');
			this.setState({ colorPalette: newPaletteClass });
			this.setState({ pageClass: newClassList });
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			var _this2 = this;

			// It's not pretty, but we should scroll to the top of the page if we
			// "navigate" to another page with a render
			window.document.body.scrollTop = 0;

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
			var contentElement;
			var contentHeader;
			var postNav;

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

			console.log(this.props.ajaxState);

			return React.createElement(
				'div',
				{ id: 'page', ref: 'pageContainer', className: this.state.pageClass },
				React.createElement(HeaderSkipLink, null),
				React.createElement(Header, null),
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

},{"./content/menu.jsx":2,"./content/none.jsx":3,"./content/rollup.jsx":4,"./content/single.jsx":5,"./footer.jsx":7,"./header.jsx":8,"./misc/header-skip-link.jsx":10,"./misc/post-navigation.jsx":11,"react":"react"}],2:[function(require,module,exports){
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
				{ href: "/menu", title: "Menu" },
				React.createElement("img", { src: "/wp-content/themes/kraske-react-2016/client/static/assets/site-logo.png", alt: "Site Logo" })
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

if (isRunnable) {
  var reactRoot = document.getElementById('app-root');
  var pageRoot = document.getElementById('page');
  ReactDOM.render(React.createElement(Router, { initialPage: pageRoot.innerHTML, initialBodyClass: pageRoot.className }), reactRoot);
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

		_this.state = {
			hasServerData: false,
			ajaxState: ajaxStates.INITIAL,
			posts: [],
			initialPage: _this.props.initialPage,
			initialPageClass: props.initialBodyClass
		};
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

			// For a static homepage wordpress doesn't know to fetch the page instead
			// of the default rollup, so we can't use the react routing in this case
			urlRouter('/', function (ctx) {
				urlRouter.stop();
				window.location.href = ctx.canonicalPath;
				return;
			});

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
						hasServerData: true,
						posts: data.posts,
						menu: data.primary_menu,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvY29tcG9uZW50cy9QYWdlLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2NvbnRlbnQvbWVudS5qc3giLCJjbGllbnQvY29tcG9uZW50cy9jb250ZW50L25vbmUuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvY29udGVudC9yb2xsdXAuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvY29udGVudC9zaW5nbGUuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvZW51bS9hamF4U3RhdGVzLmpzIiwiY2xpZW50L2NvbXBvbmVudHMvZm9vdGVyLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2hlYWRlci5qc3giLCJjbGllbnQvY29tcG9uZW50cy9pbmRleC5qc3giLCJjbGllbnQvY29tcG9uZW50cy9taXNjL2hlYWRlci1za2lwLWxpbmsuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvbWlzYy9wb3N0LW5hdmlnYXRpb24uanN4IiwiY2xpZW50L2NvbXBvbmVudHMvcm91dGVyLmpzeCIsImNsaWVudC9qcy9wcm9ncmVzc2l2ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUNBQSxJQUFJLFFBQVEsUUFBUSxPQUFSLENBQVI7O0FBRUosSUFBSSxTQUFTLFFBQVEsY0FBUixDQUFUO0FBQ0osSUFBSSxpQkFBaUIsUUFBUSw2QkFBUixDQUFqQjtBQUNKLElBQUksU0FBUyxRQUFRLHNCQUFSLENBQVQ7QUFDSixJQUFJLFNBQVMsUUFBUSxzQkFBUixDQUFUO0FBQ0osSUFBSSxPQUFPLFFBQVEsb0JBQVIsQ0FBUDtBQUNKLElBQUksT0FBTyxRQUFRLG9CQUFSLENBQVA7QUFDSixJQUFJLFVBQVUsUUFBUSw0QkFBUixDQUFWO0FBQ0osSUFBSSxTQUFTLFFBQVEsY0FBUixDQUFUOzs7Ozs7OztJQU9FOzs7QUFFTCxVQUZLLElBRUwsQ0FBWSxLQUFaLEVBQWtCO3dCQUZiLE1BRWE7O3FFQUZiLGlCQUdFLFFBRFc7O0FBRWpCLFFBQUssS0FBTCxHQUFhO0FBQ1osaUJBQWMsaUJBQWQ7QUFDQSxjQUFXLEVBQVg7R0FGRCxDQUZpQjs7RUFBbEI7O2NBRks7OzRDQVVxQixXQUFVO0FBQ25DLE9BQUksWUFBWSxVQUFVLFNBQVYsSUFBdUIsVUFBVSxnQkFBVixDQURKO0FBRW5DLE9BQUksa0JBQWtCLFVBQVUsS0FBVixDQUFnQixrQkFBaEIsRUFBb0MsQ0FBcEMsQ0FBbEIsQ0FGK0I7QUFHbkMsT0FBSSxlQUFlLFVBQVUsT0FBVixDQUFrQixzQkFBbEIsRUFBMEMsRUFBMUMsQ0FBZixDQUgrQjtBQUluQyxRQUFLLFFBQUwsQ0FBYyxFQUFDLGNBQWMsZUFBZCxFQUFmLEVBSm1DO0FBS25DLFFBQUssUUFBTCxDQUFjLEVBQUMsV0FBVyxZQUFYLEVBQWYsRUFMbUM7Ozs7dUNBUWhCOzs7OztBQUduQixVQUFPLFFBQVAsQ0FBZ0IsSUFBaEIsQ0FBcUIsU0FBckIsR0FBaUMsQ0FBakM7Ozs7QUFIbUIsU0FPbkIsQ0FBTyxxQkFBUCxDQUE4QixZQUFNO0FBQ25DLFdBQUssWUFBTCxHQURtQztBQUVuQyxXQUFPLHFCQUFQLENBQThCLFlBQU07QUFDbkMsWUFBSyxZQUFMLEdBRG1DO0tBQU4sQ0FBOUIsQ0FGbUM7SUFBTixDQUE5QixDQVBtQjs7OztpQ0FlTjtBQUNiLFFBQUssSUFBTCxDQUFVLGFBQVYsQ0FBd0IsU0FBeEIsR0FBb0MsS0FBSyxLQUFMLENBQVcsU0FBWCxHQUF1QixHQUF2QixHQUE2QiwwQkFBN0IsQ0FEdkI7Ozs7aUNBSUE7QUFDYixRQUFLLElBQUwsQ0FBVSxhQUFWLENBQXdCLFNBQXhCLEdBQW9DLEtBQUssS0FBTCxDQUFXLFNBQVgsR0FBdUIsR0FBdkIsR0FBNkIsS0FBSyxLQUFMLENBQVcsWUFBWCxDQURwRDs7OzsyQkFJTjs7OztBQUlQLE9BQUksQ0FBQyxLQUFLLEtBQUwsQ0FBVyxhQUFYLEVBQXlCO0FBQzdCLFFBQUksaUJBQWlCLEVBQUMsUUFBUSxLQUFLLEtBQUwsQ0FBVyxXQUFYLEVBQTFCLENBRHlCO0FBRTdCLFdBQU8sNkJBQUssSUFBRyxNQUFILEVBQVUsS0FBSSxlQUFKLEVBQW9CLFdBQVcsS0FBSyxLQUFMLENBQVcsZ0JBQVgsRUFBNkIseUJBQXlCLGNBQXpCLEVBQTNFLENBQVAsQ0FGNkI7SUFBOUI7OztBQUpPLE9BVUgsY0FBSixDQVZPO0FBV1AsT0FBSSxhQUFKLENBWE87QUFZUCxPQUFJLE9BQUosQ0FaTzs7QUFjUCxPQUFJLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsTUFBakIsS0FBNEIsQ0FBNUIsRUFBOEI7QUFDakMscUJBQWlCLG9CQUFDLElBQUQsSUFBTSxXQUFXLEtBQUssS0FBTCxDQUFXLElBQVgsRUFBakIsQ0FBakIsQ0FEaUM7SUFBbEMsTUFFTztBQUNOLFlBQVEsS0FBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixJQUFwQjtBQUNQLFVBQUssTUFBTDtBQUNDLHNCQUFnQjs7U0FBSSxXQUFVLGNBQVYsRUFBSjtPQUE4QixLQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLEtBQXBCO09BQTlDLENBREQ7QUFFQyx1QkFBaUIsb0JBQUMsSUFBRCxJQUFNLFdBQVcsS0FBSyxLQUFMLENBQVcsSUFBWCxFQUFqQixDQUFqQixDQUZEO0FBR0MsWUFIRDtBQURELFVBS00sUUFBTDtBQUNDLHNCQUFnQjs7U0FBSSxXQUFVLGNBQVYsRUFBSjtPQUE4QixLQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLEtBQXBCO09BQTlDLENBREQ7QUFFQyx1QkFBaUIsRUFBakIsQ0FGRDs7Ozs7O0FBR0MsNEJBQWlCLEtBQUssS0FBTCxDQUFXLEtBQVgsMEJBQWpCLG9HQUFrQztZQUF6QixvQkFBeUI7O0FBQ2pDLHVCQUFlLElBQWYsQ0FBb0Isb0JBQUMsTUFBRCxJQUFRLE1BQU0sS0FBTixFQUFZLEtBQUssTUFBSyxFQUFMLEVBQXpCLENBQXBCLEVBRGlDO1FBQWxDOzs7Ozs7Ozs7Ozs7OztPQUhEOztBQU1DLGdCQUFVLG9CQUFDLE9BQUQsSUFBUyxTQUFTLEtBQUssS0FBTCxDQUFXLE9BQVgsRUFBbEIsQ0FBVixDQU5EO0FBT0MsWUFQRDtBQUxELFVBYU0sUUFBTDtBQUNDLFVBQUksT0FBTyxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLENBQWpCLENBQVAsQ0FETDtBQUVDLHVCQUFpQixvQkFBQyxNQUFELElBQVEsTUFBTSxJQUFOLEVBQVIsQ0FBakIsQ0FGRDtBQWJELEtBRE07SUFGUDs7QUFzQkEsV0FBUSxHQUFSLENBQVksS0FBSyxLQUFMLENBQVcsU0FBWCxDQUFaLENBcENPOztBQXNDUCxVQUNDOztNQUFLLElBQUcsTUFBSCxFQUFVLEtBQUksZUFBSixFQUFvQixXQUFXLEtBQUssS0FBTCxDQUFXLFNBQVgsRUFBOUM7SUFDQyxvQkFBQyxjQUFELE9BREQ7SUFFQyxvQkFBQyxNQUFELE9BRkQ7SUFHQzs7T0FBTSxJQUFHLFNBQUgsRUFBYSxXQUFVLGNBQVYsRUFBbkI7S0FDRSxhQURGO0tBRUUsY0FGRjtLQUdFLE9BSEY7S0FIRDtJQVFDLG9CQUFDLE1BQUQsT0FSRDtJQURELENBdENPOzs7O1FBekNIO0VBQWEsTUFBTSxTQUFOOztBQThGbkIsT0FBTyxPQUFQLEdBQWlCLElBQWpCOzs7OztBQzlHQSxJQUFJLFFBQVEsUUFBUSxPQUFSLENBQVI7O0FBRUosSUFBTSxPQUFPLFNBQVAsSUFBTyxDQUFDLEtBQUQsRUFBVzs7QUFFdkIsS0FBSSxlQUFjLEVBQUMsUUFBTyxNQUFNLFNBQU4sRUFBdEIsQ0FGbUI7O0FBSXZCLFFBQ0M7O0lBQUssSUFBRyxpQkFBSCxFQUFxQixXQUFVLGlCQUFWLEVBQTRCLE1BQUssWUFBTCxFQUF0RDtFQUNDOztLQUFNLE1BQUssUUFBTCxFQUFjLFFBQU8sS0FBUCxFQUFhLFdBQVUsYUFBVixFQUF3QixRQUFPLEdBQVAsRUFBekQ7R0FDQzs7O0lBQ0E7O09BQU0sV0FBVSxvQkFBVixFQUFOOztLQURBO0lBRUEsK0JBQU8sTUFBSyxRQUFMLEVBQWMsV0FBVSxjQUFWLEVBQXlCLGFBQVksVUFBWixFQUF1QixNQUFLLEdBQUwsRUFBckUsQ0FGQTtJQUREO0dBS0E7O01BQVEsTUFBSyxRQUFMLEVBQWMsV0FBVSxlQUFWLEVBQXRCOztJQUxBO0dBREQ7RUFRQyw2QkFBSyx5QkFBeUIsWUFBekIsRUFBTCxDQVJEO0VBREQsQ0FKdUI7Q0FBWDs7QUFrQmIsT0FBTyxPQUFQLEdBQWlCLElBQWpCOzs7OztBQ3BCQSxJQUFJLFFBQVEsUUFBUSxPQUFSLENBQVI7QUFDSixJQUFJLE9BQU8sUUFBUSxZQUFSLENBQVA7O0FBRUosSUFBTSxPQUFPLFNBQVAsSUFBTyxDQUFDLEtBQUQsRUFBVztBQUN2QixRQUNDOztJQUFTLFdBQVUsc0JBQVYsRUFBVDtFQUNDOztLQUFRLFdBQVUsYUFBVixFQUFSO0dBQ0M7O01BQUksV0FBVSxjQUFWLEVBQUo7O0lBREQ7R0FERDtFQUtDOztLQUFLLFdBQVUsY0FBVixFQUFMO0dBQ0M7Ozs7SUFERDtHQUVDLG9CQUFDLElBQUQsSUFBTSxXQUFXLE1BQU0sU0FBTixFQUFqQixDQUZEO0dBTEQ7RUFERCxDQUR1QjtDQUFYOztBQWViLE9BQU8sT0FBUCxHQUFpQixJQUFqQjs7Ozs7QUNsQkEsSUFBSSxRQUFRLFFBQVEsT0FBUixDQUFSOztBQUVKLElBQU0sU0FBUyxTQUFULE1BQVMsQ0FBQyxLQUFELEVBQVc7O0FBRXpCLEtBQUksY0FBYyxFQUFDLFFBQVEsUUFBUSxNQUFNLElBQU4sQ0FBVyxPQUFYLEdBQXFCLE1BQTdCLEVBQXZCLENBRnFCOztBQUl6QixLQUFJLFFBQUosQ0FKeUI7QUFLekIsS0FBSSxNQUFNLElBQU4sQ0FBVyxTQUFYLEtBQXlCLE1BQXpCLEVBQWdDO0FBQ25DLE1BQUksZUFBZSxFQUFDLFFBQVEsTUFBTSxJQUFOLENBQVcsYUFBWCxDQUF5QixTQUF6QixFQUF4QixDQUQrQjtBQUVuQyxhQUNDLDhCQUFNLFdBQVUsV0FBVixFQUFzQix5QkFBeUIsWUFBekIsRUFBNUIsQ0FERCxDQUZtQztFQUFwQzs7QUFPQSxLQUFJLFdBQVcsRUFBQyxRQUFRLE1BQU0sSUFBTixDQUFXLGFBQVgsQ0FBeUIsUUFBekIsQ0FBa0MsSUFBbEMsRUFBcEIsQ0FacUI7O0FBY3pCLEtBQUksZUFBZSxNQUFNLElBQU4sQ0FBVyxTQUFYLEdBQXVCLGNBQXZCLENBZE07O0FBZ0J6QixRQUNDOztJQUFTLElBQUksTUFBTSxJQUFOLENBQVcsRUFBWCxFQUFlLFdBQVcsWUFBWCxFQUE1QjtFQUNDOztLQUFRLFdBQVUsY0FBVixFQUFSO0dBQ0M7O01BQUksV0FBVSxhQUFWLEVBQUo7SUFBNEI7O09BQUcsTUFBTSxNQUFNLElBQU4sQ0FBVyxTQUFYLEVBQVQ7S0FBZ0MsTUFBTSxJQUFOLENBQVcsS0FBWDtLQUE1RDtJQUREO0dBRUUsUUFGRjtHQUREO0VBS0MsNkJBQUssV0FBVSxnQkFBVixFQUEyQix5QkFBeUIsUUFBekIsRUFBaEMsQ0FMRDtFQU1DLDZCQUFLLFdBQVUsZUFBVixFQUEwQix5QkFBeUIsV0FBekIsRUFBL0IsQ0FORDtFQURELENBaEJ5QjtDQUFYOztBQTRCZixPQUFPLE9BQVAsR0FBaUIsTUFBakI7Ozs7O0FDOUJBLElBQUksUUFBUSxRQUFRLE9BQVIsQ0FBUjs7QUFFSixJQUFNLFNBQVMsU0FBVCxNQUFTLENBQUMsS0FBRCxFQUFXO0FBQ3pCLEtBQUksY0FBYyxFQUFDLFFBQVEsTUFBTSxJQUFOLENBQVcsT0FBWCxFQUF2QixDQURxQjtBQUV6QixLQUFJLFFBQUosQ0FGeUI7QUFHekIsS0FBSSxZQUFKLENBSHlCO0FBSXpCLEtBQUksUUFBSixDQUp5QjtBQUt6QixLQUFJLE1BQU0sSUFBTixDQUFXLFNBQVgsS0FBeUIsTUFBekIsRUFBZ0M7O0FBRW5DLE1BQUksZUFBZSxFQUFDLFFBQVEsTUFBTSxJQUFOLENBQVcsYUFBWCxDQUF5QixTQUF6QixFQUF4QixDQUYrQjtBQUduQyxhQUNDLDZCQUFLLFdBQVUsV0FBVixFQUFzQix5QkFBeUIsWUFBekIsRUFBM0IsQ0FERCxDQUhtQzs7QUFPbkMsTUFBSSxtQkFBbUIsRUFBQyxRQUFRLE1BQU0sSUFBTixDQUFXLGFBQVgsQ0FBeUIsUUFBekIsQ0FBa0MsSUFBbEMsRUFBNUIsQ0FQK0I7QUFRbkMsaUJBQ0MsNkJBQUssV0FBVSxlQUFWLEVBQTBCLHlCQUF5QixnQkFBekIsRUFBL0IsQ0FERCxDQVJtQzs7QUFZbkMsTUFBSSxlQUFlLEVBQUMsUUFBUSxNQUFNLElBQU4sQ0FBVyxhQUFYLENBQXlCLFFBQXpCLEVBQXhCLENBWitCO0FBYW5DLGFBQ0MsZ0NBQVEsV0FBVSxjQUFWLEVBQXlCLHlCQUF5QixZQUF6QixFQUFqQyxDQURELENBYm1DO0VBQXBDOztBQW1CQSxRQUNDOztJQUFTLElBQUksTUFBTSxJQUFOLENBQVcsRUFBWCxFQUFlLFdBQVcsTUFBTSxJQUFOLENBQVcsU0FBWCxFQUF2QztFQUNDOztLQUFRLFdBQVUsY0FBVixFQUFSO0dBQ0M7O01BQUksV0FBVSxhQUFWLEVBQUo7SUFBNkIsTUFBTSxJQUFOLENBQVcsS0FBWDtJQUQ5QjtHQUVFLFlBRkY7R0FHRSxRQUhGO0dBREQ7RUFNQyw2QkFBSyxXQUFVLGVBQVYsRUFBMEIseUJBQXlCLFdBQXpCLEVBQS9CLENBTkQ7RUFPRSxRQVBGO0VBREQsQ0F4QnlCO0NBQVg7O0FBcUNmLE9BQU8sT0FBUCxHQUFpQixNQUFqQjs7Ozs7QUN2Q0EsSUFBTSxhQUFhO0FBQ2xCLFVBQVMsQ0FBVDtBQUNBLFVBQVUsQ0FBVjtBQUNBLE9BQU8sQ0FBUDtDQUhLOztBQU1OLE9BQU8sT0FBUCxHQUFpQixVQUFqQjs7Ozs7QUNOQSxJQUFJLFFBQVEsUUFBUSxPQUFSLENBQVI7O0FBRUosSUFBTSxTQUFTLFNBQVQsTUFBUyxDQUFDLEtBQUQsRUFBVztBQUN6QixRQUNDOztJQUFRLElBQUcsVUFBSCxFQUFjLFdBQVUsYUFBVixFQUF3QixNQUFLLGFBQUwsRUFBOUM7RUFDQTs7S0FBSyxXQUFVLFdBQVYsRUFBTDs7R0FDb0Q7O01BQUcsTUFBSyx3QkFBTCxFQUFIOztJQURwRDs7R0FDeUc7O01BQUcsTUFBSyxtQ0FBTCxFQUFIOztJQUR6RztHQURBO0VBREQsQ0FEeUI7Q0FBWDs7QUFVZixPQUFPLE9BQVAsR0FBaUIsTUFBakI7Ozs7O0FDWkEsSUFBSSxRQUFRLFFBQVEsT0FBUixDQUFSOztBQUVKLElBQU0sU0FBUyxTQUFULE1BQVMsQ0FBQyxLQUFELEVBQVc7QUFDekIsUUFDQzs7SUFBUSxJQUFHLFVBQUgsRUFBYyxXQUFVLGFBQVYsRUFBd0IsTUFBSyxRQUFMLEVBQTlDO0VBQ0M7O0tBQUssV0FBVSxXQUFWLEVBQUw7R0FDQTs7TUFBRyxNQUFLLE9BQUwsRUFBYSxPQUFNLE1BQU4sRUFBaEI7SUFDQyw2QkFBSyxLQUFJLHlFQUFKLEVBQThFLEtBQUksV0FBSixFQUFuRixDQUREO0lBREE7R0FERDtFQURELENBRHlCO0NBQVg7O0FBWWYsT0FBTyxPQUFQLEdBQWlCLE1BQWpCOzs7Ozs7Ozs7QUNWQSxJQUFJLFFBQVEsUUFBUyxPQUFULENBQVI7QUFDSixJQUFJLFdBQVcsUUFBUSxXQUFSLENBQVg7QUFDSixJQUFJLFNBQVMsUUFBUyxjQUFULENBQVQ7QUFDSixJQUFJLGFBQWEsUUFBUSxzQkFBUixDQUFiOztBQUVKLElBQUksVUFBSixFQUFlO0FBQ2IsTUFBSSxZQUFZLFNBQVMsY0FBVCxDQUF5QixVQUF6QixDQUFaLENBRFM7QUFFYixNQUFJLFdBQVcsU0FBUyxjQUFULENBQXlCLE1BQXpCLENBQVgsQ0FGUztBQUdiLFdBQVMsTUFBVCxDQUFnQixvQkFBQyxNQUFELElBQVEsYUFBYSxTQUFTLFNBQVQsRUFBb0Isa0JBQWtCLFNBQVMsU0FBVCxFQUEzRCxDQUFoQixFQUFrRyxTQUFsRyxFQUhhO0NBQWY7Ozs7O0FDVEEsSUFBSSxRQUFRLFFBQVEsT0FBUixDQUFSOztBQUVKLElBQU0saUJBQWlCLFNBQWpCLGNBQWlCLENBQUMsS0FBRCxFQUFXO0FBQ2pDLFFBQ0M7O0lBQUcsV0FBVSw4QkFBVixFQUF5QyxNQUFLLFVBQUwsRUFBNUM7O0VBREQsQ0FEaUM7Q0FBWDs7QUFNdkIsT0FBTyxPQUFQLEdBQWlCLGNBQWpCOzs7OztBQ1JBLElBQUksUUFBUSxRQUFRLE9BQVIsQ0FBUjs7QUFFSixJQUFNLGlCQUFpQixTQUFqQixjQUFpQixDQUFDLEtBQUQsRUFBVzs7OztBQUlqQyxLQUFJLDJCQUEyQixNQUFNLE9BQU4sQ0FBYyxPQUFkLENBQXNCLDZCQUF0QixFQUFxRCxFQUFyRCxDQUEzQixDQUo2QjtBQUtqQyxLQUFJLGtCQUFrQixFQUFDLFFBQVEsd0JBQVIsRUFBbkIsQ0FMNkI7O0FBT2pDLFFBQ0MsNkJBQUssV0FBVSxpQkFBVixFQUE0Qix5QkFBeUIsZUFBekIsRUFBakMsQ0FERCxDQVBpQztDQUFYOztBQVl2QixPQUFPLE9BQVAsR0FBaUIsY0FBakI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05BLElBQUksUUFBUSxRQUFTLE9BQVQsQ0FBUjtBQUNKLElBQUksWUFBWSxRQUFTLE1BQVQsQ0FBWjtBQUNKLElBQUksVUFBVSxRQUFTLFlBQVQsQ0FBVjs7QUFFSixJQUFJLGFBQWEsUUFBUyxzQkFBVCxDQUFiO0FBQ0osSUFBSSxPQUFPLFFBQVMsWUFBVCxDQUFQOztJQUVFOzs7QUFFTCxVQUZLLE1BRUwsQ0FBWSxLQUFaLEVBQW1CO3dCQUZkLFFBRWM7O3FFQUZkLG1CQUdFLFFBRFk7O0FBRWhCLFFBQUssS0FBTCxHQUFhO0FBQ2Qsa0JBQWUsS0FBZjtBQUNBLGNBQVcsV0FBVyxPQUFYO0FBQ1gsVUFBTyxFQUFQO0FBQ0EsZ0JBQWEsTUFBSyxLQUFMLENBQVcsV0FBWDtBQUNiLHFCQUFrQixNQUFNLGdCQUFOO0dBTGpCLENBRmdCOztFQUFuQjs7Ozs7Ozs7O2NBRks7O3NDQThCZTtBQUNuQixPQUFJLE9BQU8sSUFBUDs7OztBQURlLFlBS25CLENBQVcsR0FBWCxFQUFnQixVQUFXLEdBQVgsRUFBaUI7QUFDaEMsY0FBVSxJQUFWLEdBRGdDO0FBRWhDLFdBQU8sUUFBUCxDQUFnQixJQUFoQixHQUF1QixJQUFJLGFBQUosQ0FGUztBQUdoQyxXQUhnQztJQUFqQixDQUFoQixDQUxtQjs7QUFXbkIsYUFBVyxHQUFYLEVBQWdCLFVBQVcsR0FBWCxFQUFpQjtBQUNoQyxRQUFJLEtBQUssS0FBTCxDQUFXLFNBQVgsS0FBeUIsV0FBVyxPQUFYLEVBQW1CO0FBQy9DLFlBRCtDO0tBQWhEO0FBR0EsUUFBSSxXQUFXLE9BQU8sc0JBQVAsQ0FBOEIsMkJBQTlCLEVBQTJELElBQUksUUFBSixFQUFjLElBQUksV0FBSixDQUFwRixDQUo0QjtBQUtoQyxTQUFLLFFBQUwsQ0FBYztBQUNiLGdCQUFXLFdBQVcsT0FBWDtLQURaLEVBTGdDOztBQVNoQyxZQUNFLEdBREYsQ0FDTyxRQURQLEVBRUUsR0FGRixDQUVPLFVBQVUsR0FBVixFQUFlLEdBQWYsRUFBcUI7QUFDMUIsU0FBSSxHQUFKLEVBQVM7QUFDUixjQUFRLEtBQVIsQ0FBYyxHQUFkLEVBRFE7QUFFUixhQUZRO01BQVQ7O0FBS0EsU0FBSTtBQUNILFVBQUksT0FBTyxLQUFLLEtBQUwsQ0FBVyxJQUFJLElBQUosQ0FBbEIsQ0FERDtNQUFKLENBRUUsT0FBTSxFQUFOLEVBQVU7QUFDWCxnQkFBVSxJQUFWLEdBRFc7QUFFWCxhQUFPLFFBQVAsQ0FBZ0IsSUFBaEIsR0FBdUIsSUFBSSxhQUFKLENBRlo7QUFHWCxhQUhXO01BQVY7O0FBTUYsVUFBSyxRQUFMLENBQWM7QUFDYixxQkFBZSxJQUFmO0FBQ0EsYUFBTyxLQUFLLEtBQUw7QUFDUCxZQUFNLEtBQUssWUFBTDtBQUNOLGVBQVMsS0FBSyxRQUFMO0FBQ1QsaUJBQVcsS0FBSyxVQUFMO0FBQ1gsZ0JBQVUsS0FBSyxRQUFMO0FBQ1YsaUJBQVcsV0FBVyxJQUFYO01BUFosRUFkMEI7S0FBckIsQ0FGUCxDQVRnQztJQUFqQixDQUFoQixDQVhtQjs7QUFnRG5CLGFBQVU7O0FBRVQsY0FBVSxLQUFWO0lBRkQsRUFoRG1COzs7OzJCQXNEWDtBQUNQLFVBQ0Msb0JBQUMsSUFBRCxFQUFVLEtBQUssS0FBTCxDQURYLENBRE87Ozs7eUNBbEVxQixVQUFVLE1BQTZCO09BQXZCLDRFQUFvQixrQkFBRzs7QUFDcEUsT0FBSSxvQkFBb0IsRUFBcEIsQ0FEZ0U7QUFFcEUsT0FBSSxtQkFBSixFQUF3QjtBQUN2QixRQUFJLG9CQUFvQixPQUFwQixDQUE0QixRQUE1QixNQUEwQyxDQUFDLENBQUQsRUFBSztBQUNsRCxZQUFPLE9BQU8sR0FBUCxHQUFhLG1CQUFiLENBRDJDO0tBQW5ELE1BRU87QUFDTix5QkFBb0IsR0FBcEIsQ0FETTtLQUZQO0lBREQ7QUFPQSxVQUFPLE9BQU8sR0FBUCxHQUFhLG1CQUFiLEdBQW1DLGlCQUFuQyxHQUF1RCxRQUF2RCxDQVQ2RDs7OztRQWxCaEU7RUFBZSxNQUFNLFNBQU47O0FBMkZyQixPQUFPLE9BQVAsR0FBaUIsTUFBakI7Ozs7Ozs7OztBQ3RHQSxJQUFJLFFBQVEsSUFBUjs7QUFFSixJQUFJLE9BQU8sT0FBTyxxQkFBUCxLQUFpQyxVQUF4QyxFQUFxRDtBQUN4RCxVQUFRLEtBQVIsQ0FEd0Q7Q0FBekQ7O0FBSUEsT0FBTyxPQUFQLEdBQWlCLEtBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBIZWFkZXIgPSByZXF1aXJlKCcuL2hlYWRlci5qc3gnKTtcbnZhciBIZWFkZXJTa2lwTGluayA9IHJlcXVpcmUoJy4vbWlzYy9oZWFkZXItc2tpcC1saW5rLmpzeCcpO1xudmFyIFJvbGx1cCA9IHJlcXVpcmUoJy4vY29udGVudC9yb2xsdXAuanN4Jyk7XG52YXIgU2luZ2xlID0gcmVxdWlyZSgnLi9jb250ZW50L3NpbmdsZS5qc3gnKTtcbnZhciBOb25lID0gcmVxdWlyZSgnLi9jb250ZW50L25vbmUuanN4Jyk7XG52YXIgTWVudSA9IHJlcXVpcmUoJy4vY29udGVudC9tZW51LmpzeCcpO1xudmFyIFBvc3ROYXYgPSByZXF1aXJlKCcuL21pc2MvcG9zdC1uYXZpZ2F0aW9uLmpzeCcpO1xudmFyIEZvb3RlciA9IHJlcXVpcmUoJy4vZm9vdGVyLmpzeCcpO1xuXG4vKipcbiAqIE1haW4gUGFnZSBDb21wb25lbnRcbiAqXG4gKiBBbHNvIGNvbnRyb2xzIHRoZSBmYW5jeSBjb2xvciB0b2dnbGUgb24gcGFnZSBlbGVtZW50c1xuICovXG5jbGFzcyBQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuc3RhdGUgPSB7XG5cdFx0XHRjb2xvclBhbGV0dGU6ICdjb2xvci1wYWxldHRlLTEnLFxuXHRcdFx0cGFnZUNsYXNzOiAnJ1xuXHRcdH1cblx0fVxuXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXtcblx0XHR2YXIgcGFnZUNsYXNzID0gbmV4dFByb3BzLmJvZHlDbGFzcyB8fCBuZXh0UHJvcHMuaW5pdGlhbFBhZ2VDbGFzcztcblx0XHR2YXIgbmV3UGFsZXR0ZUNsYXNzID0gcGFnZUNsYXNzLm1hdGNoKC9jb2xvci1wYWxldHRlLVxcZC8pWzBdO1xuXHRcdHZhciBuZXdDbGFzc0xpc3QgPSBwYWdlQ2xhc3MucmVwbGFjZSgvXFxzP2NvbG9yLXBhbGV0dGUtXFxkL2csICcnKTtcblx0XHR0aGlzLnNldFN0YXRlKHtjb2xvclBhbGV0dGU6IG5ld1BhbGV0dGVDbGFzc30pO1xuXHRcdHRoaXMuc2V0U3RhdGUoe3BhZ2VDbGFzczogbmV3Q2xhc3NMaXN0fSk7XG5cdH1cblxuXHRjb21wb25lbnREaWRVcGRhdGUoKXtcblx0XHQvLyBJdCdzIG5vdCBwcmV0dHksIGJ1dCB3ZSBzaG91bGQgc2Nyb2xsIHRvIHRoZSB0b3Agb2YgdGhlIHBhZ2UgaWYgd2Vcblx0XHQvLyBcIm5hdmlnYXRlXCIgdG8gYW5vdGhlciBwYWdlIHdpdGggYSByZW5kZXJcblx0XHR3aW5kb3cuZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSAwO1xuXG5cdFx0Ly8gVXNpbmcgcmVxdWVzdCBhbmltYXRpb24gRnJhbWUgdG8gZW5zdXJlIHRoYXQgZWFjaCBmdW5jdGlvbiBpcyBwYWludGVkXG5cdFx0Ly8gYmVmb3JlIHRoZSBuZXh0IGZ1bmN0aW9uIGJlZ2lucyB0byBmaXJlXG5cdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSggKCkgPT4ge1xuXHRcdFx0dGhpcy5jbGVhclBhbGV0dGUoKTtcblx0XHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoICgpID0+IHtcblx0XHRcdFx0dGhpcy5hcHBseVBhbGV0dGUoKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0Y2xlYXJQYWxldHRlKCl7XG5cdFx0dGhpcy5yZWZzLnBhZ2VDb250YWluZXIuY2xhc3NOYW1lID0gdGhpcy5zdGF0ZS5wYWdlQ2xhc3MgKyAnICcgKyAnY29sb3ItcGFsZXR0ZS10cmFuc2l0aW9uJztcblx0fVxuXG5cdGFwcGx5UGFsZXR0ZSgpe1xuXHRcdHRoaXMucmVmcy5wYWdlQ29udGFpbmVyLmNsYXNzTmFtZSA9IHRoaXMuc3RhdGUucGFnZUNsYXNzICsgJyAnICsgdGhpcy5zdGF0ZS5jb2xvclBhbGV0dGU7XG5cdH1cblxuXHRyZW5kZXIoKXtcblxuXHRcdC8vIElmIHdlIHBhc3NlZCBpbiBpbnRpYWwgcGFnZSBodG1sIGluc3RlYWQgb2YgYSBwb3N0IG9iamVjdCByZW5kZXJcblx0XHQvLyB0aGF0IGluc3RlYWQgb2YgdGhlIFwicmVhbFwiIHJlYWN0IGFwcFxuXHRcdGlmICghdGhpcy5wcm9wcy5oYXNTZXJ2ZXJEYXRhKXtcblx0XHRcdHZhciBpbnRpYWxQYWdlSFRNTCA9IHtfX2h0bWw6IHRoaXMucHJvcHMuaW5pdGlhbFBhZ2V9O1xuXHRcdFx0cmV0dXJuIDxkaXYgaWQ9XCJwYWdlXCIgcmVmPVwicGFnZUNvbnRhaW5lclwiIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5pbml0aWFsUGFnZUNsYXNzfSBkYW5nZXJvdXNseVNldElubmVySFRNTD17aW50aWFsUGFnZUhUTUx9IC8+XG5cdFx0fVxuXG5cdFx0Ly8gVGhpcyBpcyB0aGUgbm9ybWFsIHBvc3QtcmVuZGVyZXIgcmVhY3QgYXBwc1xuXHRcdHZhciBjb250ZW50RWxlbWVudDtcblx0XHR2YXIgY29udGVudEhlYWRlcjtcblx0XHR2YXIgcG9zdE5hdjtcblxuXHRcdGlmICh0aGlzLnByb3BzLnBvc3RzLmxlbmd0aCA9PT0gMCl7XG5cdFx0XHRjb250ZW50RWxlbWVudCA9IDxOb25lIG1lbnVJdGVtcz17dGhpcy5wcm9wcy5tZW51fS8+O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzd2l0Y2ggKHRoaXMucHJvcHMudGVtcGxhdGUudHlwZSl7XG5cdFx0XHRcdGNhc2UgJ21lbnUnOlxuXHRcdFx0XHRcdGNvbnRlbnRIZWFkZXIgPSA8aDEgY2xhc3NOYW1lPVwicm9sbHVwLXRpdGxlXCI+e3RoaXMucHJvcHMudGVtcGxhdGUudGl0bGV9PC9oMT47XG5cdFx0XHRcdFx0Y29udGVudEVsZW1lbnQgPSA8TWVudSBtZW51SXRlbXM9e3RoaXMucHJvcHMubWVudX0vPjtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAncm9sbHVwJzpcblx0XHRcdFx0XHRjb250ZW50SGVhZGVyID0gPGgxIGNsYXNzTmFtZT1cInJvbGx1cC10aXRsZVwiPnt0aGlzLnByb3BzLnRlbXBsYXRlLnRpdGxlfTwvaDE+O1xuXHRcdFx0XHRcdGNvbnRlbnRFbGVtZW50ID0gW107XG5cdFx0XHRcdFx0Zm9yIChsZXQgcG9zdCBvZiB0aGlzLnByb3BzLnBvc3RzKXtcblx0XHRcdFx0XHRcdGNvbnRlbnRFbGVtZW50LnB1c2goPFJvbGx1cCBwb3N0PXtwb3N0fSBrZXk9e3Bvc3QuaWR9Lz4pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRwb3N0TmF2ID0gPFBvc3ROYXYgY29udGVudD17dGhpcy5wcm9wcy5wb3N0TmF2fSAvPlxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdzaW5nbGUnOlxuXHRcdFx0XHRcdGxldCBwb3N0ID0gdGhpcy5wcm9wcy5wb3N0c1swXTtcblx0XHRcdFx0XHRjb250ZW50RWxlbWVudCA9IDxTaW5nbGUgcG9zdD17cG9zdH0vPjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRjb25zb2xlLmxvZyh0aGlzLnByb3BzLmFqYXhTdGF0ZSk7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBpZD1cInBhZ2VcIiByZWY9XCJwYWdlQ29udGFpbmVyXCIgY2xhc3NOYW1lPXt0aGlzLnN0YXRlLnBhZ2VDbGFzc30+XG5cdFx0XHRcdDxIZWFkZXJTa2lwTGluayAvPlxuXHRcdFx0XHQ8SGVhZGVyIC8+XG5cdFx0XHRcdDxtYWluIGlkPVwiY29udGVudFwiIGNsYXNzTmFtZT1cInNpdGUtY29udGVudFwiPlxuXHRcdFx0XHRcdHtjb250ZW50SGVhZGVyfVxuXHRcdFx0XHRcdHtjb250ZW50RWxlbWVudH1cblx0XHRcdFx0XHR7cG9zdE5hdn1cblx0XHRcdFx0PC9tYWluPlxuXHRcdFx0XHQ8Rm9vdGVyIC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IE1lbnUgPSAocHJvcHMpID0+IHtcblxuXHR2YXIgbWVudUl0ZW1IVE1MID17X19odG1sOnByb3BzLm1lbnVJdGVtc307XG5cblx0cmV0dXJuIChcblx0XHQ8bmF2IGlkPVwic2l0ZS1uYXZpZ2F0aW9uXCIgY2xhc3NOYW1lPVwibWFpbi1uYXZpZ2F0aW9uXCIgcm9sZT1cIm5hdmlnYXRpb25cIj5cblx0XHRcdDxmb3JtIHJvbGU9XCJzZWFyY2hcIiBtZXRob2Q9XCJnZXRcIiBjbGFzc05hbWU9XCJzZWFyY2gtZm9ybVwiIGFjdGlvbj1cIi9cIj5cblx0XHRcdFx0PGxhYmVsPlxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJzY3JlZW4tcmVhZGVyLXRleHRcIj5TZWFyY2ggZm9yOjwvc3Bhbj5cblx0XHRcdFx0PGlucHV0IHR5cGU9XCJzZWFyY2hcIiBjbGFzc05hbWU9XCJzZWFyY2gtZmllbGRcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCDigKZcIiBuYW1lPVwic1wiIC8+XG5cdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHQ8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzc05hbWU9XCJzZWFyY2gtc3VibWl0XCI+8J+UjjwvYnV0dG9uPlxuXHRcdFx0PC9mb3JtPlxuXHRcdFx0PGRpdiBkYW5nZXJvdXNseVNldElubmVySFRNTD17bWVudUl0ZW1IVE1MfSAvPlxuXHRcdDwvbmF2PlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1lbnU7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIE1lbnUgPSByZXF1aXJlKCcuL21lbnUuanN4Jyk7XG5cbmNvbnN0IE5vbmUgPSAocHJvcHMpID0+IHtcblx0cmV0dXJuIChcblx0XHQ8c2VjdGlvbiBjbGFzc05hbWU9XCJuby1yZXN1bHRzIG5vdC1mb3VuZFwiPlxuXHRcdFx0PGhlYWRlciBjbGFzc05hbWU9XCJwYWdlLWhlYWRlclwiPlxuXHRcdFx0XHQ8aDEgY2xhc3NOYW1lPVwicm9sbHVwLXRpdGxlXCI+IE5vdGhpbmcgRm91bmQgPC9oMT5cblx0XHRcdDwvaGVhZGVyPlxuXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhZ2UtY29udGVudFwiPlxuXHRcdFx0XHQ8cD4gV2UgY2FuJ3Qgc2VlbSB0byBmaW5kIHdoYXQgeW91IHdlcmUgbG9va2luZyBmb3IuIEhlcmUgaXMgdGhlIG1lbnUgYWdhaW4gc28geW91IGNhbiBnZXQgdG8gd2hlcmUgeW91IG5lZWQgdG8gZ28uPC9wPlxuXHRcdFx0XHQ8TWVudSBtZW51SXRlbXM9e3Byb3BzLm1lbnVJdGVtc30vPlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9zZWN0aW9uPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE5vbmU7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBSb2xsdXAgPSAocHJvcHMpID0+IHtcblx0Ly8gd3BhdXRvcC4uLlxuXHR2YXIgZXhjZXJwdEhUTUwgPSB7X19odG1sOiAnPHA+JyArIHByb3BzLnBvc3QuZXhjZXJwdCArICc8L3A+J307XG5cblx0dmFyIHBvc3RlZE9uO1xuXHRpZiAocHJvcHMucG9zdC5wb3N0X3R5cGUgPT09ICdwb3N0Jyl7XG5cdFx0dmFyIHBvc3RlZE9uSFRNTCA9IHtfX2h0bWw6IHByb3BzLnBvc3QudGVtcGxhdGVfdGFncy5wb3N0ZWRfb259O1xuXHRcdHBvc3RlZE9uID0gKFxuXHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwicG9zdGVkLW9uXCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3Bvc3RlZE9uSFRNTH0gLz5cblx0XHQpXG5cdH1cblxuXHR2YXIgaWNvbkhUTUwgPSB7X19odG1sOiBwcm9wcy5wb3N0LnRlbXBsYXRlX3RhZ3MuY2F0ZWdvcnkuaWNvbn07XG5cblx0dmFyIGFydGljbGVDbGFzcyA9IHByb3BzLnBvc3QuY3NzX2NsYXNzICsgJyByb2xsdXAtaXRlbSc7XG5cblx0cmV0dXJuIChcblx0XHQ8YXJ0aWNsZSBpZD17cHJvcHMucG9zdC5pZH0gY2xhc3NOYW1lPXthcnRpY2xlQ2xhc3N9PlxuXHRcdFx0PGhlYWRlciBjbGFzc05hbWU9XCJlbnRyeS1oZWFkZXJcIj5cblx0XHRcdFx0PGgyIGNsYXNzTmFtZT1cImVudHJ5LXRpdGxlXCI+PGEgaHJlZj17cHJvcHMucG9zdC5wZXJtYWxpbmt9Pntwcm9wcy5wb3N0LnRpdGxlfTwvYT48L2gyPlxuXHRcdFx0XHR7cG9zdGVkT259XG5cdFx0XHQ8L2hlYWRlcj5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZW50cnktY2F0LWljb25cIiBkYW5nZXJvdXNseVNldElubmVySFRNTD17aWNvbkhUTUx9PjwvZGl2PlxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJlbnRyeS1zdW1tYXJ5XCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e2V4Y2VycHRIVE1MfT48L2Rpdj5cblx0XHQ8L2FydGljbGU+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUm9sbHVwO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgU2luZ2xlID0gKHByb3BzKSA9PiB7XG5cdHZhciBjb250ZW50SFRNTCA9IHtfX2h0bWw6IHByb3BzLnBvc3QuY29udGVudH07XG5cdHZhciBwb3N0ZWRPbjtcblx0dmFyIGNhdGVnb3J5TGlzdDtcblx0dmFyIGNvbW1lbnRzO1xuXHRpZiAocHJvcHMucG9zdC5wb3N0X3R5cGUgPT09ICdwb3N0Jyl7XG5cblx0XHR2YXIgcG9zdGVkT25IVE1MID0ge19faHRtbDogcHJvcHMucG9zdC50ZW1wbGF0ZV90YWdzLnBvc3RlZF9vbn07XG5cdFx0cG9zdGVkT24gPSAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBvc3RlZC1vblwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtwb3N0ZWRPbkhUTUx9ID48L2Rpdj5cblx0XHQpO1xuXG5cdFx0dmFyIGNhdGVnb3J5TGlzdEhUTUwgPSB7X19odG1sOiBwcm9wcy5wb3N0LnRlbXBsYXRlX3RhZ3MuY2F0ZWdvcnkubGlzdH1cblx0XHRjYXRlZ29yeUxpc3QgPSAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ncG9zdC1jYXRlZ29yeScgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e2NhdGVnb3J5TGlzdEhUTUx9ID48L2Rpdj5cblx0XHQpO1xuXG5cdFx0dmFyIGNvbW1lbnRzSFRNTCA9IHtfX2h0bWw6IHByb3BzLnBvc3QudGVtcGxhdGVfdGFncy5jb21tZW50c307XG5cdFx0Y29tbWVudHMgPSAoXG5cdFx0XHQ8Zm9vdGVyIGNsYXNzTmFtZT1cImVudHJ5LWZvb3RlclwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtjb21tZW50c0hUTUx9IC8+XG5cdFx0KTtcblx0fVxuXG5cblx0cmV0dXJuIChcblx0XHQ8YXJ0aWNsZSBpZD17cHJvcHMucG9zdC5pZH0gY2xhc3NOYW1lPXtwcm9wcy5wb3N0LmNzc19jbGFzc30+XG5cdFx0XHQ8aGVhZGVyIGNsYXNzTmFtZT1cImVudHJ5LWhlYWRlclwiPlxuXHRcdFx0XHQ8aDEgY2xhc3NOYW1lPVwiZW50cnktdGl0bGVcIj57cHJvcHMucG9zdC50aXRsZX08L2gxPlxuXHRcdFx0XHR7Y2F0ZWdvcnlMaXN0fVxuXHRcdFx0XHR7cG9zdGVkT259XG5cdFx0XHQ8L2hlYWRlcj5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZW50cnktY29udGVudFwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtjb250ZW50SFRNTH0+PC9kaXY+XG5cdFx0XHR7Y29tbWVudHN9XG5cdFx0PC9hcnRpY2xlPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNpbmdsZTtcbiIsImNvbnN0IGFqYXhTdGF0ZXMgPSB7XG5cdElOSVRJQUw6IDAsXG5cdExPQURJTkcgOiAzLFxuXHRET05FIDogNFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFqYXhTdGF0ZXM7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBGb290ZXIgPSAocHJvcHMpID0+IHtcblx0cmV0dXJuIChcblx0XHQ8Zm9vdGVyIGlkPVwiY29sb3Bob25cIiBjbGFzc05hbWU9XCJzaXRlLWZvb3RlclwiIHJvbGU9XCJjb250ZW50aW5mb1wiPlxuXHRcdDxkaXYgY2xhc3NOYW1lPVwic2l0ZS1pbmZvXCI+XG5cdFx0XHRDb3B5cmlnaHQgwqkgS3Jpc3RvZmVyIFJhc2tlIDIwMTYgUy5ELkcuIFBvd2VyZWQgYnkgPGEgaHJlZj1cImh0dHBzOi8vd29yZHByZXNzLm9yZy9cIj4gV29yZHByZXNzIDwvYT4gYW5kIDxhIGhyZWY9XCJodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9cIj4gUmVhY3QuanMgPC9hPlxuXHRcdDwvZGl2PlxuXHRcdDwvZm9vdGVyPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZvb3RlcjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IEhlYWRlciA9IChwcm9wcykgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdDxoZWFkZXIgaWQ9XCJtYXN0aGVhZFwiIGNsYXNzTmFtZT1cInNpdGUtaGVhZGVyXCIgcm9sZT1cImJhbm5lclwiPlxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzaXRlLWxvZ29cIj5cblx0XHRcdDxhIGhyZWY9XCIvbWVudVwiIHRpdGxlPVwiTWVudVwiPlxuXHRcdFx0XHQ8aW1nIHNyYz1cIi93cC1jb250ZW50L3RoZW1lcy9rcmFza2UtcmVhY3QtMjAxNi9jbGllbnQvc3RhdGljL2Fzc2V0cy9zaXRlLWxvZ28ucG5nXCIgYWx0PVwiU2l0ZSBMb2dvXCIgLz5cblx0XHRcdDwvYT5cblx0XHRcdDwvZGl2PlxuXHRcdDwvaGVhZGVyPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlcjtcbiIsIi8qKlxuICogTWFpbiBlbnRyeSBwb2ludCBmb3IgcmVhY3QgY29tcG9uZW50c1xuICovXG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoICdyZWFjdCcgKTtcbnZhciBSZWFjdERPTSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xudmFyIFJvdXRlciA9IHJlcXVpcmUoICcuL3JvdXRlci5qc3gnICk7XG52YXIgaXNSdW5uYWJsZSA9IHJlcXVpcmUoJy4uL2pzL3Byb2dyZXNzaXZlLmpzJyk7XG5cbmlmIChpc1J1bm5hYmxlKXtcbiAgdmFyIHJlYWN0Um9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnYXBwLXJvb3QnICk7XG4gIHZhciBwYWdlUm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAncGFnZScgKTtcbiAgUmVhY3RET00ucmVuZGVyKDxSb3V0ZXIgaW5pdGlhbFBhZ2U9e3BhZ2VSb290LmlubmVySFRNTH0gaW5pdGlhbEJvZHlDbGFzcz17cGFnZVJvb3QuY2xhc3NOYW1lfS8+LCByZWFjdFJvb3QpO1xufVxuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgSGVhZGVyU2tpcExpbmsgPSAocHJvcHMpID0+IHtcblx0cmV0dXJuIChcblx0XHQ8YSBjbGFzc05hbWU9XCJza2lwLWxpbmsgc2NyZWVuLXJlYWRlci10ZXh0XCIgaHJlZj1cIiNjb250ZW50XCI+U2tpcCB0byBjb250ZW50PC9hPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlclNraXBMaW5rO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgUG9zdE5hdmlnYXRpb24gPSAocHJvcHMpID0+IHtcblxuXHQvLyB3b3JkcHJlc3Mga2VlcHMgdGhlIHJldHVybl9pbnN0ZWFkIHF1ZXJ5IHZhciBpbiB0aGUgbmF2LCBidXQgd2UgZG9uJ3Qgd2FudFxuXHQvLyB0byBsaW5rIHRvIHRoYXQuIFNvIHN0cmlwIHRoYXQgb3V0IVxuXHR2YXIgbmF2SFRNTG5vTGlua1F1ZXJ5U3RyaW5nID0gcHJvcHMuY29udGVudC5yZXBsYWNlKC9yZXR1cm5faW5zdGVhZFxcPXBvc3RzLWpzb24vZywgXCJcIik7XG5cdHZhciBuYXZpZ2F0aW9uX2h0bWwgPSB7X19odG1sOiBuYXZIVE1Mbm9MaW5rUXVlcnlTdHJpbmd9XG5cblx0cmV0dXJuIChcblx0XHQ8ZGl2IGNsYXNzTmFtZT1cInByZXYtbmV4dC1wb3N0c1wiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtuYXZpZ2F0aW9uX2h0bWx9IC8+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUG9zdE5hdmlnYXRpb247XG4iLCIvKipcbiAqIFdyYXBwZXIgY29tcG9uZW50IGZvciBSZWFjdCBBcHBsaWNhdGlvbiB3aGljaCBtYW5hZ2VzIHN0YXRlIHZpYSB0aGVcbiAqIHdvcmRwcmVzcyBVUkwuIFVzaW5nIHRoZSAncGFnZScgbGlicmFyeSBpbiBucG0gd2UgY2FuIGhpamFjayBub3JtYWwgbGlua1xuICogZXhlY3V0aW9uIGFuZCBpbnN0ZWFkIHVzZSB0aGUgZXZlbnQgdG8gZ2V0IHRoZSBuZXcgZGF0YSBmb3IgUmVhY3QgdG8gY29uc3VtZVxuICogYWxsIHRoZSB3aGlsZSB1cGRhdGluZyB0aGUgY3VycmVudCB1cmwgdXNpbmcgdGhlIEhpc3RvcnkgQVBJIHRvIG1ha2UgaXRcbiAqIGFwcGVhciB0aGF0IHlvdSBoYXZlIG1vdmVkIHRvIGEgbmV3IHBhZ2VcbiAqL1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCAncmVhY3QnICk7XG52YXIgdXJsUm91dGVyID0gcmVxdWlyZSggJ3BhZ2UnICk7XG52YXIgcmVxdWVzdCA9IHJlcXVpcmUoICdzdXBlcmFnZW50JyApO1xuXG52YXIgYWpheFN0YXRlcyA9IHJlcXVpcmUoICcuL2VudW0vYWpheFN0YXRlcy5qcycpO1xudmFyIFBhZ2UgPSByZXF1aXJlKCAnLi9QYWdlLmpzeCcgKTtcblxuY2xhc3MgUm91dGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuXHRcdFx0aGFzU2VydmVyRGF0YTogZmFsc2UsXG5cdFx0XHRhamF4U3RhdGU6IGFqYXhTdGF0ZXMuSU5JVElBTCxcblx0XHRcdHBvc3RzOiBbXSxcblx0XHRcdGluaXRpYWxQYWdlOiB0aGlzLnByb3BzLmluaXRpYWxQYWdlLFxuXHRcdFx0aW5pdGlhbFBhZ2VDbGFzczogcHJvcHMuaW5pdGlhbEJvZHlDbGFzcyxcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogSGVscGVyIGZ1bmN0aW9uIHRvIGFkZCBRdWVyeSBTdHJpbmcgUGFyYW1ldGVyIHRvIGVuZCBvZiB1cmxcblx0ICpcblx0ICogQHJldHVybnMgcXVlcnlzdHJpbmcgd2l0aCBwYXJhbSBhcHBlbmRlZC5cblx0ICovXG5cdHN0YXRpYyB1cGRhdGVQYXRoV2l0aE5ld1F1ZXJ5KG5ld1BhcmFtLCBwYXRoLCBleGlzdGluZ1F1ZXJ5c3RyaW5nPScnKXtcblx0XHR2YXIgc2VwZXJhdG9yQXBlcnNhbmQgPSAnJztcblx0XHRpZiAoZXhpc3RpbmdRdWVyeXN0cmluZyl7XG5cdFx0XHRpZiAoZXhpc3RpbmdRdWVyeXN0cmluZy5pbmRleE9mKG5ld1BhcmFtKSAhPT0gLTEgKSB7XG5cdFx0XHRcdHJldHVybiBwYXRoICsgJz8nICsgZXhpc3RpbmdRdWVyeXN0cmluZztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNlcGVyYXRvckFwZXJzYW5kID0gJyYnO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcGF0aCArICc/JyArIGV4aXN0aW5nUXVlcnlzdHJpbmcgKyBzZXBlcmF0b3JBcGVyc2FuZCArIG5ld1BhcmFtO1xuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFx0Ly8gRm9yIGEgc3RhdGljIGhvbWVwYWdlIHdvcmRwcmVzcyBkb2Vzbid0IGtub3cgdG8gZmV0Y2ggdGhlIHBhZ2UgaW5zdGVhZFxuXHRcdC8vIG9mIHRoZSBkZWZhdWx0IHJvbGx1cCwgc28gd2UgY2FuJ3QgdXNlIHRoZSByZWFjdCByb3V0aW5nIGluIHRoaXMgY2FzZVxuXHRcdHVybFJvdXRlciggJy8nLCBmdW5jdGlvbiAoIGN0eCApIHtcblx0XHRcdHVybFJvdXRlci5zdG9wKCk7XG5cdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGN0eC5jYW5vbmljYWxQYXRoXG5cdFx0XHRyZXR1cm47XG5cdFx0fSk7XG5cblx0XHR1cmxSb3V0ZXIoICcqJywgZnVuY3Rpb24gKCBjdHggKSB7XG5cdFx0XHRpZiAoc2VsZi5zdGF0ZS5hamF4U3RhdGUgPT09IGFqYXhTdGF0ZXMuTE9BRElORyl7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHZhciBkYXRhUGF0aCA9IFJvdXRlci51cGRhdGVQYXRoV2l0aE5ld1F1ZXJ5KCdyZXR1cm5faW5zdGVhZD1wb3N0cy1qc29uJywgY3R4LnBhdGhuYW1lLCBjdHgucXVlcnlzdHJpbmcpO1xuXHRcdFx0c2VsZi5zZXRTdGF0ZSh7XG5cdFx0XHRcdGFqYXhTdGF0ZTogYWpheFN0YXRlcy5MT0FESU5HXG5cdFx0XHR9KTtcblxuXHRcdFx0cmVxdWVzdFxuXHRcdFx0XHQuZ2V0KCBkYXRhUGF0aCApXG5cdFx0XHRcdC5lbmQoIGZ1bmN0aW9uKCBlcnIsIHJlcyApIHtcblx0XHRcdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGVycik7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdHZhciBkYXRhID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG5cdFx0XHRcdFx0fSBjYXRjaChleCkge1xuXHRcdFx0XHRcdFx0dXJsUm91dGVyLnN0b3AoKTtcblx0XHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY3R4LmNhbm9uaWNhbFBhdGg7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0c2VsZi5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0XHRoYXNTZXJ2ZXJEYXRhOiB0cnVlLFxuXHRcdFx0XHRcdFx0cG9zdHM6IGRhdGEucG9zdHMsXG5cdFx0XHRcdFx0XHRtZW51OiBkYXRhLnByaW1hcnlfbWVudSxcblx0XHRcdFx0XHRcdHBvc3ROYXY6IGRhdGEucG9zdF9uYXYsXG5cdFx0XHRcdFx0XHRib2R5Q2xhc3M6IGRhdGEuYm9keV9jbGFzcyxcblx0XHRcdFx0XHRcdHRlbXBsYXRlOiBkYXRhLnRlbXBsYXRlLFxuXHRcdFx0XHRcdFx0YWpheFN0YXRlOiBhamF4U3RhdGVzLkRPTkUsXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0dXJsUm91dGVyKHtcblx0XHRcdC8vIFByZXZlbnRzIHRyaWdnZXJpbmcgcm91dGluZyBvbiB0aGUgaW5pdGlhbCBwYWdlIGxvYWRcblx0XHRcdGRpc3BhdGNoOiBmYWxzZVxuXHRcdH0pO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PFBhZ2Ugey4uLnRoaXMuc3RhdGV9IC8+XG5cdFx0XHQpO1xuXHRcdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSb3V0ZXI7XG4iLCIvKipcbiAqIE1vZHVsZSB0byBkZXRlcm1pbmUgd2hldGhlciB0byBsb2FkIHVwIHJlYWN0IG9yIG5vdFxuICovXG5cbnZhciB1c2VKUyA9IHRydWU7XG5cbmlmICh0eXBlb2Ygd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAhPT0gJ2Z1bmN0aW9uJyApIHtcblx0dXNlSlMgPSBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1c2VKUztcbiJdfQ==
