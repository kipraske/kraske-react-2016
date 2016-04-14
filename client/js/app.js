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

var React = require('react');

var Footer = function Footer(props) {
	return React.createElement(
		"footer",
		{ className: "entry-footer" },
		props.content
	);
};

module.exports = Footer;

},{"react":"react"}],3:[function(require,module,exports){
'use strict';

var React = require('react');

var Header = function Header(props) {
	var entryMeta;
	if (props.post_type === 'post') {
		entryMeta = React.createElement(
			'div',
			{ className: 'entry-meta' },
			props.meta
		);
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
	return React.createElement(
		"div",
		{ className: "entry-summary" },
		props.excerpt
	);
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
		React.createElement(Entry.Summary, { excerpt: props.post.excerpt }),
		React.createElement(Entry.Footer, { content: props.post.template_tags.entry_footer })
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
				var newQuery = ctx.querystring + 'return_instead=posts-json';
				var dataPath = pathName + '?' + newQuery;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvY29tcG9uZW50cy9QYWdlLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2NvbnRlbnQvZW50cnkvZm9vdGVyLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2NvbnRlbnQvZW50cnkvaGVhZGVyLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2NvbnRlbnQvZW50cnkvc3VtbWFyeS5qc3giLCJjbGllbnQvY29tcG9uZW50cy9jb250ZW50L25vbmUuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvY29udGVudC9yb2xsdXAuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvY29udGVudC9zaW5nbGUuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvZm9vdGVyLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2hlYWRlci5qc3giLCJjbGllbnQvY29tcG9uZW50cy9pbmRleC5qc3giLCJjbGllbnQvY29tcG9uZW50cy9taXNjL2hlYWRlci1za2lwLWxpbmsuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvcm91dGVyLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxRQUFRLFFBQVEsT0FBUixDQUFSOztBQUVKLElBQUksU0FBUyxRQUFRLGNBQVIsQ0FBVDtBQUNKLElBQUksaUJBQWlCLFFBQVEsNkJBQVIsQ0FBakI7QUFDSixJQUFJLFNBQVMsUUFBUSxzQkFBUixDQUFUO0FBQ0osSUFBSSxTQUFTLFFBQVEsc0JBQVIsQ0FBVDtBQUNKLElBQUksT0FBTyxRQUFRLG9CQUFSLENBQVA7QUFDSixJQUFJLFNBQVMsUUFBUSxjQUFSLENBQVQ7O0FBRUosSUFBTSxPQUFPLFNBQVAsSUFBTyxDQUFDLEtBQUQsRUFBVztBQUN2QixLQUFJLGdCQUFnQixNQUFNLEtBQU4sQ0FBWSxNQUFaLENBREc7QUFFdkIsS0FBSSxjQUFKLENBRnVCO0FBR3ZCLEtB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ZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIEhlYWRlciA9IHJlcXVpcmUoJy4vaGVhZGVyLmpzeCcpO1xudmFyIEhlYWRlclNraXBMaW5rID0gcmVxdWlyZSgnLi9taXNjL2hlYWRlci1za2lwLWxpbmsuanN4Jyk7XG52YXIgUm9sbHVwID0gcmVxdWlyZSgnLi9jb250ZW50L3JvbGx1cC5qc3gnKTtcbnZhciBTaW5nbGUgPSByZXF1aXJlKCcuL2NvbnRlbnQvc2luZ2xlLmpzeCcpO1xudmFyIE5vbmUgPSByZXF1aXJlKCcuL2NvbnRlbnQvbm9uZS5qc3gnKTtcbnZhciBGb290ZXIgPSByZXF1aXJlKCcuL2Zvb3Rlci5qc3gnKTtcblxuY29uc3QgUGFnZSA9IChwcm9wcykgPT4ge1xuXHR2YXIgbnVtYmVyT2ZQb3N0cyA9IHByb3BzLnBvc3RzLmxlbmd0aDtcblx0dmFyIGNvbnRlbnRFbGVtZW50O1xuXHRpZiAobnVtYmVyT2ZQb3N0cyA+IDEpIHtcblx0XHRjb250ZW50RWxlbWVudCA9IFtdO1xuXHRcdGZvciAobGV0IHBvc3Qgb2YgcHJvcHMucG9zdHMpe1xuXHRcdFx0Y29udGVudEVsZW1lbnQucHVzaCg8Um9sbHVwIHBvc3Q9e3Bvc3R9IGtleT17cG9zdC5pZH0vPik7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKG51bWJlck9mUG9zdHMgPT09IDEpIHtcblx0XHRsZXQgcG9zdCA9IHByb3BzLnBvc3RzWzBdO1xuXHRcdGNvbnRlbnRFbGVtZW50ID0gPFNpbmdsZSBwb3N0PXtwb3N0fS8+O1xuXHR9IGVsc2Uge1xuXHRcdGNvbnRlbnRFbGVtZW50ID0gPE5vbmUgLz47XG5cdH1cblxuXHRyZXR1cm4gKFxuXHRcdDxkaXY+XG5cdFx0XHQ8SGVhZGVyU2tpcExpbmsgLz5cblx0XHRcdDxIZWFkZXIgLz5cblx0XHRcdDxkaXYgaWQ9XCJjb250ZW50XCIgY2xhc3NOYW1lPVwic2l0ZS1jb250ZW50XCI+XG5cdFx0XHRcdDxkaXYgaWQ9XCJwcmltYXJ5XCIgY2xhc3NOYW1lPVwiY29udGVudC1hcmVhXCI+XG5cdFx0XHRcdFx0PG1haW4gaWQ9XCJtYWluXCIgY2xhc3NOYW1lPVwic2l0ZS1tYWluXCIgcm9sZT1cIm1haW5cIj5cblx0XHRcdFx0XHRcdHtjb250ZW50RWxlbWVudH1cblx0XHRcdFx0XHQ8L21haW4+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQ8Rm9vdGVyIC8+XG5cdFx0PC9kaXY+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IEZvb3RlciA9IChwcm9wcykgPT4ge1xuXHRyZXR1cm4oXG5cdFx0PGZvb3RlciBjbGFzc05hbWU9XCJlbnRyeS1mb290ZXJcIj5cblx0XHRcdHtwcm9wcy5jb250ZW50fVxuXHRcdDwvZm9vdGVyPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZvb3RlcjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IEhlYWRlciA9IChwcm9wcykgPT4ge1xuXHR2YXIgZW50cnlNZXRhO1xuXHRpZiAocHJvcHMucG9zdF90eXBlID09PSAncG9zdCcpe1xuXHRcdGVudHJ5TWV0YSA9IChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZW50cnktbWV0YVwiPlxuXHRcdFx0XHR7cHJvcHMubWV0YX1cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxuXG5cdHJldHVybihcblx0XHQ8aGVhZGVyIGNsYXNzTkFtZT1cImVudHJ5LWhlYWRlclwiPlxuXHRcdFx0PGgyIGNsYXNzTmFtZT1cImVudHJ5LXRpdGxlXCI+PGEgaHJlZj17cHJvcHMucGVybWFsaW5rfT57cHJvcHMudGl0bGV9PC9hPjwvaDI+XG5cdFx0XHR7ZW50cnlNZXRhfVxuXHRcdDwvaGVhZGVyPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlcjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IFN1bW1hcnkgPSAocHJvcHMpID0+IHtcblx0cmV0dXJuKFxuXHRcdDxkaXYgY2xhc3NOYW1lPVwiZW50cnktc3VtbWFyeVwiPlxuXHRcdFx0e3Byb3BzLmV4Y2VycHR9XG5cdFx0PC9kaXY+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3VtbWFyeTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IE5vbmUgPSAocHJvcHMpID0+IHtcblx0cmV0dXJuIChcblx0XHQ8c2VjdGlvbiBjbGFzc05hbWU9XCJuby1yZXN1bHRzIG5vdC1mb3VuZFwiPlxuXHRcdFx0PGhlYWRlciBjbGFzc05hbWU9XCJwYWdlLWhlYWRlclwiPlxuXHRcdFx0XHQ8aDEgY2xhc3NOYW1lPVwicGFnZS10aXRsZVwiPiBOb3RoaW5nIEZvdW5kIDwvaDE+XG5cdFx0XHQ8L2hlYWRlcj5cblxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYWdlLWNvbnRlbnRcIj5cblx0XHRcdFx0KiogVEhFUkUgSVNOJ1QgQU5ZIFBPU1RTIGRvIHlvdSB3YW50IHRvIHNlYXJjaD8gKipcblx0XHRcdDwvZGl2PlxuXHRcdDwvc2VjdGlvbj5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBOb25lO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBFbnRyeSA9IHtcblx0SGVhZGVyIDogcmVxdWlyZSgnLi9lbnRyeS9oZWFkZXIuanN4JyksXG5cdEZvb3RlciA6IHJlcXVpcmUoJy4vZW50cnkvZm9vdGVyLmpzeCcpLFxuXHRTdW1tYXJ5IDogcmVxdWlyZSgnLi9lbnRyeS9zdW1tYXJ5LmpzeCcpXG59XG5cbmNvbnN0IFJvbGx1cCA9IChwcm9wcykgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdDxhcnRpY2xlIGlkPXtwcm9wcy5wb3N0LmlkfSBjbGFzc05hbWU9e3Byb3BzLnBvc3QuY3NzX2NsYXNzfT5cblx0XHRcdDxFbnRyeS5IZWFkZXJcblx0XHRcdFx0dGl0bGU9e3Byb3BzLnBvc3QudGl0bGV9XG5cdFx0XHRcdHBlcm1hbGluaz17cHJvcHMucG9zdC5wZXJtYWxpbmt9XG5cdFx0XHRcdG1ldGE9e3Byb3BzLnBvc3QudGVtcGxhdGVfdGFncy5wb3N0ZWRfb259XG5cdFx0XHRcdHBvc3RfdHlwZT17cHJvcHMucG9zdC5wb3N0X3R5cGV9Lz5cblx0XHRcdDxFbnRyeS5TdW1tYXJ5IGV4Y2VycHQ9e3Byb3BzLnBvc3QuZXhjZXJwdH0gLz5cblx0XHRcdDxFbnRyeS5Gb290ZXIgY29udGVudD17cHJvcHMucG9zdC50ZW1wbGF0ZV90YWdzLmVudHJ5X2Zvb3Rlcn0gLz5cblx0XHQ8L2FydGljbGU+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUm9sbHVwO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgU2luZ2xlID0gKHByb3BzKSA9PiB7XG5cdHJldHVybiAoXG5cdFx0PGRpdj4gVGhpcyBpcyBhIHNpbmdsZSBwb3N0IDwvZGl2PlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNpbmdsZTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IEZvb3RlciA9IChwcm9wcykgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdDxmb290ZXIgaWQ9XCJjb2xvcGhvblwiIGNsYXNzTmFtZT1cInNpdGUtZm9vdGVyXCIgcm9sZT1cImNvbnRlbnRpbmZvXCI+XG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNpdGUtaW5mb1wiPlxuXHRcdFx0XHQqKkhFUkUgSVMgVEhFIEZPT1RFUioqXG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L2Zvb3Rlcj5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGb290ZXI7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBIZWFkZXIgPSAocHJvcHMpID0+IHtcblx0cmV0dXJuIChcblx0XHQ8aGVhZGVyIGlkPVwibWFzdGhlYWRcIiBjbGFzc05hbWU9XCJzaXRlLWhlYWRlclwiIHJvbGU9XCJiYW5uZXJcIj5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2l0ZS1icmFuZGluZ1wiPlxuXHRcdFx0XHQqKkJSQU5ESU5HIEdPRVMgSEVSRSoqXG5cdFx0XHQ8L2Rpdj5cblxuXHRcdFx0PG5hdiBpZD1cInNpdGUtbmF2aWdhdGlvblwiIGNsYXNzTmFtZT1cIm1haW4tbmF2aWdhdGlvblwiIHJvbGU9XCJuYXZpZ2F0aW9uXCI+XG5cdFx0XHRcdDxidXR0b24gY2xhc3NOYW1lPVwibWVudS10b2dnbGVcIiBhcmlhLWNvbnRyb2xzPVwicHJpbWFyeS1tZW51XCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+PC9idXR0b24+XG5cdFx0XHRcdFx0KipNRU5VIEdPRVMgSEVSRSoqXG5cdFx0XHQ8L25hdj5cblx0XHQ8L2hlYWRlcj5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBIZWFkZXI7XG4iLCIvKipcbiAqIE1haW4gZW50cnkgcG9pbnQgZm9yIHJlYWN0IGNvbXBvbmVudHNcbiAqL1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCAncmVhY3QnICk7XG52YXIgUmVhY3RET00gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcbnZhciBSb3V0ZXIgPSByZXF1aXJlKCAnLi9yb3V0ZXIuanN4JyApO1xuXG52YXIgcmVhY3RSb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdwYWdlJyApXG5SZWFjdERPTS5yZW5kZXIoPFJvdXRlciBpbml0aWFsUGFnZT17cmVhY3RSb290LmlubmVySFRNTH0gLz4sIHJlYWN0Um9vdCk7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBIZWFkZXJTa2lwTGluayA9IChwcm9wcykgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdDxhIGNsYXNzTmFtZT1cInNraXAtbGluayBzY3JlZW4tcmVhZGVyLXRleHRcIiBocmVmPVwiI21haW5cIj5Ta2lwIHRvIGNvbnRlbnQ8L2E+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyU2tpcExpbms7XG4iLCIvKipcbiAqIFdyYXBwZXIgY29tcG9uZW50IGZvciBSZWFjdCBBcHBsaWNhdGlvbiB3aGljaCBtYW5hZ2VzIHN0YXRlIHZpYSB0aGVcbiAqIHdvcmRwcmVzcyBVUkwuIFVzaW5nIHRoZSAncGFnZScgbGlicmFyeSBpbiBucG0gd2UgY2FuIGhpamFjayBub3JtYWwgbGlua1xuICogZXhlY3V0aW9uIGFuZCBpbnN0ZWFkIHVzZSB0aGUgZXZlbnQgdG8gZ2V0IHRoZSBuZXcgZGF0YSBmb3IgUmVhY3QgdG8gY29uc3VtZVxuICogYWxsIHRoZSB3aGlsZSB1cGRhdGluZyB0aGUgY3VycmVudCB1cmwgdXNpbmcgdGhlIEhpc3RvcnkgQVBJIHRvIG1ha2UgaXRcbiAqIGFwcGVhciB0aGF0IHlvdSBoYXZlIG1vdmVkIHRvIGEgbmV3IHBhZ2VcbiAqL1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCAncmVhY3QnICk7XG52YXIgdXJsUm91dGVyID0gcmVxdWlyZSggJ3BhZ2UnICk7XG52YXIgcmVxdWVzdCA9IHJlcXVpcmUoICdzdXBlcmFnZW50JyApO1xuXG52YXIgUGFnZSA9IHJlcXVpcmUoICcuL1BhZ2UuanN4JyApO1xuY2xhc3MgUm91dGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuXHRcdFx0aGFzU2VydmVyRGF0YTogZmFsc2UsXG5cdFx0XHRpbml0aWFsUGFnZU1hcmt1cDoge1xuXHRcdFx0XHRfX2h0bWw6IHRoaXMucHJvcHMuaW5pdGlhbFBhZ2Vcblx0XHRcdH0sXG5cdFx0XHRwb3N0czogW11cblx0XHR9XG5cdH1cblxuXHRjb21wb25lbnREaWRNb3VudCgpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHR1cmxSb3V0ZXIoICcqJywgZnVuY3Rpb24gKCBjdHggKSB7XG5cdFx0XHR2YXIgcGF0aE5hbWUgPSBjdHgucGF0aG5hbWU7XG5cdFx0XHR2YXIgbmV3UXVlcnkgPSBjdHgucXVlcnlzdHJpbmcgKyAncmV0dXJuX2luc3RlYWQ9cG9zdHMtanNvbic7XG5cdFx0XHR2YXIgZGF0YVBhdGggPSBwYXRoTmFtZSArICc/JyArIG5ld1F1ZXJ5O1xuXHRcdFx0cmVxdWVzdFxuXHRcdFx0XHQuZ2V0KCBkYXRhUGF0aCApXG5cdFx0XHRcdC5lbmQoIGZ1bmN0aW9uKCBlcnIsIHJlcyApIHtcblx0XHRcdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGVycik7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHZhciByZXR1cm5Qb3N0cyA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuXHRcdFx0XHRcdHNlbGYuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdFx0aGFzU2VydmVyRGF0YTogdHJ1ZSxcblx0XHRcdFx0XHRcdHBvc3RzOiByZXR1cm5Qb3N0c1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKHJldHVyblBvc3RzKTtcblx0XHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHR1cmxSb3V0ZXIoe1xuXHRcdFx0ZGlzcGF0Y2g6IGZhbHNlXG5cdFx0fSk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0aWYgKHRoaXMuc3RhdGUuaGFzU2VydmVyRGF0YSkge1xuXHRcdFx0cmV0dXJuIDxQYWdlIHBvc3RzPXt0aGlzLnN0YXRlLnBvc3RzfSAvPlxuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gPGRpdiBkYW5nZXJvdXNseVNldElubmVySFRNTD17dGhpcy5zdGF0ZS5pbml0aWFsUGFnZU1hcmt1cH0gLz5cblx0XHR9XG5cdH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJvdXRlcjtcbiJdfQ==
