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
			colorPalette: 'color-palette-1'
		};
		return _this;
	}

	// Update Random Color Scheme


	_createClass(Page, [{
		key: 'getRandomPaletteClass',
		value: function getRandomPaletteClass() {
			var minPalette = 1;
			var maxPalette = 4;
			var randInt = Math.floor(Math.random() * (maxPalette - minPalette) + minPalette);
			return 'color-palette-' + randInt;
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps() {
			var newPalette = this.getRandomPaletteClass();
			this.setState({ colorPalette: newPalette });
		}
	}, {
		key: 'render',
		value: function render() {

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
				{ id: 'page', className: this.state.colorPalette },
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
ReactDOM.render(React.createElement(Router, { initialPage: reactRoot.innerHTML }), reactRoot);

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
			initialPageMarkup: {
				__html: _this.props.initialPage
			},
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
					var returnPosts = JSON.parse(res.text);
					self.setState({
						hasServerData: true,
						posts: returnPosts
					});
					console.log(returnPosts);
				});
			});

			urlRouter({
				dispatch: false
			});
		}
	}, {
		key: 'render',
		value: function render() {
			if (this.state.hasServerData) {
				return React.createElement(Page, { posts: this.state.posts });
			} else {
				return React.createElement('div', { dangerouslySetInnerHTML: this.state.initialPageMarkup });
			}
		}
	}]);

	return Router;
}(React.Component);

