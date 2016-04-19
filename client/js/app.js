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
			if (numberOfPosts > 1) {
				contentElement = [];
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = this.props.posts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var post = _step.value;

						contentElement.push(React.createElement(Rollup, { post: post, key: post.id }));
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
			} else if (numberOfPosts === 1) {
				var _post = this.props.posts[0];
				contentElement = React.createElement(Single, { post: _post });
			} else {
				contentElement = React.createElement(None, null);
			}

			return React.createElement(
				'div',
				{ id: 'page', ref: 'pageContainer', className: this.state.pageClass },
				React.createElement(HeaderSkipLink, null),
				React.createElement(Header, null),
				React.createElement(
					'main',
					{ id: 'content', className: 'site-content' },
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
	var excerptHTML = { __html: props.post.excerpt };
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
			"**HERE IS THE FOOTER**"
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
				{ href: "/", rel: "home" },
				React.createElement("img", { src: "/wp-content/themes/kraske-react-2016/client/static/assets/site-logo.png", alt: "Site Logo" })
			)
		),
		React.createElement(
			"nav",
			{ id: "site-navigation", className: "main-navigation", role: "navigation" },
			React.createElement("button", { className: "menu-toggle", "aria-controls": "primary-menu", "aria-expanded": "false" }),
			React.createElement(
				"div",
				{ className: "menu-primary-container" },
				" **MENU GOES HERE** "
			),
			React.createElement(
				"form",
				{ className: "search-form" },
				" **SEARCHFORM GOES HERE** "
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

	_createClass(Router, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var self = this;

			urlRouter('*', function (ctx) {
				var pathName = ctx.pathname;
				var seperatorApersand = '';
				if (ctx.querystring) {
					seperatorApersand = '&';
				}
				var newQuery = '?' + ctx.querystring + seperatorApersand + 'return_instead=posts-json';
				var dataPath = pathName + newQuery;
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
						bodyClass: data.body_class
					});
					console.log(data);
				});
			});

			urlRouter({
				dispatch: false
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(Page, { posts: this.state.posts,
				pageClass: this.state.bodyClass,
				hasServerData: this.state.hasServerData,
				initialPage: this.props.initialPage,
				initialPageClass: this.props.initialBodyClass });
		}
	}]);

	return Router;
}(React.Component);

