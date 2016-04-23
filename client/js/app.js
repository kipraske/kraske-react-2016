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

},{"react":"react"}],5:[function(require,module,exports){
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
	var navigation_html = { __html: props.content };

	return React.createElement("nav", { className: "prev-next-posts", dangerouslySetInnerHTML: navigation_html });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvY29tcG9uZW50cy9QYWdlLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2NvbnRlbnQvbWVudS5qc3giLCJjbGllbnQvY29tcG9uZW50cy9jb250ZW50L25vbmUuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvY29udGVudC9yb2xsdXAuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvY29udGVudC9zaW5nbGUuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvZm9vdGVyLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2hlYWRlci5qc3giLCJjbGllbnQvY29tcG9uZW50cy9pbmRleC5qc3giLCJjbGllbnQvY29tcG9uZW50cy9taXNjL2hlYWRlci1za2lwLWxpbmsuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvbWlzYy9wb3N0LW5hdmlnYXRpb24uanN4IiwiY2xpZW50L2NvbXBvbmVudHMvcm91dGVyLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUNBQSxJQUFJLFFBQVEsUUFBUSxPQUFSLENBQVI7O0FBRUosSUFBSSxTQUFTLFFBQVEsY0FBUixDQUFUO0FBQ0osSUFBSSxpQkFBaUIsUUFBUSw2QkFBUixDQUFqQjtBQUNKLElBQUksU0FBUyxRQUFRLHNCQUFSLENBQVQ7QUFDSixJQUFJLFNBQVMsUUFBUSxzQkFBUixDQUFUO0FBQ0osSUFBSSxPQUFPLFFBQVEsb0JBQVIsQ0FBUDtBQUNKLElBQUksT0FBTyxRQUFRLG9CQUFSLENBQVA7QUFDSixJQUFJLFVBQVUsUUFBUSw0QkFBUixDQUFWO0FBQ0osSUFBSSxTQUFTLFFBQVEsY0FBUixDQUFUOzs7Ozs7OztJQU9FOzs7QUFFTCxVQUZLLElBRUwsQ0FBWSxLQUFaLEVBQWtCO3dCQUZiLE1BRWE7O3FFQUZiLGlCQUdFLFFBRFc7O0FBRWpCLFFBQUssS0FBTCxHQUFhO0FB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Tix5QkFBb0IsR0FBcEIsQ0FETTtLQUZQO0lBREQ7QUFPQSxVQUFPLE9BQU8sR0FBUCxHQUFhLG1CQUFiLEdBQW1DLGlCQUFuQyxHQUF1RCxRQUF2RCxDQVQ2RDs7OztRQWZoRTtFQUFlLE1BQU0sU0FBTjs7QUFnRnJCLE9BQU8sT0FBUCxHQUFpQixNQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgSGVhZGVyID0gcmVxdWlyZSgnLi9oZWFkZXIuanN4Jyk7XG52YXIgSGVhZGVyU2tpcExpbmsgPSByZXF1aXJlKCcuL21pc2MvaGVhZGVyLXNraXAtbGluay5qc3gnKTtcbnZhciBSb2xsdXAgPSByZXF1aXJlKCcuL2NvbnRlbnQvcm9sbHVwLmpzeCcpO1xudmFyIFNpbmdsZSA9IHJlcXVpcmUoJy4vY29udGVudC9zaW5nbGUuanN4Jyk7XG52YXIgTm9uZSA9IHJlcXVpcmUoJy4vY29udGVudC9ub25lLmpzeCcpO1xudmFyIE1lbnUgPSByZXF1aXJlKCcuL2NvbnRlbnQvbWVudS5qc3gnKTtcbnZhciBQb3N0TmF2ID0gcmVxdWlyZSgnLi9taXNjL3Bvc3QtbmF2aWdhdGlvbi5qc3gnKTtcbnZhciBGb290ZXIgPSByZXF1aXJlKCcuL2Zvb3Rlci5qc3gnKTtcblxuLyoqXG4gKiBNYWluIFBhZ2UgQ29tcG9uZW50XG4gKlxuICogQWxzbyBjb250cm9scyB0aGUgZmFuY3kgY29sb3IgdG9nZ2xlIG9uIHBhZ2UgZWxlbWVudHNcbiAqL1xuY2xhc3MgUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnN0YXRlID0ge1xuXHRcdFx0Y29sb3JQYWxldHRlOiAnY29sb3ItcGFsZXR0ZS0xJyxcblx0XHRcdHBhZ2VDbGFzczogJydcblx0XHR9XG5cdH1cblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XG5cdFx0dmFyIHBhZ2VDbGFzcyA9IG5leHRQcm9wcy5wYWdlQ2xhc3M7XG5cdFx0dmFyIG5ld1BhbGV0dGVDbGFzcyA9IHBhZ2VDbGFzcy5tYXRjaCgvY29sb3ItcGFsZXR0ZS1cXGQvKVswXTtcblx0XHR2YXIgbmV3Q2xhc3NMaXN0ID0gcGFnZUNsYXNzLnJlcGxhY2UoL1xccz9jb2xvci1wYWxldHRlLVxcZC9nLCAnJyk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7Y29sb3JQYWxldHRlOiBuZXdQYWxldHRlQ2xhc3N9KTtcblx0XHR0aGlzLnNldFN0YXRlKHtwYWdlQ2xhc3M6IG5ld0NsYXNzTGlzdH0pO1xuXHR9XG5cblx0Y29tcG9uZW50RGlkVXBkYXRlKCl7XG5cdFx0Ly8gVXNpbmcgcmVxdWVzdCBhbmltYXRpb24gRnJhbWUgdG8gZW5zdXJlIHRoYXQgZWFjaCBmdW5jdGlvbiBpcyBwYWludGVkXG5cdFx0Ly8gYmVmb3JlIHRoZSBuZXh0IGZ1bmN0aW9uIGJlZ2lucyB0byBmaXJlXG5cdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSggKCkgPT4ge1xuXHRcdFx0dGhpcy5jbGVhclBhbGV0dGUoKTtcblx0XHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoICgpID0+IHtcblx0XHRcdFx0dGhpcy5hcHBseVBhbGV0dGUoKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0Y2xlYXJQYWxldHRlKCl7XG5cdFx0dGhpcy5yZWZzLnBhZ2VDb250YWluZXIuY2xhc3NOYW1lID0gdGhpcy5zdGF0ZS5wYWdlQ2xhc3MgKyAnICcgKyAnY29sb3ItcGFsZXR0ZS10cmFuc2l0aW9uJztcblx0fVxuXG5cdGFwcGx5UGFsZXR0ZSgpe1xuXHRcdHRoaXMucmVmcy5wYWdlQ29udGFpbmVyLmNsYXNzTmFtZSA9IHRoaXMuc3RhdGUucGFnZUNsYXNzICsgJyAnICsgdGhpcy5zdGF0ZS5jb2xvclBhbGV0dGU7XG5cdH1cblxuXHRyZW5kZXIoKXtcblxuXHRcdC8vIElmIHdlIHBhc3NlZCBpbiBpbnRpYWwgcGFnZSBodG1sIGluc3RlYWQgb2YgYSBwb3N0IG9iamVjdCByZW5kZXJcblx0XHQvLyB0aGF0IGluc3RlYWQgb2YgdGhlIFwicmVhbFwiIHJlYWN0IGFwcFxuXHRcdGlmICghdGhpcy5wcm9wcy5oYXNTZXJ2ZXJEYXRhKXtcblx0XHRcdHZhciBpbnRpYWxQYWdlSFRNTCA9IHtfX2h0bWw6IHRoaXMucHJvcHMuaW5pdGlhbFBhZ2V9O1xuXHRcdFx0cmV0dXJuIDxkaXYgaWQ9XCJwYWdlXCIgcmVmPVwicGFnZUNvbnRhaW5lclwiIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5pbml0aWFsUGFnZUNsYXNzfSBkYW5nZXJvdXNseVNldElubmVySFRNTD17aW50aWFsUGFnZUhUTUx9IC8+XG5cdFx0fVxuXG5cdFx0Ly8gVGhpcyBpcyB0aGUgbm9ybWFsIHBvc3QtcmVuZGVyZXIgcmVhY3QgYXBwc1xuXHRcdHZhciBudW1iZXJPZlBvc3RzID0gdGhpcy5wcm9wcy5wb3N0cy5sZW5ndGg7XG5cdFx0dmFyIGNvbnRlbnRFbGVtZW50O1xuXHRcdHZhciBjb250ZW50SGVhZGVyO1xuXHRcdHZhciBwb3N0TmF2O1xuXG5cdFx0aWYgKHRoaXMucHJvcHMucG9zdHMubGVuZ3RoID09PSAwKXtcblx0XHRcdGNvbnRlbnRFbGVtZW50ID0gPE5vbmUgLz47XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN3aXRjaCAodGhpcy5wcm9wcy50ZW1wbGF0ZS50eXBlKXtcblx0XHRcdFx0Y2FzZSAnbWVudSc6XG5cdFx0XHRcdFx0Y29udGVudEhlYWRlciA9IDxoMSBjbGFzc05hbWU9XCJyb2xsdXAtdGl0bGVcIj57dGhpcy5wcm9wcy50ZW1wbGF0ZS50aXRsZX08L2gxPjtcblx0XHRcdFx0XHRjb250ZW50RWxlbWVudCA9IDxNZW51IG1lbnVJdGVtcz17dGhpcy5wcm9wcy5tZW51fS8+O1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdyb2xsdXAnOlxuXHRcdFx0XHRcdGNvbnRlbnRIZWFkZXIgPSA8aDEgY2xhc3NOYW1lPVwicm9sbHVwLXRpdGxlXCI+e3RoaXMucHJvcHMudGVtcGxhdGUudGl0bGV9PC9oMT47XG5cdFx0XHRcdFx0Y29udGVudEVsZW1lbnQgPSBbXTtcblx0XHRcdFx0XHRmb3IgKGxldCBwb3N0IG9mIHRoaXMucHJvcHMucG9zdHMpe1xuXHRcdFx0XHRcdFx0Y29udGVudEVsZW1lbnQucHVzaCg8Um9sbHVwIHBvc3Q9e3Bvc3R9IGtleT17cG9zdC5pZH0vPik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHBvc3ROYXYgPSA8UG9zdE5hdiBjb250ZW50PXt0aGlzLnByb3BzLnBvc3ROYXZ9IC8+XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ3NpbmdsZSc6XG5cdFx0XHRcdFx0bGV0IHBvc3QgPSB0aGlzLnByb3BzLnBvc3RzWzBdO1xuXHRcdFx0XHRcdGNvbnRlbnRFbGVtZW50ID0gPFNpbmdsZSBwb3N0PXtwb3N0fS8+O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGlkPVwicGFnZVwiIHJlZj1cInBhZ2VDb250YWluZXJcIiBjbGFzc05hbWU9e3RoaXMuc3RhdGUucGFnZUNsYXNzfT5cblx0XHRcdFx0PEhlYWRlclNraXBMaW5rIC8+XG5cdFx0XHRcdDxIZWFkZXIgLz5cblx0XHRcdFx0PG1haW4gaWQ9XCJjb250ZW50XCIgY2xhc3NOYW1lPVwic2l0ZS1jb250ZW50XCI+XG5cdFx0XHRcdFx0e2NvbnRlbnRIZWFkZXJ9XG5cdFx0XHRcdFx0e2NvbnRlbnRFbGVtZW50fVxuXHRcdFx0XHRcdHtwb3N0TmF2fVxuXHRcdFx0XHQ8L21haW4+XG5cdFx0XHRcdDxGb290ZXIgLz5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgTWVudSA9IChwcm9wcykgPT4ge1xuXG5cdHZhciBtZW51SXRlbUhUTUwgPXtfX2h0bWw6cHJvcHMubWVudUl0ZW1zfTtcblxuXHRyZXR1cm4gKFxuXHRcdDxuYXYgaWQ9XCJzaXRlLW5hdmlnYXRpb25cIiBjbGFzc05hbWU9XCJtYWluLW5hdmlnYXRpb25cIiByb2xlPVwibmF2aWdhdGlvblwiPlxuXHRcdFx0PGZvcm0gcm9sZT1cInNlYXJjaFwiIG1ldGhvZD1cImdldFwiIGNsYXNzTmFtZT1cInNlYXJjaC1mb3JtXCIgYWN0aW9uPVwiaHR0cDovL2xvY2FsLnJlYWN0LmRldi9cIj5cblx0XHRcdFx0PGxhYmVsPlxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJzY3JlZW4tcmVhZGVyLXRleHRcIj5TZWFyY2ggZm9yOjwvc3Bhbj5cblx0XHRcdFx0PGlucHV0IHR5cGU9XCJzZWFyY2hcIiBjbGFzc05hbWU9XCJzZWFyY2gtZmllbGRcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCDigKZcIiBuYW1lPVwic1wiIC8+XG5cdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHQ8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzc05hbWU9XCJzZWFyY2gtc3VibWl0XCI+8J+UjjwvYnV0dG9uPlxuXHRcdFx0PC9mb3JtPlxuXHRcdFx0PGRpdiBkYW5nZXJvdXNseVNldElubmVySFRNTD17bWVudUl0ZW1IVE1MfSAvPlxuXHRcdDwvbmF2PlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1lbnU7XG4iLCIvLyBUT0RPIC0gbmVlZCB0aGlzIHRlbXBsYXRlIGZsZXNoZWQgb3V0IHRvb1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBOb25lID0gKHByb3BzKSA9PiB7XG5cdHJldHVybiAoXG5cdFx0PHNlY3Rpb24gY2xhc3NOYW1lPVwibm8tcmVzdWx0cyBub3QtZm91bmRcIj5cblx0XHRcdDxoZWFkZXIgY2xhc3NOYW1lPVwicGFnZS1oZWFkZXJcIj5cblx0XHRcdFx0PGgxIGNsYXNzTmFtZT1cInBhZ2UtdGl0bGVcIj4gTm90aGluZyBGb3VuZCA8L2gxPlxuXHRcdFx0PC9oZWFkZXI+XG5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFnZS1jb250ZW50XCI+XG5cdFx0XHRcdCoqIFRIRVJFIElTTidUIEFOWSBQT1NUUyBkbyB5b3Ugd2FudCB0byBzZWFyY2g/ICoqXG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L3NlY3Rpb24+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTm9uZTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IFJvbGx1cCA9IChwcm9wcykgPT4ge1xuXHQvLyB3cGF1dG9wLi4uXG5cdHZhciBleGNlcnB0SFRNTCA9IHtfX2h0bWw6ICc8cD4nICsgcHJvcHMucG9zdC5leGNlcnB0ICsgJzwvcD4nfTtcblxuXHR2YXIgcG9zdGVkT247XG5cdGlmIChwcm9wcy5wb3N0LnBvc3RfdHlwZSA9PT0gJ3Bvc3QnKXtcblx0XHR2YXIgcG9zdGVkT25IVE1MID0ge19faHRtbDogcHJvcHMucG9zdC50ZW1wbGF0ZV90YWdzLnBvc3RlZF9vbn07XG5cdFx0cG9zdGVkT24gPSAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImVudHJ5LW1ldGFcIiBkYW5nZXJvdXNseVNldElubmVySFRNTD17cG9zdGVkT25IVE1MfSA+PC9kaXY+XG5cdFx0KVxuXHR9XG5cblx0dmFyIGljb25IVE1MID0ge19faHRtbDogcHJvcHMucG9zdC50ZW1wbGF0ZV90YWdzLmNhdGVnb3J5Lmljb259O1xuXG5cdHZhciBhcnRpY2xlQ2xhc3MgPSBwcm9wcy5wb3N0LmNzc19jbGFzcyArICcgcm9sbHVwLWl0ZW0nO1xuXG5cdHJldHVybiAoXG5cdFx0PGFydGljbGUgaWQ9e3Byb3BzLnBvc3QuaWR9IGNsYXNzTmFtZT17YXJ0aWNsZUNsYXNzfT5cblx0XHRcdDxoZWFkZXIgY2xhc3NOQW1lPVwiZW50cnktaGVhZGVyXCI+XG5cdFx0XHRcdDxoMiBjbGFzc05hbWU9XCJlbnRyeS10aXRsZVwiPjxhIGhyZWY9e3Byb3BzLnBvc3QucGVybWFsaW5rfT57cHJvcHMucG9zdC50aXRsZX08L2E+PC9oMj5cblx0XHRcdFx0e3Bvc3RlZE9ufVxuXHRcdFx0PC9oZWFkZXI+XG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImVudHJ5LWNhdC1pY29uXCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e2ljb25IVE1MfT48L2Rpdj5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZW50cnktc3VtbWFyeVwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtleGNlcnB0SFRNTH0+PC9kaXY+XG5cdFx0PC9hcnRpY2xlPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJvbGx1cDtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IFNpbmdsZSA9IChwcm9wcykgPT4ge1xuXHR2YXIgY29udGVudEhUTUwgPSB7X19odG1sOiBwcm9wcy5wb3N0LmNvbnRlbnR9O1xuXHR2YXIgcG9zdGVkT247XG5cdGlmIChwcm9wcy5wb3N0LnBvc3RfdHlwZSA9PT0gJ3Bvc3QnKXtcblx0XHR2YXIgcG9zdGVkT25IVE1MID0ge19faHRtbDogcHJvcHMucG9zdC50ZW1wbGF0ZV90YWdzLnBvc3RlZF9vbn07XG5cdFx0cG9zdGVkT24gPSAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImVudHJ5LW1ldGFcIiBkYW5nZXJvdXNseVNldElubmVySFRNTD17cG9zdGVkT25IVE1MfSA+PC9kaXY+XG5cdFx0KVxuXHR9XG5cblx0cmV0dXJuIChcblx0XHQ8YXJ0aWNsZSBpZD17cHJvcHMucG9zdC5pZH0gY2xhc3NOYW1lPXtwcm9wcy5wb3N0LmNzc19jbGFzc30+XG5cdFx0XHQ8aGVhZGVyIGNsYXNzTkFtZT1cImVudHJ5LWhlYWRlclwiPlxuXHRcdFx0XHQ8aDEgY2xhc3NOYW1lPVwiZW50cnktdGl0bGVcIj57cHJvcHMucG9zdC50aXRsZX08L2gxPlxuXHRcdFx0XHR7cG9zdGVkT259XG5cdFx0XHQ8L2hlYWRlcj5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZW50cnktY29udGVudFwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtjb250ZW50SFRNTH0+PC9kaXY+XG5cdFx0PC9hcnRpY2xlPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNpbmdsZTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IEZvb3RlciA9IChwcm9wcykgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdDxmb290ZXIgaWQ9XCJjb2xvcGhvblwiIGNsYXNzTmFtZT1cInNpdGUtZm9vdGVyXCIgcm9sZT1cImNvbnRlbnRpbmZvXCI+XG5cdFx0PGRpdiBjbGFzc05hbWU9XCJzaXRlLWluZm9cIj5cblx0XHRcdENvcHlyaWdodCDCqSBLcmlzdG9mZXIgUmFza2UgMjAxNiBTLkQuRy4gUG93ZXJlZCBieSA8YSBocmVmPVwiaHR0cHM6Ly93b3JkcHJlc3Mub3JnL1wiPiBXb3JkcHJlc3MgPC9hPiBhbmQgPGEgaHJlZj1cImh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L1wiPiBSZWFjdC5qcyA8L2E+XG5cdFx0PC9kaXY+XG5cdFx0PC9mb290ZXI+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRm9vdGVyO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgSGVhZGVyID0gKHByb3BzKSA9PiB7XG5cdHJldHVybiAoXG5cdFx0PGhlYWRlciBpZD1cIm1hc3RoZWFkXCIgY2xhc3NOYW1lPVwic2l0ZS1oZWFkZXJcIiByb2xlPVwiYmFubmVyXCI+XG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNpdGUtbG9nb1wiPlxuXHRcdFx0PGEgaHJlZj1cIi9tZW51XCIgcmVsPVwiaG9tZVwiPlxuXHRcdFx0XHQ8aW1nIHNyYz1cIi93cC1jb250ZW50L3RoZW1lcy9rcmFza2UtcmVhY3QtMjAxNi9jbGllbnQvc3RhdGljL2Fzc2V0cy9zaXRlLWxvZ28ucG5nXCIgYWx0PVwiU2l0ZSBMb2dvXCIgLz5cblx0XHRcdDwvYT5cblx0XHRcdDwvZGl2PlxuXHRcdDwvaGVhZGVyPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlcjtcbiIsIi8qKlxuICogTWFpbiBlbnRyeSBwb2ludCBmb3IgcmVhY3QgY29tcG9uZW50c1xuICovXG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoICdyZWFjdCcgKTtcbnZhciBSZWFjdERPTSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xudmFyIFJvdXRlciA9IHJlcXVpcmUoICcuL3JvdXRlci5qc3gnICk7XG5cbnZhciByZWFjdFJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2FwcC1yb290JyApO1xudmFyIHBhZ2VSb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdwYWdlJyApO1xuUmVhY3RET00ucmVuZGVyKDxSb3V0ZXIgaW5pdGlhbFBhZ2U9e3BhZ2VSb290LmlubmVySFRNTH0gaW5pdGlhbEJvZHlDbGFzcz17cGFnZVJvb3QuY2xhc3NOYW1lfS8+LCByZWFjdFJvb3QpO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgSGVhZGVyU2tpcExpbmsgPSAocHJvcHMpID0+IHtcblx0cmV0dXJuIChcblx0XHQ8YSBjbGFzc05hbWU9XCJza2lwLWxpbmsgc2NyZWVuLXJlYWRlci10ZXh0XCIgaHJlZj1cIiNjb250ZW50XCI+U2tpcCB0byBjb250ZW50PC9hPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlclNraXBMaW5rO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgUG9zdE5hdmlnYXRpb24gPSAocHJvcHMpID0+IHtcblx0dmFyIG5hdmlnYXRpb25faHRtbCA9IHtfX2h0bWw6cHJvcHMuY29udGVudH1cblxuXHRyZXR1cm4gKFxuXHRcdDxuYXYgY2xhc3NOYW1lPVwicHJldi1uZXh0LXBvc3RzXCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e25hdmlnYXRpb25faHRtbH0gLz5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQb3N0TmF2aWdhdGlvbjtcbiIsIi8qKlxuICogV3JhcHBlciBjb21wb25lbnQgZm9yIFJlYWN0IEFwcGxpY2F0aW9uIHdoaWNoIG1hbmFnZXMgc3RhdGUgdmlhIHRoZVxuICogd29yZHByZXNzIFVSTC4gVXNpbmcgdGhlICdwYWdlJyBsaWJyYXJ5IGluIG5wbSB3ZSBjYW4gaGlqYWNrIG5vcm1hbCBsaW5rXG4gKiBleGVjdXRpb24gYW5kIGluc3RlYWQgdXNlIHRoZSBldmVudCB0byBnZXQgdGhlIG5ldyBkYXRhIGZvciBSZWFjdCB0byBjb25zdW1lXG4gKiBhbGwgdGhlIHdoaWxlIHVwZGF0aW5nIHRoZSBjdXJyZW50IHVybCB1c2luZyB0aGUgSGlzdG9yeSBBUEkgdG8gbWFrZSBpdFxuICogYXBwZWFyIHRoYXQgeW91IGhhdmUgbW92ZWQgdG8gYSBuZXcgcGFnZVxuICovXG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoICdyZWFjdCcgKTtcbnZhciB1cmxSb3V0ZXIgPSByZXF1aXJlKCAncGFnZScgKTtcbnZhciByZXF1ZXN0ID0gcmVxdWlyZSggJ3N1cGVyYWdlbnQnICk7XG5cbnZhciBQYWdlID0gcmVxdWlyZSggJy4vUGFnZS5qc3gnICk7XG5jbGFzcyBSb3V0ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG5cdFx0XHRoYXNTZXJ2ZXJEYXRhOiBmYWxzZSxcblx0XHRcdHBvc3RzOiBbXVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBIZWxwZXIgZnVuY3Rpb24gdG8gYWRkIFF1ZXJ5IFN0cmluZyBQYXJhbWV0ZXIgdG8gZW5kIG9mIHVybFxuXHQgKlxuXHQgKiBAcmV0dXJucyBxdWVyeXN0cmluZyB3aXRoIHBhcmFtIGFwcGVuZGVkLlxuXHQgKi9cblx0c3RhdGljIHVwZGF0ZVBhdGhXaXRoTmV3UXVlcnkobmV3UGFyYW0sIHBhdGgsIGV4aXN0aW5nUXVlcnlzdHJpbmc9Jycpe1xuXHRcdHZhciBzZXBlcmF0b3JBcGVyc2FuZCA9ICcnO1xuXHRcdGlmIChleGlzdGluZ1F1ZXJ5c3RyaW5nKXtcblx0XHRcdGlmIChleGlzdGluZ1F1ZXJ5c3RyaW5nLmluZGV4T2YobmV3UGFyYW0pICE9PSAtMSApIHtcblx0XHRcdFx0cmV0dXJuIHBhdGggKyAnPycgKyBleGlzdGluZ1F1ZXJ5c3RyaW5nO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2VwZXJhdG9yQXBlcnNhbmQgPSAnJic7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwYXRoICsgJz8nICsgZXhpc3RpbmdRdWVyeXN0cmluZyArIHNlcGVyYXRvckFwZXJzYW5kICsgbmV3UGFyYW07XG5cdH1cblxuXHRjb21wb25lbnREaWRNb3VudCgpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHR1cmxSb3V0ZXIoICcqJywgZnVuY3Rpb24gKCBjdHggKSB7XG5cdFx0XHR2YXIgZGF0YVBhdGggPSBSb3V0ZXIudXBkYXRlUGF0aFdpdGhOZXdRdWVyeSgncmV0dXJuX2luc3RlYWQ9cG9zdHMtanNvbicsIGN0eC5wYXRobmFtZSwgY3R4LnF1ZXJ5c3RyaW5nKTtcblx0XHRcdHJlcXVlc3Rcblx0XHRcdFx0LmdldCggZGF0YVBhdGggKVxuXHRcdFx0XHQuZW5kKCBmdW5jdGlvbiggZXJyLCByZXMgKSB7XG5cdFx0XHRcdFx0aWYgKGVycikge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnIpO1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHR2YXIgZGF0YSA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuXHRcdFx0XHRcdH0gY2F0Y2goZXgpIHtcblx0XHRcdFx0XHRcdHVybFJvdXRlci5zdG9wKCk7XG5cdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGN0eC5jYW5vbmljYWxQYXRoO1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHNlbGYuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdFx0aGFzU2VydmVyRGF0YTogdHJ1ZSxcblx0XHRcdFx0XHRcdHBvc3RzOiBkYXRhLnBvc3RzLFxuXHRcdFx0XHRcdFx0bWVudTogZGF0YS5wcmltYXJ5X21lbnUsXG5cdFx0XHRcdFx0XHRwb3N0TmF2OiBkYXRhLnBvc3RfbmF2LFxuXHRcdFx0XHRcdFx0Ym9keUNsYXNzOiBkYXRhLmJvZHlfY2xhc3MsXG5cdFx0XHRcdFx0XHR0ZW1wbGF0ZTogZGF0YS50ZW1wbGF0ZVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdHVybFJvdXRlcih7XG5cdFx0XHQvLyBQcmV2ZW50cyB0cmlnZ2VyaW5nIHJvdXRpbmcgb24gdGhlIGluaXRpYWwgcGFnZSBsb2FkXG5cdFx0XHRkaXNwYXRjaDogZmFsc2Vcblx0XHR9KTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxQYWdlIHBvc3RzPXt0aGlzLnN0YXRlLnBvc3RzfVxuXHRcdFx0XHRcdHBhZ2VDbGFzcz17dGhpcy5zdGF0ZS5ib2R5Q2xhc3N9XG5cdFx0XHRcdFx0dGVtcGxhdGU9e3RoaXMuc3RhdGUudGVtcGxhdGV9XG5cdFx0XHRcdFx0bWVudT17dGhpcy5zdGF0ZS5tZW51fVxuXHRcdFx0XHRcdHBvc3ROYXY9e3RoaXMuc3RhdGUucG9zdE5hdn1cblx0XHRcdFx0XHRoYXNTZXJ2ZXJEYXRhPXt0aGlzLnN0YXRlLmhhc1NlcnZlckRhdGF9XG5cdFx0XHRcdFx0aW5pdGlhbFBhZ2U9e3RoaXMucHJvcHMuaW5pdGlhbFBhZ2V9XG5cdFx0XHRcdFx0aW5pdGlhbFBhZ2VDbGFzcz17dGhpcy5wcm9wcy5pbml0aWFsQm9keUNsYXNzfS8+XG5cdFx0XHQpO1xuXHRcdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSb3V0ZXI7XG4iXX0=
