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
					'div',
					{ id: 'content', className: 'site-content' },
					React.createElement(
						'div',
						{ id: 'primary', className: 'content-area' },
						React.createElement(
							'main',
							{ id: 'main', className: 'site-main', role: 'main' },
							contentElement
						)
					)
				),
				React.createElement(Footer, null)
			);
		}
	}]);

	return Page;
}(React.Component);

module.exports = Page;

},{"./content/none.jsx":4,"./content/rollup.jsx":5,"./content/single.jsx":6,"./footer.jsx":7,"./header.jsx":8,"./misc/header-skip-link.jsx":10,"react":"react"}],2:[function(require,module,exports){
"use strict";

// TODO - probably needed to implement comments later, but at the moment
// let's not use this for now

var React = require('react');

var Footer = function Footer(props) {
	return React.createElement(
		"footer",
		{ className: "entry-footer" },
		"** Comments and Stuff Go here eventually **"
	);
};

module.exports = Footer;

},{"react":"react"}],3:[function(require,module,exports){
'use strict';

var React = require('react');

var Header = function Header(props) {
	var entryMeta;
	if (props.post_type === 'post') {
		var metaHTML = { __html: props.meta };
		entryMeta = React.createElement('div', { className: 'entry-meta', dangerouslySetInnerHTML: metaHTML });
	}

	return React.createElement(
		'header',
		{ classNAme: 'entry-header' },
		React.createElement(
			'h2',
			{ className: 'entry-title' },
			React.createElement(
				'a',
				{ href: props.permalink },
				props.title
			)
		),
		entryMeta
	);
};

module.exports = Header;

},{"react":"react"}],4:[function(require,module,exports){
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

},{"react":"react"}],5:[function(require,module,exports){
'use strict';

var React = require('react');
var Entry = {
	Header: require('./entry/header.jsx'),
	Footer: require('./entry/footer.jsx')
};

var Rollup = function Rollup(props) {
	var excerptHTML = { __html: props.post.excerpt };

	return React.createElement(
		'article',
		{ id: props.post.id, className: props.post.css_class },
		React.createElement(Entry.Header, {
			title: props.post.title,
			permalink: props.post.permalink,
			meta: props.post.template_tags.posted_on,
			post_type: props.post.post_type }),
		React.createElement('div', { className: 'entry-summary', dangerouslySetInnerHTML: excerptHTML })
	);
};

module.exports = Rollup;

},{"./entry/footer.jsx":2,"./entry/header.jsx":3,"react":"react"}],6:[function(require,module,exports){
'use strict';

var React = require('react');
var Entry = {
	Header: require('./entry/header.jsx'),
	Footer: require('./entry/footer.jsx')
};

var Single = function Single(props) {
	var contentHTML = { __html: props.post.content };
	return React.createElement(
		'article',
		{ id: props.post.id, className: props.post.css_class },
		React.createElement(Entry.Header, {
			title: props.post.title,
			permalink: props.post.permalink,
			meta: props.post.template_tags.posted_on,
			post_type: props.post.post_type }),
		React.createElement('div', { className: 'entry-content', dangerouslySetInnerHTML: contentHTML }),
		React.createElement(Entry.Footer, null)
	);
};

module.exports = Single;

},{"./entry/footer.jsx":2,"./entry/header.jsx":3,"react":"react"}],7:[function(require,module,exports){
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

},{"react":"react"}],9:[function(require,module,exports){
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

},{"./router.jsx":11,"react":"react","react-dom":"react-dom"}],10:[function(require,module,exports){
"use strict";

var React = require('react');

var HeaderSkipLink = function HeaderSkipLink(props) {
	return React.createElement(
		"a",
		{ className: "skip-link screen-reader-text", href: "#main" },
		"Skip to content"
	);
};

module.exports = HeaderSkipLink;

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
					var data = JSON.parse(res.text);
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

},{"./Page.jsx":1,"page":"page","react":"react","superagent":"superagent"}]},{},[9])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvY29tcG9uZW50cy9QYWdlLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2NvbnRlbnQvZW50cnkvZm9vdGVyLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2NvbnRlbnQvZW50cnkvaGVhZGVyLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2NvbnRlbnQvbm9uZS5qc3giLCJjbGllbnQvY29tcG9uZW50cy9jb250ZW50L3JvbGx1cC5qc3giLCJjbGllbnQvY29tcG9uZW50cy9jb250ZW50L3NpbmdsZS5qc3giLCJjbGllbnQvY29tcG9uZW50cy9mb290ZXIuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvaGVhZGVyLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2luZGV4LmpzeCIsImNsaWVudC9jb21wb25lbnRzL21pc2MvaGVhZGVyLXNraXAtbGluay5qc3giLCJjbGllbnQvY29tcG9uZW50cy9yb3V0ZXIuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQ0FBLElBQUksUUFBUSxRQUFRLE9BQVIsQ0FBUjs7QUFFSixJQUFJLFNBQVMsUUFBUSxjQUFSLENBQVQ7QUFDSixJQUFJLGlCQUFpQixRQUFRLDZCQUFSLENBQWpCO0FBQ0osSUFBSSxTQUFTLFFBQVEsc0JBQVIsQ0FBVDtBQUNKLElBQUksU0FBUyxRQUFRLHNCQUFSLENBQVQ7QUFDSixJQUFJLE9BQU8sUUFBUSxvQkFBUixDQUFQO0FBQ0osSUFBSSxTQUFTLFFBQVEsY0FBUixDQUFUOzs7Ozs7OztJQU9FOzs7QUFFTCxVQUZLLElBRUwsQ0FBWSxLQUFaLEVBQWtCO3dCQUZiLE1BRWE7O3FFQUZiLGlCQUdFLFFBRFc7O0FBRWpCLFFBQUssS0FBTCxHQUFhO0FBQ1osaUJBQWMsaUJBQWQ7QUFDQSxjQUFXLEVBQVg7R0FGRCxDQUZpQjs7RUFBbEI7O2NBRks7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QyxDQU5pQjtBQU9oQyxRQUFJLFdBQVcsV0FBVyxRQUFYLENBUGlCO0FBUWhDLFlBQ0UsR0FERixDQUNPLFFBRFAsRUFFRSxHQUZGLENBRU8sVUFBVSxHQUFWLEVBQWUsR0FBZixFQUFxQjtBQUMxQixTQUFJLEdBQUosRUFBUztBQUNSLGNBQVEsS0FBUixDQUFjLEdBQWQsRUFEUTtBQUVSLGFBRlE7TUFBVDtBQUlBLFNBQUksT0FBTyxLQUFLLEtBQUwsQ0FBVyxJQUFJLElBQUosQ0FBbEIsQ0FMc0I7QUFNMUIsVUFBSyxRQUFMLENBQWM7QUFDYixxQkFBZSxJQUFmO0FBQ0EsYUFBTyxLQUFLLEtBQUw7QUFDUCxpQkFBVyxLQUFLLFVBQUw7TUFIWixFQU4wQjtBQVcxQixhQUFRLEdBQVIsQ0FBWSxJQUFaLEVBWDBCO0tBQXJCLENBRlAsQ0FSZ0M7SUFBakIsQ0FBaEIsQ0FIbUI7O0FBNEJuQixhQUFVO0FBQ1QsY0FBVSxLQUFWO0lBREQsRUE1Qm1COzs7OzJCQWlDWDtBQUNQLFVBQ0Msb0JBQUMsSUFBRCxJQUFNLE9BQU8sS0FBSyxLQUFMLENBQVcsS0FBWDtBQUNaLGVBQVcsS0FBSyxLQUFMLENBQVcsU0FBWDtBQUNYLG1CQUFlLEtBQUssS0FBTCxDQUFXLGFBQVg7QUFDZixpQkFBYSxLQUFLLEtBQUwsQ0FBVyxXQUFYO0FBQ2Isc0JBQWtCLEtBQUssS0FBTCxDQUFXLGdCQUFYLEVBSm5CLENBREQsQ0FETzs7OztRQTNDSjtFQUFlLE1BQU0sU0FBTjs7QUFzRHJCLE9BQU8sT0FBUCxHQUFpQixNQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgSGVhZGVyID0gcmVxdWlyZSgnLi9oZWFkZXIuanN4Jyk7XG52YXIgSGVhZGVyU2tpcExpbmsgPSByZXF1aXJlKCcuL21pc2MvaGVhZGVyLXNraXAtbGluay5qc3gnKTtcbnZhciBSb2xsdXAgPSByZXF1aXJlKCcuL2NvbnRlbnQvcm9sbHVwLmpzeCcpO1xudmFyIFNpbmdsZSA9IHJlcXVpcmUoJy4vY29udGVudC9zaW5nbGUuanN4Jyk7XG52YXIgTm9uZSA9IHJlcXVpcmUoJy4vY29udGVudC9ub25lLmpzeCcpO1xudmFyIEZvb3RlciA9IHJlcXVpcmUoJy4vZm9vdGVyLmpzeCcpO1xuXG4vKipcbiAqIE1haW4gUGFnZSBDb21wb25lbnRcbiAqXG4gKiBBbHNvIGNvbnRyb2xzIHRoZSBmYW5jeSBjb2xvciB0b2dnbGUgb24gcGFnZSBlbGVtZW50c1xuICovXG5jbGFzcyBQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuc3RhdGUgPSB7XG5cdFx0XHRjb2xvclBhbGV0dGU6ICdjb2xvci1wYWxldHRlLTEnLFxuXHRcdFx0cGFnZUNsYXNzOiAnJ1xuXHRcdH1cblx0fVxuXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXtcblx0XHR2YXIgcGFnZUNsYXNzID0gbmV4dFByb3BzLnBhZ2VDbGFzcztcblx0XHR2YXIgbmV3UGFsZXR0ZUNsYXNzID0gcGFnZUNsYXNzLm1hdGNoKC9jb2xvci1wYWxldHRlLVxcZC8pWzBdO1xuXHRcdHZhciBuZXdDbGFzc0xpc3QgPSBwYWdlQ2xhc3MucmVwbGFjZSgvXFxzP2NvbG9yLXBhbGV0dGUtXFxkL2csICcnKTtcblx0XHR0aGlzLnNldFN0YXRlKHtjb2xvclBhbGV0dGU6IG5ld1BhbGV0dGVDbGFzc30pO1xuXHRcdHRoaXMuc2V0U3RhdGUoe3BhZ2VDbGFzczogbmV3Q2xhc3NMaXN0fSk7XG5cdH1cblxuXHRjb21wb25lbnREaWRVcGRhdGUoKXtcblx0XHQvLyBVc2luZyByZXF1ZXN0IGFuaW1hdGlvbiBGcmFtZSB0byBlbnN1cmUgdGhhdCBlYWNoIGZ1bmN0aW9uIGlzIHBhaW50ZWRcblx0XHQvLyBiZWZvcmUgdGhlIG5leHQgZnVuY3Rpb24gYmVnaW5zIHRvIGZpcmVcblx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCAoKSA9PiB7XG5cdFx0XHR0aGlzLmNsZWFyUGFsZXR0ZSgpO1xuXHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSggKCkgPT4ge1xuXHRcdFx0XHR0aGlzLmFwcGx5UGFsZXR0ZSgpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRjbGVhclBhbGV0dGUoKXtcblx0XHR0aGlzLnJlZnMucGFnZUNvbnRhaW5lci5jbGFzc05hbWUgPSB0aGlzLnN0YXRlLnBhZ2VDbGFzcyArICcgJyArICdjb2xvci1wYWxldHRlLXRyYW5zaXRpb24nO1xuXHR9XG5cblx0YXBwbHlQYWxldHRlKCl7XG5cdFx0dGhpcy5yZWZzLnBhZ2VDb250YWluZXIuY2xhc3NOYW1lID0gdGhpcy5zdGF0ZS5wYWdlQ2xhc3MgKyAnICcgKyB0aGlzLnN0YXRlLmNvbG9yUGFsZXR0ZTtcblx0fVxuXG5cdHJlbmRlcigpe1xuXG5cdFx0Ly8gSWYgd2UgcGFzc2VkIGluIGludGlhbCBwYWdlIGh0bWwgaW5zdGVhZCBvZiBhIHBvc3Qgb2JqZWN0IHJlbmRlclxuXHRcdC8vIHRoYXQgaW5zdGVhZCBvZiB0aGUgXCJyZWFsXCIgcmVhY3QgYXBwXG5cdFx0aWYgKCF0aGlzLnByb3BzLmhhc1NlcnZlckRhdGEpe1xuXHRcdFx0dmFyIGludGlhbFBhZ2VIVE1MID0ge19faHRtbDogdGhpcy5wcm9wcy5pbml0aWFsUGFnZX07XG5cdFx0XHRyZXR1cm4gPGRpdiBpZD1cInBhZ2VcIiByZWY9XCJwYWdlQ29udGFpbmVyXCIgY2xhc3NOYW1lPXt0aGlzLnByb3BzLmluaXRpYWxQYWdlQ2xhc3N9IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtpbnRpYWxQYWdlSFRNTH0gLz5cblx0XHR9XG5cblx0XHQvLyBUaGlzIGlzIHRoZSBub3JtYWwgcG9zdC1yZW5kZXJlciByZWFjdCBhcHBzXG5cdFx0dmFyIG51bWJlck9mUG9zdHMgPSB0aGlzLnByb3BzLnBvc3RzLmxlbmd0aDtcblx0XHR2YXIgY29udGVudEVsZW1lbnQ7XG5cdFx0aWYgKG51bWJlck9mUG9zdHMgPiAxKSB7XG5cdFx0XHRjb250ZW50RWxlbWVudCA9IFtdO1xuXHRcdFx0Zm9yIChsZXQgcG9zdCBvZiB0aGlzLnByb3BzLnBvc3RzKXtcblx0XHRcdFx0Y29udGVudEVsZW1lbnQucHVzaCg8Um9sbHVwIHBvc3Q9e3Bvc3R9IGtleT17cG9zdC5pZH0vPik7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChudW1iZXJPZlBvc3RzID09PSAxKSB7XG5cdFx0XHRsZXQgcG9zdCA9IHRoaXMucHJvcHMucG9zdHNbMF07XG5cdFx0XHRjb250ZW50RWxlbWVudCA9IDxTaW5nbGUgcG9zdD17cG9zdH0vPjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29udGVudEVsZW1lbnQgPSA8Tm9uZSAvPjtcblx0XHR9XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBpZD1cInBhZ2VcIiByZWY9XCJwYWdlQ29udGFpbmVyXCIgY2xhc3NOYW1lPXt0aGlzLnN0YXRlLnBhZ2VDbGFzc30+XG5cdFx0XHRcdDxIZWFkZXJTa2lwTGluayAvPlxuXHRcdFx0XHQ8SGVhZGVyIC8+XG5cdFx0XHRcdDxkaXYgaWQ9XCJjb250ZW50XCIgY2xhc3NOYW1lPVwic2l0ZS1jb250ZW50XCI+XG5cdFx0XHRcdFx0PGRpdiBpZD1cInByaW1hcnlcIiBjbGFzc05hbWU9XCJjb250ZW50LWFyZWFcIj5cblx0XHRcdFx0XHRcdDxtYWluIGlkPVwibWFpblwiIGNsYXNzTmFtZT1cInNpdGUtbWFpblwiIHJvbGU9XCJtYWluXCI+XG5cdFx0XHRcdFx0XHR7Y29udGVudEVsZW1lbnR9XG5cdFx0XHRcdFx0XHQ8L21haW4+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8Rm9vdGVyIC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZTtcbiIsIi8vIFRPRE8gLSBwcm9iYWJseSBuZWVkZWQgdG8gaW1wbGVtZW50IGNvbW1lbnRzIGxhdGVyLCBidXQgYXQgdGhlIG1vbWVudFxuLy8gbGV0J3Mgbm90IHVzZSB0aGlzIGZvciBub3dcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgRm9vdGVyID0gKHByb3BzKSA9PiB7XG5cdHJldHVybihcblx0XHQ8Zm9vdGVyIGNsYXNzTmFtZT1cImVudHJ5LWZvb3RlclwiPlxuXHRcdFx0KiogQ29tbWVudHMgYW5kIFN0dWZmIEdvIGhlcmUgZXZlbnR1YWxseSAqKlxuXHRcdDwvZm9vdGVyPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZvb3RlcjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IEhlYWRlciA9IChwcm9wcykgPT4ge1xuXHR2YXIgZW50cnlNZXRhO1xuXHRpZiAocHJvcHMucG9zdF90eXBlID09PSAncG9zdCcpe1xuXHRcdHZhciBtZXRhSFRNTCA9IHtfX2h0bWw6IHByb3BzLm1ldGF9O1xuXHRcdGVudHJ5TWV0YSA9IChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZW50cnktbWV0YVwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXttZXRhSFRNTH0gPjwvZGl2PlxuXHRcdClcblx0fVxuXG5cdHJldHVybihcblx0XHQ8aGVhZGVyIGNsYXNzTkFtZT1cImVudHJ5LWhlYWRlclwiPlxuXHRcdFx0PGgyIGNsYXNzTmFtZT1cImVudHJ5LXRpdGxlXCI+PGEgaHJlZj17cHJvcHMucGVybWFsaW5rfT57cHJvcHMudGl0bGV9PC9hPjwvaDI+XG5cdFx0XHR7ZW50cnlNZXRhfVxuXHRcdDwvaGVhZGVyPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlcjtcbiIsIi8vIFRPRE8gLSBuZWVkIHRoaXMgdGVtcGxhdGUgZmxlc2hlZCBvdXQgdG9vXG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IE5vbmUgPSAocHJvcHMpID0+IHtcblx0cmV0dXJuIChcblx0XHQ8c2VjdGlvbiBjbGFzc05hbWU9XCJuby1yZXN1bHRzIG5vdC1mb3VuZFwiPlxuXHRcdFx0PGhlYWRlciBjbGFzc05hbWU9XCJwYWdlLWhlYWRlclwiPlxuXHRcdFx0XHQ8aDEgY2xhc3NOYW1lPVwicGFnZS10aXRsZVwiPiBOb3RoaW5nIEZvdW5kIDwvaDE+XG5cdFx0XHQ8L2hlYWRlcj5cblxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYWdlLWNvbnRlbnRcIj5cblx0XHRcdFx0KiogVEhFUkUgSVNOJ1QgQU5ZIFBPU1RTIGRvIHlvdSB3YW50IHRvIHNlYXJjaD8gKipcblx0XHRcdDwvZGl2PlxuXHRcdDwvc2VjdGlvbj5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBOb25lO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBFbnRyeSA9IHtcblx0SGVhZGVyIDogcmVxdWlyZSgnLi9lbnRyeS9oZWFkZXIuanN4JyksXG5cdEZvb3RlciA6IHJlcXVpcmUoJy4vZW50cnkvZm9vdGVyLmpzeCcpLFxufVxuXG5jb25zdCBSb2xsdXAgPSAocHJvcHMpID0+IHtcblx0dmFyIGV4Y2VycHRIVE1MID0ge19faHRtbDogcHJvcHMucG9zdC5leGNlcnB0fTtcblxuXHRyZXR1cm4gKFxuXHRcdDxhcnRpY2xlIGlkPXtwcm9wcy5wb3N0LmlkfSBjbGFzc05hbWU9e3Byb3BzLnBvc3QuY3NzX2NsYXNzfT5cblx0XHRcdDxFbnRyeS5IZWFkZXJcblx0XHRcdFx0dGl0bGU9e3Byb3BzLnBvc3QudGl0bGV9XG5cdFx0XHRcdHBlcm1hbGluaz17cHJvcHMucG9zdC5wZXJtYWxpbmt9XG5cdFx0XHRcdG1ldGE9e3Byb3BzLnBvc3QudGVtcGxhdGVfdGFncy5wb3N0ZWRfb259XG5cdFx0XHRcdHBvc3RfdHlwZT17cHJvcHMucG9zdC5wb3N0X3R5cGV9Lz5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZW50cnktc3VtbWFyeVwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtleGNlcnB0SFRNTH0+PC9kaXY+XG5cdFx0PC9hcnRpY2xlPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJvbGx1cDtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgRW50cnkgPSB7XG5cdEhlYWRlciA6IHJlcXVpcmUoJy4vZW50cnkvaGVhZGVyLmpzeCcpLFxuXHRGb290ZXIgOiByZXF1aXJlKCcuL2VudHJ5L2Zvb3Rlci5qc3gnKSxcbn1cblxuY29uc3QgU2luZ2xlID0gKHByb3BzKSA9PiB7XG5cdHZhciBjb250ZW50SFRNTCA9IHtfX2h0bWw6IHByb3BzLnBvc3QuY29udGVudH07XG5cdHJldHVybiAoXG5cdFx0PGFydGljbGUgaWQ9e3Byb3BzLnBvc3QuaWR9IGNsYXNzTmFtZT17cHJvcHMucG9zdC5jc3NfY2xhc3N9PlxuXHRcdFx0PEVudHJ5LkhlYWRlclxuXHRcdFx0XHR0aXRsZT17cHJvcHMucG9zdC50aXRsZX1cblx0XHRcdFx0cGVybWFsaW5rPXtwcm9wcy5wb3N0LnBlcm1hbGlua31cblx0XHRcdFx0bWV0YT17cHJvcHMucG9zdC50ZW1wbGF0ZV90YWdzLnBvc3RlZF9vbn1cblx0XHRcdFx0cG9zdF90eXBlPXtwcm9wcy5wb3N0LnBvc3RfdHlwZX0vPlxuXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImVudHJ5LWNvbnRlbnRcIiBkYW5nZXJvdXNseVNldElubmVySFRNTD17Y29udGVudEhUTUx9PjwvZGl2PlxuXG5cdFx0XHQ8RW50cnkuRm9vdGVyIC8+XG5cdFx0PC9hcnRpY2xlPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNpbmdsZTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IEZvb3RlciA9IChwcm9wcykgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdDxmb290ZXIgaWQ9XCJjb2xvcGhvblwiIGNsYXNzTmFtZT1cInNpdGUtZm9vdGVyXCIgcm9sZT1cImNvbnRlbnRpbmZvXCI+XG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNpdGUtaW5mb1wiPlxuXHRcdFx0XHQqKkhFUkUgSVMgVEhFIEZPT1RFUioqXG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L2Zvb3Rlcj5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGb290ZXI7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBIZWFkZXIgPSAocHJvcHMpID0+IHtcblx0cmV0dXJuIChcblx0XHQ8aGVhZGVyIGlkPVwibWFzdGhlYWRcIiBjbGFzc05hbWU9XCJzaXRlLWhlYWRlclwiIHJvbGU9XCJiYW5uZXJcIj5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2l0ZS1sb2dvXCI+XG5cdFx0XHQ8YSBocmVmPVwiL1wiIHJlbD1cImhvbWVcIj5cblx0XHRcdFx0PGltZyBzcmM9XCIvd3AtY29udGVudC90aGVtZXMva3Jhc2tlLXJlYWN0LTIwMTYvY2xpZW50L3N0YXRpYy9hc3NldHMvc2l0ZS1sb2dvLnBuZ1wiIGFsdD1cIlNpdGUgTG9nb1wiIC8+XG5cdFx0XHQ8L2E+XG5cdFx0XHQ8L2Rpdj5cblxuXHRcdFx0PG5hdiBpZD1cInNpdGUtbmF2aWdhdGlvblwiIGNsYXNzTmFtZT1cIm1haW4tbmF2aWdhdGlvblwiIHJvbGU9XCJuYXZpZ2F0aW9uXCI+XG5cdFx0XHRcdDxidXR0b24gY2xhc3NOYW1lPVwibWVudS10b2dnbGVcIiBhcmlhLWNvbnRyb2xzPVwicHJpbWFyeS1tZW51XCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+PC9idXR0b24+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZW51LXByaW1hcnktY29udGFpbmVyXCI+ICoqTUVOVSBHT0VTIEhFUkUqKiA8L2Rpdj5cblx0XHRcdFx0XHQ8Zm9ybSBjbGFzc05hbWU9XCJzZWFyY2gtZm9ybVwiPiAqKlNFQVJDSEZPUk0gR09FUyBIRVJFKiogPC9mb3JtPlxuXHRcdFx0PC9uYXY+XG5cdFx0PC9oZWFkZXI+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyO1xuIiwiLyoqXG4gKiBNYWluIGVudHJ5IHBvaW50IGZvciByZWFjdCBjb21wb25lbnRzXG4gKi9cblxudmFyIFJlYWN0ID0gcmVxdWlyZSggJ3JlYWN0JyApO1xudmFyIFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG52YXIgUm91dGVyID0gcmVxdWlyZSggJy4vcm91dGVyLmpzeCcgKTtcblxudmFyIHJlYWN0Um9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnYXBwLXJvb3QnICk7XG52YXIgcGFnZVJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ3BhZ2UnICk7XG5SZWFjdERPTS5yZW5kZXIoPFJvdXRlciBpbml0aWFsUGFnZT17cGFnZVJvb3QuaW5uZXJIVE1MfSBpbml0aWFsQm9keUNsYXNzPXtwYWdlUm9vdC5jbGFzc05hbWV9Lz4sIHJlYWN0Um9vdCk7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBIZWFkZXJTa2lwTGluayA9IChwcm9wcykgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdDxhIGNsYXNzTmFtZT1cInNraXAtbGluayBzY3JlZW4tcmVhZGVyLXRleHRcIiBocmVmPVwiI21haW5cIj5Ta2lwIHRvIGNvbnRlbnQ8L2E+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyU2tpcExpbms7XG4iLCIvKipcbiAqIFdyYXBwZXIgY29tcG9uZW50IGZvciBSZWFjdCBBcHBsaWNhdGlvbiB3aGljaCBtYW5hZ2VzIHN0YXRlIHZpYSB0aGVcbiAqIHdvcmRwcmVzcyBVUkwuIFVzaW5nIHRoZSAncGFnZScgbGlicmFyeSBpbiBucG0gd2UgY2FuIGhpamFjayBub3JtYWwgbGlua1xuICogZXhlY3V0aW9uIGFuZCBpbnN0ZWFkIHVzZSB0aGUgZXZlbnQgdG8gZ2V0IHRoZSBuZXcgZGF0YSBmb3IgUmVhY3QgdG8gY29uc3VtZVxuICogYWxsIHRoZSB3aGlsZSB1cGRhdGluZyB0aGUgY3VycmVudCB1cmwgdXNpbmcgdGhlIEhpc3RvcnkgQVBJIHRvIG1ha2UgaXRcbiAqIGFwcGVhciB0aGF0IHlvdSBoYXZlIG1vdmVkIHRvIGEgbmV3IHBhZ2VcbiAqL1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCAncmVhY3QnICk7XG52YXIgdXJsUm91dGVyID0gcmVxdWlyZSggJ3BhZ2UnICk7XG52YXIgcmVxdWVzdCA9IHJlcXVpcmUoICdzdXBlcmFnZW50JyApO1xuXG52YXIgUGFnZSA9IHJlcXVpcmUoICcuL1BhZ2UuanN4JyApO1xuY2xhc3MgUm91dGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuXHRcdFx0aGFzU2VydmVyRGF0YTogZmFsc2UsXG5cdFx0XHRwb3N0czogW11cblx0XHR9XG5cdH1cblxuXHRjb21wb25lbnREaWRNb3VudCgpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHR1cmxSb3V0ZXIoICcqJywgZnVuY3Rpb24gKCBjdHggKSB7XG5cdFx0XHR2YXIgcGF0aE5hbWUgPSBjdHgucGF0aG5hbWU7XG5cdFx0XHR2YXIgc2VwZXJhdG9yQXBlcnNhbmQgPSAnJztcblx0XHRcdGlmIChjdHgucXVlcnlzdHJpbmcpe1xuXHRcdFx0XHRzZXBlcmF0b3JBcGVyc2FuZCA9ICcmJztcblx0XHRcdH1cblx0XHRcdHZhciBuZXdRdWVyeSA9ICc/JyArIGN0eC5xdWVyeXN0cmluZyArIHNlcGVyYXRvckFwZXJzYW5kICsgJ3JldHVybl9pbnN0ZWFkPXBvc3RzLWpzb24nO1xuXHRcdFx0dmFyIGRhdGFQYXRoID0gcGF0aE5hbWUgKyBuZXdRdWVyeTtcblx0XHRcdHJlcXVlc3Rcblx0XHRcdFx0LmdldCggZGF0YVBhdGggKVxuXHRcdFx0XHQuZW5kKCBmdW5jdGlvbiggZXJyLCByZXMgKSB7XG5cdFx0XHRcdFx0aWYgKGVycikge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnIpO1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR2YXIgZGF0YSA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuXHRcdFx0XHRcdHNlbGYuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdFx0aGFzU2VydmVyRGF0YTogdHJ1ZSxcblx0XHRcdFx0XHRcdHBvc3RzOiBkYXRhLnBvc3RzLFxuXHRcdFx0XHRcdFx0Ym9keUNsYXNzOiBkYXRhLmJvZHlfY2xhc3Ncblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcblx0XHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHR1cmxSb3V0ZXIoe1xuXHRcdFx0ZGlzcGF0Y2g6IGZhbHNlXG5cdFx0fSk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8UGFnZSBwb3N0cz17dGhpcy5zdGF0ZS5wb3N0c31cblx0XHRcdFx0XHRwYWdlQ2xhc3M9e3RoaXMuc3RhdGUuYm9keUNsYXNzfVxuXHRcdFx0XHRcdGhhc1NlcnZlckRhdGE9e3RoaXMuc3RhdGUuaGFzU2VydmVyRGF0YX1cblx0XHRcdFx0XHRpbml0aWFsUGFnZT17dGhpcy5wcm9wcy5pbml0aWFsUGFnZX1cblx0XHRcdFx0XHRpbml0aWFsUGFnZUNsYXNzPXt0aGlzLnByb3BzLmluaXRpYWxCb2R5Q2xhc3N9Lz5cblx0XHRcdCk7XG5cdFx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJvdXRlcjtcbiJdfQ==
