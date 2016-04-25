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
			var numberOfPosts = this.props.posts.length;
			var contentElement;
			var contentHeader;
			var postNav;

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

},{"./content/menu.jsx":2,"./content/none.jsx":3,"./content/rollup.jsx":4,"./content/single.jsx":5,"./footer.jsx":6,"./header.jsx":7,"./misc/header-skip-link.jsx":9,"./misc/post-navigation.jsx":10,"react":"react"}],2:[function(require,module,exports){
"use strict";

var React = require('react');

var Menu = function Menu(props) {

	var menuItemHTML = { __html: props.menuItems };

	return React.createElement(
		"nav",
		{ id: "site-navigation", className: "main-navigation", role: "navigation" },
		React.createElement(
			"form",
			{ role: "search", method: "get", className: "search-form", action: "http://local.react.dev/" },
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

},{"react":"react"}],4:[function(require,module,exports){
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

},{"react":"react"}],7:[function(require,module,exports){
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

},{"react":"react"}],8:[function(require,module,exports){
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

},{"./router.jsx":11,"react":"react","react-dom":"react-dom"}],9:[function(require,module,exports){
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

},{"react":"react"}],10:[function(require,module,exports){
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

},{"react":"react"}],11:[function(require,module,exports){
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
  * @returns querystring with param appended.
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
						template: data.template
					});
					console.log(data);
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
			return React.createElement(Page, { posts: this.state.posts,
				pageClass: this.state.bodyClass,
				template: this.state.template,
				menu: this.state.menu,
				postNav: this.state.postNav,
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

},{"./Page.jsx":1,"page":"page","react":"react","superagent":"superagent"}]},{},[8])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvY29tcG9uZW50cy9QYWdlLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2NvbnRlbnQvbWVudS5qc3giLCJjbGllbnQvY29tcG9uZW50cy9jb250ZW50L25vbmUuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvY29udGVudC9yb2xsdXAuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvY29udGVudC9zaW5nbGUuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvZm9vdGVyLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2hlYWRlci5qc3giLCJjbGllbnQvY29tcG9uZW50cy9pbmRleC5qc3giLCJjbGllbnQvY29tcG9uZW50cy9taXNjL2hlYWRlci1za2lwLWxpbmsuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvbWlzYy9wb3N0LW5hdmlnYXRpb24uanN4IiwiY2xpZW50L2NvbXBvbmVudHMvcm91dGVyLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUNBQSxJQUFJLFFBQVEsUUFBUSxPQUFSLENBQVI7O0FBRUosSUFBSSxTQUFTLFFBQVEsY0FBUixDQUFUO0FBQ0osSUFBSSxpQkFBaUIsUUFBUSw2QkFBUixDQUFqQjtBQUNKLElBQUksU0FBUyxRQUFRLHNCQUFSLENBQVQ7QUFDSixJQUFJLFNBQVMsUUFBUSxzQkFBUixDQUFUO0FBQ0osSUFBSSxPQUFPLFFBQVEsb0JBQVIsQ0FBUDtBQUNKLElBQUksT0FBTyxRQUFRLG9CQUFSLENBQVA7QUFDSixJQUFJLFVBQVUsUUFBUSw0QkFBUixDQUFWO0FBQ0osSUFBSSxTQUFTLFFBQVEsY0FBUixDQUFUOzs7Ozs7OztJQU9FOzs7QUFFTCxVQUZLLElBRUwsQ0FBWSxLQUFaLEVBQWtCO3dCQUZiLE1BRWE7O3FFQUZiLGlCQUdFLFFBRFc7O0FBRWpCLFFBQUssS0FBTCxHQUFhO0FB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QUFDUCxVQUNDLG9CQUFDLElBQUQsSUFBTSxPQUFPLEtBQUssS0FBTCxDQUFXLEtBQVg7QUFDWixlQUFXLEtBQUssS0FBTCxDQUFXLFNBQVg7QUFDWCxjQUFVLEtBQUssS0FBTCxDQUFXLFFBQVg7QUFDVixVQUFNLEtBQUssS0FBTCxDQUFXLElBQVg7QUFDTixhQUFTLEtBQUssS0FBTCxDQUFXLE9BQVg7QUFDVCxtQkFBZSxLQUFLLEtBQUwsQ0FBVyxhQUFYO0FBQ2YsaUJBQWEsS0FBSyxLQUFMLENBQVcsV0FBWDtBQUNiLHNCQUFrQixLQUFLLEtBQUwsQ0FBVyxnQkFBWCxFQVBuQixDQURELENBRE87Ozs7eUNBbkRxQixVQUFVLE1BQTZCO09BQXZCLDRFQUFvQixrQkFBRzs7QUFDcEUsT0FBSSxvQkFBb0IsRUFBcEIsQ0FEZ0U7QUFFcEUsT0FBSSxtQkFBSixFQUF3QjtBQUN2QixRQUFJLG9CQUFvQixPQUFwQixDQUE0QixRQUE1QixNQUEwQyxDQUFDLENBQUQsRUFBSztBQUNsRCxZQUFPLE9BQU8sR0FBUCxHQUFhLG1CQUFiLENBRDJDO0tBQW5ELE1BRU87QUFDTix5QkFBb0IsR0FBcEIsQ0FETTtLQUZQO0lBREQ7QUFPQSxVQUFPLE9BQU8sR0FBUCxHQUFhLG1CQUFiLEdBQW1DLGlCQUFuQyxHQUF1RCxRQUF2RCxDQVQ2RDs7OztRQWZoRTtFQUFlLE1BQU0sU0FBTjs7QUFnRnJCLE9BQU8sT0FBUCxHQUFpQixNQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgSGVhZGVyID0gcmVxdWlyZSgnLi9oZWFkZXIuanN4Jyk7XG52YXIgSGVhZGVyU2tpcExpbmsgPSByZXF1aXJlKCcuL21pc2MvaGVhZGVyLXNraXAtbGluay5qc3gnKTtcbnZhciBSb2xsdXAgPSByZXF1aXJlKCcuL2NvbnRlbnQvcm9sbHVwLmpzeCcpO1xudmFyIFNpbmdsZSA9IHJlcXVpcmUoJy4vY29udGVudC9zaW5nbGUuanN4Jyk7XG52YXIgTm9uZSA9IHJlcXVpcmUoJy4vY29udGVudC9ub25lLmpzeCcpO1xudmFyIE1lbnUgPSByZXF1aXJlKCcuL2NvbnRlbnQvbWVudS5qc3gnKTtcbnZhciBQb3N0TmF2ID0gcmVxdWlyZSgnLi9taXNjL3Bvc3QtbmF2aWdhdGlvbi5qc3gnKTtcbnZhciBGb290ZXIgPSByZXF1aXJlKCcuL2Zvb3Rlci5qc3gnKTtcblxuLyoqXG4gKiBNYWluIFBhZ2UgQ29tcG9uZW50XG4gKlxuICogQWxzbyBjb250cm9scyB0aGUgZmFuY3kgY29sb3IgdG9nZ2xlIG9uIHBhZ2UgZWxlbWVudHNcbiAqL1xuY2xhc3MgUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnN0YXRlID0ge1xuXHRcdFx0Y29sb3JQYWxldHRlOiAnY29sb3ItcGFsZXR0ZS0xJyxcblx0XHRcdHBhZ2VDbGFzczogJydcblx0XHR9XG5cdH1cblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XG5cdFx0dmFyIHBhZ2VDbGFzcyA9IG5leHRQcm9wcy5wYWdlQ2xhc3M7XG5cdFx0dmFyIG5ld1BhbGV0dGVDbGFzcyA9IHBhZ2VDbGFzcy5tYXRjaCgvY29sb3ItcGFsZXR0ZS1cXGQvKVswXTtcblx0XHR2YXIgbmV3Q2xhc3NMaXN0ID0gcGFnZUNsYXNzLnJlcGxhY2UoL1xccz9jb2xvci1wYWxldHRlLVxcZC9nLCAnJyk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7Y29sb3JQYWxldHRlOiBuZXdQYWxldHRlQ2xhc3N9KTtcblx0XHR0aGlzLnNldFN0YXRlKHtwYWdlQ2xhc3M6IG5ld0NsYXNzTGlzdH0pO1xuXHR9XG5cblx0Y29tcG9uZW50RGlkVXBkYXRlKCl7XG5cdFx0Ly8gSXQncyBub3QgcHJldHR5LCBidXQgd2Ugc2hvdWxkIHNjcm9sbCB0byB0aGUgdG9wIG9mIHRoZSBwYWdlIGlmIHdlXG5cdFx0Ly8gXCJuYXZpZ2F0ZVwiIHRvIGFub3RoZXIgcGFnZSB3aXRoIGEgcmVuZGVyXG5cdFx0d2luZG93LmRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gMDtcblxuXHRcdC8vIFVzaW5nIHJlcXVlc3QgYW5pbWF0aW9uIEZyYW1lIHRvIGVuc3VyZSB0aGF0IGVhY2ggZnVuY3Rpb24gaXMgcGFpbnRlZFxuXHRcdC8vIGJlZm9yZSB0aGUgbmV4dCBmdW5jdGlvbiBiZWdpbnMgdG8gZmlyZVxuXHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoICgpID0+IHtcblx0XHRcdHRoaXMuY2xlYXJQYWxldHRlKCk7XG5cdFx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCAoKSA9PiB7XG5cdFx0XHRcdHRoaXMuYXBwbHlQYWxldHRlKCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdGNsZWFyUGFsZXR0ZSgpe1xuXHRcdHRoaXMucmVmcy5wYWdlQ29udGFpbmVyLmNsYXNzTmFtZSA9IHRoaXMuc3RhdGUucGFnZUNsYXNzICsgJyAnICsgJ2NvbG9yLXBhbGV0dGUtdHJhbnNpdGlvbic7XG5cdH1cblxuXHRhcHBseVBhbGV0dGUoKXtcblx0XHR0aGlzLnJlZnMucGFnZUNvbnRhaW5lci5jbGFzc05hbWUgPSB0aGlzLnN0YXRlLnBhZ2VDbGFzcyArICcgJyArIHRoaXMuc3RhdGUuY29sb3JQYWxldHRlO1xuXHR9XG5cblx0cmVuZGVyKCl7XG5cblx0XHQvLyBJZiB3ZSBwYXNzZWQgaW4gaW50aWFsIHBhZ2UgaHRtbCBpbnN0ZWFkIG9mIGEgcG9zdCBvYmplY3QgcmVuZGVyXG5cdFx0Ly8gdGhhdCBpbnN0ZWFkIG9mIHRoZSBcInJlYWxcIiByZWFjdCBhcHBcblx0XHRpZiAoIXRoaXMucHJvcHMuaGFzU2VydmVyRGF0YSl7XG5cdFx0XHR2YXIgaW50aWFsUGFnZUhUTUwgPSB7X19odG1sOiB0aGlzLnByb3BzLmluaXRpYWxQYWdlfTtcblx0XHRcdHJldHVybiA8ZGl2IGlkPVwicGFnZVwiIHJlZj1cInBhZ2VDb250YWluZXJcIiBjbGFzc05hbWU9e3RoaXMucHJvcHMuaW5pdGlhbFBhZ2VDbGFzc30gZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e2ludGlhbFBhZ2VIVE1MfSAvPlxuXHRcdH1cblxuXHRcdC8vIFRoaXMgaXMgdGhlIG5vcm1hbCBwb3N0LXJlbmRlcmVyIHJlYWN0IGFwcHNcblx0XHR2YXIgbnVtYmVyT2ZQb3N0cyA9IHRoaXMucHJvcHMucG9zdHMubGVuZ3RoO1xuXHRcdHZhciBjb250ZW50RWxlbWVudDtcblx0XHR2YXIgY29udGVudEhlYWRlcjtcblx0XHR2YXIgcG9zdE5hdjtcblxuXHRcdGlmICh0aGlzLnByb3BzLnBvc3RzLmxlbmd0aCA9PT0gMCl7XG5cdFx0XHRjb250ZW50RWxlbWVudCA9IDxOb25lIC8+O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzd2l0Y2ggKHRoaXMucHJvcHMudGVtcGxhdGUudHlwZSl7XG5cdFx0XHRcdGNhc2UgJ21lbnUnOlxuXHRcdFx0XHRcdGNvbnRlbnRIZWFkZXIgPSA8aDEgY2xhc3NOYW1lPVwicm9sbHVwLXRpdGxlXCI+e3RoaXMucHJvcHMudGVtcGxhdGUudGl0bGV9PC9oMT47XG5cdFx0XHRcdFx0Y29udGVudEVsZW1lbnQgPSA8TWVudSBtZW51SXRlbXM9e3RoaXMucHJvcHMubWVudX0vPjtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAncm9sbHVwJzpcblx0XHRcdFx0XHRjb250ZW50SGVhZGVyID0gPGgxIGNsYXNzTmFtZT1cInJvbGx1cC10aXRsZVwiPnt0aGlzLnByb3BzLnRlbXBsYXRlLnRpdGxlfTwvaDE+O1xuXHRcdFx0XHRcdGNvbnRlbnRFbGVtZW50ID0gW107XG5cdFx0XHRcdFx0Zm9yIChsZXQgcG9zdCBvZiB0aGlzLnByb3BzLnBvc3RzKXtcblx0XHRcdFx0XHRcdGNvbnRlbnRFbGVtZW50LnB1c2goPFJvbGx1cCBwb3N0PXtwb3N0fSBrZXk9e3Bvc3QuaWR9Lz4pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRwb3N0TmF2ID0gPFBvc3ROYXYgY29udGVudD17dGhpcy5wcm9wcy5wb3N0TmF2fSAvPlxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdzaW5nbGUnOlxuXHRcdFx0XHRcdGxldCBwb3N0ID0gdGhpcy5wcm9wcy5wb3N0c1swXTtcblx0XHRcdFx0XHRjb250ZW50RWxlbWVudCA9IDxTaW5nbGUgcG9zdD17cG9zdH0vPjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBpZD1cInBhZ2VcIiByZWY9XCJwYWdlQ29udGFpbmVyXCIgY2xhc3NOYW1lPXt0aGlzLnN0YXRlLnBhZ2VDbGFzc30+XG5cdFx0XHRcdDxIZWFkZXJTa2lwTGluayAvPlxuXHRcdFx0XHQ8SGVhZGVyIC8+XG5cdFx0XHRcdDxtYWluIGlkPVwiY29udGVudFwiIGNsYXNzTmFtZT1cInNpdGUtY29udGVudFwiPlxuXHRcdFx0XHRcdHtjb250ZW50SGVhZGVyfVxuXHRcdFx0XHRcdHtjb250ZW50RWxlbWVudH1cblx0XHRcdFx0XHR7cG9zdE5hdn1cblx0XHRcdFx0PC9tYWluPlxuXHRcdFx0XHQ8Rm9vdGVyIC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IE1lbnUgPSAocHJvcHMpID0+IHtcblxuXHR2YXIgbWVudUl0ZW1IVE1MID17X19odG1sOnByb3BzLm1lbnVJdGVtc307XG5cblx0cmV0dXJuIChcblx0XHQ8bmF2IGlkPVwic2l0ZS1uYXZpZ2F0aW9uXCIgY2xhc3NOYW1lPVwibWFpbi1uYXZpZ2F0aW9uXCIgcm9sZT1cIm5hdmlnYXRpb25cIj5cblx0XHRcdDxmb3JtIHJvbGU9XCJzZWFyY2hcIiBtZXRob2Q9XCJnZXRcIiBjbGFzc05hbWU9XCJzZWFyY2gtZm9ybVwiIGFjdGlvbj1cImh0dHA6Ly9sb2NhbC5yZWFjdC5kZXYvXCI+XG5cdFx0XHRcdDxsYWJlbD5cblx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwic2NyZWVuLXJlYWRlci10ZXh0XCI+U2VhcmNoIGZvcjo8L3NwYW4+XG5cdFx0XHRcdDxpbnB1dCB0eXBlPVwic2VhcmNoXCIgY2xhc3NOYW1lPVwic2VhcmNoLWZpZWxkXCIgcGxhY2Vob2xkZXI9XCJTZWFyY2gg4oCmXCIgbmFtZT1cInNcIiAvPlxuXHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0PGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3NOYW1lPVwic2VhcmNoLXN1Ym1pdFwiPvCflI48L2J1dHRvbj5cblx0XHRcdDwvZm9ybT5cblx0XHRcdDxkaXYgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e21lbnVJdGVtSFRNTH0gLz5cblx0XHQ8L25hdj5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBNZW51O1xuIiwiLy8gVE9ETyAtIG5lZWQgdGhpcyB0ZW1wbGF0ZSBmbGVzaGVkIG91dCB0b29cblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgTm9uZSA9IChwcm9wcykgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdDxzZWN0aW9uIGNsYXNzTmFtZT1cIm5vLXJlc3VsdHMgbm90LWZvdW5kXCI+XG5cdFx0XHQ8aGVhZGVyIGNsYXNzTmFtZT1cInBhZ2UtaGVhZGVyXCI+XG5cdFx0XHRcdDxoMSBjbGFzc05hbWU9XCJwYWdlLXRpdGxlXCI+IE5vdGhpbmcgRm91bmQgPC9oMT5cblx0XHRcdDwvaGVhZGVyPlxuXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhZ2UtY29udGVudFwiPlxuXHRcdFx0XHQqKiBUSEVSRSBJU04nVCBBTlkgUE9TVFMgZG8geW91IHdhbnQgdG8gc2VhcmNoPyAqKlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9zZWN0aW9uPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE5vbmU7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBSb2xsdXAgPSAocHJvcHMpID0+IHtcblx0Ly8gd3BhdXRvcC4uLlxuXHR2YXIgZXhjZXJwdEhUTUwgPSB7X19odG1sOiAnPHA+JyArIHByb3BzLnBvc3QuZXhjZXJwdCArICc8L3A+J307XG5cblx0dmFyIHBvc3RlZE9uO1xuXHRpZiAocHJvcHMucG9zdC5wb3N0X3R5cGUgPT09ICdwb3N0Jyl7XG5cdFx0dmFyIHBvc3RlZE9uSFRNTCA9IHtfX2h0bWw6IHByb3BzLnBvc3QudGVtcGxhdGVfdGFncy5wb3N0ZWRfb259O1xuXHRcdHBvc3RlZE9uID0gKFxuXHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwicG9zdGVkLW9uXCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3Bvc3RlZE9uSFRNTH0gLz5cblx0XHQpXG5cdH1cblxuXHR2YXIgaWNvbkhUTUwgPSB7X19odG1sOiBwcm9wcy5wb3N0LnRlbXBsYXRlX3RhZ3MuY2F0ZWdvcnkuaWNvbn07XG5cblx0dmFyIGFydGljbGVDbGFzcyA9IHByb3BzLnBvc3QuY3NzX2NsYXNzICsgJyByb2xsdXAtaXRlbSc7XG5cblx0cmV0dXJuIChcblx0XHQ8YXJ0aWNsZSBpZD17cHJvcHMucG9zdC5pZH0gY2xhc3NOYW1lPXthcnRpY2xlQ2xhc3N9PlxuXHRcdFx0PGhlYWRlciBjbGFzc05hbWU9XCJlbnRyeS1oZWFkZXJcIj5cblx0XHRcdFx0PGgyIGNsYXNzTmFtZT1cImVudHJ5LXRpdGxlXCI+PGEgaHJlZj17cHJvcHMucG9zdC5wZXJtYWxpbmt9Pntwcm9wcy5wb3N0LnRpdGxlfTwvYT48L2gyPlxuXHRcdFx0XHR7cG9zdGVkT259XG5cdFx0XHQ8L2hlYWRlcj5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZW50cnktY2F0LWljb25cIiBkYW5nZXJvdXNseVNldElubmVySFRNTD17aWNvbkhUTUx9PjwvZGl2PlxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJlbnRyeS1zdW1tYXJ5XCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e2V4Y2VycHRIVE1MfT48L2Rpdj5cblx0XHQ8L2FydGljbGU+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUm9sbHVwO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgU2luZ2xlID0gKHByb3BzKSA9PiB7XG5cdHZhciBjb250ZW50SFRNTCA9IHtfX2h0bWw6IHByb3BzLnBvc3QuY29udGVudH07XG5cdHZhciBwb3N0ZWRPbjtcblx0dmFyIGNhdGVnb3J5TGlzdDtcblx0dmFyIGNvbW1lbnRzO1xuXHRpZiAocHJvcHMucG9zdC5wb3N0X3R5cGUgPT09ICdwb3N0Jyl7XG5cblx0XHR2YXIgcG9zdGVkT25IVE1MID0ge19faHRtbDogcHJvcHMucG9zdC50ZW1wbGF0ZV90YWdzLnBvc3RlZF9vbn07XG5cdFx0cG9zdGVkT24gPSAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBvc3RlZC1vblwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtwb3N0ZWRPbkhUTUx9ID48L2Rpdj5cblx0XHQpO1xuXG5cdFx0dmFyIGNhdGVnb3J5TGlzdEhUTUwgPSB7X19odG1sOiBwcm9wcy5wb3N0LnRlbXBsYXRlX3RhZ3MuY2F0ZWdvcnkubGlzdH1cblx0XHRjYXRlZ29yeUxpc3QgPSAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ncG9zdC1jYXRlZ29yeScgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e2NhdGVnb3J5TGlzdEhUTUx9ID48L2Rpdj5cblx0XHQpO1xuXG5cdFx0dmFyIGNvbW1lbnRzSFRNTCA9IHtfX2h0bWw6IHByb3BzLnBvc3QudGVtcGxhdGVfdGFncy5jb21tZW50c307XG5cdFx0Y29tbWVudHMgPSAoXG5cdFx0XHQ8Zm9vdGVyIGNsYXNzTmFtZT1cImVudHJ5LWZvb3RlclwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtjb21tZW50c0hUTUx9IC8+XG5cdFx0KTtcblx0fVxuXG5cblx0cmV0dXJuIChcblx0XHQ8YXJ0aWNsZSBpZD17cHJvcHMucG9zdC5pZH0gY2xhc3NOYW1lPXtwcm9wcy5wb3N0LmNzc19jbGFzc30+XG5cdFx0XHQ8aGVhZGVyIGNsYXNzTmFtZT1cImVudHJ5LWhlYWRlclwiPlxuXHRcdFx0XHQ8aDEgY2xhc3NOYW1lPVwiZW50cnktdGl0bGVcIj57cHJvcHMucG9zdC50aXRsZX08L2gxPlxuXHRcdFx0XHR7Y2F0ZWdvcnlMaXN0fVxuXHRcdFx0XHR7cG9zdGVkT259XG5cdFx0XHQ8L2hlYWRlcj5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZW50cnktY29udGVudFwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtjb250ZW50SFRNTH0+PC9kaXY+XG5cdFx0XHR7Y29tbWVudHN9XG5cdFx0PC9hcnRpY2xlPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNpbmdsZTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IEZvb3RlciA9IChwcm9wcykgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdDxmb290ZXIgaWQ9XCJjb2xvcGhvblwiIGNsYXNzTmFtZT1cInNpdGUtZm9vdGVyXCIgcm9sZT1cImNvbnRlbnRpbmZvXCI+XG5cdFx0PGRpdiBjbGFzc05hbWU9XCJzaXRlLWluZm9cIj5cblx0XHRcdENvcHlyaWdodCDCqSBLcmlzdG9mZXIgUmFza2UgMjAxNiBTLkQuRy4gUG93ZXJlZCBieSA8YSBocmVmPVwiaHR0cHM6Ly93b3JkcHJlc3Mub3JnL1wiPiBXb3JkcHJlc3MgPC9hPiBhbmQgPGEgaHJlZj1cImh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L1wiPiBSZWFjdC5qcyA8L2E+XG5cdFx0PC9kaXY+XG5cdFx0PC9mb290ZXI+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRm9vdGVyO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgSGVhZGVyID0gKHByb3BzKSA9PiB7XG5cdHJldHVybiAoXG5cdFx0PGhlYWRlciBpZD1cIm1hc3RoZWFkXCIgY2xhc3NOYW1lPVwic2l0ZS1oZWFkZXJcIiByb2xlPVwiYmFubmVyXCI+XG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNpdGUtbG9nb1wiPlxuXHRcdFx0PGEgaHJlZj1cIi9tZW51XCIgcmVsPVwiaG9tZVwiPlxuXHRcdFx0XHQ8aW1nIHNyYz1cIi93cC1jb250ZW50L3RoZW1lcy9rcmFza2UtcmVhY3QtMjAxNi9jbGllbnQvc3RhdGljL2Fzc2V0cy9zaXRlLWxvZ28ucG5nXCIgYWx0PVwiU2l0ZSBMb2dvXCIgLz5cblx0XHRcdDwvYT5cblx0XHRcdDwvZGl2PlxuXHRcdDwvaGVhZGVyPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlcjtcbiIsIi8qKlxuICogTWFpbiBlbnRyeSBwb2ludCBmb3IgcmVhY3QgY29tcG9uZW50c1xuICovXG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoICdyZWFjdCcgKTtcbnZhciBSZWFjdERPTSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xudmFyIFJvdXRlciA9IHJlcXVpcmUoICcuL3JvdXRlci5qc3gnICk7XG5cbnZhciByZWFjdFJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2FwcC1yb290JyApO1xudmFyIHBhZ2VSb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdwYWdlJyApO1xuUmVhY3RET00ucmVuZGVyKDxSb3V0ZXIgaW5pdGlhbFBhZ2U9e3BhZ2VSb290LmlubmVySFRNTH0gaW5pdGlhbEJvZHlDbGFzcz17cGFnZVJvb3QuY2xhc3NOYW1lfS8+LCByZWFjdFJvb3QpO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgSGVhZGVyU2tpcExpbmsgPSAocHJvcHMpID0+IHtcblx0cmV0dXJuIChcblx0XHQ8YSBjbGFzc05hbWU9XCJza2lwLWxpbmsgc2NyZWVuLXJlYWRlci10ZXh0XCIgaHJlZj1cIiNjb250ZW50XCI+U2tpcCB0byBjb250ZW50PC9hPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlclNraXBMaW5rO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgUG9zdE5hdmlnYXRpb24gPSAocHJvcHMpID0+IHtcblxuXHQvLyB3b3JkcHJlc3Mga2VlcHMgdGhlIHJldHVybl9pbnN0ZWFkIHF1ZXJ5IHZhciBpbiB0aGUgbmF2LCBidXQgd2UgZG9uJ3Qgd2FudFxuXHQvLyB0byBsaW5rIHRvIHRoYXQuIFNvIHN0cmlwIHRoYXQgb3V0IVxuXHR2YXIgbmF2SFRNTG5vTGlua1F1ZXJ5U3RyaW5nID0gcHJvcHMuY29udGVudC5yZXBsYWNlKC9yZXR1cm5faW5zdGVhZFxcPXBvc3RzLWpzb24vZywgXCJcIik7XG5cdHZhciBuYXZpZ2F0aW9uX2h0bWwgPSB7X19odG1sOiBuYXZIVE1Mbm9MaW5rUXVlcnlTdHJpbmd9XG5cblx0cmV0dXJuIChcblx0XHQ8ZGl2IGNsYXNzTmFtZT1cInByZXYtbmV4dC1wb3N0c1wiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtuYXZpZ2F0aW9uX2h0bWx9IC8+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUG9zdE5hdmlnYXRpb247XG4iLCIvKipcbiAqIFdyYXBwZXIgY29tcG9uZW50IGZvciBSZWFjdCBBcHBsaWNhdGlvbiB3aGljaCBtYW5hZ2VzIHN0YXRlIHZpYSB0aGVcbiAqIHdvcmRwcmVzcyBVUkwuIFVzaW5nIHRoZSAncGFnZScgbGlicmFyeSBpbiBucG0gd2UgY2FuIGhpamFjayBub3JtYWwgbGlua1xuICogZXhlY3V0aW9uIGFuZCBpbnN0ZWFkIHVzZSB0aGUgZXZlbnQgdG8gZ2V0IHRoZSBuZXcgZGF0YSBmb3IgUmVhY3QgdG8gY29uc3VtZVxuICogYWxsIHRoZSB3aGlsZSB1cGRhdGluZyB0aGUgY3VycmVudCB1cmwgdXNpbmcgdGhlIEhpc3RvcnkgQVBJIHRvIG1ha2UgaXRcbiAqIGFwcGVhciB0aGF0IHlvdSBoYXZlIG1vdmVkIHRvIGEgbmV3IHBhZ2VcbiAqL1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCAncmVhY3QnICk7XG52YXIgdXJsUm91dGVyID0gcmVxdWlyZSggJ3BhZ2UnICk7XG52YXIgcmVxdWVzdCA9IHJlcXVpcmUoICdzdXBlcmFnZW50JyApO1xuXG52YXIgUGFnZSA9IHJlcXVpcmUoICcuL1BhZ2UuanN4JyApO1xuY2xhc3MgUm91dGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuXHRcdFx0aGFzU2VydmVyRGF0YTogZmFsc2UsXG5cdFx0XHRwb3N0czogW11cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogSGVscGVyIGZ1bmN0aW9uIHRvIGFkZCBRdWVyeSBTdHJpbmcgUGFyYW1ldGVyIHRvIGVuZCBvZiB1cmxcblx0ICpcblx0ICogQHJldHVybnMgcXVlcnlzdHJpbmcgd2l0aCBwYXJhbSBhcHBlbmRlZC5cblx0ICovXG5cdHN0YXRpYyB1cGRhdGVQYXRoV2l0aE5ld1F1ZXJ5KG5ld1BhcmFtLCBwYXRoLCBleGlzdGluZ1F1ZXJ5c3RyaW5nPScnKXtcblx0XHR2YXIgc2VwZXJhdG9yQXBlcnNhbmQgPSAnJztcblx0XHRpZiAoZXhpc3RpbmdRdWVyeXN0cmluZyl7XG5cdFx0XHRpZiAoZXhpc3RpbmdRdWVyeXN0cmluZy5pbmRleE9mKG5ld1BhcmFtKSAhPT0gLTEgKSB7XG5cdFx0XHRcdHJldHVybiBwYXRoICsgJz8nICsgZXhpc3RpbmdRdWVyeXN0cmluZztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNlcGVyYXRvckFwZXJzYW5kID0gJyYnO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcGF0aCArICc/JyArIGV4aXN0aW5nUXVlcnlzdHJpbmcgKyBzZXBlcmF0b3JBcGVyc2FuZCArIG5ld1BhcmFtO1xuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFx0dXJsUm91dGVyKCAnKicsIGZ1bmN0aW9uICggY3R4ICkge1xuXHRcdFx0dmFyIGRhdGFQYXRoID0gUm91dGVyLnVwZGF0ZVBhdGhXaXRoTmV3UXVlcnkoJ3JldHVybl9pbnN0ZWFkPXBvc3RzLWpzb24nLCBjdHgucGF0aG5hbWUsIGN0eC5xdWVyeXN0cmluZyk7XG5cdFx0XHRyZXF1ZXN0XG5cdFx0XHRcdC5nZXQoIGRhdGFQYXRoIClcblx0XHRcdFx0LmVuZCggZnVuY3Rpb24oIGVyciwgcmVzICkge1xuXHRcdFx0XHRcdGlmIChlcnIpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0dmFyIGRhdGEgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcblx0XHRcdFx0XHR9IGNhdGNoKGV4KSB7XG5cdFx0XHRcdFx0XHR1cmxSb3V0ZXIuc3RvcCgpO1xuXHRcdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSBjdHguY2Fub25pY2FsUGF0aDtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRzZWxmLnNldFN0YXRlKHtcblx0XHRcdFx0XHRcdGhhc1NlcnZlckRhdGE6IHRydWUsXG5cdFx0XHRcdFx0XHRwb3N0czogZGF0YS5wb3N0cyxcblx0XHRcdFx0XHRcdG1lbnU6IGRhdGEucHJpbWFyeV9tZW51LFxuXHRcdFx0XHRcdFx0cG9zdE5hdjogZGF0YS5wb3N0X25hdixcblx0XHRcdFx0XHRcdGJvZHlDbGFzczogZGF0YS5ib2R5X2NsYXNzLFxuXHRcdFx0XHRcdFx0dGVtcGxhdGU6IGRhdGEudGVtcGxhdGVcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcblx0XHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHR1cmxSb3V0ZXIoe1xuXHRcdFx0Ly8gUHJldmVudHMgdHJpZ2dlcmluZyByb3V0aW5nIG9uIHRoZSBpbml0aWFsIHBhZ2UgbG9hZFxuXHRcdFx0ZGlzcGF0Y2g6IGZhbHNlXG5cdFx0fSk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8UGFnZSBwb3N0cz17dGhpcy5zdGF0ZS5wb3N0c31cblx0XHRcdFx0XHRwYWdlQ2xhc3M9e3RoaXMuc3RhdGUuYm9keUNsYXNzfVxuXHRcdFx0XHRcdHRlbXBsYXRlPXt0aGlzLnN0YXRlLnRlbXBsYXRlfVxuXHRcdFx0XHRcdG1lbnU9e3RoaXMuc3RhdGUubWVudX1cblx0XHRcdFx0XHRwb3N0TmF2PXt0aGlzLnN0YXRlLnBvc3ROYXZ9XG5cdFx0XHRcdFx0aGFzU2VydmVyRGF0YT17dGhpcy5zdGF0ZS5oYXNTZXJ2ZXJEYXRhfVxuXHRcdFx0XHRcdGluaXRpYWxQYWdlPXt0aGlzLnByb3BzLmluaXRpYWxQYWdlfVxuXHRcdFx0XHRcdGluaXRpYWxQYWdlQ2xhc3M9e3RoaXMucHJvcHMuaW5pdGlhbEJvZHlDbGFzc30vPlxuXHRcdFx0KTtcblx0XHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUm91dGVyO1xuIl19
