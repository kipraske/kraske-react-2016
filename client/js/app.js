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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvY29tcG9uZW50cy9QYWdlLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2NvbnRlbnQvbWVudS5qc3giLCJjbGllbnQvY29tcG9uZW50cy9jb250ZW50L25vbmUuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvY29udGVudC9yb2xsdXAuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvY29udGVudC9zaW5nbGUuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvZm9vdGVyLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2hlYWRlci5qc3giLCJjbGllbnQvY29tcG9uZW50cy9pbmRleC5qc3giLCJjbGllbnQvY29tcG9uZW50cy9taXNjL2hlYWRlci1za2lwLWxpbmsuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvbWlzYy9wb3N0LW5hdmlnYXRpb24uanN4IiwiY2xpZW50L2NvbXBvbmVudHMvcm91dGVyLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUNBQSxJQUFJLFFBQVEsUUFBUSxPQUFSLENBQVI7O0FBRUosSUFBSSxTQUFTLFFBQVEsY0FBUixDQUFUO0FBQ0osSUFBSSxpQkFBaUIsUUFBUSw2QkFBUixDQUFqQjtBQUNKLElBQUksU0FBUyxRQUFRLHNCQUFSLENBQVQ7QUFDSixJQUFJLFNBQVMsUUFBUSxzQkFBUixDQUFUO0FBQ0osSUFBSSxPQUFPLFFBQVEsb0JBQVIsQ0FBUDtBQUNKLElBQUksT0FBTyxRQUFRLG9CQUFSLENBQVA7QUFDSixJQUFJLFVBQVUsUUFBUSw0QkFBUixDQUFWO0FBQ0osSUFBSSxTQUFTLFFBQVEsY0FBUixDQUFUOzs7Ozs7OztJQU9FOzs7QUFFTCxVQUZLLElBRUwsQ0FBWSxLQUFaLEVBQWtCO3dCQUZiLE1BRWE7O3FFQUZiLGlCQUdFLFFBRFc7O0FBRWpCLFFBQUssS0FBTCxHQUFhO0FB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LE1BQTBDLENBQUMsQ0FBRCxFQUFLO0FBQ2xELFlBQU8sT0FBTyxHQUFQLEdBQWEsbUJBQWIsQ0FEMkM7S0FBbkQsTUFFTztBQUNOLHlCQUFvQixHQUFwQixDQURNO0tBRlA7SUFERDtBQU9BLFVBQU8sT0FBTyxHQUFQLEdBQWEsbUJBQWIsR0FBbUMsaUJBQW5DLEdBQXVELFFBQXZELENBVDZEOzs7O1FBZmhFO0VBQWUsTUFBTSxTQUFOOztBQWdGckIsT0FBTyxPQUFQLEdBQWlCLE1BQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBIZWFkZXIgPSByZXF1aXJlKCcuL2hlYWRlci5qc3gnKTtcbnZhciBIZWFkZXJTa2lwTGluayA9IHJlcXVpcmUoJy4vbWlzYy9oZWFkZXItc2tpcC1saW5rLmpzeCcpO1xudmFyIFJvbGx1cCA9IHJlcXVpcmUoJy4vY29udGVudC9yb2xsdXAuanN4Jyk7XG52YXIgU2luZ2xlID0gcmVxdWlyZSgnLi9jb250ZW50L3NpbmdsZS5qc3gnKTtcbnZhciBOb25lID0gcmVxdWlyZSgnLi9jb250ZW50L25vbmUuanN4Jyk7XG52YXIgTWVudSA9IHJlcXVpcmUoJy4vY29udGVudC9tZW51LmpzeCcpO1xudmFyIFBvc3ROYXYgPSByZXF1aXJlKCcuL21pc2MvcG9zdC1uYXZpZ2F0aW9uLmpzeCcpO1xudmFyIEZvb3RlciA9IHJlcXVpcmUoJy4vZm9vdGVyLmpzeCcpO1xuXG4vKipcbiAqIE1haW4gUGFnZSBDb21wb25lbnRcbiAqXG4gKiBBbHNvIGNvbnRyb2xzIHRoZSBmYW5jeSBjb2xvciB0b2dnbGUgb24gcGFnZSBlbGVtZW50c1xuICovXG5jbGFzcyBQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuc3RhdGUgPSB7XG5cdFx0XHRjb2xvclBhbGV0dGU6ICdjb2xvci1wYWxldHRlLTEnLFxuXHRcdFx0cGFnZUNsYXNzOiAnJ1xuXHRcdH1cblx0fVxuXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXtcblx0XHR2YXIgcGFnZUNsYXNzID0gbmV4dFByb3BzLnBhZ2VDbGFzcztcblx0XHR2YXIgbmV3UGFsZXR0ZUNsYXNzID0gcGFnZUNsYXNzLm1hdGNoKC9jb2xvci1wYWxldHRlLVxcZC8pWzBdO1xuXHRcdHZhciBuZXdDbGFzc0xpc3QgPSBwYWdlQ2xhc3MucmVwbGFjZSgvXFxzP2NvbG9yLXBhbGV0dGUtXFxkL2csICcnKTtcblx0XHR0aGlzLnNldFN0YXRlKHtjb2xvclBhbGV0dGU6IG5ld1BhbGV0dGVDbGFzc30pO1xuXHRcdHRoaXMuc2V0U3RhdGUoe3BhZ2VDbGFzczogbmV3Q2xhc3NMaXN0fSk7XG5cdH1cblxuXHRjb21wb25lbnREaWRVcGRhdGUoKXtcblx0XHQvLyBVc2luZyByZXF1ZXN0IGFuaW1hdGlvbiBGcmFtZSB0byBlbnN1cmUgdGhhdCBlYWNoIGZ1bmN0aW9uIGlzIHBhaW50ZWRcblx0XHQvLyBiZWZvcmUgdGhlIG5leHQgZnVuY3Rpb24gYmVnaW5zIHRvIGZpcmVcblx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCAoKSA9PiB7XG5cdFx0XHR0aGlzLmNsZWFyUGFsZXR0ZSgpO1xuXHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSggKCkgPT4ge1xuXHRcdFx0XHR0aGlzLmFwcGx5UGFsZXR0ZSgpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRjbGVhclBhbGV0dGUoKXtcblx0XHR0aGlzLnJlZnMucGFnZUNvbnRhaW5lci5jbGFzc05hbWUgPSB0aGlzLnN0YXRlLnBhZ2VDbGFzcyArICcgJyArICdjb2xvci1wYWxldHRlLXRyYW5zaXRpb24nO1xuXHR9XG5cblx0YXBwbHlQYWxldHRlKCl7XG5cdFx0dGhpcy5yZWZzLnBhZ2VDb250YWluZXIuY2xhc3NOYW1lID0gdGhpcy5zdGF0ZS5wYWdlQ2xhc3MgKyAnICcgKyB0aGlzLnN0YXRlLmNvbG9yUGFsZXR0ZTtcblx0fVxuXG5cdHJlbmRlcigpe1xuXG5cdFx0Ly8gSWYgd2UgcGFzc2VkIGluIGludGlhbCBwYWdlIGh0bWwgaW5zdGVhZCBvZiBhIHBvc3Qgb2JqZWN0IHJlbmRlclxuXHRcdC8vIHRoYXQgaW5zdGVhZCBvZiB0aGUgXCJyZWFsXCIgcmVhY3QgYXBwXG5cdFx0aWYgKCF0aGlzLnByb3BzLmhhc1NlcnZlckRhdGEpe1xuXHRcdFx0dmFyIGludGlhbFBhZ2VIVE1MID0ge19faHRtbDogdGhpcy5wcm9wcy5pbml0aWFsUGFnZX07XG5cdFx0XHRyZXR1cm4gPGRpdiBpZD1cInBhZ2VcIiByZWY9XCJwYWdlQ29udGFpbmVyXCIgY2xhc3NOYW1lPXt0aGlzLnByb3BzLmluaXRpYWxQYWdlQ2xhc3N9IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtpbnRpYWxQYWdlSFRNTH0gLz5cblx0XHR9XG5cblx0XHQvLyBUaGlzIGlzIHRoZSBub3JtYWwgcG9zdC1yZW5kZXJlciByZWFjdCBhcHBzXG5cdFx0dmFyIG51bWJlck9mUG9zdHMgPSB0aGlzLnByb3BzLnBvc3RzLmxlbmd0aDtcblx0XHR2YXIgY29udGVudEVsZW1lbnQ7XG5cdFx0dmFyIGNvbnRlbnRIZWFkZXI7XG5cdFx0dmFyIHBvc3ROYXY7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5wb3N0cy5sZW5ndGggPT09IDApe1xuXHRcdFx0Y29udGVudEVsZW1lbnQgPSA8Tm9uZSAvPjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3dpdGNoICh0aGlzLnByb3BzLnRlbXBsYXRlLnR5cGUpe1xuXHRcdFx0XHRjYXNlICdtZW51Jzpcblx0XHRcdFx0XHRjb250ZW50SGVhZGVyID0gPGgxIGNsYXNzTmFtZT1cInJvbGx1cC10aXRsZVwiPnt0aGlzLnByb3BzLnRlbXBsYXRlLnRpdGxlfTwvaDE+O1xuXHRcdFx0XHRcdGNvbnRlbnRFbGVtZW50ID0gPE1lbnUgbWVudUl0ZW1zPXt0aGlzLnByb3BzLm1lbnV9Lz47XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ3JvbGx1cCc6XG5cdFx0XHRcdFx0Y29udGVudEhlYWRlciA9IDxoMSBjbGFzc05hbWU9XCJyb2xsdXAtdGl0bGVcIj57dGhpcy5wcm9wcy50ZW1wbGF0ZS50aXRsZX08L2gxPjtcblx0XHRcdFx0XHRjb250ZW50RWxlbWVudCA9IFtdO1xuXHRcdFx0XHRcdGZvciAobGV0IHBvc3Qgb2YgdGhpcy5wcm9wcy5wb3N0cyl7XG5cdFx0XHRcdFx0XHRjb250ZW50RWxlbWVudC5wdXNoKDxSb2xsdXAgcG9zdD17cG9zdH0ga2V5PXtwb3N0LmlkfS8+KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cG9zdE5hdiA9IDxQb3N0TmF2IGNvbnRlbnQ9e3RoaXMucHJvcHMucG9zdE5hdn0gLz5cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnc2luZ2xlJzpcblx0XHRcdFx0XHRsZXQgcG9zdCA9IHRoaXMucHJvcHMucG9zdHNbMF07XG5cdFx0XHRcdFx0Y29udGVudEVsZW1lbnQgPSA8U2luZ2xlIHBvc3Q9e3Bvc3R9Lz47XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgaWQ9XCJwYWdlXCIgcmVmPVwicGFnZUNvbnRhaW5lclwiIGNsYXNzTmFtZT17dGhpcy5zdGF0ZS5wYWdlQ2xhc3N9PlxuXHRcdFx0XHQ8SGVhZGVyU2tpcExpbmsgLz5cblx0XHRcdFx0PEhlYWRlciAvPlxuXHRcdFx0XHQ8bWFpbiBpZD1cImNvbnRlbnRcIiBjbGFzc05hbWU9XCJzaXRlLWNvbnRlbnRcIj5cblx0XHRcdFx0XHR7Y29udGVudEhlYWRlcn1cblx0XHRcdFx0XHR7Y29udGVudEVsZW1lbnR9XG5cdFx0XHRcdFx0e3Bvc3ROYXZ9XG5cdFx0XHRcdDwvbWFpbj5cblx0XHRcdFx0PEZvb3RlciAvPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2U7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBNZW51ID0gKHByb3BzKSA9PiB7XG5cblx0dmFyIG1lbnVJdGVtSFRNTCA9e19faHRtbDpwcm9wcy5tZW51SXRlbXN9O1xuXG5cdHJldHVybiAoXG5cdFx0PG5hdiBpZD1cInNpdGUtbmF2aWdhdGlvblwiIGNsYXNzTmFtZT1cIm1haW4tbmF2aWdhdGlvblwiIHJvbGU9XCJuYXZpZ2F0aW9uXCI+XG5cdFx0XHQ8Zm9ybSByb2xlPVwic2VhcmNoXCIgbWV0aG9kPVwiZ2V0XCIgY2xhc3NOYW1lPVwic2VhcmNoLWZvcm1cIiBhY3Rpb249XCJodHRwOi8vbG9jYWwucmVhY3QuZGV2L1wiPlxuXHRcdFx0XHQ8bGFiZWw+XG5cdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cInNjcmVlbi1yZWFkZXItdGV4dFwiPlNlYXJjaCBmb3I6PC9zcGFuPlxuXHRcdFx0XHQ8aW5wdXQgdHlwZT1cInNlYXJjaFwiIGNsYXNzTmFtZT1cInNlYXJjaC1maWVsZFwiIHBsYWNlaG9sZGVyPVwiU2VhcmNoIOKAplwiIG5hbWU9XCJzXCIgLz5cblx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzTmFtZT1cInNlYXJjaC1zdWJtaXRcIj7wn5SOPC9idXR0b24+XG5cdFx0XHQ8L2Zvcm0+XG5cdFx0XHQ8ZGl2IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXttZW51SXRlbUhUTUx9IC8+XG5cdFx0PC9uYXY+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTWVudTtcbiIsIi8vIFRPRE8gLSBuZWVkIHRoaXMgdGVtcGxhdGUgZmxlc2hlZCBvdXQgdG9vXG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IE5vbmUgPSAocHJvcHMpID0+IHtcblx0cmV0dXJuIChcblx0XHQ8c2VjdGlvbiBjbGFzc05hbWU9XCJuby1yZXN1bHRzIG5vdC1mb3VuZFwiPlxuXHRcdFx0PGhlYWRlciBjbGFzc05hbWU9XCJwYWdlLWhlYWRlclwiPlxuXHRcdFx0XHQ8aDEgY2xhc3NOYW1lPVwicGFnZS10aXRsZVwiPiBOb3RoaW5nIEZvdW5kIDwvaDE+XG5cdFx0XHQ8L2hlYWRlcj5cblxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYWdlLWNvbnRlbnRcIj5cblx0XHRcdFx0KiogVEhFUkUgSVNOJ1QgQU5ZIFBPU1RTIGRvIHlvdSB3YW50IHRvIHNlYXJjaD8gKipcblx0XHRcdDwvZGl2PlxuXHRcdDwvc2VjdGlvbj5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBOb25lO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgUm9sbHVwID0gKHByb3BzKSA9PiB7XG5cdC8vIHdwYXV0b3AuLi5cblx0dmFyIGV4Y2VycHRIVE1MID0ge19faHRtbDogJzxwPicgKyBwcm9wcy5wb3N0LmV4Y2VycHQgKyAnPC9wPid9O1xuXG5cdHZhciBwb3N0ZWRPbjtcblx0aWYgKHByb3BzLnBvc3QucG9zdF90eXBlID09PSAncG9zdCcpe1xuXHRcdHZhciBwb3N0ZWRPbkhUTUwgPSB7X19odG1sOiBwcm9wcy5wb3N0LnRlbXBsYXRlX3RhZ3MucG9zdGVkX29ufTtcblx0XHRwb3N0ZWRPbiA9IChcblx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cInBvc3RlZC1vblwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtwb3N0ZWRPbkhUTUx9IC8+XG5cdFx0KVxuXHR9XG5cblx0dmFyIGljb25IVE1MID0ge19faHRtbDogcHJvcHMucG9zdC50ZW1wbGF0ZV90YWdzLmNhdGVnb3J5Lmljb259O1xuXG5cdHZhciBhcnRpY2xlQ2xhc3MgPSBwcm9wcy5wb3N0LmNzc19jbGFzcyArICcgcm9sbHVwLWl0ZW0nO1xuXG5cdHJldHVybiAoXG5cdFx0PGFydGljbGUgaWQ9e3Byb3BzLnBvc3QuaWR9IGNsYXNzTmFtZT17YXJ0aWNsZUNsYXNzfT5cblx0XHRcdDxoZWFkZXIgY2xhc3NOYW1lPVwiZW50cnktaGVhZGVyXCI+XG5cdFx0XHRcdDxoMiBjbGFzc05hbWU9XCJlbnRyeS10aXRsZVwiPjxhIGhyZWY9e3Byb3BzLnBvc3QucGVybWFsaW5rfT57cHJvcHMucG9zdC50aXRsZX08L2E+PC9oMj5cblx0XHRcdFx0e3Bvc3RlZE9ufVxuXHRcdFx0PC9oZWFkZXI+XG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImVudHJ5LWNhdC1pY29uXCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e2ljb25IVE1MfT48L2Rpdj5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZW50cnktc3VtbWFyeVwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtleGNlcnB0SFRNTH0+PC9kaXY+XG5cdFx0PC9hcnRpY2xlPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJvbGx1cDtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IFNpbmdsZSA9IChwcm9wcykgPT4ge1xuXHR2YXIgY29udGVudEhUTUwgPSB7X19odG1sOiBwcm9wcy5wb3N0LmNvbnRlbnR9O1xuXHR2YXIgcG9zdGVkT247XG5cdGlmIChwcm9wcy5wb3N0LnBvc3RfdHlwZSA9PT0gJ3Bvc3QnKXtcblx0XHR2YXIgcG9zdGVkT25IVE1MID0ge19faHRtbDogcHJvcHMucG9zdC50ZW1wbGF0ZV90YWdzLnBvc3RlZF9vbn07XG5cdFx0cG9zdGVkT24gPSAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImVudHJ5LW1ldGFcIiBkYW5nZXJvdXNseVNldElubmVySFRNTD17cG9zdGVkT25IVE1MfSA+PC9kaXY+XG5cdFx0KVxuXHR9XG5cblx0cmV0dXJuIChcblx0XHQ8YXJ0aWNsZSBpZD17cHJvcHMucG9zdC5pZH0gY2xhc3NOYW1lPXtwcm9wcy5wb3N0LmNzc19jbGFzc30+XG5cdFx0XHQ8aGVhZGVyIGNsYXNzTkFtZT1cImVudHJ5LWhlYWRlclwiPlxuXHRcdFx0XHQ8aDEgY2xhc3NOYW1lPVwiZW50cnktdGl0bGVcIj57cHJvcHMucG9zdC50aXRsZX08L2gxPlxuXHRcdFx0XHR7cG9zdGVkT259XG5cdFx0XHQ8L2hlYWRlcj5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZW50cnktY29udGVudFwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtjb250ZW50SFRNTH0+PC9kaXY+XG5cdFx0PC9hcnRpY2xlPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNpbmdsZTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IEZvb3RlciA9IChwcm9wcykgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdDxmb290ZXIgaWQ9XCJjb2xvcGhvblwiIGNsYXNzTmFtZT1cInNpdGUtZm9vdGVyXCIgcm9sZT1cImNvbnRlbnRpbmZvXCI+XG5cdFx0PGRpdiBjbGFzc05hbWU9XCJzaXRlLWluZm9cIj5cblx0XHRcdENvcHlyaWdodCDCqSBLcmlzdG9mZXIgUmFza2UgMjAxNiBTLkQuRy4gUG93ZXJlZCBieSA8YSBocmVmPVwiaHR0cHM6Ly93b3JkcHJlc3Mub3JnL1wiPiBXb3JkcHJlc3MgPC9hPiBhbmQgPGEgaHJlZj1cImh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L1wiPiBSZWFjdC5qcyA8L2E+XG5cdFx0PC9kaXY+XG5cdFx0PC9mb290ZXI+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRm9vdGVyO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgSGVhZGVyID0gKHByb3BzKSA9PiB7XG5cdHJldHVybiAoXG5cdFx0PGhlYWRlciBpZD1cIm1hc3RoZWFkXCIgY2xhc3NOYW1lPVwic2l0ZS1oZWFkZXJcIiByb2xlPVwiYmFubmVyXCI+XG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNpdGUtbG9nb1wiPlxuXHRcdFx0PGEgaHJlZj1cIi9tZW51XCIgcmVsPVwiaG9tZVwiPlxuXHRcdFx0XHQ8aW1nIHNyYz1cIi93cC1jb250ZW50L3RoZW1lcy9rcmFza2UtcmVhY3QtMjAxNi9jbGllbnQvc3RhdGljL2Fzc2V0cy9zaXRlLWxvZ28ucG5nXCIgYWx0PVwiU2l0ZSBMb2dvXCIgLz5cblx0XHRcdDwvYT5cblx0XHRcdDwvZGl2PlxuXHRcdDwvaGVhZGVyPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlcjtcbiIsIi8qKlxuICogTWFpbiBlbnRyeSBwb2ludCBmb3IgcmVhY3QgY29tcG9uZW50c1xuICovXG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoICdyZWFjdCcgKTtcbnZhciBSZWFjdERPTSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xudmFyIFJvdXRlciA9IHJlcXVpcmUoICcuL3JvdXRlci5qc3gnICk7XG5cbnZhciByZWFjdFJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2FwcC1yb290JyApO1xudmFyIHBhZ2VSb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdwYWdlJyApO1xuUmVhY3RET00ucmVuZGVyKDxSb3V0ZXIgaW5pdGlhbFBhZ2U9e3BhZ2VSb290LmlubmVySFRNTH0gaW5pdGlhbEJvZHlDbGFzcz17cGFnZVJvb3QuY2xhc3NOYW1lfS8+LCByZWFjdFJvb3QpO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgSGVhZGVyU2tpcExpbmsgPSAocHJvcHMpID0+IHtcblx0cmV0dXJuIChcblx0XHQ8YSBjbGFzc05hbWU9XCJza2lwLWxpbmsgc2NyZWVuLXJlYWRlci10ZXh0XCIgaHJlZj1cIiNjb250ZW50XCI+U2tpcCB0byBjb250ZW50PC9hPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlclNraXBMaW5rO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgUG9zdE5hdmlnYXRpb24gPSAocHJvcHMpID0+IHtcblxuXHQvLyB3b3JkcHJlc3Mga2VlcHMgdGhlIHJldHVybl9pbnN0ZWFkIHF1ZXJ5IHZhciBpbiB0aGUgbmF2LCBidXQgd2UgZG9uJ3Qgd2FudFxuXHQvLyB0byBsaW5rIHRvIHRoYXQuIFNvIHN0cmlwIHRoYXQgb3V0IVxuXHR2YXIgbmF2SFRNTG5vTGlua1F1ZXJ5U3RyaW5nID0gcHJvcHMuY29udGVudC5yZXBsYWNlKC9yZXR1cm5faW5zdGVhZFxcPXBvc3RzLWpzb24vZywgXCJcIik7XG5cdHZhciBuYXZpZ2F0aW9uX2h0bWwgPSB7X19odG1sOiBuYXZIVE1Mbm9MaW5rUXVlcnlTdHJpbmd9XG5cblx0cmV0dXJuIChcblx0XHQ8ZGl2IGNsYXNzTmFtZT1cInByZXYtbmV4dC1wb3N0c1wiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtuYXZpZ2F0aW9uX2h0bWx9IC8+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUG9zdE5hdmlnYXRpb247XG4iLCIvKipcbiAqIFdyYXBwZXIgY29tcG9uZW50IGZvciBSZWFjdCBBcHBsaWNhdGlvbiB3aGljaCBtYW5hZ2VzIHN0YXRlIHZpYSB0aGVcbiAqIHdvcmRwcmVzcyBVUkwuIFVzaW5nIHRoZSAncGFnZScgbGlicmFyeSBpbiBucG0gd2UgY2FuIGhpamFjayBub3JtYWwgbGlua1xuICogZXhlY3V0aW9uIGFuZCBpbnN0ZWFkIHVzZSB0aGUgZXZlbnQgdG8gZ2V0IHRoZSBuZXcgZGF0YSBmb3IgUmVhY3QgdG8gY29uc3VtZVxuICogYWxsIHRoZSB3aGlsZSB1cGRhdGluZyB0aGUgY3VycmVudCB1cmwgdXNpbmcgdGhlIEhpc3RvcnkgQVBJIHRvIG1ha2UgaXRcbiAqIGFwcGVhciB0aGF0IHlvdSBoYXZlIG1vdmVkIHRvIGEgbmV3IHBhZ2VcbiAqL1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCAncmVhY3QnICk7XG52YXIgdXJsUm91dGVyID0gcmVxdWlyZSggJ3BhZ2UnICk7XG52YXIgcmVxdWVzdCA9IHJlcXVpcmUoICdzdXBlcmFnZW50JyApO1xuXG52YXIgUGFnZSA9IHJlcXVpcmUoICcuL1BhZ2UuanN4JyApO1xuY2xhc3MgUm91dGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuXHRcdFx0aGFzU2VydmVyRGF0YTogZmFsc2UsXG5cdFx0XHRwb3N0czogW11cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogSGVscGVyIGZ1bmN0aW9uIHRvIGFkZCBRdWVyeSBTdHJpbmcgUGFyYW1ldGVyIHRvIGVuZCBvZiB1cmxcblx0ICpcblx0ICogQHJldHVybnMgcXVlcnlzdHJpbmcgd2l0aCBwYXJhbSBhcHBlbmRlZC5cblx0ICovXG5cdHN0YXRpYyB1cGRhdGVQYXRoV2l0aE5ld1F1ZXJ5KG5ld1BhcmFtLCBwYXRoLCBleGlzdGluZ1F1ZXJ5c3RyaW5nPScnKXtcblx0XHR2YXIgc2VwZXJhdG9yQXBlcnNhbmQgPSAnJztcblx0XHRpZiAoZXhpc3RpbmdRdWVyeXN0cmluZyl7XG5cdFx0XHRpZiAoZXhpc3RpbmdRdWVyeXN0cmluZy5pbmRleE9mKG5ld1BhcmFtKSAhPT0gLTEgKSB7XG5cdFx0XHRcdHJldHVybiBwYXRoICsgJz8nICsgZXhpc3RpbmdRdWVyeXN0cmluZztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNlcGVyYXRvckFwZXJzYW5kID0gJyYnO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcGF0aCArICc/JyArIGV4aXN0aW5nUXVlcnlzdHJpbmcgKyBzZXBlcmF0b3JBcGVyc2FuZCArIG5ld1BhcmFtO1xuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFx0dXJsUm91dGVyKCAnKicsIGZ1bmN0aW9uICggY3R4ICkge1xuXHRcdFx0dmFyIGRhdGFQYXRoID0gUm91dGVyLnVwZGF0ZVBhdGhXaXRoTmV3UXVlcnkoJ3JldHVybl9pbnN0ZWFkPXBvc3RzLWpzb24nLCBjdHgucGF0aG5hbWUsIGN0eC5xdWVyeXN0cmluZyk7XG5cdFx0XHRyZXF1ZXN0XG5cdFx0XHRcdC5nZXQoIGRhdGFQYXRoIClcblx0XHRcdFx0LmVuZCggZnVuY3Rpb24oIGVyciwgcmVzICkge1xuXHRcdFx0XHRcdGlmIChlcnIpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0dmFyIGRhdGEgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcblx0XHRcdFx0XHR9IGNhdGNoKGV4KSB7XG5cdFx0XHRcdFx0XHR1cmxSb3V0ZXIuc3RvcCgpO1xuXHRcdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSBjdHguY2Fub25pY2FsUGF0aDtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRzZWxmLnNldFN0YXRlKHtcblx0XHRcdFx0XHRcdGhhc1NlcnZlckRhdGE6IHRydWUsXG5cdFx0XHRcdFx0XHRwb3N0czogZGF0YS5wb3N0cyxcblx0XHRcdFx0XHRcdG1lbnU6IGRhdGEucHJpbWFyeV9tZW51LFxuXHRcdFx0XHRcdFx0cG9zdE5hdjogZGF0YS5wb3N0X25hdixcblx0XHRcdFx0XHRcdGJvZHlDbGFzczogZGF0YS5ib2R5X2NsYXNzLFxuXHRcdFx0XHRcdFx0dGVtcGxhdGU6IGRhdGEudGVtcGxhdGVcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcblx0XHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHR1cmxSb3V0ZXIoe1xuXHRcdFx0Ly8gUHJldmVudHMgdHJpZ2dlcmluZyByb3V0aW5nIG9uIHRoZSBpbml0aWFsIHBhZ2UgbG9hZFxuXHRcdFx0ZGlzcGF0Y2g6IGZhbHNlXG5cdFx0fSk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8UGFnZSBwb3N0cz17dGhpcy5zdGF0ZS5wb3N0c31cblx0XHRcdFx0XHRwYWdlQ2xhc3M9e3RoaXMuc3RhdGUuYm9keUNsYXNzfVxuXHRcdFx0XHRcdHRlbXBsYXRlPXt0aGlzLnN0YXRlLnRlbXBsYXRlfVxuXHRcdFx0XHRcdG1lbnU9e3RoaXMuc3RhdGUubWVudX1cblx0XHRcdFx0XHRwb3N0TmF2PXt0aGlzLnN0YXRlLnBvc3ROYXZ9XG5cdFx0XHRcdFx0aGFzU2VydmVyRGF0YT17dGhpcy5zdGF0ZS5oYXNTZXJ2ZXJEYXRhfVxuXHRcdFx0XHRcdGluaXRpYWxQYWdlPXt0aGlzLnByb3BzLmluaXRpYWxQYWdlfVxuXHRcdFx0XHRcdGluaXRpYWxQYWdlQ2xhc3M9e3RoaXMucHJvcHMuaW5pdGlhbEJvZHlDbGFzc30vPlxuXHRcdFx0KTtcblx0XHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUm91dGVyO1xuIl19
