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

var reactRoot = document.getElementById('page');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvY29tcG9uZW50cy9QYWdlLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2NvbnRlbnQvZW50cnkvZm9vdGVyLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2NvbnRlbnQvZW50cnkvaGVhZGVyLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2NvbnRlbnQvbm9uZS5qc3giLCJjbGllbnQvY29tcG9uZW50cy9jb250ZW50L3JvbGx1cC5qc3giLCJjbGllbnQvY29tcG9uZW50cy9jb250ZW50L3NpbmdsZS5qc3giLCJjbGllbnQvY29tcG9uZW50cy9mb290ZXIuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvaGVhZGVyLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2luZGV4LmpzeCIsImNsaWVudC9jb21wb25lbnRzL21pc2MvaGVhZGVyLXNraXAtbGluay5qc3giLCJjbGllbnQvY29tcG9uZW50cy9yb3V0ZXIuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFJLFFBQVEsUUFBUSxPQUFSLENBQVI7O0FBRUosSUFBSSxTQUFTLFFBQVEsY0FBUixDQUFUO0FBQ0osSUFBSSxpQkFBaUIsUUFBUSw2QkFBUixDQUFqQjtBQUNKLElBQUksU0FBUyxRQUFRLHNCQUFSLENBQVQ7QUFDSixJQUFJLFNBQVMsUUFBUSxzQkFBUixDQUFUO0FBQ0osSUFBSSxPQUFPLFFBQVEsb0JBQVIsQ0FBUDtBQUNKLElBQUksU0FBUyxRQUFRLGNBQVIsQ0FBVDs7QUFFSixJQUFNLE9BQU8sU0FBUCxJQUFPLENBQUMsS0FBRCxFQUFXO0FBQ3ZCLEtBQUksZ0JBQWdCLE1BQU0sS0FBTixDQUFZLE1BQVosQ0FERztBQUV2QixLQUFJLGNBQUosQ0FGdUI7QUFHdkIsS0FBSSxnQkFBZ0IsQ0FBaEIsRUFBbUI7QUFDdEIsbUJBQWlCLEVBQWpCLENBRHNC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ekIsQ0FMc0I7QUFNMUIsVUFBSyxRQUFMLENBQWM7QUFDYixxQkFBZSxJQUFmO0FBQ0EsYUFBTyxXQUFQO01BRkQsRUFOMEI7QUFVMUIsYUFBUSxHQUFSLENBQVksV0FBWixFQVYwQjtLQUFyQixDQUZQLENBUmdDO0lBQWpCLENBQWhCLENBSG1COztBQTJCbkIsYUFBVTtBQUNULGNBQVUsS0FBVjtJQURELEVBM0JtQjs7OzsyQkFnQ1g7QUFDUixPQUFJLEtBQUssS0FBTCxDQUFXLGFBQVgsRUFBMEI7QUFDN0IsV0FBTyxvQkFBQyxJQUFELElBQU0sT0FBTyxLQUFLLEtBQUwsQ0FBVyxLQUFYLEVBQWIsQ0FBUCxDQUQ2QjtJQUE5QixNQUVPO0FBQ04sV0FBTyw2QkFBSyx5QkFBeUIsS0FBSyxLQUFMLENBQVcsaUJBQVgsRUFBOUIsQ0FBUCxDQURNO0lBRlA7Ozs7UUE5Q0k7RUFBZSxNQUFNLFNBQU47O0FBdURyQixPQUFPLE9BQVAsR0FBaUIsTUFBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIEhlYWRlciA9IHJlcXVpcmUoJy4vaGVhZGVyLmpzeCcpO1xudmFyIEhlYWRlclNraXBMaW5rID0gcmVxdWlyZSgnLi9taXNjL2hlYWRlci1za2lwLWxpbmsuanN4Jyk7XG52YXIgUm9sbHVwID0gcmVxdWlyZSgnLi9jb250ZW50L3JvbGx1cC5qc3gnKTtcbnZhciBTaW5nbGUgPSByZXF1aXJlKCcuL2NvbnRlbnQvc2luZ2xlLmpzeCcpO1xudmFyIE5vbmUgPSByZXF1aXJlKCcuL2NvbnRlbnQvbm9uZS5qc3gnKTtcbnZhciBGb290ZXIgPSByZXF1aXJlKCcuL2Zvb3Rlci5qc3gnKTtcblxuY29uc3QgUGFnZSA9IChwcm9wcykgPT4ge1xuXHR2YXIgbnVtYmVyT2ZQb3N0cyA9IHByb3BzLnBvc3RzLmxlbmd0aDtcblx0dmFyIGNvbnRlbnRFbGVtZW50O1xuXHRpZiAobnVtYmVyT2ZQb3N0cyA+IDEpIHtcblx0XHRjb250ZW50RWxlbWVudCA9IFtdO1xuXHRcdGZvciAobGV0IHBvc3Qgb2YgcHJvcHMucG9zdHMpe1xuXHRcdFx0Y29udGVudEVsZW1lbnQucHVzaCg8Um9sbHVwIHBvc3Q9e3Bvc3R9IGtleT17cG9zdC5pZH0vPik7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKG51bWJlck9mUG9zdHMgPT09IDEpIHtcblx0XHRsZXQgcG9zdCA9IHByb3BzLnBvc3RzWzBdO1xuXHRcdGNvbnRlbnRFbGVtZW50ID0gPFNpbmdsZSBwb3N0PXtwb3N0fS8+O1xuXHR9IGVsc2Uge1xuXHRcdGNvbnRlbnRFbGVtZW50ID0gPE5vbmUgLz47XG5cdH1cblxuXHRyZXR1cm4gKFxuXHRcdDxkaXY+XG5cdFx0XHQ8SGVhZGVyU2tpcExpbmsgLz5cblx0XHRcdDxIZWFkZXIgLz5cblx0XHRcdDxkaXYgaWQ9XCJjb250ZW50XCIgY2xhc3NOYW1lPVwic2l0ZS1jb250ZW50XCI+XG5cdFx0XHRcdDxkaXYgaWQ9XCJwcmltYXJ5XCIgY2xhc3NOYW1lPVwiY29udGVudC1hcmVhXCI+XG5cdFx0XHRcdFx0PG1haW4gaWQ9XCJtYWluXCIgY2xhc3NOYW1lPVwic2l0ZS1tYWluXCIgcm9sZT1cIm1haW5cIj5cblx0XHRcdFx0XHRcdHtjb250ZW50RWxlbWVudH1cblx0XHRcdFx0XHQ8L21haW4+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQ8Rm9vdGVyIC8+XG5cdFx0PC9kaXY+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZTtcbiIsIi8vIFRPRE8gLSBwcm9iYWJseSBuZWVkZWQgdG8gaW1wbGVtZW50IGNvbW1lbnRzIGxhdGVyLCBidXQgYXQgdGhlIG1vbWVudFxuLy8gbGV0J3Mgbm90IHVzZSB0aGlzIGZvciBub3dcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgRm9vdGVyID0gKHByb3BzKSA9PiB7XG5cdHJldHVybihcblx0XHQ8Zm9vdGVyIGNsYXNzTmFtZT1cImVudHJ5LWZvb3RlclwiPlxuXHRcdFx0KiogQ29tbWVudHMgYW5kIFN0dWZmIEdvIGhlcmUgZXZlbnR1YWxseSAqKlxuXHRcdDwvZm9vdGVyPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZvb3RlcjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IEhlYWRlciA9IChwcm9wcykgPT4ge1xuXHR2YXIgZW50cnlNZXRhO1xuXHRpZiAocHJvcHMucG9zdF90eXBlID09PSAncG9zdCcpe1xuXHRcdHZhciBtZXRhSFRNTCA9IHtfX2h0bWw6IHByb3BzLm1ldGF9O1xuXHRcdGVudHJ5TWV0YSA9IChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZW50cnktbWV0YVwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXttZXRhSFRNTH0gPjwvZGl2PlxuXHRcdClcblx0fVxuXG5cdHJldHVybihcblx0XHQ8aGVhZGVyIGNsYXNzTkFtZT1cImVudHJ5LWhlYWRlclwiPlxuXHRcdFx0PGgyIGNsYXNzTmFtZT1cImVudHJ5LXRpdGxlXCI+PGEgaHJlZj17cHJvcHMucGVybWFsaW5rfT57cHJvcHMudGl0bGV9PC9hPjwvaDI+XG5cdFx0XHR7ZW50cnlNZXRhfVxuXHRcdDwvaGVhZGVyPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlcjtcbiIsIi8vIFRPRE8gLSBuZWVkIHRoaXMgdGVtcGxhdGUgZmxlc2hlZCBvdXQgdG9vXG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IE5vbmUgPSAocHJvcHMpID0+IHtcblx0cmV0dXJuIChcblx0XHQ8c2VjdGlvbiBjbGFzc05hbWU9XCJuby1yZXN1bHRzIG5vdC1mb3VuZFwiPlxuXHRcdFx0PGhlYWRlciBjbGFzc05hbWU9XCJwYWdlLWhlYWRlclwiPlxuXHRcdFx0XHQ8aDEgY2xhc3NOYW1lPVwicGFnZS10aXRsZVwiPiBOb3RoaW5nIEZvdW5kIDwvaDE+XG5cdFx0XHQ8L2hlYWRlcj5cblxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYWdlLWNvbnRlbnRcIj5cblx0XHRcdFx0KiogVEhFUkUgSVNOJ1QgQU5ZIFBPU1RTIGRvIHlvdSB3YW50IHRvIHNlYXJjaD8gKipcblx0XHRcdDwvZGl2PlxuXHRcdDwvc2VjdGlvbj5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBOb25lO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBFbnRyeSA9IHtcblx0SGVhZGVyIDogcmVxdWlyZSgnLi9lbnRyeS9oZWFkZXIuanN4JyksXG5cdEZvb3RlciA6IHJlcXVpcmUoJy4vZW50cnkvZm9vdGVyLmpzeCcpLFxufVxuXG5jb25zdCBSb2xsdXAgPSAocHJvcHMpID0+IHtcblx0dmFyIGV4Y2VycHRIVE1MID0ge19faHRtbDogcHJvcHMucG9zdC5leGNlcnB0fTtcblxuXHRyZXR1cm4gKFxuXHRcdDxhcnRpY2xlIGlkPXtwcm9wcy5wb3N0LmlkfSBjbGFzc05hbWU9e3Byb3BzLnBvc3QuY3NzX2NsYXNzfT5cblx0XHRcdDxFbnRyeS5IZWFkZXJcblx0XHRcdFx0dGl0bGU9e3Byb3BzLnBvc3QudGl0bGV9XG5cdFx0XHRcdHBlcm1hbGluaz17cHJvcHMucG9zdC5wZXJtYWxpbmt9XG5cdFx0XHRcdG1ldGE9e3Byb3BzLnBvc3QudGVtcGxhdGVfdGFncy5wb3N0ZWRfb259XG5cdFx0XHRcdHBvc3RfdHlwZT17cHJvcHMucG9zdC5wb3N0X3R5cGV9Lz5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZW50cnktc3VtbWFyeVwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtleGNlcnB0SFRNTH0+PC9kaXY+XG5cdFx0PC9hcnRpY2xlPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJvbGx1cDtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgRW50cnkgPSB7XG5cdEhlYWRlciA6IHJlcXVpcmUoJy4vZW50cnkvaGVhZGVyLmpzeCcpLFxuXHRGb290ZXIgOiByZXF1aXJlKCcuL2VudHJ5L2Zvb3Rlci5qc3gnKSxcbn1cblxuY29uc3QgU2luZ2xlID0gKHByb3BzKSA9PiB7XG5cdHZhciBjb250ZW50SFRNTCA9IHtfX2h0bWw6IHByb3BzLnBvc3QuY29udGVudH07XG5cdHJldHVybiAoXG5cdFx0PGFydGljbGUgaWQ9e3Byb3BzLnBvc3QuaWR9IGNsYXNzTmFtZT17cHJvcHMucG9zdC5jc3NfY2xhc3N9PlxuXHRcdFx0PEVudHJ5LkhlYWRlclxuXHRcdFx0XHR0aXRsZT17cHJvcHMucG9zdC50aXRsZX1cblx0XHRcdFx0cGVybWFsaW5rPXtwcm9wcy5wb3N0LnBlcm1hbGlua31cblx0XHRcdFx0bWV0YT17cHJvcHMucG9zdC50ZW1wbGF0ZV90YWdzLnBvc3RlZF9vbn1cblx0XHRcdFx0cG9zdF90eXBlPXtwcm9wcy5wb3N0LnBvc3RfdHlwZX0vPlxuXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImVudHJ5LWNvbnRlbnRcIiBkYW5nZXJvdXNseVNldElubmVySFRNTD17Y29udGVudEhUTUx9PjwvZGl2PlxuXG5cdFx0XHQ8RW50cnkuRm9vdGVyIC8+XG5cdFx0PC9hcnRpY2xlPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNpbmdsZTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IEZvb3RlciA9IChwcm9wcykgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdDxmb290ZXIgaWQ9XCJjb2xvcGhvblwiIGNsYXNzTmFtZT1cInNpdGUtZm9vdGVyXCIgcm9sZT1cImNvbnRlbnRpbmZvXCI+XG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNpdGUtaW5mb1wiPlxuXHRcdFx0XHQqKkhFUkUgSVMgVEhFIEZPT1RFUioqXG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L2Zvb3Rlcj5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGb290ZXI7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBIZWFkZXIgPSAocHJvcHMpID0+IHtcblx0cmV0dXJuIChcblx0XHQ8aGVhZGVyIGlkPVwibWFzdGhlYWRcIiBjbGFzc05hbWU9XCJzaXRlLWhlYWRlclwiIHJvbGU9XCJiYW5uZXJcIj5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2l0ZS1sb2dvXCI+XG5cdFx0XHQ8YSBocmVmPVwiL1wiIHJlbD1cImhvbWVcIj5cblx0XHRcdFx0PGltZyBzcmM9XCIvd3AtY29udGVudC90aGVtZXMva3Jhc2tlLXJlYWN0LTIwMTYvY2xpZW50L3N0YXRpYy9hc3NldHMvc2l0ZS1sb2dvLnBuZ1wiIGFsdD1cIlNpdGUgTG9nb1wiIC8+XG5cdFx0XHQ8L2E+XG5cdFx0XHQ8L2Rpdj5cblxuXHRcdFx0PG5hdiBpZD1cInNpdGUtbmF2aWdhdGlvblwiIGNsYXNzTmFtZT1cIm1haW4tbmF2aWdhdGlvblwiIHJvbGU9XCJuYXZpZ2F0aW9uXCI+XG5cdFx0XHRcdDxidXR0b24gY2xhc3NOYW1lPVwibWVudS10b2dnbGVcIiBhcmlhLWNvbnRyb2xzPVwicHJpbWFyeS1tZW51XCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+PC9idXR0b24+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZW51LXByaW1hcnktY29udGFpbmVyXCI+ICoqTUVOVSBHT0VTIEhFUkUqKiA8L2Rpdj5cblx0XHRcdFx0XHQ8Zm9ybSBjbGFzc05hbWU9XCJzZWFyY2gtZm9ybVwiPiAqKlNFQVJDSEZPUk0gR09FUyBIRVJFKiogPC9mb3JtPlxuXHRcdFx0PC9uYXY+XG5cdFx0PC9oZWFkZXI+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyO1xuIiwiLyoqXG4gKiBNYWluIGVudHJ5IHBvaW50IGZvciByZWFjdCBjb21wb25lbnRzXG4gKi9cblxudmFyIFJlYWN0ID0gcmVxdWlyZSggJ3JlYWN0JyApO1xudmFyIFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG52YXIgUm91dGVyID0gcmVxdWlyZSggJy4vcm91dGVyLmpzeCcgKTtcblxudmFyIHJlYWN0Um9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAncGFnZScgKVxuUmVhY3RET00ucmVuZGVyKDxSb3V0ZXIgaW5pdGlhbFBhZ2U9e3JlYWN0Um9vdC5pbm5lckhUTUx9IC8+LCByZWFjdFJvb3QpO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgSGVhZGVyU2tpcExpbmsgPSAocHJvcHMpID0+IHtcblx0cmV0dXJuIChcblx0XHQ8YSBjbGFzc05hbWU9XCJza2lwLWxpbmsgc2NyZWVuLXJlYWRlci10ZXh0XCIgaHJlZj1cIiNtYWluXCI+U2tpcCB0byBjb250ZW50PC9hPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlclNraXBMaW5rO1xuIiwiLyoqXG4gKiBXcmFwcGVyIGNvbXBvbmVudCBmb3IgUmVhY3QgQXBwbGljYXRpb24gd2hpY2ggbWFuYWdlcyBzdGF0ZSB2aWEgdGhlXG4gKiB3b3JkcHJlc3MgVVJMLiBVc2luZyB0aGUgJ3BhZ2UnIGxpYnJhcnkgaW4gbnBtIHdlIGNhbiBoaWphY2sgbm9ybWFsIGxpbmtcbiAqIGV4ZWN1dGlvbiBhbmQgaW5zdGVhZCB1c2UgdGhlIGV2ZW50IHRvIGdldCB0aGUgbmV3IGRhdGEgZm9yIFJlYWN0IHRvIGNvbnN1bWVcbiAqIGFsbCB0aGUgd2hpbGUgdXBkYXRpbmcgdGhlIGN1cnJlbnQgdXJsIHVzaW5nIHRoZSBIaXN0b3J5IEFQSSB0byBtYWtlIGl0XG4gKiBhcHBlYXIgdGhhdCB5b3UgaGF2ZSBtb3ZlZCB0byBhIG5ldyBwYWdlXG4gKi9cblxudmFyIFJlYWN0ID0gcmVxdWlyZSggJ3JlYWN0JyApO1xudmFyIHVybFJvdXRlciA9IHJlcXVpcmUoICdwYWdlJyApO1xudmFyIHJlcXVlc3QgPSByZXF1aXJlKCAnc3VwZXJhZ2VudCcgKTtcblxudmFyIFBhZ2UgPSByZXF1aXJlKCAnLi9QYWdlLmpzeCcgKTtcbmNsYXNzIFJvdXRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcblx0XHRcdGhhc1NlcnZlckRhdGE6IGZhbHNlLFxuXHRcdFx0aW5pdGlhbFBhZ2VNYXJrdXA6IHtcblx0XHRcdFx0X19odG1sOiB0aGlzLnByb3BzLmluaXRpYWxQYWdlXG5cdFx0XHR9LFxuXHRcdFx0cG9zdHM6IFtdXG5cdFx0fVxuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFx0dXJsUm91dGVyKCAnKicsIGZ1bmN0aW9uICggY3R4ICkge1xuXHRcdFx0dmFyIHBhdGhOYW1lID0gY3R4LnBhdGhuYW1lO1xuXHRcdFx0dmFyIHNlcGVyYXRvckFwZXJzYW5kID0gJyc7XG5cdFx0XHRpZiAoY3R4LnF1ZXJ5c3RyaW5nKXtcblx0XHRcdFx0c2VwZXJhdG9yQXBlcnNhbmQgPSAnJic7XG5cdFx0XHR9XG5cdFx0XHR2YXIgbmV3UXVlcnkgPSAnPycgKyBjdHgucXVlcnlzdHJpbmcgKyBzZXBlcmF0b3JBcGVyc2FuZCArICdyZXR1cm5faW5zdGVhZD1wb3N0cy1qc29uJztcblx0XHRcdHZhciBkYXRhUGF0aCA9IHBhdGhOYW1lICsgbmV3UXVlcnk7XG5cdFx0XHRyZXF1ZXN0XG5cdFx0XHRcdC5nZXQoIGRhdGFQYXRoIClcblx0XHRcdFx0LmVuZCggZnVuY3Rpb24oIGVyciwgcmVzICkge1xuXHRcdFx0XHRcdGlmIChlcnIpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dmFyIHJldHVyblBvc3RzID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG5cdFx0XHRcdFx0c2VsZi5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0XHRoYXNTZXJ2ZXJEYXRhOiB0cnVlLFxuXHRcdFx0XHRcdFx0cG9zdHM6IHJldHVyblBvc3RzXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2cocmV0dXJuUG9zdHMpO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdHVybFJvdXRlcih7XG5cdFx0XHRkaXNwYXRjaDogZmFsc2Vcblx0XHR9KTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRpZiAodGhpcy5zdGF0ZS5oYXNTZXJ2ZXJEYXRhKSB7XG5cdFx0XHRyZXR1cm4gPFBhZ2UgcG9zdHM9e3RoaXMuc3RhdGUucG9zdHN9IC8+XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiA8ZGl2IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt0aGlzLnN0YXRlLmluaXRpYWxQYWdlTWFya3VwfSAvPlxuXHRcdH1cblx0fVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gUm91dGVyO1xuIl19
