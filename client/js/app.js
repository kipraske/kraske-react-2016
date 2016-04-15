(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var React = require('react');

var Header = require('./header.jsx');
var HeaderSkipLink = require('./misc/header-skip-link.jsx');
var Rollup = require('./content/rollup.jsx');
var Single = require('./content/single.jsx');
var None = require('./content/none.jsx');
var Footer = require('./footer.jsx');

var Page = function Page(props) {
	var numberOfPosts = props.posts.length;
	var contentElement;
	if (numberOfPosts > 1) {
		contentElement = [];
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = props.posts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
		var _post = props.posts[0];
		contentElement = React.createElement(Single, { post: _post });
	} else {
		contentElement = React.createElement(None, null);
	}

	return React.createElement(
		'div',
		null,
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
};

module.exports = Page;

},{"./content/none.jsx":5,"./content/rollup.jsx":6,"./content/single.jsx":7,"./footer.jsx":8,"./header.jsx":9,"./misc/header-skip-link.jsx":11,"react":"react"}],2:[function(require,module,exports){
"use strict";

// TODO - probably needed to implement comments later, but at the moment
// let's not use this for now

var React = require('react');

var Footer = function Footer(props) {
	var footerContentHTML = { __html: props.content };
	return React.createElement("footer", { className: "entry-footer", dangerouslySetInnerHTML: footerContentHTML });
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

var React = require('react');

var Summary = function Summary(props) {
	var excerptHTML = { __html: props.excerpt };
	return React.createElement("div", { className: "entry-summary", dangerouslySetInnerHTML: excerptHTML });
};

module.exports = Summary;

},{"react":"react"}],5:[function(require,module,exports){
"use strict";

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

},{"react":"react"}],6:[function(require,module,exports){
'use strict';

var React = require('react');
var Entry = {
	Header: require('./entry/header.jsx'),
	Footer: require('./entry/footer.jsx'),
	Summary: require('./entry/summary.jsx')
};

var Rollup = function Rollup(props) {
	return React.createElement(
		'article',
		{ id: props.post.id, className: props.post.css_class },
		React.createElement(Entry.Header, {
			title: props.post.title,
			permalink: props.post.permalink,
			meta: props.post.template_tags.posted_on,
			post_type: props.post.post_type }),
		React.createElement(Entry.Summary, { excerpt: props.post.excerpt })
	);
};

module.exports = Rollup;

},{"./entry/footer.jsx":2,"./entry/header.jsx":3,"./entry/summary.jsx":4,"react":"react"}],7:[function(require,module,exports){
'use strict';

var React = require('react');

var Single = function Single(props) {
	return React.createElement(
		'div',
		null,
		' This is a single post '
	);
};

module.exports = Single;

},{"react":"react"}],8:[function(require,module,exports){
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

},{"react":"react"}],9:[function(require,module,exports){
"use strict";

var React = require('react');

var Header = function Header(props) {
	return React.createElement(
		"header",
		{ id: "masthead", className: "site-header", role: "banner" },
		React.createElement(
			"div",
			{ className: "site-branding" },
			"**BRANDING GOES HERE**"
		),
		React.createElement(
			"nav",
			{ id: "site-navigation", className: "main-navigation", role: "navigation" },
			React.createElement("button", { className: "menu-toggle", "aria-controls": "primary-menu", "aria-expanded": "false" }),
			"**MENU GOES HERE**"
		)
	);
};

module.exports = Header;

},{"react":"react"}],10:[function(require,module,exports){
'use strict';

/**
 * Main entry point for react components
 */

var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('./router.jsx');

var reactRoot = document.getElementById('page');
ReactDOM.render(React.createElement(Router, { initialPage: reactRoot.innerHTML }), reactRoot);

},{"./router.jsx":12,"react":"react","react-dom":"react-dom"}],11:[function(require,module,exports){
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

},{"./Page.jsx":1,"page":"page","react":"react","superagent":"superagent"}]},{},[10])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvY29tcG9uZW50cy9QYWdlLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2NvbnRlbnQvZW50cnkvZm9vdGVyLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2NvbnRlbnQvZW50cnkvaGVhZGVyLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2NvbnRlbnQvZW50cnkvc3VtbWFyeS5qc3giLCJjbGllbnQvY29tcG9uZW50cy9jb250ZW50L25vbmUuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvY29udGVudC9yb2xsdXAuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvY29udGVudC9zaW5nbGUuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvZm9vdGVyLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2hlYWRlci5qc3giLCJjbGllbnQvY29tcG9uZW50cy9pbmRleC5qc3giLCJjbGllbnQvY29tcG9uZW50cy9taXNjL2hlYWRlci1za2lwLWxpbmsuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvcm91dGVyLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxRQUFRLFFBQVEsT0FBUixDQUFSOztBQUVKLElBQUksU0FBUyxRQUFRLGNBQVIsQ0FBVDtBQUNKLElBQUksaUJBQWlCLFFBQVEsNkJBQVIsQ0FBakI7QUFDSixJQUFJLFNBQVMsUUFBUSxzQkFBUixDQUFUO0FBQ0osSUFBSSxTQUFTLFFBQVEsc0JBQVIsQ0FBVDtBQUNKLElBQUksT0FBTyxRQUFRLG9CQUFSLENBQVA7QUFDSixJQUFJLFNBQVMsUUFBUSxjQUFSLENBQVQ7O0FBRUosSUFBTSxPQUFPLFNBQVAsSUFBTyxDQUFDLEtBQUQsRUFBVztBQUN2QixLQUFJLGdCQUFnQixNQUFNLEtBQU4sQ0FBWSxNQUFaLENBREc7QUFFdkIsS0FBSSxjQUFKLENBRnVCO0FBR3ZCLEtB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QVAsQ0FENkI7SUFBOUIsTUFFTztBQUNOLFdBQU8sNkJBQUsseUJBQXlCLEtBQUssS0FBTCxDQUFXLGlCQUFYLEVBQTlCLENBQVAsQ0FETTtJQUZQOzs7O1FBOUNJO0VBQWUsTUFBTSxTQUFOOztBQXVEckIsT0FBTyxPQUFQLEdBQWlCLE1BQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBIZWFkZXIgPSByZXF1aXJlKCcuL2hlYWRlci5qc3gnKTtcbnZhciBIZWFkZXJTa2lwTGluayA9IHJlcXVpcmUoJy4vbWlzYy9oZWFkZXItc2tpcC1saW5rLmpzeCcpO1xudmFyIFJvbGx1cCA9IHJlcXVpcmUoJy4vY29udGVudC9yb2xsdXAuanN4Jyk7XG52YXIgU2luZ2xlID0gcmVxdWlyZSgnLi9jb250ZW50L3NpbmdsZS5qc3gnKTtcbnZhciBOb25lID0gcmVxdWlyZSgnLi9jb250ZW50L25vbmUuanN4Jyk7XG52YXIgRm9vdGVyID0gcmVxdWlyZSgnLi9mb290ZXIuanN4Jyk7XG5cbmNvbnN0IFBhZ2UgPSAocHJvcHMpID0+IHtcblx0dmFyIG51bWJlck9mUG9zdHMgPSBwcm9wcy5wb3N0cy5sZW5ndGg7XG5cdHZhciBjb250ZW50RWxlbWVudDtcblx0aWYgKG51bWJlck9mUG9zdHMgPiAxKSB7XG5cdFx0Y29udGVudEVsZW1lbnQgPSBbXTtcblx0XHRmb3IgKGxldCBwb3N0IG9mIHByb3BzLnBvc3RzKXtcblx0XHRcdGNvbnRlbnRFbGVtZW50LnB1c2goPFJvbGx1cCBwb3N0PXtwb3N0fSBrZXk9e3Bvc3QuaWR9Lz4pO1xuXHRcdH1cblx0fSBlbHNlIGlmIChudW1iZXJPZlBvc3RzID09PSAxKSB7XG5cdFx0bGV0IHBvc3QgPSBwcm9wcy5wb3N0c1swXTtcblx0XHRjb250ZW50RWxlbWVudCA9IDxTaW5nbGUgcG9zdD17cG9zdH0vPjtcblx0fSBlbHNlIHtcblx0XHRjb250ZW50RWxlbWVudCA9IDxOb25lIC8+O1xuXHR9XG5cblx0cmV0dXJuIChcblx0XHQ8ZGl2PlxuXHRcdFx0PEhlYWRlclNraXBMaW5rIC8+XG5cdFx0XHQ8SGVhZGVyIC8+XG5cdFx0XHQ8ZGl2IGlkPVwiY29udGVudFwiIGNsYXNzTmFtZT1cInNpdGUtY29udGVudFwiPlxuXHRcdFx0XHQ8ZGl2IGlkPVwicHJpbWFyeVwiIGNsYXNzTmFtZT1cImNvbnRlbnQtYXJlYVwiPlxuXHRcdFx0XHRcdDxtYWluIGlkPVwibWFpblwiIGNsYXNzTmFtZT1cInNpdGUtbWFpblwiIHJvbGU9XCJtYWluXCI+XG5cdFx0XHRcdFx0XHR7Y29udGVudEVsZW1lbnR9XG5cdFx0XHRcdFx0PC9tYWluPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0PEZvb3RlciAvPlxuXHRcdDwvZGl2PlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2U7XG4iLCIvLyBUT0RPIC0gcHJvYmFibHkgbmVlZGVkIHRvIGltcGxlbWVudCBjb21tZW50cyBsYXRlciwgYnV0IGF0IHRoZSBtb21lbnRcbi8vIGxldCdzIG5vdCB1c2UgdGhpcyBmb3Igbm93XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IEZvb3RlciA9IChwcm9wcykgPT4ge1xuXHR2YXIgZm9vdGVyQ29udGVudEhUTUwgPSB7X19odG1sOiBwcm9wcy5jb250ZW50fTtcblx0cmV0dXJuKFxuXHRcdDxmb290ZXIgY2xhc3NOYW1lPVwiZW50cnktZm9vdGVyXCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e2Zvb3RlckNvbnRlbnRIVE1MfT48L2Zvb3Rlcj5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGb290ZXI7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBIZWFkZXIgPSAocHJvcHMpID0+IHtcblx0dmFyIGVudHJ5TWV0YTtcblx0aWYgKHByb3BzLnBvc3RfdHlwZSA9PT0gJ3Bvc3QnKXtcblx0XHR2YXIgbWV0YUhUTUwgPSB7X19odG1sOiBwcm9wcy5tZXRhfTtcblx0XHRlbnRyeU1ldGEgPSAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImVudHJ5LW1ldGFcIiBkYW5nZXJvdXNseVNldElubmVySFRNTD17bWV0YUhUTUx9ID48L2Rpdj5cblx0XHQpXG5cdH1cblxuXHRyZXR1cm4oXG5cdFx0PGhlYWRlciBjbGFzc05BbWU9XCJlbnRyeS1oZWFkZXJcIj5cblx0XHRcdDxoMiBjbGFzc05hbWU9XCJlbnRyeS10aXRsZVwiPjxhIGhyZWY9e3Byb3BzLnBlcm1hbGlua30+e3Byb3BzLnRpdGxlfTwvYT48L2gyPlxuXHRcdFx0e2VudHJ5TWV0YX1cblx0XHQ8L2hlYWRlcj5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBIZWFkZXI7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBTdW1tYXJ5ID0gKHByb3BzKSA9PiB7XG5cdHZhciBleGNlcnB0SFRNTCA9IHtfX2h0bWw6IHByb3BzLmV4Y2VycHR9O1xuXHRyZXR1cm4oXG5cdFx0PGRpdiBjbGFzc05hbWU9XCJlbnRyeS1zdW1tYXJ5XCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e2V4Y2VycHRIVE1MfT48L2Rpdj5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTdW1tYXJ5O1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgTm9uZSA9IChwcm9wcykgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdDxzZWN0aW9uIGNsYXNzTmFtZT1cIm5vLXJlc3VsdHMgbm90LWZvdW5kXCI+XG5cdFx0XHQ8aGVhZGVyIGNsYXNzTmFtZT1cInBhZ2UtaGVhZGVyXCI+XG5cdFx0XHRcdDxoMSBjbGFzc05hbWU9XCJwYWdlLXRpdGxlXCI+IE5vdGhpbmcgRm91bmQgPC9oMT5cblx0XHRcdDwvaGVhZGVyPlxuXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhZ2UtY29udGVudFwiPlxuXHRcdFx0XHQqKiBUSEVSRSBJU04nVCBBTlkgUE9TVFMgZG8geW91IHdhbnQgdG8gc2VhcmNoPyAqKlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9zZWN0aW9uPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE5vbmU7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIEVudHJ5ID0ge1xuXHRIZWFkZXIgOiByZXF1aXJlKCcuL2VudHJ5L2hlYWRlci5qc3gnKSxcblx0Rm9vdGVyIDogcmVxdWlyZSgnLi9lbnRyeS9mb290ZXIuanN4JyksXG5cdFN1bW1hcnkgOiByZXF1aXJlKCcuL2VudHJ5L3N1bW1hcnkuanN4Jylcbn1cblxuY29uc3QgUm9sbHVwID0gKHByb3BzKSA9PiB7XG5cdHJldHVybiAoXG5cdFx0PGFydGljbGUgaWQ9e3Byb3BzLnBvc3QuaWR9IGNsYXNzTmFtZT17cHJvcHMucG9zdC5jc3NfY2xhc3N9PlxuXHRcdFx0PEVudHJ5LkhlYWRlclxuXHRcdFx0XHR0aXRsZT17cHJvcHMucG9zdC50aXRsZX1cblx0XHRcdFx0cGVybWFsaW5rPXtwcm9wcy5wb3N0LnBlcm1hbGlua31cblx0XHRcdFx0bWV0YT17cHJvcHMucG9zdC50ZW1wbGF0ZV90YWdzLnBvc3RlZF9vbn1cblx0XHRcdFx0cG9zdF90eXBlPXtwcm9wcy5wb3N0LnBvc3RfdHlwZX0vPlxuXHRcdFx0PEVudHJ5LlN1bW1hcnkgZXhjZXJwdD17cHJvcHMucG9zdC5leGNlcnB0fSAvPlxuXHRcdDwvYXJ0aWNsZT5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSb2xsdXA7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBTaW5nbGUgPSAocHJvcHMpID0+IHtcblx0cmV0dXJuIChcblx0XHQ8ZGl2PiBUaGlzIGlzIGEgc2luZ2xlIHBvc3QgPC9kaXY+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2luZ2xlO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgRm9vdGVyID0gKHByb3BzKSA9PiB7XG5cdHJldHVybiAoXG5cdFx0PGZvb3RlciBpZD1cImNvbG9waG9uXCIgY2xhc3NOYW1lPVwic2l0ZS1mb290ZXJcIiByb2xlPVwiY29udGVudGluZm9cIj5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2l0ZS1pbmZvXCI+XG5cdFx0XHRcdCoqSEVSRSBJUyBUSEUgRk9PVEVSKipcblx0XHRcdDwvZGl2PlxuXHRcdDwvZm9vdGVyPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZvb3RlcjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IEhlYWRlciA9IChwcm9wcykgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdDxoZWFkZXIgaWQ9XCJtYXN0aGVhZFwiIGNsYXNzTmFtZT1cInNpdGUtaGVhZGVyXCIgcm9sZT1cImJhbm5lclwiPlxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzaXRlLWJyYW5kaW5nXCI+XG5cdFx0XHRcdCoqQlJBTkRJTkcgR09FUyBIRVJFKipcblx0XHRcdDwvZGl2PlxuXG5cdFx0XHQ8bmF2IGlkPVwic2l0ZS1uYXZpZ2F0aW9uXCIgY2xhc3NOYW1lPVwibWFpbi1uYXZpZ2F0aW9uXCIgcm9sZT1cIm5hdmlnYXRpb25cIj5cblx0XHRcdFx0PGJ1dHRvbiBjbGFzc05hbWU9XCJtZW51LXRvZ2dsZVwiIGFyaWEtY29udHJvbHM9XCJwcmltYXJ5LW1lbnVcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj48L2J1dHRvbj5cblx0XHRcdFx0XHQqKk1FTlUgR09FUyBIRVJFKipcblx0XHRcdDwvbmF2PlxuXHRcdDwvaGVhZGVyPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlcjtcbiIsIi8qKlxuICogTWFpbiBlbnRyeSBwb2ludCBmb3IgcmVhY3QgY29tcG9uZW50c1xuICovXG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoICdyZWFjdCcgKTtcbnZhciBSZWFjdERPTSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xudmFyIFJvdXRlciA9IHJlcXVpcmUoICcuL3JvdXRlci5qc3gnICk7XG5cbnZhciByZWFjdFJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ3BhZ2UnIClcblJlYWN0RE9NLnJlbmRlcig8Um91dGVyIGluaXRpYWxQYWdlPXtyZWFjdFJvb3QuaW5uZXJIVE1MfSAvPiwgcmVhY3RSb290KTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IEhlYWRlclNraXBMaW5rID0gKHByb3BzKSA9PiB7XG5cdHJldHVybiAoXG5cdFx0PGEgY2xhc3NOYW1lPVwic2tpcC1saW5rIHNjcmVlbi1yZWFkZXItdGV4dFwiIGhyZWY9XCIjbWFpblwiPlNraXAgdG8gY29udGVudDwvYT5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBIZWFkZXJTa2lwTGluaztcbiIsIi8qKlxuICogV3JhcHBlciBjb21wb25lbnQgZm9yIFJlYWN0IEFwcGxpY2F0aW9uIHdoaWNoIG1hbmFnZXMgc3RhdGUgdmlhIHRoZVxuICogd29yZHByZXNzIFVSTC4gVXNpbmcgdGhlICdwYWdlJyBsaWJyYXJ5IGluIG5wbSB3ZSBjYW4gaGlqYWNrIG5vcm1hbCBsaW5rXG4gKiBleGVjdXRpb24gYW5kIGluc3RlYWQgdXNlIHRoZSBldmVudCB0byBnZXQgdGhlIG5ldyBkYXRhIGZvciBSZWFjdCB0byBjb25zdW1lXG4gKiBhbGwgdGhlIHdoaWxlIHVwZGF0aW5nIHRoZSBjdXJyZW50IHVybCB1c2luZyB0aGUgSGlzdG9yeSBBUEkgdG8gbWFrZSBpdFxuICogYXBwZWFyIHRoYXQgeW91IGhhdmUgbW92ZWQgdG8gYSBuZXcgcGFnZVxuICovXG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoICdyZWFjdCcgKTtcbnZhciB1cmxSb3V0ZXIgPSByZXF1aXJlKCAncGFnZScgKTtcbnZhciByZXF1ZXN0ID0gcmVxdWlyZSggJ3N1cGVyYWdlbnQnICk7XG5cbnZhciBQYWdlID0gcmVxdWlyZSggJy4vUGFnZS5qc3gnICk7XG5jbGFzcyBSb3V0ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG5cdFx0XHRoYXNTZXJ2ZXJEYXRhOiBmYWxzZSxcblx0XHRcdGluaXRpYWxQYWdlTWFya3VwOiB7XG5cdFx0XHRcdF9faHRtbDogdGhpcy5wcm9wcy5pbml0aWFsUGFnZVxuXHRcdFx0fSxcblx0XHRcdHBvc3RzOiBbXVxuXHRcdH1cblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdHVybFJvdXRlciggJyonLCBmdW5jdGlvbiAoIGN0eCApIHtcblx0XHRcdHZhciBwYXRoTmFtZSA9IGN0eC5wYXRobmFtZTtcblx0XHRcdHZhciBzZXBlcmF0b3JBcGVyc2FuZCA9ICcnO1xuXHRcdFx0aWYgKGN0eC5xdWVyeXN0cmluZyl7XG5cdFx0XHRcdHNlcGVyYXRvckFwZXJzYW5kID0gJyYnO1xuXHRcdFx0fVxuXHRcdFx0dmFyIG5ld1F1ZXJ5ID0gJz8nICsgY3R4LnF1ZXJ5c3RyaW5nICsgc2VwZXJhdG9yQXBlcnNhbmQgKyAncmV0dXJuX2luc3RlYWQ9cG9zdHMtanNvbic7XG5cdFx0XHR2YXIgZGF0YVBhdGggPSBwYXRoTmFtZSArIG5ld1F1ZXJ5O1xuXHRcdFx0cmVxdWVzdFxuXHRcdFx0XHQuZ2V0KCBkYXRhUGF0aCApXG5cdFx0XHRcdC5lbmQoIGZ1bmN0aW9uKCBlcnIsIHJlcyApIHtcblx0XHRcdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGVycik7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHZhciByZXR1cm5Qb3N0cyA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuXHRcdFx0XHRcdHNlbGYuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdFx0aGFzU2VydmVyRGF0YTogdHJ1ZSxcblx0XHRcdFx0XHRcdHBvc3RzOiByZXR1cm5Qb3N0c1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKHJldHVyblBvc3RzKTtcblx0XHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHR1cmxSb3V0ZXIoe1xuXHRcdFx0ZGlzcGF0Y2g6IGZhbHNlXG5cdFx0fSk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0aWYgKHRoaXMuc3RhdGUuaGFzU2VydmVyRGF0YSkge1xuXHRcdFx0cmV0dXJuIDxQYWdlIHBvc3RzPXt0aGlzLnN0YXRlLnBvc3RzfSAvPlxuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gPGRpdiBkYW5nZXJvdXNseVNldElubmVySFRNTD17dGhpcy5zdGF0ZS5pbml0aWFsUGFnZU1hcmt1cH0gLz5cblx0XHR9XG5cdH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJvdXRlcjtcbiJdfQ==
