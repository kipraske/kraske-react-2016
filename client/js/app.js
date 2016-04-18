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

	// Update Random Color Scheme


	_createClass(Page, [{
		key: 'getRandomPaletteClass',
		value: function getRandomPaletteClass() {
			var minPalette = 1;
			var maxPalette = 4;
			var randInt = Math.floor(Math.random() * (maxPalette - minPalette + 1) + minPalette);
			return 'color-palette-' + randInt;
		}
	}, {
		key: 'postPaintUpdatePaletteClass',
		value: function postPaintUpdatePaletteClass() {
			var newPalette = this.getRandomPaletteClass();
			var pageContainer = this.refs.pageContainer;
			var colorPaletteRegex = /color-palette-\d/;
			var newClassList;
			newClassList = pageContainer.className.replace(/color-palette-\d/, '');
			pageContainer.className = newClassList;
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var pageClass = nextProps.pageClass;
			var colorPaletteRegex = /color-palette-\d/;
			var colorPaletteRegexGlobal = /\s?color-palette-\d/g;
			var newPaletteClass = pageClass.match(colorPaletteRegex)[0];
			var newClassList = pageClass.replace(colorPaletteRegexGlobal, '');
			this.setState({ colorPalette: newPaletteClass });
			this.setState({ pageClass: newClassList });
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			//this.postPaintUpdatePaletteClass();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			var _this2 = this;

			window.requestAnimationFrame(function () {
				var pageContainer = _this2.refs.pageContainer;
				pageContainer.className = _this2.state.pageClass + ' ' + 'color-palette-transition';
				window.requestAnimationFrame(function () {
					var pageContainer = _this2.refs.pageContainer;
					pageContainer.className = _this2.state.pageClass + ' ' + _this2.state.colorPalette;
				});
			});
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
				{ id: 'page', ref: 'pageContainer', className: this.state.pageClass, 'data-test-pallette': this.state.colorPalette },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvY29tcG9uZW50cy9QYWdlLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2NvbnRlbnQvZW50cnkvZm9vdGVyLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2NvbnRlbnQvZW50cnkvaGVhZGVyLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2NvbnRlbnQvbm9uZS5qc3giLCJjbGllbnQvY29tcG9uZW50cy9jb250ZW50L3JvbGx1cC5qc3giLCJjbGllbnQvY29tcG9uZW50cy9jb250ZW50L3NpbmdsZS5qc3giLCJjbGllbnQvY29tcG9uZW50cy9mb290ZXIuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvaGVhZGVyLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2luZGV4LmpzeCIsImNsaWVudC9jb21wb25lbnRzL21pc2MvaGVhZGVyLXNraXAtbGluay5qc3giLCJjbGllbnQvY29tcG9uZW50cy9yb3V0ZXIuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQ0FBLElBQUksUUFBUSxRQUFRLE9BQVIsQ0FBUjs7QUFFSixJQUFJLFNBQVMsUUFBUSxjQUFSLENBQVQ7QUFDSixJQUFJLGlCQUFpQixRQUFRLDZCQUFSLENBQWpCO0FBQ0osSUFBSSxTQUFTLFFBQVEsc0JBQVIsQ0FBVDtBQUNKLElBQUksU0FBUyxRQUFRLHNCQUFSLENBQVQ7QUFDSixJQUFJLE9BQU8sUUFBUSxvQkFBUixDQUFQO0FBQ0osSUFBSSxTQUFTLFFBQVEsY0FBUixDQUFUOzs7Ozs7OztJQU9FOzs7QUFFTCxVQUZLLElBRUwsQ0FBWSxLQUFaLEVBQWtCO3dCQUZiLE1BRWE7O3FFQUZiLGlCQUdFLFFBRFc7O0FBRWpCLFFBQUssS0FBTCxHQUFhO0FBQ1osaUJBQWMsaUJBQWQ7QUFDQSxjQUFXLEVBQVg7R0FGRCxDQUZpQjs7RUFBbEI7Ozs7O2NB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aEIsQ0FIbUI7O0FBNEJuQixhQUFVO0FBQ1QsY0FBVSxLQUFWO0lBREQsRUE1Qm1COzs7OzJCQWlDWDtBQUNQLFVBQ0Msb0JBQUMsSUFBRCxJQUFNLE9BQU8sS0FBSyxLQUFMLENBQVcsS0FBWDtBQUNaLGVBQVcsS0FBSyxLQUFMLENBQVcsU0FBWDtBQUNYLG1CQUFlLEtBQUssS0FBTCxDQUFXLGFBQVg7QUFDZixpQkFBYSxLQUFLLEtBQUwsQ0FBVyxXQUFYO0FBQ2Isc0JBQWtCLEtBQUssS0FBTCxDQUFXLGdCQUFYLEVBSm5CLENBREQsQ0FETzs7OztRQTNDSjtFQUFlLE1BQU0sU0FBTjs7QUFzRHJCLE9BQU8sT0FBUCxHQUFpQixNQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgSGVhZGVyID0gcmVxdWlyZSgnLi9oZWFkZXIuanN4Jyk7XG52YXIgSGVhZGVyU2tpcExpbmsgPSByZXF1aXJlKCcuL21pc2MvaGVhZGVyLXNraXAtbGluay5qc3gnKTtcbnZhciBSb2xsdXAgPSByZXF1aXJlKCcuL2NvbnRlbnQvcm9sbHVwLmpzeCcpO1xudmFyIFNpbmdsZSA9IHJlcXVpcmUoJy4vY29udGVudC9zaW5nbGUuanN4Jyk7XG52YXIgTm9uZSA9IHJlcXVpcmUoJy4vY29udGVudC9ub25lLmpzeCcpO1xudmFyIEZvb3RlciA9IHJlcXVpcmUoJy4vZm9vdGVyLmpzeCcpO1xuXG4vKipcbiAqIE1haW4gUGFnZSBDb21wb25lbnRcbiAqXG4gKiBBbHNvIGNvbnRyb2xzIHRoZSBmYW5jeSBjb2xvciB0b2dnbGUgb24gcGFnZSBlbGVtZW50c1xuICovXG5jbGFzcyBQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuc3RhdGUgPSB7XG5cdFx0XHRjb2xvclBhbGV0dGU6ICdjb2xvci1wYWxldHRlLTEnLFxuXHRcdFx0cGFnZUNsYXNzOiAnJ1xuXHRcdH1cblx0fVxuXG5cdC8vIFVwZGF0ZSBSYW5kb20gQ29sb3IgU2NoZW1lXG5cdGdldFJhbmRvbVBhbGV0dGVDbGFzcygpe1xuXHRcdGNvbnN0IG1pblBhbGV0dGUgPSAxO1xuXHRcdGNvbnN0IG1heFBhbGV0dGUgPSA0O1xuXHRcdGxldCByYW5kSW50ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heFBhbGV0dGUgLSBtaW5QYWxldHRlICsgMSkgKyBtaW5QYWxldHRlKTtcblx0XHRyZXR1cm4gJ2NvbG9yLXBhbGV0dGUtJyArIHJhbmRJbnQ7XG5cdH1cblxuXHRwb3N0UGFpbnRVcGRhdGVQYWxldHRlQ2xhc3MoKXtcblx0XHR2YXIgbmV3UGFsZXR0ZSA9IHRoaXMuZ2V0UmFuZG9tUGFsZXR0ZUNsYXNzKCk7XG5cdFx0dmFyIHBhZ2VDb250YWluZXIgPSB0aGlzLnJlZnMucGFnZUNvbnRhaW5lcjtcblx0XHR2YXIgY29sb3JQYWxldHRlUmVnZXggPSAvY29sb3ItcGFsZXR0ZS1cXGQvO1xuXHRcdHZhciBuZXdDbGFzc0xpc3Q7XG5cdFx0bmV3Q2xhc3NMaXN0ID0gcGFnZUNvbnRhaW5lci5jbGFzc05hbWUucmVwbGFjZSgvY29sb3ItcGFsZXR0ZS1cXGQvLCAnJyk7XG5cdFx0cGFnZUNvbnRhaW5lci5jbGFzc05hbWUgPSBuZXdDbGFzc0xpc3Q7XG5cdH1cblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XG5cdFx0dmFyIHBhZ2VDbGFzcyA9IG5leHRQcm9wcy5wYWdlQ2xhc3M7XG5cdFx0dmFyIGNvbG9yUGFsZXR0ZVJlZ2V4ID0gL2NvbG9yLXBhbGV0dGUtXFxkLztcblx0XHR2YXIgY29sb3JQYWxldHRlUmVnZXhHbG9iYWwgPSAvXFxzP2NvbG9yLXBhbGV0dGUtXFxkL2c7XG5cdFx0dmFyIG5ld1BhbGV0dGVDbGFzcyA9IHBhZ2VDbGFzcy5tYXRjaChjb2xvclBhbGV0dGVSZWdleClbMF07XG5cdFx0dmFyIG5ld0NsYXNzTGlzdCA9IHBhZ2VDbGFzcy5yZXBsYWNlKGNvbG9yUGFsZXR0ZVJlZ2V4R2xvYmFsLCAnJyk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7Y29sb3JQYWxldHRlOiBuZXdQYWxldHRlQ2xhc3N9KTtcblx0XHR0aGlzLnNldFN0YXRlKHtwYWdlQ2xhc3M6IG5ld0NsYXNzTGlzdH0pO1xuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKXtcblx0XHQvL3RoaXMucG9zdFBhaW50VXBkYXRlUGFsZXR0ZUNsYXNzKCk7XG5cdH1cblxuXHRjb21wb25lbnREaWRVcGRhdGUoKXtcblx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCAoKSA9PiB7XG5cdFx0XHR2YXIgcGFnZUNvbnRhaW5lciA9IHRoaXMucmVmcy5wYWdlQ29udGFpbmVyO1xuXHRcdFx0cGFnZUNvbnRhaW5lci5jbGFzc05hbWUgPSB0aGlzLnN0YXRlLnBhZ2VDbGFzcyArICcgJyArICdjb2xvci1wYWxldHRlLXRyYW5zaXRpb24nO1xuXHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSggKCkgPT4ge1xuXHRcdFx0XHR2YXIgcGFnZUNvbnRhaW5lciA9IHRoaXMucmVmcy5wYWdlQ29udGFpbmVyO1xuXHRcdFx0XHRwYWdlQ29udGFpbmVyLmNsYXNzTmFtZSA9IHRoaXMuc3RhdGUucGFnZUNsYXNzICsgJyAnICsgdGhpcy5zdGF0ZS5jb2xvclBhbGV0dGU7XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXG5cdH1cblxuXHRyZW5kZXIoKXtcblxuXHRcdC8vIElmIHdlIHBhc3NlZCBpbiBpbnRpYWwgcGFnZSBodG1sIGluc3RlYWQgb2YgYSBwb3N0IG9iamVjdCByZW5kZXJcblx0XHQvLyB0aGF0IGluc3RlYWQgb2YgdGhlIFwicmVhbFwiIHJlYWN0IGFwcFxuXHRcdGlmICghdGhpcy5wcm9wcy5oYXNTZXJ2ZXJEYXRhKXtcblx0XHRcdHZhciBpbnRpYWxQYWdlSFRNTCA9IHtfX2h0bWw6IHRoaXMucHJvcHMuaW5pdGlhbFBhZ2V9O1xuXHRcdFx0cmV0dXJuIDxkaXYgaWQ9XCJwYWdlXCIgcmVmPVwicGFnZUNvbnRhaW5lclwiIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5pbml0aWFsUGFnZUNsYXNzfSBkYW5nZXJvdXNseVNldElubmVySFRNTD17aW50aWFsUGFnZUhUTUx9IC8+XG5cdFx0fVxuXG5cdFx0Ly8gVGhpcyBpcyB0aGUgbm9ybWFsIHBvc3QtcmVuZGVyZXIgcmVhY3QgYXBwc1xuXHRcdHZhciBudW1iZXJPZlBvc3RzID0gdGhpcy5wcm9wcy5wb3N0cy5sZW5ndGg7XG5cdFx0dmFyIGNvbnRlbnRFbGVtZW50O1xuXHRcdGlmIChudW1iZXJPZlBvc3RzID4gMSkge1xuXHRcdFx0Y29udGVudEVsZW1lbnQgPSBbXTtcblx0XHRcdGZvciAobGV0IHBvc3Qgb2YgdGhpcy5wcm9wcy5wb3N0cyl7XG5cdFx0XHRcdGNvbnRlbnRFbGVtZW50LnB1c2goPFJvbGx1cCBwb3N0PXtwb3N0fSBrZXk9e3Bvc3QuaWR9Lz4pO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAobnVtYmVyT2ZQb3N0cyA9PT0gMSkge1xuXHRcdFx0bGV0IHBvc3QgPSB0aGlzLnByb3BzLnBvc3RzWzBdO1xuXHRcdFx0Y29udGVudEVsZW1lbnQgPSA8U2luZ2xlIHBvc3Q9e3Bvc3R9Lz47XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnRlbnRFbGVtZW50ID0gPE5vbmUgLz47XG5cdFx0fVxuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgaWQ9XCJwYWdlXCIgcmVmPVwicGFnZUNvbnRhaW5lclwiIGNsYXNzTmFtZT17dGhpcy5zdGF0ZS5wYWdlQ2xhc3N9IGRhdGEtdGVzdC1wYWxsZXR0ZT17dGhpcy5zdGF0ZS5jb2xvclBhbGV0dGV9PlxuXHRcdFx0XHQ8SGVhZGVyU2tpcExpbmsgLz5cblx0XHRcdFx0PEhlYWRlciAvPlxuXHRcdFx0XHQ8ZGl2IGlkPVwiY29udGVudFwiIGNsYXNzTmFtZT1cInNpdGUtY29udGVudFwiPlxuXHRcdFx0XHRcdDxkaXYgaWQ9XCJwcmltYXJ5XCIgY2xhc3NOYW1lPVwiY29udGVudC1hcmVhXCI+XG5cdFx0XHRcdFx0XHQ8bWFpbiBpZD1cIm1haW5cIiBjbGFzc05hbWU9XCJzaXRlLW1haW5cIiByb2xlPVwibWFpblwiPlxuXHRcdFx0XHRcdFx0e2NvbnRlbnRFbGVtZW50fVxuXHRcdFx0XHRcdFx0PC9tYWluPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PEZvb3RlciAvPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2U7XG4iLCIvLyBUT0RPIC0gcHJvYmFibHkgbmVlZGVkIHRvIGltcGxlbWVudCBjb21tZW50cyBsYXRlciwgYnV0IGF0IHRoZSBtb21lbnRcbi8vIGxldCdzIG5vdCB1c2UgdGhpcyBmb3Igbm93XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IEZvb3RlciA9IChwcm9wcykgPT4ge1xuXHRyZXR1cm4oXG5cdFx0PGZvb3RlciBjbGFzc05hbWU9XCJlbnRyeS1mb290ZXJcIj5cblx0XHRcdCoqIENvbW1lbnRzIGFuZCBTdHVmZiBHbyBoZXJlIGV2ZW50dWFsbHkgKipcblx0XHQ8L2Zvb3Rlcj5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGb290ZXI7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBIZWFkZXIgPSAocHJvcHMpID0+IHtcblx0dmFyIGVudHJ5TWV0YTtcblx0aWYgKHByb3BzLnBvc3RfdHlwZSA9PT0gJ3Bvc3QnKXtcblx0XHR2YXIgbWV0YUhUTUwgPSB7X19odG1sOiBwcm9wcy5tZXRhfTtcblx0XHRlbnRyeU1ldGEgPSAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImVudHJ5LW1ldGFcIiBkYW5nZXJvdXNseVNldElubmVySFRNTD17bWV0YUhUTUx9ID48L2Rpdj5cblx0XHQpXG5cdH1cblxuXHRyZXR1cm4oXG5cdFx0PGhlYWRlciBjbGFzc05BbWU9XCJlbnRyeS1oZWFkZXJcIj5cblx0XHRcdDxoMiBjbGFzc05hbWU9XCJlbnRyeS10aXRsZVwiPjxhIGhyZWY9e3Byb3BzLnBlcm1hbGlua30+e3Byb3BzLnRpdGxlfTwvYT48L2gyPlxuXHRcdFx0e2VudHJ5TWV0YX1cblx0XHQ8L2hlYWRlcj5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBIZWFkZXI7XG4iLCIvLyBUT0RPIC0gbmVlZCB0aGlzIHRlbXBsYXRlIGZsZXNoZWQgb3V0IHRvb1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBOb25lID0gKHByb3BzKSA9PiB7XG5cdHJldHVybiAoXG5cdFx0PHNlY3Rpb24gY2xhc3NOYW1lPVwibm8tcmVzdWx0cyBub3QtZm91bmRcIj5cblx0XHRcdDxoZWFkZXIgY2xhc3NOYW1lPVwicGFnZS1oZWFkZXJcIj5cblx0XHRcdFx0PGgxIGNsYXNzTmFtZT1cInBhZ2UtdGl0bGVcIj4gTm90aGluZyBGb3VuZCA8L2gxPlxuXHRcdFx0PC9oZWFkZXI+XG5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFnZS1jb250ZW50XCI+XG5cdFx0XHRcdCoqIFRIRVJFIElTTidUIEFOWSBQT1NUUyBkbyB5b3Ugd2FudCB0byBzZWFyY2g/ICoqXG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L3NlY3Rpb24+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTm9uZTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgRW50cnkgPSB7XG5cdEhlYWRlciA6IHJlcXVpcmUoJy4vZW50cnkvaGVhZGVyLmpzeCcpLFxuXHRGb290ZXIgOiByZXF1aXJlKCcuL2VudHJ5L2Zvb3Rlci5qc3gnKSxcbn1cblxuY29uc3QgUm9sbHVwID0gKHByb3BzKSA9PiB7XG5cdHZhciBleGNlcnB0SFRNTCA9IHtfX2h0bWw6IHByb3BzLnBvc3QuZXhjZXJwdH07XG5cblx0cmV0dXJuIChcblx0XHQ8YXJ0aWNsZSBpZD17cHJvcHMucG9zdC5pZH0gY2xhc3NOYW1lPXtwcm9wcy5wb3N0LmNzc19jbGFzc30+XG5cdFx0XHQ8RW50cnkuSGVhZGVyXG5cdFx0XHRcdHRpdGxlPXtwcm9wcy5wb3N0LnRpdGxlfVxuXHRcdFx0XHRwZXJtYWxpbms9e3Byb3BzLnBvc3QucGVybWFsaW5rfVxuXHRcdFx0XHRtZXRhPXtwcm9wcy5wb3N0LnRlbXBsYXRlX3RhZ3MucG9zdGVkX29ufVxuXHRcdFx0XHRwb3N0X3R5cGU9e3Byb3BzLnBvc3QucG9zdF90eXBlfS8+XG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImVudHJ5LXN1bW1hcnlcIiBkYW5nZXJvdXNseVNldElubmVySFRNTD17ZXhjZXJwdEhUTUx9PjwvZGl2PlxuXHRcdDwvYXJ0aWNsZT5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSb2xsdXA7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIEVudHJ5ID0ge1xuXHRIZWFkZXIgOiByZXF1aXJlKCcuL2VudHJ5L2hlYWRlci5qc3gnKSxcblx0Rm9vdGVyIDogcmVxdWlyZSgnLi9lbnRyeS9mb290ZXIuanN4JyksXG59XG5cbmNvbnN0IFNpbmdsZSA9IChwcm9wcykgPT4ge1xuXHR2YXIgY29udGVudEhUTUwgPSB7X19odG1sOiBwcm9wcy5wb3N0LmNvbnRlbnR9O1xuXHRyZXR1cm4gKFxuXHRcdDxhcnRpY2xlIGlkPXtwcm9wcy5wb3N0LmlkfSBjbGFzc05hbWU9e3Byb3BzLnBvc3QuY3NzX2NsYXNzfT5cblx0XHRcdDxFbnRyeS5IZWFkZXJcblx0XHRcdFx0dGl0bGU9e3Byb3BzLnBvc3QudGl0bGV9XG5cdFx0XHRcdHBlcm1hbGluaz17cHJvcHMucG9zdC5wZXJtYWxpbmt9XG5cdFx0XHRcdG1ldGE9e3Byb3BzLnBvc3QudGVtcGxhdGVfdGFncy5wb3N0ZWRfb259XG5cdFx0XHRcdHBvc3RfdHlwZT17cHJvcHMucG9zdC5wb3N0X3R5cGV9Lz5cblxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJlbnRyeS1jb250ZW50XCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e2NvbnRlbnRIVE1MfT48L2Rpdj5cblxuXHRcdFx0PEVudHJ5LkZvb3RlciAvPlxuXHRcdDwvYXJ0aWNsZT5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTaW5nbGU7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBGb290ZXIgPSAocHJvcHMpID0+IHtcblx0cmV0dXJuIChcblx0XHQ8Zm9vdGVyIGlkPVwiY29sb3Bob25cIiBjbGFzc05hbWU9XCJzaXRlLWZvb3RlclwiIHJvbGU9XCJjb250ZW50aW5mb1wiPlxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzaXRlLWluZm9cIj5cblx0XHRcdFx0KipIRVJFIElTIFRIRSBGT09URVIqKlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9mb290ZXI+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRm9vdGVyO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgSGVhZGVyID0gKHByb3BzKSA9PiB7XG5cdHJldHVybiAoXG5cdFx0PGhlYWRlciBpZD1cIm1hc3RoZWFkXCIgY2xhc3NOYW1lPVwic2l0ZS1oZWFkZXJcIiByb2xlPVwiYmFubmVyXCI+XG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNpdGUtbG9nb1wiPlxuXHRcdFx0PGEgaHJlZj1cIi9cIiByZWw9XCJob21lXCI+XG5cdFx0XHRcdDxpbWcgc3JjPVwiL3dwLWNvbnRlbnQvdGhlbWVzL2tyYXNrZS1yZWFjdC0yMDE2L2NsaWVudC9zdGF0aWMvYXNzZXRzL3NpdGUtbG9nby5wbmdcIiBhbHQ9XCJTaXRlIExvZ29cIiAvPlxuXHRcdFx0PC9hPlxuXHRcdFx0PC9kaXY+XG5cblx0XHRcdDxuYXYgaWQ9XCJzaXRlLW5hdmlnYXRpb25cIiBjbGFzc05hbWU9XCJtYWluLW5hdmlnYXRpb25cIiByb2xlPVwibmF2aWdhdGlvblwiPlxuXHRcdFx0XHQ8YnV0dG9uIGNsYXNzTmFtZT1cIm1lbnUtdG9nZ2xlXCIgYXJpYS1jb250cm9scz1cInByaW1hcnktbWVudVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPjwvYnV0dG9uPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVudS1wcmltYXJ5LWNvbnRhaW5lclwiPiAqKk1FTlUgR09FUyBIRVJFKiogPC9kaXY+XG5cdFx0XHRcdFx0PGZvcm0gY2xhc3NOYW1lPVwic2VhcmNoLWZvcm1cIj4gKipTRUFSQ0hGT1JNIEdPRVMgSEVSRSoqIDwvZm9ybT5cblx0XHRcdDwvbmF2PlxuXHRcdDwvaGVhZGVyPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlcjtcbiIsIi8qKlxuICogTWFpbiBlbnRyeSBwb2ludCBmb3IgcmVhY3QgY29tcG9uZW50c1xuICovXG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoICdyZWFjdCcgKTtcbnZhciBSZWFjdERPTSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xudmFyIFJvdXRlciA9IHJlcXVpcmUoICcuL3JvdXRlci5qc3gnICk7XG5cbnZhciByZWFjdFJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2FwcC1yb290JyApO1xudmFyIHBhZ2VSb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdwYWdlJyApO1xuUmVhY3RET00ucmVuZGVyKDxSb3V0ZXIgaW5pdGlhbFBhZ2U9e3BhZ2VSb290LmlubmVySFRNTH0gaW5pdGlhbEJvZHlDbGFzcz17cGFnZVJvb3QuY2xhc3NOYW1lfS8+LCByZWFjdFJvb3QpO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgSGVhZGVyU2tpcExpbmsgPSAocHJvcHMpID0+IHtcblx0cmV0dXJuIChcblx0XHQ8YSBjbGFzc05hbWU9XCJza2lwLWxpbmsgc2NyZWVuLXJlYWRlci10ZXh0XCIgaHJlZj1cIiNtYWluXCI+U2tpcCB0byBjb250ZW50PC9hPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlclNraXBMaW5rO1xuIiwiLyoqXG4gKiBXcmFwcGVyIGNvbXBvbmVudCBmb3IgUmVhY3QgQXBwbGljYXRpb24gd2hpY2ggbWFuYWdlcyBzdGF0ZSB2aWEgdGhlXG4gKiB3b3JkcHJlc3MgVVJMLiBVc2luZyB0aGUgJ3BhZ2UnIGxpYnJhcnkgaW4gbnBtIHdlIGNhbiBoaWphY2sgbm9ybWFsIGxpbmtcbiAqIGV4ZWN1dGlvbiBhbmQgaW5zdGVhZCB1c2UgdGhlIGV2ZW50IHRvIGdldCB0aGUgbmV3IGRhdGEgZm9yIFJlYWN0IHRvIGNvbnN1bWVcbiAqIGFsbCB0aGUgd2hpbGUgdXBkYXRpbmcgdGhlIGN1cnJlbnQgdXJsIHVzaW5nIHRoZSBIaXN0b3J5IEFQSSB0byBtYWtlIGl0XG4gKiBhcHBlYXIgdGhhdCB5b3UgaGF2ZSBtb3ZlZCB0byBhIG5ldyBwYWdlXG4gKi9cblxudmFyIFJlYWN0ID0gcmVxdWlyZSggJ3JlYWN0JyApO1xudmFyIHVybFJvdXRlciA9IHJlcXVpcmUoICdwYWdlJyApO1xudmFyIHJlcXVlc3QgPSByZXF1aXJlKCAnc3VwZXJhZ2VudCcgKTtcblxudmFyIFBhZ2UgPSByZXF1aXJlKCAnLi9QYWdlLmpzeCcgKTtcbmNsYXNzIFJvdXRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcblx0XHRcdGhhc1NlcnZlckRhdGE6IGZhbHNlLFxuXHRcdFx0cG9zdHM6IFtdXG5cdFx0fVxuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFx0dXJsUm91dGVyKCAnKicsIGZ1bmN0aW9uICggY3R4ICkge1xuXHRcdFx0dmFyIHBhdGhOYW1lID0gY3R4LnBhdGhuYW1lO1xuXHRcdFx0dmFyIHNlcGVyYXRvckFwZXJzYW5kID0gJyc7XG5cdFx0XHRpZiAoY3R4LnF1ZXJ5c3RyaW5nKXtcblx0XHRcdFx0c2VwZXJhdG9yQXBlcnNhbmQgPSAnJic7XG5cdFx0XHR9XG5cdFx0XHR2YXIgbmV3UXVlcnkgPSAnPycgKyBjdHgucXVlcnlzdHJpbmcgKyBzZXBlcmF0b3JBcGVyc2FuZCArICdyZXR1cm5faW5zdGVhZD1wb3N0cy1qc29uJztcblx0XHRcdHZhciBkYXRhUGF0aCA9IHBhdGhOYW1lICsgbmV3UXVlcnk7XG5cdFx0XHRyZXF1ZXN0XG5cdFx0XHRcdC5nZXQoIGRhdGFQYXRoIClcblx0XHRcdFx0LmVuZCggZnVuY3Rpb24oIGVyciwgcmVzICkge1xuXHRcdFx0XHRcdGlmIChlcnIpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dmFyIGRhdGEgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcblx0XHRcdFx0XHRzZWxmLnNldFN0YXRlKHtcblx0XHRcdFx0XHRcdGhhc1NlcnZlckRhdGE6IHRydWUsXG5cdFx0XHRcdFx0XHRwb3N0czogZGF0YS5wb3N0cyxcblx0XHRcdFx0XHRcdGJvZHlDbGFzczogZGF0YS5ib2R5X2NsYXNzXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0dXJsUm91dGVyKHtcblx0XHRcdGRpc3BhdGNoOiBmYWxzZVxuXHRcdH0pO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PFBhZ2UgcG9zdHM9e3RoaXMuc3RhdGUucG9zdHN9XG5cdFx0XHRcdFx0cGFnZUNsYXNzPXt0aGlzLnN0YXRlLmJvZHlDbGFzc31cblx0XHRcdFx0XHRoYXNTZXJ2ZXJEYXRhPXt0aGlzLnN0YXRlLmhhc1NlcnZlckRhdGF9XG5cdFx0XHRcdFx0aW5pdGlhbFBhZ2U9e3RoaXMucHJvcHMuaW5pdGlhbFBhZ2V9XG5cdFx0XHRcdFx0aW5pdGlhbFBhZ2VDbGFzcz17dGhpcy5wcm9wcy5pbml0aWFsQm9keUNsYXNzfS8+XG5cdFx0XHQpO1xuXHRcdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSb3V0ZXI7XG4iXX0=
