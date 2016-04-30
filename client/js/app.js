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

			// For a static homepage wordpress doesn't know to fetch the page instead
			// of the default rollup, so we can't use the react routing in this case
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvY29tcG9uZW50cy9QYWdlLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2NvbnRlbnQvbWVudS5qc3giLCJjbGllbnQvY29tcG9uZW50cy9jb250ZW50L25vbmUuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvY29udGVudC9yb2xsdXAuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvY29udGVudC9zaW5nbGUuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvZW51bS9hamF4U3RhdGVzLmpzIiwiY2xpZW50L2NvbXBvbmVudHMvZm9vdGVyLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2hlYWRlci5qc3giLCJjbGllbnQvY29tcG9uZW50cy9pbmRleC5qc3giLCJjbGllbnQvY29tcG9uZW50cy9taXNjL2hlYWRlci1za2lwLWxpbmsuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvbWlzYy9wb3N0LW5hdmlnYXRpb24uanN4IiwiY2xpZW50L2NvbXBvbmVudHMvcm91dGVyLmpzeCIsImNsaWVudC9qcy9wcm9ncmVzc2l2ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUNBQSxJQUFJLFFBQVEsUUFBUSxPQUFSLENBQVI7O0FBRUosSUFBSSxhQUFhLFFBQVEsc0JBQVIsQ0FBYjs7QUFFSixJQUFJLFNBQVMsUUFBUSxjQUFSLENBQVQ7QUFDSixJQUFJLGlCQUFpQixRQUFRLDZCQUFSLENBQWpCO0FBQ0osSUFBSSxTQUFTLFFBQVEsc0JBQVIsQ0FBVDtBQUNKLElBQUksU0FBUyxRQUFRLHNCQUFSLENBQVQ7QUFDSixJQUFJLE9BQU8sUUFBUSxvQkFBUixDQUFQO0FBQ0osSUFBSSxPQUFPLFFBQVEsb0JBQVIsQ0FBUDtBQUNKLElBQUksVUFBVSxRQUFRLDRCQUFSLENBQVY7QUFDSixJQUFJLFNBQVMsUUFBUSxjQUFSLENBQVQ7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ekQ7O0FBSUEsT0FBTyxPQUFQLEdBQWlCLEtBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBhamF4U3RhdGVzID0gcmVxdWlyZSgnLi9lbnVtL2FqYXhTdGF0ZXMuanMnKTtcblxudmFyIEhlYWRlciA9IHJlcXVpcmUoJy4vaGVhZGVyLmpzeCcpO1xudmFyIEhlYWRlclNraXBMaW5rID0gcmVxdWlyZSgnLi9taXNjL2hlYWRlci1za2lwLWxpbmsuanN4Jyk7XG52YXIgUm9sbHVwID0gcmVxdWlyZSgnLi9jb250ZW50L3JvbGx1cC5qc3gnKTtcbnZhciBTaW5nbGUgPSByZXF1aXJlKCcuL2NvbnRlbnQvc2luZ2xlLmpzeCcpO1xudmFyIE5vbmUgPSByZXF1aXJlKCcuL2NvbnRlbnQvbm9uZS5qc3gnKTtcbnZhciBNZW51ID0gcmVxdWlyZSgnLi9jb250ZW50L21lbnUuanN4Jyk7XG52YXIgUG9zdE5hdiA9IHJlcXVpcmUoJy4vbWlzYy9wb3N0LW5hdmlnYXRpb24uanN4Jyk7XG52YXIgRm9vdGVyID0gcmVxdWlyZSgnLi9mb290ZXIuanN4Jyk7XG5cbi8qKlxuICogTWFpbiBQYWdlIENvbXBvbmVudFxuICpcbiAqIEFsc28gY29udHJvbHMgdGhlIGZhbmN5IGNvbG9yIHRvZ2dsZSBvbiBwYWdlIGVsZW1lbnRzXG4gKi9cbmNsYXNzIFBhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cblx0XHR0aGlzLnN0YXRlID0ge1xuXHRcdFx0Y29sb3JQYWxldHRlOiB0aGlzLnBhbGxldGVDbGFzc2Zyb21QYWdlQ2xhc3MocHJvcHMuYm9keUNsYXNzKSxcblx0XHRcdHBhZ2VDbGFzczogdGhpcy5wYWdlQ2xhc3N3aXRob3V0UGFsbGV0ZUNsYXNzKHByb3BzLmJvZHlDbGFzcylcblx0XHR9XG5cdH1cblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRjb2xvclBhbGV0dGU6IHRoaXMucGFsbGV0ZUNsYXNzZnJvbVBhZ2VDbGFzcyhuZXh0UHJvcHMuYm9keUNsYXNzKSxcblx0XHRcdHBhZ2VDbGFzczogdGhpcy5wYWdlQ2xhc3N3aXRob3V0UGFsbGV0ZUNsYXNzKG5leHRQcm9wcy5ib2R5Q2xhc3MpXG5cdFx0fSk7XG5cdH1cblxuXHRjb21wb25lbnRXaWxsTW91bnQoKXtcblx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCAoKSA9PiB7XG5cdFx0XHR0aGlzLmFwcGx5UGFsZXR0ZSgpO1xuXHRcdH0pO1xuXHR9XG5cblx0Y29tcG9uZW50RGlkVXBkYXRlKCl7XG5cdFx0Ly8gSXQncyBub3QgcHJldHR5LCBidXQgd2Ugc2hvdWxkIHNjcm9sbCB0byB0aGUgdG9wIG9mIHRoZSBwYWdlIGlmIHdlXG5cdFx0Ly8gXCJuYXZpZ2F0ZVwiIHRvIGFub3RoZXIgcGFnZSB3aXRoIGEgcmVuZGVyXG5cdFx0d2luZG93LmRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gMDtcblxuXHRcdC8vIFVzaW5nIHJlcXVlc3QgYW5pbWF0aW9uIEZyYW1lIHRvIGVuc3VyZSB0aGF0IGVhY2ggZnVuY3Rpb24gaXMgcGFpbnRlZFxuXHRcdC8vIGJlZm9yZSB0aGUgbmV4dCBmdW5jdGlvbiBiZWdpbnMgdG8gZmlyZVxuXHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoICgpID0+IHtcblx0XHRcdHRoaXMuY2xlYXJQYWxldHRlKCk7XG5cdFx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCAoKSA9PiB7XG5cdFx0XHRcdHRoaXMuYXBwbHlQYWxldHRlKCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdGNsZWFyUGFsZXR0ZSgpe1xuXHRcdHRoaXMucmVmcy5wYWdlQ29udGFpbmVyLmNsYXNzTmFtZSA9IHRoaXMuc3RhdGUucGFnZUNsYXNzICsgJyAnICsgJ2NvbG9yLXBhbGV0dGUtdHJhbnNpdGlvbic7XG5cdH1cblxuXHRhcHBseVBhbGV0dGUoKXtcblx0XHR0aGlzLnJlZnMucGFnZUNvbnRhaW5lci5jbGFzc05hbWUgPSB0aGlzLnN0YXRlLnBhZ2VDbGFzcyArICcgJyArIHRoaXMuc3RhdGUuY29sb3JQYWxldHRlO1xuXHR9XG5cblx0cGFsbGV0ZUNsYXNzZnJvbVBhZ2VDbGFzcyhwYWdlQ2xhc3Mpe1xuXHRcdHJldHVybiBwYWdlQ2xhc3MubWF0Y2goL2NvbG9yLXBhbGV0dGUtXFxkLylbMF07XG5cdH1cblxuXHRwYWdlQ2xhc3N3aXRob3V0UGFsbGV0ZUNsYXNzKHBhZ2VDbGFzcyl7XG5cdFx0cmV0dXJuIHBhZ2VDbGFzcy5yZXBsYWNlKC9cXHM/Y29sb3ItcGFsZXR0ZS1cXGQvZywgJycpO1xuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0dmFyIGNvbnRlbnRFbGVtZW50O1xuXHRcdHZhciBjb250ZW50SGVhZGVyO1xuXHRcdHZhciBwb3N0TmF2O1xuXHRcdHZhciBpc0xvYWRpbmcgPSBmYWxzZTtcblxuXHRcdGlmICh0aGlzLnByb3BzLmFqYXhTdGF0ZSA9PT0gYWpheFN0YXRlcy5MT0FESU5HKXtcblx0XHRcdGlzTG9hZGluZyA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMucHJvcHMucG9zdHMubGVuZ3RoID09PSAwKXtcblx0XHRcdGNvbnRlbnRFbGVtZW50ID0gPE5vbmUgbWVudUl0ZW1zPXt0aGlzLnByb3BzLm1lbnV9Lz47XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN3aXRjaCAodGhpcy5wcm9wcy50ZW1wbGF0ZS50eXBlKXtcblx0XHRcdFx0Y2FzZSAnbWVudSc6XG5cdFx0XHRcdFx0Y29udGVudEhlYWRlciA9IDxoMSBjbGFzc05hbWU9XCJyb2xsdXAtdGl0bGVcIj57dGhpcy5wcm9wcy50ZW1wbGF0ZS50aXRsZX08L2gxPjtcblx0XHRcdFx0XHRjb250ZW50RWxlbWVudCA9IDxNZW51IG1lbnVJdGVtcz17dGhpcy5wcm9wcy5tZW51fS8+O1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdyb2xsdXAnOlxuXHRcdFx0XHRcdGNvbnRlbnRIZWFkZXIgPSA8aDEgY2xhc3NOYW1lPVwicm9sbHVwLXRpdGxlXCI+e3RoaXMucHJvcHMudGVtcGxhdGUudGl0bGV9PC9oMT47XG5cdFx0XHRcdFx0Y29udGVudEVsZW1lbnQgPSBbXTtcblx0XHRcdFx0XHRmb3IgKGxldCBwb3N0IG9mIHRoaXMucHJvcHMucG9zdHMpe1xuXHRcdFx0XHRcdFx0Y29udGVudEVsZW1lbnQucHVzaCg8Um9sbHVwIHBvc3Q9e3Bvc3R9IGtleT17cG9zdC5pZH0vPik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHBvc3ROYXYgPSA8UG9zdE5hdiBjb250ZW50PXt0aGlzLnByb3BzLnBvc3ROYXZ9IC8+XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ3NpbmdsZSc6XG5cdFx0XHRcdFx0bGV0IHBvc3QgPSB0aGlzLnByb3BzLnBvc3RzWzBdO1xuXHRcdFx0XHRcdGNvbnRlbnRFbGVtZW50ID0gPFNpbmdsZSBwb3N0PXtwb3N0fS8+O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGlkPVwicGFnZVwiIHJlZj1cInBhZ2VDb250YWluZXJcIiBjbGFzc05hbWU9e3RoaXMuc3RhdGUucGFnZUNsYXNzfT5cblx0XHRcdFx0PEhlYWRlclNraXBMaW5rIC8+XG5cdFx0XHRcdDxIZWFkZXIgaXNMb2FkaW5nPXtpc0xvYWRpbmd9Lz5cblx0XHRcdFx0PG1haW4gaWQ9XCJjb250ZW50XCIgY2xhc3NOYW1lPVwic2l0ZS1jb250ZW50XCI+XG5cdFx0XHRcdFx0e2NvbnRlbnRIZWFkZXJ9XG5cdFx0XHRcdFx0e2NvbnRlbnRFbGVtZW50fVxuXHRcdFx0XHRcdHtwb3N0TmF2fVxuXHRcdFx0XHQ8L21haW4+XG5cdFx0XHRcdDxGb290ZXIgLz5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgTWVudSA9IChwcm9wcykgPT4ge1xuXG5cdHZhciBtZW51SXRlbUhUTUwgPXtfX2h0bWw6cHJvcHMubWVudUl0ZW1zfTtcblxuXHRyZXR1cm4gKFxuXHRcdDxuYXYgaWQ9XCJzaXRlLW5hdmlnYXRpb25cIiBjbGFzc05hbWU9XCJtYWluLW5hdmlnYXRpb25cIiByb2xlPVwibmF2aWdhdGlvblwiPlxuXHRcdFx0PGZvcm0gcm9sZT1cInNlYXJjaFwiIG1ldGhvZD1cImdldFwiIGNsYXNzTmFtZT1cInNlYXJjaC1mb3JtXCIgYWN0aW9uPVwiL1wiPlxuXHRcdFx0XHQ8bGFiZWw+XG5cdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cInNjcmVlbi1yZWFkZXItdGV4dFwiPlNlYXJjaCBmb3I6PC9zcGFuPlxuXHRcdFx0XHQ8aW5wdXQgdHlwZT1cInNlYXJjaFwiIGNsYXNzTmFtZT1cInNlYXJjaC1maWVsZFwiIHBsYWNlaG9sZGVyPVwiU2VhcmNoIOKAplwiIG5hbWU9XCJzXCIgLz5cblx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzTmFtZT1cInNlYXJjaC1zdWJtaXRcIj7wn5SOPC9idXR0b24+XG5cdFx0XHQ8L2Zvcm0+XG5cdFx0XHQ8ZGl2IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXttZW51SXRlbUhUTUx9IC8+XG5cdFx0PC9uYXY+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTWVudTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgTWVudSA9IHJlcXVpcmUoJy4vbWVudS5qc3gnKTtcblxuY29uc3QgTm9uZSA9IChwcm9wcykgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdDxzZWN0aW9uIGNsYXNzTmFtZT1cIm5vLXJlc3VsdHMgbm90LWZvdW5kXCI+XG5cdFx0XHQ8aGVhZGVyIGNsYXNzTmFtZT1cInBhZ2UtaGVhZGVyXCI+XG5cdFx0XHRcdDxoMSBjbGFzc05hbWU9XCJyb2xsdXAtdGl0bGVcIj4gTm90aGluZyBGb3VuZCA8L2gxPlxuXHRcdFx0PC9oZWFkZXI+XG5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFnZS1jb250ZW50XCI+XG5cdFx0XHRcdDxwPiBXZSBjYW4ndCBzZWVtIHRvIGZpbmQgd2hhdCB5b3Ugd2VyZSBsb29raW5nIGZvci4gSGVyZSBpcyB0aGUgbWVudSBhZ2FpbiBzbyB5b3UgY2FuIGdldCB0byB3aGVyZSB5b3UgbmVlZCB0byBnby48L3A+XG5cdFx0XHRcdDxNZW51IG1lbnVJdGVtcz17cHJvcHMubWVudUl0ZW1zfS8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L3NlY3Rpb24+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTm9uZTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IFJvbGx1cCA9IChwcm9wcykgPT4ge1xuXHQvLyB3cGF1dG9wLi4uXG5cdHZhciBleGNlcnB0SFRNTCA9IHtfX2h0bWw6ICc8cD4nICsgcHJvcHMucG9zdC5leGNlcnB0ICsgJzwvcD4nfTtcblxuXHR2YXIgcG9zdGVkT247XG5cdGlmIChwcm9wcy5wb3N0LnBvc3RfdHlwZSA9PT0gJ3Bvc3QnKXtcblx0XHR2YXIgcG9zdGVkT25IVE1MID0ge19faHRtbDogcHJvcHMucG9zdC50ZW1wbGF0ZV90YWdzLnBvc3RlZF9vbn07XG5cdFx0cG9zdGVkT24gPSAoXG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJwb3N0ZWQtb25cIiBkYW5nZXJvdXNseVNldElubmVySFRNTD17cG9zdGVkT25IVE1MfSAvPlxuXHRcdClcblx0fVxuXG5cdHZhciBpY29uSFRNTCA9IHtfX2h0bWw6IHByb3BzLnBvc3QudGVtcGxhdGVfdGFncy5jYXRlZ29yeS5pY29ufTtcblxuXHR2YXIgYXJ0aWNsZUNsYXNzID0gcHJvcHMucG9zdC5jc3NfY2xhc3MgKyAnIHJvbGx1cC1pdGVtJztcblxuXHRyZXR1cm4gKFxuXHRcdDxhcnRpY2xlIGlkPXtwcm9wcy5wb3N0LmlkfSBjbGFzc05hbWU9e2FydGljbGVDbGFzc30+XG5cdFx0XHQ8aGVhZGVyIGNsYXNzTmFtZT1cImVudHJ5LWhlYWRlclwiPlxuXHRcdFx0XHQ8aDIgY2xhc3NOYW1lPVwiZW50cnktdGl0bGVcIj48YSBocmVmPXtwcm9wcy5wb3N0LnBlcm1hbGlua30+e3Byb3BzLnBvc3QudGl0bGV9PC9hPjwvaDI+XG5cdFx0XHRcdHtwb3N0ZWRPbn1cblx0XHRcdDwvaGVhZGVyPlxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJlbnRyeS1jYXQtaWNvblwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtpY29uSFRNTH0+PC9kaXY+XG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImVudHJ5LXN1bW1hcnlcIiBkYW5nZXJvdXNseVNldElubmVySFRNTD17ZXhjZXJwdEhUTUx9PjwvZGl2PlxuXHRcdDwvYXJ0aWNsZT5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSb2xsdXA7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBTaW5nbGUgPSAocHJvcHMpID0+IHtcblx0dmFyIGNvbnRlbnRIVE1MID0ge19faHRtbDogcHJvcHMucG9zdC5jb250ZW50fTtcblx0dmFyIHBvc3RlZE9uO1xuXHR2YXIgY2F0ZWdvcnlMaXN0O1xuXHR2YXIgY29tbWVudHM7XG5cdGlmIChwcm9wcy5wb3N0LnBvc3RfdHlwZSA9PT0gJ3Bvc3QnKXtcblxuXHRcdHZhciBwb3N0ZWRPbkhUTUwgPSB7X19odG1sOiBwcm9wcy5wb3N0LnRlbXBsYXRlX3RhZ3MucG9zdGVkX29ufTtcblx0XHRwb3N0ZWRPbiA9IChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicG9zdGVkLW9uXCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3Bvc3RlZE9uSFRNTH0gPjwvZGl2PlxuXHRcdCk7XG5cblx0XHR2YXIgY2F0ZWdvcnlMaXN0SFRNTCA9IHtfX2h0bWw6IHByb3BzLnBvc3QudGVtcGxhdGVfdGFncy5jYXRlZ29yeS5saXN0fVxuXHRcdGNhdGVnb3J5TGlzdCA9IChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPSdwb3N0LWNhdGVnb3J5JyBkYW5nZXJvdXNseVNldElubmVySFRNTD17Y2F0ZWdvcnlMaXN0SFRNTH0gPjwvZGl2PlxuXHRcdCk7XG5cblx0XHR2YXIgY29tbWVudHNIVE1MID0ge19faHRtbDogcHJvcHMucG9zdC50ZW1wbGF0ZV90YWdzLmNvbW1lbnRzfTtcblx0XHRjb21tZW50cyA9IChcblx0XHRcdDxmb290ZXIgY2xhc3NOYW1lPVwiZW50cnktZm9vdGVyXCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e2NvbW1lbnRzSFRNTH0gLz5cblx0XHQpO1xuXHR9XG5cblxuXHRyZXR1cm4gKFxuXHRcdDxhcnRpY2xlIGlkPXtwcm9wcy5wb3N0LmlkfSBjbGFzc05hbWU9e3Byb3BzLnBvc3QuY3NzX2NsYXNzfT5cblx0XHRcdDxoZWFkZXIgY2xhc3NOYW1lPVwiZW50cnktaGVhZGVyXCI+XG5cdFx0XHRcdDxoMSBjbGFzc05hbWU9XCJlbnRyeS10aXRsZVwiPntwcm9wcy5wb3N0LnRpdGxlfTwvaDE+XG5cdFx0XHRcdHtjYXRlZ29yeUxpc3R9XG5cdFx0XHRcdHtwb3N0ZWRPbn1cblx0XHRcdDwvaGVhZGVyPlxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJlbnRyeS1jb250ZW50XCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e2NvbnRlbnRIVE1MfT48L2Rpdj5cblx0XHRcdHtjb21tZW50c31cblx0XHQ8L2FydGljbGU+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2luZ2xlO1xuIiwiY29uc3QgYWpheFN0YXRlcyA9IHtcblx0SU5JVElBTDogMCxcblx0TE9BRElORyA6IDMsXG5cdERPTkUgOiA0XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYWpheFN0YXRlcztcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IEZvb3RlciA9IChwcm9wcykgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdDxmb290ZXIgaWQ9XCJjb2xvcGhvblwiIGNsYXNzTmFtZT1cInNpdGUtZm9vdGVyXCIgcm9sZT1cImNvbnRlbnRpbmZvXCI+XG5cdFx0PGRpdiBjbGFzc05hbWU9XCJzaXRlLWluZm9cIj5cblx0XHRcdENvcHlyaWdodCDCqSBLcmlzdG9mZXIgUmFza2UgMjAxNiBTLkQuRy4gUG93ZXJlZCBieSA8YSBocmVmPVwiaHR0cHM6Ly93b3JkcHJlc3Mub3JnL1wiPiBXb3JkcHJlc3MgPC9hPiBhbmQgPGEgaHJlZj1cImh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L1wiPiBSZWFjdC5qcyA8L2E+XG5cdFx0PC9kaXY+XG5cdFx0PC9mb290ZXI+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRm9vdGVyO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgSGVhZGVyID0gKHByb3BzKSA9PiB7XG5cdHZhciBsb2dvU3JjID0gJy93cC1jb250ZW50L3RoZW1lcy9rcmFza2UtcmVhY3QtMjAxNi9jbGllbnQvc3RhdGljL2Fzc2V0cy9zaXRlLWxvZ28ucG5nJztcblx0dmFyIGxvZ29DbGFzcyA9ICdzaXRlLWxvZ28nO1xuXHRpZiAocHJvcHMuaXNMb2FkaW5nKXtcblx0XHRsb2dvU3JjID0gJy93cC1jb250ZW50L3RoZW1lcy9rcmFza2UtcmVhY3QtMjAxNi9jbGllbnQvc3RhdGljL2Fzc2V0cy9sb2FkaW5nLnN2Zyc7XG5cdFx0bG9nb0NsYXNzID0gJ3NpdGUtbG9nbyBsb2FkaW5nJztcblx0fVxuXG5cdHJldHVybiAoXG5cdFx0PGhlYWRlciBpZD1cIm1hc3RoZWFkXCIgY2xhc3NOYW1lPVwic2l0ZS1oZWFkZXJcIiByb2xlPVwiYmFubmVyXCI+XG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17bG9nb0NsYXNzfT5cblx0XHRcdFx0PGEgaHJlZj1cIi9tZW51XCIgdGl0bGU9XCJNZW51XCI+XG5cdFx0XHRcdFx0PGltZyB3aWR0aD1cIjEwMFwiIGhlaWdodD1cIjEwMFwiIHNyYz17bG9nb1NyY30gYWx0PVwiU2l0ZSBMb2dvXCIgLz5cblx0XHRcdFx0PC9hPlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9oZWFkZXI+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyO1xuIiwiLyoqXG4gKiBNYWluIGVudHJ5IHBvaW50IGZvciByZWFjdCBjb21wb25lbnRzXG4gKi9cblxudmFyIFJlYWN0ID0gcmVxdWlyZSggJ3JlYWN0JyApO1xudmFyIFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG52YXIgUm91dGVyID0gcmVxdWlyZSggJy4vcm91dGVyLmpzeCcgKTtcbnZhciBpc1J1bm5hYmxlID0gcmVxdWlyZSgnLi4vanMvcHJvZ3Jlc3NpdmUuanMnKTtcbnZhciBoYXNJbml0aWFsRGF0YSA9ICh0eXBlb2YgaW5pdGlhbFJlYWN0RGF0YSAhPT0gJ3VuZGVmaW5lZCcpO1xuXG5pZiAoaXNSdW5uYWJsZSAmJiBoYXNJbml0aWFsRGF0YSl7XG4gIHZhciByZWFjdFJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2FwcC1yb290JyApO1xuICB2YXIgY29udGVudEFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnLmVudHJ5LWNvbnRlbnQnICk7XG4gIHZhciBpbm5lckNvbnRlbnRBcmVhO1xuICBpZiAoY29udGVudEFyZWEpe1xuICAgIHZhciBpbm5lckNvbnRlbnRBcmVhID0gY29udGVudEFyZWEuaW5uZXJIVE1MO1xuICB9XG4gIFJlYWN0RE9NLnJlbmRlcig8Um91dGVyIGluaXRpYWxEYXRhPXtpbml0aWFsUmVhY3REYXRhfSBpbml0aWFsQ29udGVudD17aW5uZXJDb250ZW50QXJlYX0gLz4sIHJlYWN0Um9vdCk7XG59XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBIZWFkZXJTa2lwTGluayA9IChwcm9wcykgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdDxhIGNsYXNzTmFtZT1cInNraXAtbGluayBzY3JlZW4tcmVhZGVyLXRleHRcIiBocmVmPVwiI2NvbnRlbnRcIj5Ta2lwIHRvIGNvbnRlbnQ8L2E+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyU2tpcExpbms7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBQb3N0TmF2aWdhdGlvbiA9IChwcm9wcykgPT4ge1xuXG5cdC8vIHdvcmRwcmVzcyBrZWVwcyB0aGUgcmV0dXJuX2luc3RlYWQgcXVlcnkgdmFyIGluIHRoZSBuYXYsIGJ1dCB3ZSBkb24ndCB3YW50XG5cdC8vIHRvIGxpbmsgdG8gdGhhdC4gU28gc3RyaXAgdGhhdCBvdXQhXG5cdHZhciBuYXZIVE1Mbm9MaW5rUXVlcnlTdHJpbmcgPSBwcm9wcy5jb250ZW50LnJlcGxhY2UoL3JldHVybl9pbnN0ZWFkXFw9cG9zdHMtanNvbi9nLCBcIlwiKTtcblx0dmFyIG5hdmlnYXRpb25faHRtbCA9IHtfX2h0bWw6IG5hdkhUTUxub0xpbmtRdWVyeVN0cmluZ31cblxuXHRyZXR1cm4gKFxuXHRcdDxkaXYgY2xhc3NOYW1lPVwicHJldi1uZXh0LXBvc3RzXCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e25hdmlnYXRpb25faHRtbH0gLz5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQb3N0TmF2aWdhdGlvbjtcbiIsIi8qKlxuICogV3JhcHBlciBjb21wb25lbnQgZm9yIFJlYWN0IEFwcGxpY2F0aW9uIHdoaWNoIG1hbmFnZXMgc3RhdGUgdmlhIHRoZVxuICogd29yZHByZXNzIFVSTC4gVXNpbmcgdGhlICdwYWdlJyBsaWJyYXJ5IGluIG5wbSB3ZSBjYW4gaGlqYWNrIG5vcm1hbCBsaW5rXG4gKiBleGVjdXRpb24gYW5kIGluc3RlYWQgdXNlIHRoZSBldmVudCB0byBnZXQgdGhlIG5ldyBkYXRhIGZvciBSZWFjdCB0byBjb25zdW1lXG4gKiBhbGwgdGhlIHdoaWxlIHVwZGF0aW5nIHRoZSBjdXJyZW50IHVybCB1c2luZyB0aGUgSGlzdG9yeSBBUEkgdG8gbWFrZSBpdFxuICogYXBwZWFyIHRoYXQgeW91IGhhdmUgbW92ZWQgdG8gYSBuZXcgcGFnZVxuICovXG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoICdyZWFjdCcgKTtcbnZhciB1cmxSb3V0ZXIgPSByZXF1aXJlKCAncGFnZScgKTtcbnZhciByZXF1ZXN0ID0gcmVxdWlyZSggJ3N1cGVyYWdlbnQnICk7XG5cbnZhciBhamF4U3RhdGVzID0gcmVxdWlyZSggJy4vZW51bS9hamF4U3RhdGVzLmpzJyk7XG52YXIgUGFnZSA9IHJlcXVpcmUoICcuL1BhZ2UuanN4JyApO1xuXG5jbGFzcyBSb3V0ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcblx0XHRcdGFqYXhTdGF0ZTogYWpheFN0YXRlcy5JTklUSUFMLFxuXHRcdFx0cG9zdHM6IHByb3BzLmluaXRpYWxEYXRhLnBvc3RzLFxuXHRcdFx0bWVudTogcHJvcHMuaW5pdGlhbERhdGEucHJpbWFyeV9tZW51LFxuXHRcdFx0cG9zdE5hdjogcHJvcHMuaW5pdGlhbERhdGEucG9zdF9uYXYsXG5cdFx0XHRib2R5Q2xhc3M6IHByb3BzLmluaXRpYWxEYXRhLmJvZHlfY2xhc3MsXG5cdFx0XHR0ZW1wbGF0ZTogcHJvcHMuaW5pdGlhbERhdGEudGVtcGxhdGUsXG5cdFx0XHRhamF4U3RhdGU6IGFqYXhTdGF0ZXMuRE9ORSxcblx0XHR9XG5cblx0XHQvLyBTZXBhcmF0ZWx5IGxvYWQgY29udGVudCwgaXQgaXMgcG9zc2libHkgbG90cyBvZiBkYXRhXG5cdFx0aWYgKHByb3BzLmluaXRpYWxEYXRhLnBvc3RzLmxlbmd0aCA9PT0gMSApe1xuXHRcdFx0dGhpcy5zdGF0ZS5wb3N0c1swXS5jb250ZW50ID0gcHJvcHMuaW5pdGlhbENvbnRlbnQ7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEhlbHBlciBmdW5jdGlvbiB0byBhZGQgUXVlcnkgU3RyaW5nIFBhcmFtZXRlciB0byBlbmQgb2YgdXJsXG5cdCAqXG5cdCAqIEByZXR1cm5zIHF1ZXJ5c3RyaW5nIHdpdGggcGFyYW0gYXBwZW5kZWQuXG5cdCAqL1xuXHRzdGF0aWMgdXBkYXRlUGF0aFdpdGhOZXdRdWVyeShuZXdQYXJhbSwgcGF0aCwgZXhpc3RpbmdRdWVyeXN0cmluZz0nJyl7XG5cdFx0dmFyIHNlcGVyYXRvckFwZXJzYW5kID0gJyc7XG5cdFx0aWYgKGV4aXN0aW5nUXVlcnlzdHJpbmcpe1xuXHRcdFx0aWYgKGV4aXN0aW5nUXVlcnlzdHJpbmcuaW5kZXhPZihuZXdQYXJhbSkgIT09IC0xICkge1xuXHRcdFx0XHRyZXR1cm4gcGF0aCArICc/JyArIGV4aXN0aW5nUXVlcnlzdHJpbmc7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzZXBlcmF0b3JBcGVyc2FuZCA9ICcmJztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHBhdGggKyAnPycgKyBleGlzdGluZ1F1ZXJ5c3RyaW5nICsgc2VwZXJhdG9yQXBlcnNhbmQgKyBuZXdQYXJhbTtcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdC8vIEZvciBhIHN0YXRpYyBob21lcGFnZSB3b3JkcHJlc3MgZG9lc24ndCBrbm93IHRvIGZldGNoIHRoZSBwYWdlIGluc3RlYWRcblx0XHQvLyBvZiB0aGUgZGVmYXVsdCByb2xsdXAsIHNvIHdlIGNhbid0IHVzZSB0aGUgcmVhY3Qgcm91dGluZyBpbiB0aGlzIGNhc2Vcblx0XHR1cmxSb3V0ZXIoICcvJywgZnVuY3Rpb24gKCBjdHggKSB7XG5cdFx0XHR1cmxSb3V0ZXIoJy9ob21lJyk7XG5cdFx0fSk7XG5cblx0XHQvLyBNZW51IGlzIGxvYWRlZCBvbiBpbml0aWFsIGxvYWQgYW5kIG5ldmVyIGNoYW5nZXMsIHNvIHdlIGRvbid0IG5lZWRcblx0XHQvLyB0byBnbyB0byB0aGUgc2VydmVyIHRvIHJlLXJlbmRlciB0aGF0XG5cdFx0dXJsUm91dGVyKCcvbWVudScsIGZ1bmN0aW9uICggY3R4ICkge1xuXHRcdFx0c2VsZi5zZXRTdGF0ZSh7XG5cdFx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdFx0dHlwZTogJ21lbnUnLFxuXHRcdFx0XHRcdHRpdGxlOiAnTWVudSdcblx0XHRcdFx0fSxcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0dXJsUm91dGVyKCAnKicsIGZ1bmN0aW9uICggY3R4ICkge1xuXHRcdFx0aWYgKHNlbGYuc3RhdGUuYWpheFN0YXRlID09PSBhamF4U3RhdGVzLkxPQURJTkcpe1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR2YXIgZGF0YVBhdGggPSBSb3V0ZXIudXBkYXRlUGF0aFdpdGhOZXdRdWVyeSgncmV0dXJuX2luc3RlYWQ9cG9zdHMtanNvbicsIGN0eC5wYXRobmFtZSwgY3R4LnF1ZXJ5c3RyaW5nKTtcblx0XHRcdHNlbGYuc2V0U3RhdGUoe1xuXHRcdFx0XHRhamF4U3RhdGU6IGFqYXhTdGF0ZXMuTE9BRElOR1xuXHRcdFx0fSk7XG5cblx0XHRcdHJlcXVlc3Rcblx0XHRcdFx0LmdldCggZGF0YVBhdGggKVxuXHRcdFx0XHQuZW5kKCBmdW5jdGlvbiggZXJyLCByZXMgKSB7XG5cdFx0XHRcdFx0aWYgKGVycikge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnIpO1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHR2YXIgZGF0YSA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuXHRcdFx0XHRcdH0gY2F0Y2goZXgpIHtcblx0XHRcdFx0XHRcdHVybFJvdXRlci5zdG9wKCk7XG5cdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGN0eC5jYW5vbmljYWxQYXRoO1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHNlbGYuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdFx0cG9zdHM6IGRhdGEucG9zdHMsXG5cdFx0XHRcdFx0XHRwb3N0TmF2OiBkYXRhLnBvc3RfbmF2LFxuXHRcdFx0XHRcdFx0Ym9keUNsYXNzOiBkYXRhLmJvZHlfY2xhc3MsXG5cdFx0XHRcdFx0XHR0ZW1wbGF0ZTogZGF0YS50ZW1wbGF0ZSxcblx0XHRcdFx0XHRcdGFqYXhTdGF0ZTogYWpheFN0YXRlcy5ET05FLFxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdHVybFJvdXRlcih7XG5cdFx0XHQvLyBQcmV2ZW50cyB0cmlnZ2VyaW5nIHJvdXRpbmcgb24gdGhlIGluaXRpYWwgcGFnZSBsb2FkXG5cdFx0XHRkaXNwYXRjaDogZmFsc2Vcblx0XHR9KTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxQYWdlIHsuLi50aGlzLnN0YXRlfSAvPlxuXHRcdFx0KTtcblx0XHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUm91dGVyO1xuIiwiLyoqXG4gKiBNb2R1bGUgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgdG8gbG9hZCB1cCByZWFjdCBvciBub3RcbiAqL1xuXG52YXIgdXNlSlMgPSB0cnVlO1xuXG5pZiAodHlwZW9mIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgIT09ICdmdW5jdGlvbicgKSB7XG5cdHVzZUpTID0gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdXNlSlM7XG4iXX0=