module.exports = Router;

},{"./Page.jsx":1,"page":"page","react":"react","superagent":"superagent"}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvY29tcG9uZW50cy9QYWdlLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2NvbnRlbnQvbm9uZS5qc3giLCJjbGllbnQvY29tcG9uZW50cy9jb250ZW50L3JvbGx1cC5qc3giLCJjbGllbnQvY29tcG9uZW50cy9jb250ZW50L3NpbmdsZS5qc3giLCJjbGllbnQvY29tcG9uZW50cy9mb290ZXIuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvaGVhZGVyLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2luZGV4LmpzeCIsImNsaWVudC9jb21wb25lbnRzL21pc2MvaGVhZGVyLXNraXAtbGluay5qc3giLCJjbGllbnQvY29tcG9uZW50cy9yb3V0ZXIuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQ0FBLElBQUksUUFBUSxRQUFRLE9BQVIsQ0FBUjs7QUFFSixJQUFJLFNBQVMsUUFBUSxjQUFSLENBQVQ7QUFDSixJQUFJLGlCQUFpQixRQUFRLDZCQUFSLENBQWpCO0FBQ0osSUFBSSxTQUFTLFFBQVEsc0JBQVIsQ0FBVDtBQUNKLElBQUksU0FBUyxRQUFRLHNCQUFSLENBQVQ7QUFDSixJQUFJLE9BQU8sUUFBUSxvQkFBUixDQUFQO0FBQ0osSUFBSSxTQUFTLFFBQVEsY0FBUixDQUFUOzs7Ozs7OztJQU9FOzs7QUFFTCxVQUZLLElBRUwsQ0FBWSxLQUFaLEVBQWtCO3dCQUZiLE1BRWE7O3FFQUZiLGlCQUdFLFFBRFc7O0FBRWpCLFFBQUssS0FBTCxHQUFhO0FBQ1osaUJBQWMsaUJBQWQ7QUFDQSxjQUFXLEVBQVg7R0FGRCxDQUZpQjs7RUFBbEI7O2NBRks7OzRDQVVxQixXQUFVO0FBQ25DLE9BQUksWUFBWSxVQUFVLFNBQVYsQ0FEbUI7QUFFbkMsT0FBSSxrQkFBa0IsVUFBVSxLQUFWLENBQWdCLGtCQUFoQixFQUFv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LEtBQUssS0FBTCxDQUFXLFNBQVg7QUFDWCxtQkFBZSxLQUFLLEtBQUwsQ0FBVyxhQUFYO0FBQ2YsaUJBQWEsS0FBSyxLQUFMLENBQVcsV0FBWDtBQUNiLHNCQUFrQixLQUFLLEtBQUwsQ0FBVyxnQkFBWCxFQUpuQixDQURELENBRE87Ozs7UUFuREo7RUFBZSxNQUFNLFNBQU47O0FBOERyQixPQUFPLE9BQVAsR0FBaUIsTUFBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIEhlYWRlciA9IHJlcXVpcmUoJy4vaGVhZGVyLmpzeCcpO1xudmFyIEhlYWRlclNraXBMaW5rID0gcmVxdWlyZSgnLi9taXNjL2hlYWRlci1za2lwLWxpbmsuanN4Jyk7XG52YXIgUm9sbHVwID0gcmVxdWlyZSgnLi9jb250ZW50L3JvbGx1cC5qc3gnKTtcbnZhciBTaW5nbGUgPSByZXF1aXJlKCcuL2NvbnRlbnQvc2luZ2xlLmpzeCcpO1xudmFyIE5vbmUgPSByZXF1aXJlKCcuL2NvbnRlbnQvbm9uZS5qc3gnKTtcbnZhciBGb290ZXIgPSByZXF1aXJlKCcuL2Zvb3Rlci5qc3gnKTtcblxuLyoqXG4gKiBNYWluIFBhZ2UgQ29tcG9uZW50XG4gKlxuICogQWxzbyBjb250cm9scyB0aGUgZmFuY3kgY29sb3IgdG9nZ2xlIG9uIHBhZ2UgZWxlbWVudHNcbiAqL1xuY2xhc3MgUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnN0YXRlID0ge1xuXHRcdFx0Y29sb3JQYWxldHRlOiAnY29sb3ItcGFsZXR0ZS0xJyxcblx0XHRcdHBhZ2VDbGFzczogJydcblx0XHR9XG5cdH1cblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XG5cdFx0dmFyIHBhZ2VDbGFzcyA9IG5leHRQcm9wcy5wYWdlQ2xhc3M7XG5cdFx0dmFyIG5ld1BhbGV0dGVDbGFzcyA9IHBhZ2VDbGFzcy5tYXRjaCgvY29sb3ItcGFsZXR0ZS1cXGQvKVswXTtcblx0XHR2YXIgbmV3Q2xhc3NMaXN0ID0gcGFnZUNsYXNzLnJlcGxhY2UoL1xccz9jb2xvci1wYWxldHRlLVxcZC9nLCAnJyk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7Y29sb3JQYWxldHRlOiBuZXdQYWxldHRlQ2xhc3N9KTtcblx0XHR0aGlzLnNldFN0YXRlKHtwYWdlQ2xhc3M6IG5ld0NsYXNzTGlzdH0pO1xuXHR9XG5cblx0Y29tcG9uZW50RGlkVXBkYXRlKCl7XG5cdFx0Ly8gVXNpbmcgcmVxdWVzdCBhbmltYXRpb24gRnJhbWUgdG8gZW5zdXJlIHRoYXQgZWFjaCBmdW5jdGlvbiBpcyBwYWludGVkXG5cdFx0Ly8gYmVmb3JlIHRoZSBuZXh0IGZ1bmN0aW9uIGJlZ2lucyB0byBmaXJlXG5cdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSggKCkgPT4ge1xuXHRcdFx0dGhpcy5jbGVhclBhbGV0dGUoKTtcblx0XHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoICgpID0+IHtcblx0XHRcdFx0dGhpcy5hcHBseVBhbGV0dGUoKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0Y2xlYXJQYWxldHRlKCl7XG5cdFx0dGhpcy5yZWZzLnBhZ2VDb250YWluZXIuY2xhc3NOYW1lID0gdGhpcy5zdGF0ZS5wYWdlQ2xhc3MgKyAnICcgKyAnY29sb3ItcGFsZXR0ZS10cmFuc2l0aW9uJztcblx0fVxuXG5cdGFwcGx5UGFsZXR0ZSgpe1xuXHRcdHRoaXMucmVmcy5wYWdlQ29udGFpbmVyLmNsYXNzTmFtZSA9IHRoaXMuc3RhdGUucGFnZUNsYXNzICsgJyAnICsgdGhpcy5zdGF0ZS5jb2xvclBhbGV0dGU7XG5cdH1cblxuXHRyZW5kZXIoKXtcblxuXHRcdC8vIElmIHdlIHBhc3NlZCBpbiBpbnRpYWwgcGFnZSBodG1sIGluc3RlYWQgb2YgYSBwb3N0IG9iamVjdCByZW5kZXJcblx0XHQvLyB0aGF0IGluc3RlYWQgb2YgdGhlIFwicmVhbFwiIHJlYWN0IGFwcFxuXHRcdGlmICghdGhpcy5wcm9wcy5oYXNTZXJ2ZXJEYXRhKXtcblx0XHRcdHZhciBpbnRpYWxQYWdlSFRNTCA9IHtfX2h0bWw6IHRoaXMucHJvcHMuaW5pdGlhbFBhZ2V9O1xuXHRcdFx0cmV0dXJuIDxkaXYgaWQ9XCJwYWdlXCIgcmVmPVwicGFnZUNvbnRhaW5lclwiIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5pbml0aWFsUGFnZUNsYXNzfSBkYW5nZXJvdXNseVNldElubmVySFRNTD17aW50aWFsUGFnZUhUTUx9IC8+XG5cdFx0fVxuXG5cdFx0Ly8gVGhpcyBpcyB0aGUgbm9ybWFsIHBvc3QtcmVuZGVyZXIgcmVhY3QgYXBwc1xuXHRcdHZhciBudW1iZXJPZlBvc3RzID0gdGhpcy5wcm9wcy5wb3N0cy5sZW5ndGg7XG5cdFx0dmFyIGNvbnRlbnRFbGVtZW50O1xuXHRcdGlmIChudW1iZXJPZlBvc3RzID4gMSkge1xuXHRcdFx0Y29udGVudEVsZW1lbnQgPSBbXTtcblx0XHRcdGZvciAobGV0IHBvc3Qgb2YgdGhpcy5wcm9wcy5wb3N0cyl7XG5cdFx0XHRcdGNvbnRlbnRFbGVtZW50LnB1c2goPFJvbGx1cCBwb3N0PXtwb3N0fSBrZXk9e3Bvc3QuaWR9Lz4pO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAobnVtYmVyT2ZQb3N0cyA9PT0gMSkge1xuXHRcdFx0bGV0IHBvc3QgPSB0aGlzLnByb3BzLnBvc3RzWzBdO1xuXHRcdFx0Y29udGVudEVsZW1lbnQgPSA8U2luZ2xlIHBvc3Q9e3Bvc3R9Lz47XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnRlbnRFbGVtZW50ID0gPE5vbmUgLz47XG5cdFx0fVxuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgaWQ9XCJwYWdlXCIgcmVmPVwicGFnZUNvbnRhaW5lclwiIGNsYXNzTmFtZT17dGhpcy5zdGF0ZS5wYWdlQ2xhc3N9PlxuXHRcdFx0XHQ8SGVhZGVyU2tpcExpbmsgLz5cblx0XHRcdFx0PEhlYWRlciAvPlxuXHRcdFx0XHQ8bWFpbiBpZD1cImNvbnRlbnRcIiBjbGFzc05hbWU9XCJzaXRlLWNvbnRlbnRcIj5cblx0XHRcdFx0XHR7Y29udGVudEVsZW1lbnR9XG5cdFx0XHRcdDwvbWFpbj5cblx0XHRcdFx0PEZvb3RlciAvPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2U7XG4iLCIvLyBUT0RPIC0gbmVlZCB0aGlzIHRlbXBsYXRlIGZsZXNoZWQgb3V0IHRvb1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBOb25lID0gKHByb3BzKSA9PiB7XG5cdHJldHVybiAoXG5cdFx0PHNlY3Rpb24gY2xhc3NOYW1lPVwibm8tcmVzdWx0cyBub3QtZm91bmRcIj5cblx0XHRcdDxoZWFkZXIgY2xhc3NOYW1lPVwicGFnZS1oZWFkZXJcIj5cblx0XHRcdFx0PGgxIGNsYXNzTmFtZT1cInBhZ2UtdGl0bGVcIj4gTm90aGluZyBGb3VuZCA8L2gxPlxuXHRcdFx0PC9oZWFkZXI+XG5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFnZS1jb250ZW50XCI+XG5cdFx0XHRcdCoqIFRIRVJFIElTTidUIEFOWSBQT1NUUyBkbyB5b3Ugd2FudCB0byBzZWFyY2g/ICoqXG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L3NlY3Rpb24+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTm9uZTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IFJvbGx1cCA9IChwcm9wcykgPT4ge1xuXHR2YXIgZXhjZXJwdEhUTUwgPSB7X19odG1sOiBwcm9wcy5wb3N0LmV4Y2VycHR9O1xuXHR2YXIgcG9zdGVkT247XG5cdGlmIChwcm9wcy5wb3N0LnBvc3RfdHlwZSA9PT0gJ3Bvc3QnKXtcblx0XHR2YXIgcG9zdGVkT25IVE1MID0ge19faHRtbDogcHJvcHMucG9zdC50ZW1wbGF0ZV90YWdzLnBvc3RlZF9vbn07XG5cdFx0cG9zdGVkT24gPSAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImVudHJ5LW1ldGFcIiBkYW5nZXJvdXNseVNldElubmVySFRNTD17cG9zdGVkT25IVE1MfSA+PC9kaXY+XG5cdFx0KVxuXHR9XG5cblx0cmV0dXJuIChcblx0XHQ8YXJ0aWNsZSBpZD17cHJvcHMucG9zdC5pZH0gY2xhc3NOYW1lPXtwcm9wcy5wb3N0LmNzc19jbGFzc30+XG5cdFx0XHQ8aGVhZGVyIGNsYXNzTkFtZT1cImVudHJ5LWhlYWRlclwiPlxuXHRcdFx0XHQ8aDIgY2xhc3NOYW1lPVwiZW50cnktdGl0bGVcIj48YSBocmVmPXtwcm9wcy5wb3N0LnBlcm1hbGlua30+e3Byb3BzLnBvc3QudGl0bGV9PC9hPjwvaDI+XG5cdFx0XHRcdHtwb3N0ZWRPbn1cblx0XHRcdDwvaGVhZGVyPlxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJlbnRyeS1zdW1tYXJ5XCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e2V4Y2VycHRIVE1MfT48L2Rpdj5cblx0XHQ8L2FydGljbGU+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUm9sbHVwO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgU2luZ2xlID0gKHByb3BzKSA9PiB7XG5cdHZhciBjb250ZW50SFRNTCA9IHtfX2h0bWw6IHByb3BzLnBvc3QuY29udGVudH07XG5cdHZhciBwb3N0ZWRPbjtcblx0aWYgKHByb3BzLnBvc3QucG9zdF90eXBlID09PSAncG9zdCcpe1xuXHRcdHZhciBwb3N0ZWRPbkhUTUwgPSB7X19odG1sOiBwcm9wcy5wb3N0LnRlbXBsYXRlX3RhZ3MucG9zdGVkX29ufTtcblx0XHRwb3N0ZWRPbiA9IChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZW50cnktbWV0YVwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtwb3N0ZWRPbkhUTUx9ID48L2Rpdj5cblx0XHQpXG5cdH1cblxuXHRyZXR1cm4gKFxuXHRcdDxhcnRpY2xlIGlkPXtwcm9wcy5wb3N0LmlkfSBjbGFzc05hbWU9e3Byb3BzLnBvc3QuY3NzX2NsYXNzfT5cblx0XHRcdDxoZWFkZXIgY2xhc3NOQW1lPVwiZW50cnktaGVhZGVyXCI+XG5cdFx0XHRcdDxoMSBjbGFzc05hbWU9XCJlbnRyeS10aXRsZVwiPntwcm9wcy5wb3N0LnRpdGxlfTwvaDE+XG5cdFx0XHRcdHtwb3N0ZWRPbn1cblx0XHRcdDwvaGVhZGVyPlxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJlbnRyeS1jb250ZW50XCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e2NvbnRlbnRIVE1MfT48L2Rpdj5cblx0XHQ8L2FydGljbGU+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2luZ2xlO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgRm9vdGVyID0gKHByb3BzKSA9PiB7XG5cdHJldHVybiAoXG5cdFx0PGZvb3RlciBpZD1cImNvbG9waG9uXCIgY2xhc3NOYW1lPVwic2l0ZS1mb290ZXJcIiByb2xlPVwiY29udGVudGluZm9cIj5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2l0ZS1pbmZvXCI+XG5cdFx0XHRcdCoqSEVSRSBJUyBUSEUgRk9PVEVSKipcblx0XHRcdDwvZGl2PlxuXHRcdDwvZm9vdGVyPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZvb3RlcjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IEhlYWRlciA9IChwcm9wcykgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdDxoZWFkZXIgaWQ9XCJtYXN0aGVhZFwiIGNsYXNzTmFtZT1cInNpdGUtaGVhZGVyXCIgcm9sZT1cImJhbm5lclwiPlxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzaXRlLWxvZ29cIj5cblx0XHRcdDxhIGhyZWY9XCIvXCIgcmVsPVwiaG9tZVwiPlxuXHRcdFx0XHQ8aW1nIHNyYz1cIi93cC1jb250ZW50L3RoZW1lcy9rcmFza2UtcmVhY3QtMjAxNi9jbGllbnQvc3RhdGljL2Fzc2V0cy9zaXRlLWxvZ28ucG5nXCIgYWx0PVwiU2l0ZSBMb2dvXCIgLz5cblx0XHRcdDwvYT5cblx0XHRcdDwvZGl2PlxuXG5cdFx0XHQ8bmF2IGlkPVwic2l0ZS1uYXZpZ2F0aW9uXCIgY2xhc3NOYW1lPVwibWFpbi1uYXZpZ2F0aW9uXCIgcm9sZT1cIm5hdmlnYXRpb25cIj5cblx0XHRcdFx0PGJ1dHRvbiBjbGFzc05hbWU9XCJtZW51LXRvZ2dsZVwiIGFyaWEtY29udHJvbHM9XCJwcmltYXJ5LW1lbnVcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj48L2J1dHRvbj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lbnUtcHJpbWFyeS1jb250YWluZXJcIj4gKipNRU5VIEdPRVMgSEVSRSoqIDwvZGl2PlxuXHRcdFx0XHRcdDxmb3JtIGNsYXNzTmFtZT1cInNlYXJjaC1mb3JtXCI+ICoqU0VBUkNIRk9STSBHT0VTIEhFUkUqKiA8L2Zvcm0+XG5cdFx0XHQ8L25hdj5cblx0XHQ8L2hlYWRlcj5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBIZWFkZXI7XG4iLCIvKipcbiAqIE1haW4gZW50cnkgcG9pbnQgZm9yIHJlYWN0IGNvbXBvbmVudHNcbiAqL1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCAncmVhY3QnICk7XG52YXIgUmVhY3RET00gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcbnZhciBSb3V0ZXIgPSByZXF1aXJlKCAnLi9yb3V0ZXIuanN4JyApO1xuXG52YXIgcmVhY3RSb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdhcHAtcm9vdCcgKTtcbnZhciBwYWdlUm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAncGFnZScgKTtcblJlYWN0RE9NLnJlbmRlcig8Um91dGVyIGluaXRpYWxQYWdlPXtwYWdlUm9vdC5pbm5lckhUTUx9IGluaXRpYWxCb2R5Q2xhc3M9e3BhZ2VSb290LmNsYXNzTmFtZX0vPiwgcmVhY3RSb290KTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IEhlYWRlclNraXBMaW5rID0gKHByb3BzKSA9PiB7XG5cdHJldHVybiAoXG5cdFx0PGEgY2xhc3NOYW1lPVwic2tpcC1saW5rIHNjcmVlbi1yZWFkZXItdGV4dFwiIGhyZWY9XCIjY29udGVudFwiPlNraXAgdG8gY29udGVudDwvYT5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBIZWFkZXJTa2lwTGluaztcbiIsIi8qKlxuICogV3JhcHBlciBjb21wb25lbnQgZm9yIFJlYWN0IEFwcGxpY2F0aW9uIHdoaWNoIG1hbmFnZXMgc3RhdGUgdmlhIHRoZVxuICogd29yZHByZXNzIFVSTC4gVXNpbmcgdGhlICdwYWdlJyBsaWJyYXJ5IGluIG5wbSB3ZSBjYW4gaGlqYWNrIG5vcm1hbCBsaW5rXG4gKiBleGVjdXRpb24gYW5kIGluc3RlYWQgdXNlIHRoZSBldmVudCB0byBnZXQgdGhlIG5ldyBkYXRhIGZvciBSZWFjdCB0byBjb25zdW1lXG4gKiBhbGwgdGhlIHdoaWxlIHVwZGF0aW5nIHRoZSBjdXJyZW50IHVybCB1c2luZyB0aGUgSGlzdG9yeSBBUEkgdG8gbWFrZSBpdFxuICogYXBwZWFyIHRoYXQgeW91IGhhdmUgbW92ZWQgdG8gYSBuZXcgcGFnZVxuICovXG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoICdyZWFjdCcgKTtcbnZhciB1cmxSb3V0ZXIgPSByZXF1aXJlKCAncGFnZScgKTtcbnZhciByZXF1ZXN0ID0gcmVxdWlyZSggJ3N1cGVyYWdlbnQnICk7XG5cbnZhciBQYWdlID0gcmVxdWlyZSggJy4vUGFnZS5qc3gnICk7XG5jbGFzcyBSb3V0ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG5cdFx0XHRoYXNTZXJ2ZXJEYXRhOiBmYWxzZSxcblx0XHRcdHBvc3RzOiBbXVxuXHRcdH1cblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdHVybFJvdXRlciggJyonLCBmdW5jdGlvbiAoIGN0eCApIHtcblx0XHRcdHZhciBwYXRoTmFtZSA9IGN0eC5wYXRobmFtZTtcblx0XHRcdHZhciBzZXBlcmF0b3JBcGVyc2FuZCA9ICcnO1xuXHRcdFx0aWYgKGN0eC5xdWVyeXN0cmluZyl7XG5cdFx0XHRcdHNlcGVyYXRvckFwZXJzYW5kID0gJyYnO1xuXHRcdFx0fVxuXHRcdFx0dmFyIG5ld1F1ZXJ5ID0gJz8nICsgY3R4LnF1ZXJ5c3RyaW5nICsgc2VwZXJhdG9yQXBlcnNhbmQgKyAncmV0dXJuX2luc3RlYWQ9cG9zdHMtanNvbic7XG5cdFx0XHR2YXIgZGF0YVBhdGggPSBwYXRoTmFtZSArIG5ld1F1ZXJ5O1xuXHRcdFx0cmVxdWVzdFxuXHRcdFx0XHQuZ2V0KCBkYXRhUGF0aCApXG5cdFx0XHRcdC5lbmQoIGZ1bmN0aW9uKCBlcnIsIHJlcyApIHtcblx0XHRcdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGVycik7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdHZhciBkYXRhID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG5cdFx0XHRcdFx0fSBjYXRjaChleCkge1xuXHRcdFx0XHRcdFx0dXJsUm91dGVyLnN0b3AoKTtcblx0XHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY3R4LmNhbm9uaWNhbFBhdGg7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0c2VsZi5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0XHRoYXNTZXJ2ZXJEYXRhOiB0cnVlLFxuXHRcdFx0XHRcdFx0cG9zdHM6IGRhdGEucG9zdHMsXG5cdFx0XHRcdFx0XHRib2R5Q2xhc3M6IGRhdGEuYm9keV9jbGFzc1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdHVybFJvdXRlcih7XG5cdFx0XHRkaXNwYXRjaDogZmFsc2Vcblx0XHR9KTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxQYWdlIHBvc3RzPXt0aGlzLnN0YXRlLnBvc3RzfVxuXHRcdFx0XHRcdHBhZ2VDbGFzcz17dGhpcy5zdGF0ZS5ib2R5Q2xhc3N9XG5cdFx0XHRcdFx0aGFzU2VydmVyRGF0YT17dGhpcy5zdGF0ZS5oYXNTZXJ2ZXJEYXRhfVxuXHRcdFx0XHRcdGluaXRpYWxQYWdlPXt0aGlzLnByb3BzLmluaXRpYWxQYWdlfVxuXHRcdFx0XHRcdGluaXRpYWxQYWdlQ2xhc3M9e3RoaXMucHJvcHMuaW5pdGlhbEJvZHlDbGFzc30vPlxuXHRcdFx0KTtcblx0XHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUm91dGVyO1xuIl19
