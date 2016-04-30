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

	console.log(logoClass);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvY29tcG9uZW50cy9QYWdlLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2NvbnRlbnQvbWVudS5qc3giLCJjbGllbnQvY29tcG9uZW50cy9jb250ZW50L25vbmUuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvY29udGVudC9yb2xsdXAuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvY29udGVudC9zaW5nbGUuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvZW51bS9hamF4U3RhdGVzLmpzIiwiY2xpZW50L2NvbXBvbmVudHMvZm9vdGVyLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2hlYWRlci5qc3giLCJjbGllbnQvY29tcG9uZW50cy9pbmRleC5qc3giLCJjbGllbnQvY29tcG9uZW50cy9taXNjL2hlYWRlci1za2lwLWxpbmsuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvbWlzYy9wb3N0LW5hdmlnYXRpb24uanN4IiwiY2xpZW50L2NvbXBvbmVudHMvcm91dGVyLmpzeCIsImNsaWVudC9qcy9wcm9ncmVzc2l2ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUNBQSxJQUFJLFFBQVEsUUFBUSxPQUFSLENBQVI7O0FBRUosSUFBSSxhQUFhLFFBQVEsc0JBQVIsQ0FBYjs7QUFFSixJQUFJLFNBQVMsUUFBUSxjQUFSLENBQVQ7QUFDSixJQUFJLGlCQUFpQixRQUFRLDZCQUFSLENBQWpCO0FBQ0osSUFBSSxTQUFTLFFBQVEsc0JBQVIsQ0FBVDtBQUNKLElBQUksU0FBUyxRQUFRLHNCQUFSLENBQVQ7QUFDSixJQUFJLE9BQU8sUUFBUSxvQkFBUixDQUFQO0FBQ0osSUFBSSxPQUFPLFFBQVEsb0JBQVIsQ0FBUDtBQUNKLElBQUksVUFBVSxRQUFRLDRCQUFSLENBQVY7QUFDSixJQUFJLFNBQVMsUUFBUSxjQUFSLENBQVQ7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cmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgYWpheFN0YXRlcyA9IHJlcXVpcmUoJy4vZW51bS9hamF4U3RhdGVzLmpzJyk7XG5cbnZhciBIZWFkZXIgPSByZXF1aXJlKCcuL2hlYWRlci5qc3gnKTtcbnZhciBIZWFkZXJTa2lwTGluayA9IHJlcXVpcmUoJy4vbWlzYy9oZWFkZXItc2tpcC1saW5rLmpzeCcpO1xudmFyIFJvbGx1cCA9IHJlcXVpcmUoJy4vY29udGVudC9yb2xsdXAuanN4Jyk7XG52YXIgU2luZ2xlID0gcmVxdWlyZSgnLi9jb250ZW50L3NpbmdsZS5qc3gnKTtcbnZhciBOb25lID0gcmVxdWlyZSgnLi9jb250ZW50L25vbmUuanN4Jyk7XG52YXIgTWVudSA9IHJlcXVpcmUoJy4vY29udGVudC9tZW51LmpzeCcpO1xudmFyIFBvc3ROYXYgPSByZXF1aXJlKCcuL21pc2MvcG9zdC1uYXZpZ2F0aW9uLmpzeCcpO1xudmFyIEZvb3RlciA9IHJlcXVpcmUoJy4vZm9vdGVyLmpzeCcpO1xuXG4vKipcbiAqIE1haW4gUGFnZSBDb21wb25lbnRcbiAqXG4gKiBBbHNvIGNvbnRyb2xzIHRoZSBmYW5jeSBjb2xvciB0b2dnbGUgb24gcGFnZSBlbGVtZW50c1xuICovXG5jbGFzcyBQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXG5cdFx0dGhpcy5zdGF0ZSA9IHtcblx0XHRcdGNvbG9yUGFsZXR0ZTogdGhpcy5wYWxsZXRlQ2xhc3Nmcm9tUGFnZUNsYXNzKHByb3BzLmJvZHlDbGFzcyksXG5cdFx0XHRwYWdlQ2xhc3M6IHRoaXMucGFnZUNsYXNzd2l0aG91dFBhbGxldGVDbGFzcyhwcm9wcy5ib2R5Q2xhc3MpXG5cdFx0fVxuXHR9XG5cblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Y29sb3JQYWxldHRlOiB0aGlzLnBhbGxldGVDbGFzc2Zyb21QYWdlQ2xhc3MobmV4dFByb3BzLmJvZHlDbGFzcyksXG5cdFx0XHRwYWdlQ2xhc3M6IHRoaXMucGFnZUNsYXNzd2l0aG91dFBhbGxldGVDbGFzcyhuZXh0UHJvcHMuYm9keUNsYXNzKVxuXHRcdH0pO1xuXHR9XG5cblx0Y29tcG9uZW50V2lsbE1vdW50KCl7XG5cdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSggKCkgPT4ge1xuXHRcdFx0dGhpcy5hcHBseVBhbGV0dGUoKTtcblx0XHR9KTtcblx0fVxuXG5cdGNvbXBvbmVudERpZFVwZGF0ZSgpe1xuXHRcdC8vIEl0J3Mgbm90IHByZXR0eSwgYnV0IHdlIHNob3VsZCBzY3JvbGwgdG8gdGhlIHRvcCBvZiB0aGUgcGFnZSBpZiB3ZVxuXHRcdC8vIFwibmF2aWdhdGVcIiB0byBhbm90aGVyIHBhZ2Ugd2l0aCBhIHJlbmRlclxuXHRcdHdpbmRvdy5kb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IDA7XG5cblx0XHQvLyBVc2luZyByZXF1ZXN0IGFuaW1hdGlvbiBGcmFtZSB0byBlbnN1cmUgdGhhdCBlYWNoIGZ1bmN0aW9uIGlzIHBhaW50ZWRcblx0XHQvLyBiZWZvcmUgdGhlIG5leHQgZnVuY3Rpb24gYmVnaW5zIHRvIGZpcmVcblx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCAoKSA9PiB7XG5cdFx0XHR0aGlzLmNsZWFyUGFsZXR0ZSgpO1xuXHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSggKCkgPT4ge1xuXHRcdFx0XHR0aGlzLmFwcGx5UGFsZXR0ZSgpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRjbGVhclBhbGV0dGUoKXtcblx0XHR0aGlzLnJlZnMucGFnZUNvbnRhaW5lci5jbGFzc05hbWUgPSB0aGlzLnN0YXRlLnBhZ2VDbGFzcyArICcgJyArICdjb2xvci1wYWxldHRlLXRyYW5zaXRpb24nO1xuXHR9XG5cblx0YXBwbHlQYWxldHRlKCl7XG5cdFx0dGhpcy5yZWZzLnBhZ2VDb250YWluZXIuY2xhc3NOYW1lID0gdGhpcy5zdGF0ZS5wYWdlQ2xhc3MgKyAnICcgKyB0aGlzLnN0YXRlLmNvbG9yUGFsZXR0ZTtcblx0fVxuXG5cdHBhbGxldGVDbGFzc2Zyb21QYWdlQ2xhc3MocGFnZUNsYXNzKXtcblx0XHRyZXR1cm4gcGFnZUNsYXNzLm1hdGNoKC9jb2xvci1wYWxldHRlLVxcZC8pWzBdO1xuXHR9XG5cblx0cGFnZUNsYXNzd2l0aG91dFBhbGxldGVDbGFzcyhwYWdlQ2xhc3Mpe1xuXHRcdHJldHVybiBwYWdlQ2xhc3MucmVwbGFjZSgvXFxzP2NvbG9yLXBhbGV0dGUtXFxkL2csICcnKTtcblx0fVxuXG5cdHJlbmRlcigpe1xuXHRcdHZhciBjb250ZW50RWxlbWVudDtcblx0XHR2YXIgY29udGVudEhlYWRlcjtcblx0XHR2YXIgcG9zdE5hdjtcblx0XHR2YXIgaXNMb2FkaW5nID0gZmFsc2U7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5hamF4U3RhdGUgPT09IGFqYXhTdGF0ZXMuTE9BRElORyl7XG5cdFx0XHRpc0xvYWRpbmcgPSB0cnVlO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLnByb3BzLnBvc3RzLmxlbmd0aCA9PT0gMCl7XG5cdFx0XHRjb250ZW50RWxlbWVudCA9IDxOb25lIG1lbnVJdGVtcz17dGhpcy5wcm9wcy5tZW51fS8+O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzd2l0Y2ggKHRoaXMucHJvcHMudGVtcGxhdGUudHlwZSl7XG5cdFx0XHRcdGNhc2UgJ21lbnUnOlxuXHRcdFx0XHRcdGNvbnRlbnRIZWFkZXIgPSA8aDEgY2xhc3NOYW1lPVwicm9sbHVwLXRpdGxlXCI+e3RoaXMucHJvcHMudGVtcGxhdGUudGl0bGV9PC9oMT47XG5cdFx0XHRcdFx0Y29udGVudEVsZW1lbnQgPSA8TWVudSBtZW51SXRlbXM9e3RoaXMucHJvcHMubWVudX0vPjtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAncm9sbHVwJzpcblx0XHRcdFx0XHRjb250ZW50SGVhZGVyID0gPGgxIGNsYXNzTmFtZT1cInJvbGx1cC10aXRsZVwiPnt0aGlzLnByb3BzLnRlbXBsYXRlLnRpdGxlfTwvaDE+O1xuXHRcdFx0XHRcdGNvbnRlbnRFbGVtZW50ID0gW107XG5cdFx0XHRcdFx0Zm9yIChsZXQgcG9zdCBvZiB0aGlzLnByb3BzLnBvc3RzKXtcblx0XHRcdFx0XHRcdGNvbnRlbnRFbGVtZW50LnB1c2goPFJvbGx1cCBwb3N0PXtwb3N0fSBrZXk9e3Bvc3QuaWR9Lz4pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRwb3N0TmF2ID0gPFBvc3ROYXYgY29udGVudD17dGhpcy5wcm9wcy5wb3N0TmF2fSAvPlxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdzaW5nbGUnOlxuXHRcdFx0XHRcdGxldCBwb3N0ID0gdGhpcy5wcm9wcy5wb3N0c1swXTtcblx0XHRcdFx0XHRjb250ZW50RWxlbWVudCA9IDxTaW5nbGUgcG9zdD17cG9zdH0vPjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBpZD1cInBhZ2VcIiByZWY9XCJwYWdlQ29udGFpbmVyXCIgY2xhc3NOYW1lPXt0aGlzLnN0YXRlLnBhZ2VDbGFzc30+XG5cdFx0XHRcdDxIZWFkZXJTa2lwTGluayAvPlxuXHRcdFx0XHQ8SGVhZGVyIGlzTG9hZGluZz17aXNMb2FkaW5nfS8+XG5cdFx0XHRcdDxtYWluIGlkPVwiY29udGVudFwiIGNsYXNzTmFtZT1cInNpdGUtY29udGVudFwiPlxuXHRcdFx0XHRcdHtjb250ZW50SGVhZGVyfVxuXHRcdFx0XHRcdHtjb250ZW50RWxlbWVudH1cblx0XHRcdFx0XHR7cG9zdE5hdn1cblx0XHRcdFx0PC9tYWluPlxuXHRcdFx0XHQ8Rm9vdGVyIC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IE1lbnUgPSAocHJvcHMpID0+IHtcblxuXHR2YXIgbWVudUl0ZW1IVE1MID17X19odG1sOnByb3BzLm1lbnVJdGVtc307XG5cblx0cmV0dXJuIChcblx0XHQ8bmF2IGlkPVwic2l0ZS1uYXZpZ2F0aW9uXCIgY2xhc3NOYW1lPVwibWFpbi1uYXZpZ2F0aW9uXCIgcm9sZT1cIm5hdmlnYXRpb25cIj5cblx0XHRcdDxmb3JtIHJvbGU9XCJzZWFyY2hcIiBtZXRob2Q9XCJnZXRcIiBjbGFzc05hbWU9XCJzZWFyY2gtZm9ybVwiIGFjdGlvbj1cIi9cIj5cblx0XHRcdFx0PGxhYmVsPlxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJzY3JlZW4tcmVhZGVyLXRleHRcIj5TZWFyY2ggZm9yOjwvc3Bhbj5cblx0XHRcdFx0PGlucHV0IHR5cGU9XCJzZWFyY2hcIiBjbGFzc05hbWU9XCJzZWFyY2gtZmllbGRcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCDigKZcIiBuYW1lPVwic1wiIC8+XG5cdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHQ8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzc05hbWU9XCJzZWFyY2gtc3VibWl0XCI+8J+UjjwvYnV0dG9uPlxuXHRcdFx0PC9mb3JtPlxuXHRcdFx0PGRpdiBkYW5nZXJvdXNseVNldElubmVySFRNTD17bWVudUl0ZW1IVE1MfSAvPlxuXHRcdDwvbmF2PlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1lbnU7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIE1lbnUgPSByZXF1aXJlKCcuL21lbnUuanN4Jyk7XG5cbmNvbnN0IE5vbmUgPSAocHJvcHMpID0+IHtcblx0cmV0dXJuIChcblx0XHQ8c2VjdGlvbiBjbGFzc05hbWU9XCJuby1yZXN1bHRzIG5vdC1mb3VuZFwiPlxuXHRcdFx0PGhlYWRlciBjbGFzc05hbWU9XCJwYWdlLWhlYWRlclwiPlxuXHRcdFx0XHQ8aDEgY2xhc3NOYW1lPVwicm9sbHVwLXRpdGxlXCI+IE5vdGhpbmcgRm91bmQgPC9oMT5cblx0XHRcdDwvaGVhZGVyPlxuXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhZ2UtY29udGVudFwiPlxuXHRcdFx0XHQ8cD4gV2UgY2FuJ3Qgc2VlbSB0byBmaW5kIHdoYXQgeW91IHdlcmUgbG9va2luZyBmb3IuIEhlcmUgaXMgdGhlIG1lbnUgYWdhaW4gc28geW91IGNhbiBnZXQgdG8gd2hlcmUgeW91IG5lZWQgdG8gZ28uPC9wPlxuXHRcdFx0XHQ8TWVudSBtZW51SXRlbXM9e3Byb3BzLm1lbnVJdGVtc30vPlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9zZWN0aW9uPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE5vbmU7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBSb2xsdXAgPSAocHJvcHMpID0+IHtcblx0Ly8gd3BhdXRvcC4uLlxuXHR2YXIgZXhjZXJwdEhUTUwgPSB7X19odG1sOiAnPHA+JyArIHByb3BzLnBvc3QuZXhjZXJwdCArICc8L3A+J307XG5cblx0dmFyIHBvc3RlZE9uO1xuXHRpZiAocHJvcHMucG9zdC5wb3N0X3R5cGUgPT09ICdwb3N0Jyl7XG5cdFx0dmFyIHBvc3RlZE9uSFRNTCA9IHtfX2h0bWw6IHByb3BzLnBvc3QudGVtcGxhdGVfdGFncy5wb3N0ZWRfb259O1xuXHRcdHBvc3RlZE9uID0gKFxuXHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwicG9zdGVkLW9uXCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3Bvc3RlZE9uSFRNTH0gLz5cblx0XHQpXG5cdH1cblxuXHR2YXIgaWNvbkhUTUwgPSB7X19odG1sOiBwcm9wcy5wb3N0LnRlbXBsYXRlX3RhZ3MuY2F0ZWdvcnkuaWNvbn07XG5cblx0dmFyIGFydGljbGVDbGFzcyA9IHByb3BzLnBvc3QuY3NzX2NsYXNzICsgJyByb2xsdXAtaXRlbSc7XG5cblx0cmV0dXJuIChcblx0XHQ8YXJ0aWNsZSBpZD17cHJvcHMucG9zdC5pZH0gY2xhc3NOYW1lPXthcnRpY2xlQ2xhc3N9PlxuXHRcdFx0PGhlYWRlciBjbGFzc05hbWU9XCJlbnRyeS1oZWFkZXJcIj5cblx0XHRcdFx0PGgyIGNsYXNzTmFtZT1cImVudHJ5LXRpdGxlXCI+PGEgaHJlZj17cHJvcHMucG9zdC5wZXJtYWxpbmt9Pntwcm9wcy5wb3N0LnRpdGxlfTwvYT48L2gyPlxuXHRcdFx0XHR7cG9zdGVkT259XG5cdFx0XHQ8L2hlYWRlcj5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZW50cnktY2F0LWljb25cIiBkYW5nZXJvdXNseVNldElubmVySFRNTD17aWNvbkhUTUx9PjwvZGl2PlxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJlbnRyeS1zdW1tYXJ5XCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e2V4Y2VycHRIVE1MfT48L2Rpdj5cblx0XHQ8L2FydGljbGU+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUm9sbHVwO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgU2luZ2xlID0gKHByb3BzKSA9PiB7XG5cdHZhciBjb250ZW50SFRNTCA9IHtfX2h0bWw6IHByb3BzLnBvc3QuY29udGVudH07XG5cdHZhciBwb3N0ZWRPbjtcblx0dmFyIGNhdGVnb3J5TGlzdDtcblx0dmFyIGNvbW1lbnRzO1xuXHRpZiAocHJvcHMucG9zdC5wb3N0X3R5cGUgPT09ICdwb3N0Jyl7XG5cblx0XHR2YXIgcG9zdGVkT25IVE1MID0ge19faHRtbDogcHJvcHMucG9zdC50ZW1wbGF0ZV90YWdzLnBvc3RlZF9vbn07XG5cdFx0cG9zdGVkT24gPSAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBvc3RlZC1vblwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtwb3N0ZWRPbkhUTUx9ID48L2Rpdj5cblx0XHQpO1xuXG5cdFx0dmFyIGNhdGVnb3J5TGlzdEhUTUwgPSB7X19odG1sOiBwcm9wcy5wb3N0LnRlbXBsYXRlX3RhZ3MuY2F0ZWdvcnkubGlzdH1cblx0XHRjYXRlZ29yeUxpc3QgPSAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ncG9zdC1jYXRlZ29yeScgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e2NhdGVnb3J5TGlzdEhUTUx9ID48L2Rpdj5cblx0XHQpO1xuXG5cdFx0dmFyIGNvbW1lbnRzSFRNTCA9IHtfX2h0bWw6IHByb3BzLnBvc3QudGVtcGxhdGVfdGFncy5jb21tZW50c307XG5cdFx0Y29tbWVudHMgPSAoXG5cdFx0XHQ8Zm9vdGVyIGNsYXNzTmFtZT1cImVudHJ5LWZvb3RlclwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtjb21tZW50c0hUTUx9IC8+XG5cdFx0KTtcblx0fVxuXG5cblx0cmV0dXJuIChcblx0XHQ8YXJ0aWNsZSBpZD17cHJvcHMucG9zdC5pZH0gY2xhc3NOYW1lPXtwcm9wcy5wb3N0LmNzc19jbGFzc30+XG5cdFx0XHQ8aGVhZGVyIGNsYXNzTmFtZT1cImVudHJ5LWhlYWRlclwiPlxuXHRcdFx0XHQ8aDEgY2xhc3NOYW1lPVwiZW50cnktdGl0bGVcIj57cHJvcHMucG9zdC50aXRsZX08L2gxPlxuXHRcdFx0XHR7Y2F0ZWdvcnlMaXN0fVxuXHRcdFx0XHR7cG9zdGVkT259XG5cdFx0XHQ8L2hlYWRlcj5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZW50cnktY29udGVudFwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtjb250ZW50SFRNTH0+PC9kaXY+XG5cdFx0XHR7Y29tbWVudHN9XG5cdFx0PC9hcnRpY2xlPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNpbmdsZTtcbiIsImNvbnN0IGFqYXhTdGF0ZXMgPSB7XG5cdElOSVRJQUw6IDAsXG5cdExPQURJTkcgOiAzLFxuXHRET05FIDogNFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFqYXhTdGF0ZXM7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBGb290ZXIgPSAocHJvcHMpID0+IHtcblx0cmV0dXJuIChcblx0XHQ8Zm9vdGVyIGlkPVwiY29sb3Bob25cIiBjbGFzc05hbWU9XCJzaXRlLWZvb3RlclwiIHJvbGU9XCJjb250ZW50aW5mb1wiPlxuXHRcdDxkaXYgY2xhc3NOYW1lPVwic2l0ZS1pbmZvXCI+XG5cdFx0XHRDb3B5cmlnaHQgwqkgS3Jpc3RvZmVyIFJhc2tlIDIwMTYgUy5ELkcuIFBvd2VyZWQgYnkgPGEgaHJlZj1cImh0dHBzOi8vd29yZHByZXNzLm9yZy9cIj4gV29yZHByZXNzIDwvYT4gYW5kIDxhIGhyZWY9XCJodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9cIj4gUmVhY3QuanMgPC9hPlxuXHRcdDwvZGl2PlxuXHRcdDwvZm9vdGVyPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZvb3RlcjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IEhlYWRlciA9IChwcm9wcykgPT4ge1xuXHR2YXIgbG9nb1NyYyA9ICcvd3AtY29udGVudC90aGVtZXMva3Jhc2tlLXJlYWN0LTIwMTYvY2xpZW50L3N0YXRpYy9hc3NldHMvc2l0ZS1sb2dvLnBuZyc7XG5cdHZhciBsb2dvQ2xhc3MgPSAnc2l0ZS1sb2dvJztcblx0aWYgKHByb3BzLmlzTG9hZGluZyl7XG5cdFx0bG9nb1NyYyA9ICcvd3AtY29udGVudC90aGVtZXMva3Jhc2tlLXJlYWN0LTIwMTYvY2xpZW50L3N0YXRpYy9hc3NldHMvbG9hZGluZy5zdmcnO1xuXHRcdGxvZ29DbGFzcyA9ICdzaXRlLWxvZ28gbG9hZGluZyc7XG5cdH1cblxuXHRjb25zb2xlLmxvZyhsb2dvQ2xhc3MpO1xuXG5cdHJldHVybiAoXG5cdFx0PGhlYWRlciBpZD1cIm1hc3RoZWFkXCIgY2xhc3NOYW1lPVwic2l0ZS1oZWFkZXJcIiByb2xlPVwiYmFubmVyXCI+XG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17bG9nb0NsYXNzfT5cblx0XHRcdFx0PGEgaHJlZj1cIi9tZW51XCIgdGl0bGU9XCJNZW51XCI+XG5cdFx0XHRcdFx0PGltZyB3aWR0aD1cIjEwMFwiIGhlaWdodD1cIjEwMFwiIHNyYz17bG9nb1NyY30gYWx0PVwiU2l0ZSBMb2dvXCIgLz5cblx0XHRcdFx0PC9hPlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9oZWFkZXI+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyO1xuIiwiLyoqXG4gKiBNYWluIGVudHJ5IHBvaW50IGZvciByZWFjdCBjb21wb25lbnRzXG4gKi9cblxudmFyIFJlYWN0ID0gcmVxdWlyZSggJ3JlYWN0JyApO1xudmFyIFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG52YXIgUm91dGVyID0gcmVxdWlyZSggJy4vcm91dGVyLmpzeCcgKTtcbnZhciBpc1J1bm5hYmxlID0gcmVxdWlyZSgnLi4vanMvcHJvZ3Jlc3NpdmUuanMnKTtcbnZhciBoYXNJbml0aWFsRGF0YSA9ICh0eXBlb2YgaW5pdGlhbFJlYWN0RGF0YSAhPT0gJ3VuZGVmaW5lZCcpO1xuXG5pZiAoaXNSdW5uYWJsZSAmJiBoYXNJbml0aWFsRGF0YSl7XG4gIHZhciByZWFjdFJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2FwcC1yb290JyApO1xuICB2YXIgY29udGVudEFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnLmVudHJ5LWNvbnRlbnQnICk7XG4gIHZhciBpbm5lckNvbnRlbnRBcmVhO1xuICBpZiAoY29udGVudEFyZWEpe1xuICAgIHZhciBpbm5lckNvbnRlbnRBcmVhID0gY29udGVudEFyZWEuaW5uZXJIVE1MO1xuICB9XG4gIFJlYWN0RE9NLnJlbmRlcig8Um91dGVyIGluaXRpYWxEYXRhPXtpbml0aWFsUmVhY3REYXRhfSBpbml0aWFsQ29udGVudD17aW5uZXJDb250ZW50QXJlYX0gLz4sIHJlYWN0Um9vdCk7XG59XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBIZWFkZXJTa2lwTGluayA9IChwcm9wcykgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdDxhIGNsYXNzTmFtZT1cInNraXAtbGluayBzY3JlZW4tcmVhZGVyLXRleHRcIiBocmVmPVwiI2NvbnRlbnRcIj5Ta2lwIHRvIGNvbnRlbnQ8L2E+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyU2tpcExpbms7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBQb3N0TmF2aWdhdGlvbiA9IChwcm9wcykgPT4ge1xuXG5cdC8vIHdvcmRwcmVzcyBrZWVwcyB0aGUgcmV0dXJuX2luc3RlYWQgcXVlcnkgdmFyIGluIHRoZSBuYXYsIGJ1dCB3ZSBkb24ndCB3YW50XG5cdC8vIHRvIGxpbmsgdG8gdGhhdC4gU28gc3RyaXAgdGhhdCBvdXQhXG5cdHZhciBuYXZIVE1Mbm9MaW5rUXVlcnlTdHJpbmcgPSBwcm9wcy5jb250ZW50LnJlcGxhY2UoL3JldHVybl9pbnN0ZWFkXFw9cG9zdHMtanNvbi9nLCBcIlwiKTtcblx0dmFyIG5hdmlnYXRpb25faHRtbCA9IHtfX2h0bWw6IG5hdkhUTUxub0xpbmtRdWVyeVN0cmluZ31cblxuXHRyZXR1cm4gKFxuXHRcdDxkaXYgY2xhc3NOYW1lPVwicHJldi1uZXh0LXBvc3RzXCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e25hdmlnYXRpb25faHRtbH0gLz5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQb3N0TmF2aWdhdGlvbjtcbiIsIi8qKlxuICogV3JhcHBlciBjb21wb25lbnQgZm9yIFJlYWN0IEFwcGxpY2F0aW9uIHdoaWNoIG1hbmFnZXMgc3RhdGUgdmlhIHRoZVxuICogd29yZHByZXNzIFVSTC4gVXNpbmcgdGhlICdwYWdlJyBsaWJyYXJ5IGluIG5wbSB3ZSBjYW4gaGlqYWNrIG5vcm1hbCBsaW5rXG4gKiBleGVjdXRpb24gYW5kIGluc3RlYWQgdXNlIHRoZSBldmVudCB0byBnZXQgdGhlIG5ldyBkYXRhIGZvciBSZWFjdCB0byBjb25zdW1lXG4gKiBhbGwgdGhlIHdoaWxlIHVwZGF0aW5nIHRoZSBjdXJyZW50IHVybCB1c2luZyB0aGUgSGlzdG9yeSBBUEkgdG8gbWFrZSBpdFxuICogYXBwZWFyIHRoYXQgeW91IGhhdmUgbW92ZWQgdG8gYSBuZXcgcGFnZVxuICovXG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoICdyZWFjdCcgKTtcbnZhciB1cmxSb3V0ZXIgPSByZXF1aXJlKCAncGFnZScgKTtcbnZhciByZXF1ZXN0ID0gcmVxdWlyZSggJ3N1cGVyYWdlbnQnICk7XG5cbnZhciBhamF4U3RhdGVzID0gcmVxdWlyZSggJy4vZW51bS9hamF4U3RhdGVzLmpzJyk7XG52YXIgUGFnZSA9IHJlcXVpcmUoICcuL1BhZ2UuanN4JyApO1xuXG5jbGFzcyBSb3V0ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcblx0XHRcdGFqYXhTdGF0ZTogYWpheFN0YXRlcy5JTklUSUFMLFxuXHRcdFx0cG9zdHM6IHByb3BzLmluaXRpYWxEYXRhLnBvc3RzLFxuXHRcdFx0bWVudTogcHJvcHMuaW5pdGlhbERhdGEucHJpbWFyeV9tZW51LFxuXHRcdFx0cG9zdE5hdjogcHJvcHMuaW5pdGlhbERhdGEucG9zdF9uYXYsXG5cdFx0XHRib2R5Q2xhc3M6IHByb3BzLmluaXRpYWxEYXRhLmJvZHlfY2xhc3MsXG5cdFx0XHR0ZW1wbGF0ZTogcHJvcHMuaW5pdGlhbERhdGEudGVtcGxhdGUsXG5cdFx0XHRhamF4U3RhdGU6IGFqYXhTdGF0ZXMuRE9ORSxcblx0XHR9XG5cblx0XHQvLyBTZXBhcmF0ZWx5IGxvYWQgY29udGVudCwgaXQgaXMgcG9zc2libHkgbG90cyBvZiBkYXRhXG5cdFx0aWYgKHByb3BzLmluaXRpYWxEYXRhLnBvc3RzLmxlbmd0aCA9PT0gMSApe1xuXHRcdFx0dGhpcy5zdGF0ZS5wb3N0c1swXS5jb250ZW50ID0gcHJvcHMuaW5pdGlhbENvbnRlbnQ7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEhlbHBlciBmdW5jdGlvbiB0byBhZGQgUXVlcnkgU3RyaW5nIFBhcmFtZXRlciB0byBlbmQgb2YgdXJsXG5cdCAqXG5cdCAqIEByZXR1cm5zIHF1ZXJ5c3RyaW5nIHdpdGggcGFyYW0gYXBwZW5kZWQuXG5cdCAqL1xuXHRzdGF0aWMgdXBkYXRlUGF0aFdpdGhOZXdRdWVyeShuZXdQYXJhbSwgcGF0aCwgZXhpc3RpbmdRdWVyeXN0cmluZz0nJyl7XG5cdFx0dmFyIHNlcGVyYXRvckFwZXJzYW5kID0gJyc7XG5cdFx0aWYgKGV4aXN0aW5nUXVlcnlzdHJpbmcpe1xuXHRcdFx0aWYgKGV4aXN0aW5nUXVlcnlzdHJpbmcuaW5kZXhPZihuZXdQYXJhbSkgIT09IC0xICkge1xuXHRcdFx0XHRyZXR1cm4gcGF0aCArICc/JyArIGV4aXN0aW5nUXVlcnlzdHJpbmc7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzZXBlcmF0b3JBcGVyc2FuZCA9ICcmJztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHBhdGggKyAnPycgKyBleGlzdGluZ1F1ZXJ5c3RyaW5nICsgc2VwZXJhdG9yQXBlcnNhbmQgKyBuZXdQYXJhbTtcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdC8vIEZvciBhIHN0YXRpYyBob21lcGFnZSB3b3JkcHJlc3MgZG9lc24ndCBrbm93IHRvIGZldGNoIHRoZSBwYWdlIGluc3RlYWRcblx0XHQvLyBvZiB0aGUgZGVmYXVsdCByb2xsdXAsIHNvIHdlIGNhbid0IHVzZSB0aGUgcmVhY3Qgcm91dGluZyBpbiB0aGlzIGNhc2Vcblx0XHR1cmxSb3V0ZXIoICcvJywgZnVuY3Rpb24gKCBjdHggKSB7XG5cdFx0XHR1cmxSb3V0ZXIuc3RvcCgpO1xuXHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSBjdHguY2Fub25pY2FsUGF0aFxuXHRcdFx0cmV0dXJuO1xuXHRcdH0pO1xuXG5cdFx0dXJsUm91dGVyKCAnKicsIGZ1bmN0aW9uICggY3R4ICkge1xuXHRcdFx0aWYgKHNlbGYuc3RhdGUuYWpheFN0YXRlID09PSBhamF4U3RhdGVzLkxPQURJTkcpe1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR2YXIgZGF0YVBhdGggPSBSb3V0ZXIudXBkYXRlUGF0aFdpdGhOZXdRdWVyeSgncmV0dXJuX2luc3RlYWQ9cG9zdHMtanNvbicsIGN0eC5wYXRobmFtZSwgY3R4LnF1ZXJ5c3RyaW5nKTtcblx0XHRcdHNlbGYuc2V0U3RhdGUoe1xuXHRcdFx0XHRhamF4U3RhdGU6IGFqYXhTdGF0ZXMuTE9BRElOR1xuXHRcdFx0fSk7XG5cblx0XHRcdHJlcXVlc3Rcblx0XHRcdFx0LmdldCggZGF0YVBhdGggKVxuXHRcdFx0XHQuZW5kKCBmdW5jdGlvbiggZXJyLCByZXMgKSB7XG5cdFx0XHRcdFx0aWYgKGVycikge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnIpO1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHR2YXIgZGF0YSA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuXHRcdFx0XHRcdH0gY2F0Y2goZXgpIHtcblx0XHRcdFx0XHRcdHVybFJvdXRlci5zdG9wKCk7XG5cdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGN0eC5jYW5vbmljYWxQYXRoO1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHNlbGYuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdFx0cG9zdHM6IGRhdGEucG9zdHMsXG5cdFx0XHRcdFx0XHRwb3N0TmF2OiBkYXRhLnBvc3RfbmF2LFxuXHRcdFx0XHRcdFx0Ym9keUNsYXNzOiBkYXRhLmJvZHlfY2xhc3MsXG5cdFx0XHRcdFx0XHR0ZW1wbGF0ZTogZGF0YS50ZW1wbGF0ZSxcblx0XHRcdFx0XHRcdGFqYXhTdGF0ZTogYWpheFN0YXRlcy5ET05FLFxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdHVybFJvdXRlcih7XG5cdFx0XHQvLyBQcmV2ZW50cyB0cmlnZ2VyaW5nIHJvdXRpbmcgb24gdGhlIGluaXRpYWwgcGFnZSBsb2FkXG5cdFx0XHRkaXNwYXRjaDogZmFsc2Vcblx0XHR9KTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxQYWdlIHsuLi50aGlzLnN0YXRlfSAvPlxuXHRcdFx0KTtcblx0XHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUm91dGVyO1xuIiwiLyoqXG4gKiBNb2R1bGUgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgdG8gbG9hZCB1cCByZWFjdCBvciBub3RcbiAqL1xuXG52YXIgdXNlSlMgPSB0cnVlO1xuXG5pZiAodHlwZW9mIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgIT09ICdmdW5jdGlvbicgKSB7XG5cdHVzZUpTID0gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdXNlSlM7XG4iXX0=