module.exports = Router;

},{"./Page.jsx":1,"page":"page","react":"react","superagent":"superagent"}]},{},[9])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvY29tcG9uZW50cy9QYWdlLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2NvbnRlbnQvZW50cnkvZm9vdGVyLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2NvbnRlbnQvZW50cnkvaGVhZGVyLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2NvbnRlbnQvbm9uZS5qc3giLCJjbGllbnQvY29tcG9uZW50cy9jb250ZW50L3JvbGx1cC5qc3giLCJjbGllbnQvY29tcG9uZW50cy9jb250ZW50L3NpbmdsZS5qc3giLCJjbGllbnQvY29tcG9uZW50cy9mb290ZXIuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvaGVhZGVyLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2luZGV4LmpzeCIsImNsaWVudC9jb21wb25lbnRzL21pc2MvaGVhZGVyLXNraXAtbGluay5qc3giLCJjbGllbnQvY29tcG9uZW50cy9yb3V0ZXIuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQ0FBLElBQUksUUFBUSxRQUFRLE9BQVIsQ0FBUjs7QUFFSixJQUFJLFNBQVMsUUFBUSxjQUFSLENBQVQ7QUFDSixJQUFJLGlCQUFpQixRQUFRLDZCQUFSLENBQWpCO0FBQ0osSUFBSSxTQUFTLFFBQVEsc0JBQVIsQ0FBVDtBQUNKLElBQUksU0FBUyxRQUFRLHNCQUFSLENBQVQ7QUFDSixJQUFJLE9BQU8sUUFBUSxvQkFBUixDQUFQO0FBQ0osSUFBSSxTQUFTLFFBQVEsY0FBUixDQUFUOzs7Ozs7OztJQU9FOzs7QUFFTCxVQUZLLElBRUwsQ0FBWSxLQUFaLEVBQWtCO3dCQUZiLE1BRWE7O3FFQUZiLGlCQUdFLFFBRFc7O0FBRWpCLFFBQUssS0FBTCxHQUFhO0FBQ1osaUJBQWMsaUJBQWQ7R0FERCxDQUZpQjs7RUFBbEI7Ozs7O2NBRks7OzBDQVVrQjtBQUN0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LEdBQWlCLE1BQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBIZWFkZXIgPSByZXF1aXJlKCcuL2hlYWRlci5qc3gnKTtcbnZhciBIZWFkZXJTa2lwTGluayA9IHJlcXVpcmUoJy4vbWlzYy9oZWFkZXItc2tpcC1saW5rLmpzeCcpO1xudmFyIFJvbGx1cCA9IHJlcXVpcmUoJy4vY29udGVudC9yb2xsdXAuanN4Jyk7XG52YXIgU2luZ2xlID0gcmVxdWlyZSgnLi9jb250ZW50L3NpbmdsZS5qc3gnKTtcbnZhciBOb25lID0gcmVxdWlyZSgnLi9jb250ZW50L25vbmUuanN4Jyk7XG52YXIgRm9vdGVyID0gcmVxdWlyZSgnLi9mb290ZXIuanN4Jyk7XG5cbi8qKlxuICogTWFpbiBQYWdlIENvbXBvbmVudFxuICpcbiAqIEFsc28gY29udHJvbHMgdGhlIGZhbmN5IGNvbG9yIHRvZ2dsZSBvbiBwYWdlIGVsZW1lbnRzXG4gKi9cbmNsYXNzIFBhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG5cdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5zdGF0ZSA9IHtcblx0XHRcdGNvbG9yUGFsZXR0ZTogJ2NvbG9yLXBhbGV0dGUtMSdcblx0XHR9XG5cdH1cblxuXHQvLyBVcGRhdGUgUmFuZG9tIENvbG9yIFNjaGVtZVxuXHRnZXRSYW5kb21QYWxldHRlQ2xhc3MoKXtcblx0XHRjb25zdCBtaW5QYWxldHRlID0gMTtcblx0XHRjb25zdCBtYXhQYWxldHRlID0gNDtcblx0XHRsZXQgcmFuZEludCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXhQYWxldHRlIC0gbWluUGFsZXR0ZSkgKyBtaW5QYWxldHRlKTtcblx0XHRyZXR1cm4gJ2NvbG9yLXBhbGV0dGUtJyArIHJhbmRJbnQ7XG5cdH1cblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCl7XG5cdFx0bGV0IG5ld1BhbGV0dGUgPSB0aGlzLmdldFJhbmRvbVBhbGV0dGVDbGFzcygpO1xuXHRcdHRoaXMuc2V0U3RhdGUoe2NvbG9yUGFsZXR0ZTogbmV3UGFsZXR0ZX0pO1xuXHR9XG5cblx0cmVuZGVyKCl7XG5cblxuXHRcdHZhciBudW1iZXJPZlBvc3RzID0gdGhpcy5wcm9wcy5wb3N0cy5sZW5ndGg7XG5cdFx0dmFyIGNvbnRlbnRFbGVtZW50O1xuXHRcdGlmIChudW1iZXJPZlBvc3RzID4gMSkge1xuXHRcdFx0Y29udGVudEVsZW1lbnQgPSBbXTtcblx0XHRcdGZvciAobGV0IHBvc3Qgb2YgdGhpcy5wcm9wcy5wb3N0cyl7XG5cdFx0XHRcdGNvbnRlbnRFbGVtZW50LnB1c2goPFJvbGx1cCBwb3N0PXtwb3N0fSBrZXk9e3Bvc3QuaWR9Lz4pO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAobnVtYmVyT2ZQb3N0cyA9PT0gMSkge1xuXHRcdFx0bGV0IHBvc3QgPSB0aGlzLnByb3BzLnBvc3RzWzBdO1xuXHRcdFx0Y29udGVudEVsZW1lbnQgPSA8U2luZ2xlIHBvc3Q9e3Bvc3R9Lz47XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnRlbnRFbGVtZW50ID0gPE5vbmUgLz47XG5cdFx0fVxuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgaWQ9XCJwYWdlXCIgY2xhc3NOYW1lPXt0aGlzLnN0YXRlLmNvbG9yUGFsZXR0ZX0+XG5cdFx0XHRcdDxIZWFkZXJTa2lwTGluayAvPlxuXHRcdFx0XHQ8SGVhZGVyIC8+XG5cdFx0XHRcdDxkaXYgaWQ9XCJjb250ZW50XCIgY2xhc3NOYW1lPVwic2l0ZS1jb250ZW50XCI+XG5cdFx0XHRcdFx0PGRpdiBpZD1cInByaW1hcnlcIiBjbGFzc05hbWU9XCJjb250ZW50LWFyZWFcIj5cblx0XHRcdFx0XHRcdDxtYWluIGlkPVwibWFpblwiIGNsYXNzTmFtZT1cInNpdGUtbWFpblwiIHJvbGU9XCJtYWluXCI+XG5cdFx0XHRcdFx0XHR7Y29udGVudEVsZW1lbnR9XG5cdFx0XHRcdFx0XHQ8L21haW4+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8Rm9vdGVyIC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZTtcbiIsIi8vIFRPRE8gLSBwcm9iYWJseSBuZWVkZWQgdG8gaW1wbGVtZW50IGNvbW1lbnRzIGxhdGVyLCBidXQgYXQgdGhlIG1vbWVudFxuLy8gbGV0J3Mgbm90IHVzZSB0aGlzIGZvciBub3dcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgRm9vdGVyID0gKHByb3BzKSA9PiB7XG5cdHJldHVybihcblx0XHQ8Zm9vdGVyIGNsYXNzTmFtZT1cImVudHJ5LWZvb3RlclwiPlxuXHRcdFx0KiogQ29tbWVudHMgYW5kIFN0dWZmIEdvIGhlcmUgZXZlbnR1YWxseSAqKlxuXHRcdDwvZm9vdGVyPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZvb3RlcjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IEhlYWRlciA9IChwcm9wcykgPT4ge1xuXHR2YXIgZW50cnlNZXRhO1xuXHRpZiAocHJvcHMucG9zdF90eXBlID09PSAncG9zdCcpe1xuXHRcdHZhciBtZXRhSFRNTCA9IHtfX2h0bWw6IHByb3BzLm1ldGF9O1xuXHRcdGVudHJ5TWV0YSA9IChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZW50cnktbWV0YVwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXttZXRhSFRNTH0gPjwvZGl2PlxuXHRcdClcblx0fVxuXG5cdHJldHVybihcblx0XHQ8aGVhZGVyIGNsYXNzTkFtZT1cImVudHJ5LWhlYWRlclwiPlxuXHRcdFx0PGgyIGNsYXNzTmFtZT1cImVudHJ5LXRpdGxlXCI+PGEgaHJlZj17cHJvcHMucGVybWFsaW5rfT57cHJvcHMudGl0bGV9PC9hPjwvaDI+XG5cdFx0XHR7ZW50cnlNZXRhfVxuXHRcdDwvaGVhZGVyPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlcjtcbiIsIi8vIFRPRE8gLSBuZWVkIHRoaXMgdGVtcGxhdGUgZmxlc2hlZCBvdXQgdG9vXG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IE5vbmUgPSAocHJvcHMpID0+IHtcblx0cmV0dXJuIChcblx0XHQ8c2VjdGlvbiBjbGFzc05hbWU9XCJuby1yZXN1bHRzIG5vdC1mb3VuZFwiPlxuXHRcdFx0PGhlYWRlciBjbGFzc05hbWU9XCJwYWdlLWhlYWRlclwiPlxuXHRcdFx0XHQ8aDEgY2xhc3NOYW1lPVwicGFnZS10aXRsZVwiPiBOb3RoaW5nIEZvdW5kIDwvaDE+XG5cdFx0XHQ8L2hlYWRlcj5cblxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYWdlLWNvbnRlbnRcIj5cblx0XHRcdFx0KiogVEhFUkUgSVNOJ1QgQU5ZIFBPU1RTIGRvIHlvdSB3YW50IHRvIHNlYXJjaD8gKipcblx0XHRcdDwvZGl2PlxuXHRcdDwvc2VjdGlvbj5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBOb25lO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBFbnRyeSA9IHtcblx0SGVhZGVyIDogcmVxdWlyZSgnLi9lbnRyeS9oZWFkZXIuanN4JyksXG5cdEZvb3RlciA6IHJlcXVpcmUoJy4vZW50cnkvZm9vdGVyLmpzeCcpLFxufVxuXG5jb25zdCBSb2xsdXAgPSAocHJvcHMpID0+IHtcblx0dmFyIGV4Y2VycHRIVE1MID0ge19faHRtbDogcHJvcHMucG9zdC5leGNlcnB0fTtcblxuXHRyZXR1cm4gKFxuXHRcdDxhcnRpY2xlIGlkPXtwcm9wcy5wb3N0LmlkfSBjbGFzc05hbWU9e3Byb3BzLnBvc3QuY3NzX2NsYXNzfT5cblx0XHRcdDxFbnRyeS5IZWFkZXJcblx0XHRcdFx0dGl0bGU9e3Byb3BzLnBvc3QudGl0bGV9XG5cdFx0XHRcdHBlcm1hbGluaz17cHJvcHMucG9zdC5wZXJtYWxpbmt9XG5cdFx0XHRcdG1ldGE9e3Byb3BzLnBvc3QudGVtcGxhdGVfdGFncy5wb3N0ZWRfb259XG5cdFx0XHRcdHBvc3RfdHlwZT17cHJvcHMucG9zdC5wb3N0X3R5cGV9Lz5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZW50cnktc3VtbWFyeVwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtleGNlcnB0SFRNTH0+PC9kaXY+XG5cdFx0PC9hcnRpY2xlPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJvbGx1cDtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgRW50cnkgPSB7XG5cdEhlYWRlciA6IHJlcXVpcmUoJy4vZW50cnkvaGVhZGVyLmpzeCcpLFxuXHRGb290ZXIgOiByZXF1aXJlKCcuL2VudHJ5L2Zvb3Rlci5qc3gnKSxcbn1cblxuY29uc3QgU2luZ2xlID0gKHByb3BzKSA9PiB7XG5cdHZhciBjb250ZW50SFRNTCA9IHtfX2h0bWw6IHByb3BzLnBvc3QuY29udGVudH07XG5cdHJldHVybiAoXG5cdFx0PGFydGljbGUgaWQ9e3Byb3BzLnBvc3QuaWR9IGNsYXNzTmFtZT17cHJvcHMucG9zdC5jc3NfY2xhc3N9PlxuXHRcdFx0PEVudHJ5LkhlYWRlclxuXHRcdFx0XHR0aXRsZT17cHJvcHMucG9zdC50aXRsZX1cblx0XHRcdFx0cGVybWFsaW5rPXtwcm9wcy5wb3N0LnBlcm1hbGlua31cblx0XHRcdFx0bWV0YT17cHJvcHMucG9zdC50ZW1wbGF0ZV90YWdzLnBvc3RlZF9vbn1cblx0XHRcdFx0cG9zdF90eXBlPXtwcm9wcy5wb3N0LnBvc3RfdHlwZX0vPlxuXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImVudHJ5LWNvbnRlbnRcIiBkYW5nZXJvdXNseVNldElubmVySFRNTD17Y29udGVudEhUTUx9PjwvZGl2PlxuXG5cdFx0XHQ8RW50cnkuRm9vdGVyIC8+XG5cdFx0PC9hcnRpY2xlPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNpbmdsZTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IEZvb3RlciA9IChwcm9wcykgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdDxmb290ZXIgaWQ9XCJjb2xvcGhvblwiIGNsYXNzTmFtZT1cInNpdGUtZm9vdGVyXCIgcm9sZT1cImNvbnRlbnRpbmZvXCI+XG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNpdGUtaW5mb1wiPlxuXHRcdFx0XHQqKkhFUkUgSVMgVEhFIEZPT1RFUioqXG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L2Zvb3Rlcj5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGb290ZXI7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBIZWFkZXIgPSAocHJvcHMpID0+IHtcblx0cmV0dXJuIChcblx0XHQ8aGVhZGVyIGlkPVwibWFzdGhlYWRcIiBjbGFzc05hbWU9XCJzaXRlLWhlYWRlclwiIHJvbGU9XCJiYW5uZXJcIj5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2l0ZS1sb2dvXCI+XG5cdFx0XHQ8YSBocmVmPVwiL1wiIHJlbD1cImhvbWVcIj5cblx0XHRcdFx0PGltZyBzcmM9XCIvd3AtY29udGVudC90aGVtZXMva3Jhc2tlLXJlYWN0LTIwMTYvY2xpZW50L3N0YXRpYy9hc3NldHMvc2l0ZS1sb2dvLnBuZ1wiIGFsdD1cIlNpdGUgTG9nb1wiIC8+XG5cdFx0XHQ8L2E+XG5cdFx0XHQ8L2Rpdj5cblxuXHRcdFx0PG5hdiBpZD1cInNpdGUtbmF2aWdhdGlvblwiIGNsYXNzTmFtZT1cIm1haW4tbmF2aWdhdGlvblwiIHJvbGU9XCJuYXZpZ2F0aW9uXCI+XG5cdFx0XHRcdDxidXR0b24gY2xhc3NOYW1lPVwibWVudS10b2dnbGVcIiBhcmlhLWNvbnRyb2xzPVwicHJpbWFyeS1tZW51XCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+PC9idXR0b24+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZW51LXByaW1hcnktY29udGFpbmVyXCI+ICoqTUVOVSBHT0VTIEhFUkUqKiA8L2Rpdj5cblx0XHRcdFx0XHQ8Zm9ybSBjbGFzc05hbWU9XCJzZWFyY2gtZm9ybVwiPiAqKlNFQVJDSEZPUk0gR09FUyBIRVJFKiogPC9mb3JtPlxuXHRcdFx0PC9uYXY+XG5cdFx0PC9oZWFkZXI+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyO1xuIiwiLyoqXG4gKiBNYWluIGVudHJ5IHBvaW50IGZvciByZWFjdCBjb21wb25lbnRzXG4gKi9cblxudmFyIFJlYWN0ID0gcmVxdWlyZSggJ3JlYWN0JyApO1xudmFyIFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG52YXIgUm91dGVyID0gcmVxdWlyZSggJy4vcm91dGVyLmpzeCcgKTtcblxudmFyIHJlYWN0Um9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnYXBwLXJvb3QnIClcblJlYWN0RE9NLnJlbmRlcig8Um91dGVyIGluaXRpYWxQYWdlPXtyZWFjdFJvb3QuaW5uZXJIVE1MfSAvPiwgcmVhY3RSb290KTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IEhlYWRlclNraXBMaW5rID0gKHByb3BzKSA9PiB7XG5cdHJldHVybiAoXG5cdFx0PGEgY2xhc3NOYW1lPVwic2tpcC1saW5rIHNjcmVlbi1yZWFkZXItdGV4dFwiIGhyZWY9XCIjbWFpblwiPlNraXAgdG8gY29udGVudDwvYT5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBIZWFkZXJTa2lwTGluaztcbiIsIi8qKlxuICogV3JhcHBlciBjb21wb25lbnQgZm9yIFJlYWN0IEFwcGxpY2F0aW9uIHdoaWNoIG1hbmFnZXMgc3RhdGUgdmlhIHRoZVxuICogd29yZHByZXNzIFVSTC4gVXNpbmcgdGhlICdwYWdlJyBsaWJyYXJ5IGluIG5wbSB3ZSBjYW4gaGlqYWNrIG5vcm1hbCBsaW5rXG4gKiBleGVjdXRpb24gYW5kIGluc3RlYWQgdXNlIHRoZSBldmVudCB0byBnZXQgdGhlIG5ldyBkYXRhIGZvciBSZWFjdCB0byBjb25zdW1lXG4gKiBhbGwgdGhlIHdoaWxlIHVwZGF0aW5nIHRoZSBjdXJyZW50IHVybCB1c2luZyB0aGUgSGlzdG9yeSBBUEkgdG8gbWFrZSBpdFxuICogYXBwZWFyIHRoYXQgeW91IGhhdmUgbW92ZWQgdG8gYSBuZXcgcGFnZVxuICovXG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoICdyZWFjdCcgKTtcbnZhciB1cmxSb3V0ZXIgPSByZXF1aXJlKCAncGFnZScgKTtcbnZhciByZXF1ZXN0ID0gcmVxdWlyZSggJ3N1cGVyYWdlbnQnICk7XG5cbnZhciBQYWdlID0gcmVxdWlyZSggJy4vUGFnZS5qc3gnICk7XG5jbGFzcyBSb3V0ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG5cdFx0XHRoYXNTZXJ2ZXJEYXRhOiBmYWxzZSxcblx0XHRcdGluaXRpYWxQYWdlTWFya3VwOiB7XG5cdFx0XHRcdF9faHRtbDogdGhpcy5wcm9wcy5pbml0aWFsUGFnZVxuXHRcdFx0fSxcblx0XHRcdHBvc3RzOiBbXVxuXHRcdH1cblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdHVybFJvdXRlciggJyonLCBmdW5jdGlvbiAoIGN0eCApIHtcblx0XHRcdHZhciBwYXRoTmFtZSA9IGN0eC5wYXRobmFtZTtcblx0XHRcdHZhciBzZXBlcmF0b3JBcGVyc2FuZCA9ICcnO1xuXHRcdFx0aWYgKGN0eC5xdWVyeXN0cmluZyl7XG5cdFx0XHRcdHNlcGVyYXRvckFwZXJzYW5kID0gJyYnO1xuXHRcdFx0fVxuXHRcdFx0dmFyIG5ld1F1ZXJ5ID0gJz8nICsgY3R4LnF1ZXJ5c3RyaW5nICsgc2VwZXJhdG9yQXBlcnNhbmQgKyAncmV0dXJuX2luc3RlYWQ9cG9zdHMtanNvbic7XG5cdFx0XHR2YXIgZGF0YVBhdGggPSBwYXRoTmFtZSArIG5ld1F1ZXJ5O1xuXHRcdFx0cmVxdWVzdFxuXHRcdFx0XHQuZ2V0KCBkYXRhUGF0aCApXG5cdFx0XHRcdC5lbmQoIGZ1bmN0aW9uKCBlcnIsIHJlcyApIHtcblx0XHRcdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGVycik7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHZhciByZXR1cm5Qb3N0cyA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuXHRcdFx0XHRcdHNlbGYuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdFx0aGFzU2VydmVyRGF0YTogdHJ1ZSxcblx0XHRcdFx0XHRcdHBvc3RzOiByZXR1cm5Qb3N0c1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKHJldHVyblBvc3RzKTtcblx0XHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHR1cmxSb3V0ZXIoe1xuXHRcdFx0ZGlzcGF0Y2g6IGZhbHNlXG5cdFx0fSk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0aWYgKHRoaXMuc3RhdGUuaGFzU2VydmVyRGF0YSkge1xuXHRcdFx0cmV0dXJuIDxQYWdlIHBvc3RzPXt0aGlzLnN0YXRlLnBvc3RzfSAvPlxuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gPGRpdiBkYW5nZXJvdXNseVNldElubmVySFRNTD17dGhpcy5zdGF0ZS5pbml0aWFsUGFnZU1hcmt1cH0gLz5cblx0XHR9XG5cdH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJvdXRlcjtcbiJdfQ==
