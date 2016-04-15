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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvY29tcG9uZW50cy9QYWdlLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2NvbnRlbnQvZW50cnkvZm9vdGVyLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2NvbnRlbnQvZW50cnkvaGVhZGVyLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2NvbnRlbnQvbm9uZS5qc3giLCJjbGllbnQvY29tcG9uZW50cy9jb250ZW50L3JvbGx1cC5qc3giLCJjbGllbnQvY29tcG9uZW50cy9jb250ZW50L3NpbmdsZS5qc3giLCJjbGllbnQvY29tcG9uZW50cy9mb290ZXIuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvaGVhZGVyLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2luZGV4LmpzeCIsImNsaWVudC9jb21wb25lbnRzL21pc2MvaGVhZGVyLXNraXAtbGluay5qc3giLCJjbGllbnQvY29tcG9uZW50cy9yb3V0ZXIuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFJLFFBQVEsUUFBUSxPQUFSLENBQVI7O0FBRUosSUFBSSxTQUFTLFFBQVEsY0FBUixDQUFUO0FBQ0osSUFBSSxpQkFBaUIsUUFBUSw2QkFBUixDQUFqQjtBQUNKLElBQUksU0FBUyxRQUFRLHNCQUFSLENBQVQ7QUFDSixJQUFJLFNBQVMsUUFBUSxzQkFBUixDQUFUO0FBQ0osSUFBSSxPQUFPLFFBQVEsb0JBQVIsQ0FBUDtBQUNKLElBQUksU0FBUyxRQUFRLGNBQVIsQ0FBVDs7QUFFSixJQUFNLE9BQU8sU0FBUCxJQUFPLENBQUMsS0FBRCxFQUFXO0FBQ3ZCLEtBQUksZ0JBQWdCLE1BQU0sS0FBTixDQUFZLE1BQVosQ0FERztBQUV2QixLQUFJLGNBQUosQ0FGdUI7QUFHdkIsS0FBSSxnQkFBZ0IsQ0FBaEIsRUFBbUI7QUFDdEIsbUJBQWlCLEVBQWpCLENBRHNC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VSxLQUFWO0lBREQsRUEzQm1COzs7OzJCQWdDWDtBQUNSLE9BQUksS0FBSyxLQUFMLENBQVcsYUFBWCxFQUEwQjtBQUM3QixXQUFPLG9CQUFDLElBQUQsSUFBTSxPQUFPLEtBQUssS0FBTCxDQUFXLEtBQVgsRUFBYixDQUFQLENBRDZCO0lBQTlCLE1BRU87QUFDTixXQUFPLDZCQUFLLHlCQUF5QixLQUFLLEtBQUwsQ0FBVyxpQkFBWCxFQUE5QixDQUFQLENBRE07SUFGUDs7OztRQTlDSTtFQUFlLE1BQU0sU0FBTjs7QUF1RHJCLE9BQU8sT0FBUCxHQUFpQixNQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgSGVhZGVyID0gcmVxdWlyZSgnLi9oZWFkZXIuanN4Jyk7XG52YXIgSGVhZGVyU2tpcExpbmsgPSByZXF1aXJlKCcuL21pc2MvaGVhZGVyLXNraXAtbGluay5qc3gnKTtcbnZhciBSb2xsdXAgPSByZXF1aXJlKCcuL2NvbnRlbnQvcm9sbHVwLmpzeCcpO1xudmFyIFNpbmdsZSA9IHJlcXVpcmUoJy4vY29udGVudC9zaW5nbGUuanN4Jyk7XG52YXIgTm9uZSA9IHJlcXVpcmUoJy4vY29udGVudC9ub25lLmpzeCcpO1xudmFyIEZvb3RlciA9IHJlcXVpcmUoJy4vZm9vdGVyLmpzeCcpO1xuXG5jb25zdCBQYWdlID0gKHByb3BzKSA9PiB7XG5cdHZhciBudW1iZXJPZlBvc3RzID0gcHJvcHMucG9zdHMubGVuZ3RoO1xuXHR2YXIgY29udGVudEVsZW1lbnQ7XG5cdGlmIChudW1iZXJPZlBvc3RzID4gMSkge1xuXHRcdGNvbnRlbnRFbGVtZW50ID0gW107XG5cdFx0Zm9yIChsZXQgcG9zdCBvZiBwcm9wcy5wb3N0cyl7XG5cdFx0XHRjb250ZW50RWxlbWVudC5wdXNoKDxSb2xsdXAgcG9zdD17cG9zdH0ga2V5PXtwb3N0LmlkfS8+KTtcblx0XHR9XG5cdH0gZWxzZSBpZiAobnVtYmVyT2ZQb3N0cyA9PT0gMSkge1xuXHRcdGxldCBwb3N0ID0gcHJvcHMucG9zdHNbMF07XG5cdFx0Y29udGVudEVsZW1lbnQgPSA8U2luZ2xlIHBvc3Q9e3Bvc3R9Lz47XG5cdH0gZWxzZSB7XG5cdFx0Y29udGVudEVsZW1lbnQgPSA8Tm9uZSAvPjtcblx0fVxuXG5cdHJldHVybiAoXG5cdFx0PGRpdj5cblx0XHRcdDxIZWFkZXJTa2lwTGluayAvPlxuXHRcdFx0PEhlYWRlciAvPlxuXHRcdFx0PGRpdiBpZD1cImNvbnRlbnRcIiBjbGFzc05hbWU9XCJzaXRlLWNvbnRlbnRcIj5cblx0XHRcdFx0PGRpdiBpZD1cInByaW1hcnlcIiBjbGFzc05hbWU9XCJjb250ZW50LWFyZWFcIj5cblx0XHRcdFx0XHQ8bWFpbiBpZD1cIm1haW5cIiBjbGFzc05hbWU9XCJzaXRlLW1haW5cIiByb2xlPVwibWFpblwiPlxuXHRcdFx0XHRcdFx0e2NvbnRlbnRFbGVtZW50fVxuXHRcdFx0XHRcdDwvbWFpbj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdDxGb290ZXIgLz5cblx0XHQ8L2Rpdj5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlO1xuIiwiLy8gVE9ETyAtIHByb2JhYmx5IG5lZWRlZCB0byBpbXBsZW1lbnQgY29tbWVudHMgbGF0ZXIsIGJ1dCBhdCB0aGUgbW9tZW50XG4vLyBsZXQncyBub3QgdXNlIHRoaXMgZm9yIG5vd1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBGb290ZXIgPSAocHJvcHMpID0+IHtcblx0cmV0dXJuKFxuXHRcdDxmb290ZXIgY2xhc3NOYW1lPVwiZW50cnktZm9vdGVyXCI+XG5cdFx0XHQqKiBDb21tZW50cyBhbmQgU3R1ZmYgR28gaGVyZSBldmVudHVhbGx5ICoqXG5cdFx0PC9mb290ZXI+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRm9vdGVyO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgSGVhZGVyID0gKHByb3BzKSA9PiB7XG5cdHZhciBlbnRyeU1ldGE7XG5cdGlmIChwcm9wcy5wb3N0X3R5cGUgPT09ICdwb3N0Jyl7XG5cdFx0dmFyIG1ldGFIVE1MID0ge19faHRtbDogcHJvcHMubWV0YX07XG5cdFx0ZW50cnlNZXRhID0gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJlbnRyeS1tZXRhXCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e21ldGFIVE1MfSA+PC9kaXY+XG5cdFx0KVxuXHR9XG5cblx0cmV0dXJuKFxuXHRcdDxoZWFkZXIgY2xhc3NOQW1lPVwiZW50cnktaGVhZGVyXCI+XG5cdFx0XHQ8aDIgY2xhc3NOYW1lPVwiZW50cnktdGl0bGVcIj48YSBocmVmPXtwcm9wcy5wZXJtYWxpbmt9Pntwcm9wcy50aXRsZX08L2E+PC9oMj5cblx0XHRcdHtlbnRyeU1ldGF9XG5cdFx0PC9oZWFkZXI+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyO1xuIiwiLy8gVE9ETyAtIG5lZWQgdGhpcyB0ZW1wbGF0ZSBmbGVzaGVkIG91dCB0b29cblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgTm9uZSA9IChwcm9wcykgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdDxzZWN0aW9uIGNsYXNzTmFtZT1cIm5vLXJlc3VsdHMgbm90LWZvdW5kXCI+XG5cdFx0XHQ8aGVhZGVyIGNsYXNzTmFtZT1cInBhZ2UtaGVhZGVyXCI+XG5cdFx0XHRcdDxoMSBjbGFzc05hbWU9XCJwYWdlLXRpdGxlXCI+IE5vdGhpbmcgRm91bmQgPC9oMT5cblx0XHRcdDwvaGVhZGVyPlxuXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhZ2UtY29udGVudFwiPlxuXHRcdFx0XHQqKiBUSEVSRSBJU04nVCBBTlkgUE9TVFMgZG8geW91IHdhbnQgdG8gc2VhcmNoPyAqKlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9zZWN0aW9uPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE5vbmU7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIEVudHJ5ID0ge1xuXHRIZWFkZXIgOiByZXF1aXJlKCcuL2VudHJ5L2hlYWRlci5qc3gnKSxcblx0Rm9vdGVyIDogcmVxdWlyZSgnLi9lbnRyeS9mb290ZXIuanN4JyksXG59XG5cbmNvbnN0IFJvbGx1cCA9IChwcm9wcykgPT4ge1xuXHR2YXIgZXhjZXJwdEhUTUwgPSB7X19odG1sOiBwcm9wcy5wb3N0LmV4Y2VycHR9O1xuXG5cdHJldHVybiAoXG5cdFx0PGFydGljbGUgaWQ9e3Byb3BzLnBvc3QuaWR9IGNsYXNzTmFtZT17cHJvcHMucG9zdC5jc3NfY2xhc3N9PlxuXHRcdFx0PEVudHJ5LkhlYWRlclxuXHRcdFx0XHR0aXRsZT17cHJvcHMucG9zdC50aXRsZX1cblx0XHRcdFx0cGVybWFsaW5rPXtwcm9wcy5wb3N0LnBlcm1hbGlua31cblx0XHRcdFx0bWV0YT17cHJvcHMucG9zdC50ZW1wbGF0ZV90YWdzLnBvc3RlZF9vbn1cblx0XHRcdFx0cG9zdF90eXBlPXtwcm9wcy5wb3N0LnBvc3RfdHlwZX0vPlxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJlbnRyeS1zdW1tYXJ5XCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e2V4Y2VycHRIVE1MfT48L2Rpdj5cblx0XHQ8L2FydGljbGU+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUm9sbHVwO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBFbnRyeSA9IHtcblx0SGVhZGVyIDogcmVxdWlyZSgnLi9lbnRyeS9oZWFkZXIuanN4JyksXG5cdEZvb3RlciA6IHJlcXVpcmUoJy4vZW50cnkvZm9vdGVyLmpzeCcpLFxufVxuXG5jb25zdCBTaW5nbGUgPSAocHJvcHMpID0+IHtcblx0dmFyIGNvbnRlbnRIVE1MID0ge19faHRtbDogcHJvcHMucG9zdC5jb250ZW50fTtcblx0cmV0dXJuIChcblx0XHQ8YXJ0aWNsZSBpZD17cHJvcHMucG9zdC5pZH0gY2xhc3NOYW1lPXtwcm9wcy5wb3N0LmNzc19jbGFzc30+XG5cdFx0XHQ8RW50cnkuSGVhZGVyXG5cdFx0XHRcdHRpdGxlPXtwcm9wcy5wb3N0LnRpdGxlfVxuXHRcdFx0XHRwZXJtYWxpbms9e3Byb3BzLnBvc3QucGVybWFsaW5rfVxuXHRcdFx0XHRtZXRhPXtwcm9wcy5wb3N0LnRlbXBsYXRlX3RhZ3MucG9zdGVkX29ufVxuXHRcdFx0XHRwb3N0X3R5cGU9e3Byb3BzLnBvc3QucG9zdF90eXBlfS8+XG5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZW50cnktY29udGVudFwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtjb250ZW50SFRNTH0+PC9kaXY+XG5cblx0XHRcdDxFbnRyeS5Gb290ZXIgLz5cblx0XHQ8L2FydGljbGU+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2luZ2xlO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgRm9vdGVyID0gKHByb3BzKSA9PiB7XG5cdHJldHVybiAoXG5cdFx0PGZvb3RlciBpZD1cImNvbG9waG9uXCIgY2xhc3NOYW1lPVwic2l0ZS1mb290ZXJcIiByb2xlPVwiY29udGVudGluZm9cIj5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2l0ZS1pbmZvXCI+XG5cdFx0XHRcdCoqSEVSRSBJUyBUSEUgRk9PVEVSKipcblx0XHRcdDwvZGl2PlxuXHRcdDwvZm9vdGVyPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZvb3RlcjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IEhlYWRlciA9IChwcm9wcykgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdDxoZWFkZXIgaWQ9XCJtYXN0aGVhZFwiIGNsYXNzTmFtZT1cInNpdGUtaGVhZGVyXCIgcm9sZT1cImJhbm5lclwiPlxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzaXRlLWJyYW5kaW5nXCI+XG5cdFx0XHRcdCoqQlJBTkRJTkcgR09FUyBIRVJFKipcblx0XHRcdDwvZGl2PlxuXG5cdFx0XHQ8bmF2IGlkPVwic2l0ZS1uYXZpZ2F0aW9uXCIgY2xhc3NOYW1lPVwibWFpbi1uYXZpZ2F0aW9uXCIgcm9sZT1cIm5hdmlnYXRpb25cIj5cblx0XHRcdFx0PGJ1dHRvbiBjbGFzc05hbWU9XCJtZW51LXRvZ2dsZVwiIGFyaWEtY29udHJvbHM9XCJwcmltYXJ5LW1lbnVcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj48L2J1dHRvbj5cblx0XHRcdFx0XHQqKk1FTlUgR09FUyBIRVJFKipcblx0XHRcdDwvbmF2PlxuXHRcdDwvaGVhZGVyPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlcjtcbiIsIi8qKlxuICogTWFpbiBlbnRyeSBwb2ludCBmb3IgcmVhY3QgY29tcG9uZW50c1xuICovXG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoICdyZWFjdCcgKTtcbnZhciBSZWFjdERPTSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xudmFyIFJvdXRlciA9IHJlcXVpcmUoICcuL3JvdXRlci5qc3gnICk7XG5cbnZhciByZWFjdFJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ3BhZ2UnIClcblJlYWN0RE9NLnJlbmRlcig8Um91dGVyIGluaXRpYWxQYWdlPXtyZWFjdFJvb3QuaW5uZXJIVE1MfSAvPiwgcmVhY3RSb290KTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IEhlYWRlclNraXBMaW5rID0gKHByb3BzKSA9PiB7XG5cdHJldHVybiAoXG5cdFx0PGEgY2xhc3NOYW1lPVwic2tpcC1saW5rIHNjcmVlbi1yZWFkZXItdGV4dFwiIGhyZWY9XCIjbWFpblwiPlNraXAgdG8gY29udGVudDwvYT5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBIZWFkZXJTa2lwTGluaztcbiIsIi8qKlxuICogV3JhcHBlciBjb21wb25lbnQgZm9yIFJlYWN0IEFwcGxpY2F0aW9uIHdoaWNoIG1hbmFnZXMgc3RhdGUgdmlhIHRoZVxuICogd29yZHByZXNzIFVSTC4gVXNpbmcgdGhlICdwYWdlJyBsaWJyYXJ5IGluIG5wbSB3ZSBjYW4gaGlqYWNrIG5vcm1hbCBsaW5rXG4gKiBleGVjdXRpb24gYW5kIGluc3RlYWQgdXNlIHRoZSBldmVudCB0byBnZXQgdGhlIG5ldyBkYXRhIGZvciBSZWFjdCB0byBjb25zdW1lXG4gKiBhbGwgdGhlIHdoaWxlIHVwZGF0aW5nIHRoZSBjdXJyZW50IHVybCB1c2luZyB0aGUgSGlzdG9yeSBBUEkgdG8gbWFrZSBpdFxuICogYXBwZWFyIHRoYXQgeW91IGhhdmUgbW92ZWQgdG8gYSBuZXcgcGFnZVxuICovXG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoICdyZWFjdCcgKTtcbnZhciB1cmxSb3V0ZXIgPSByZXF1aXJlKCAncGFnZScgKTtcbnZhciByZXF1ZXN0ID0gcmVxdWlyZSggJ3N1cGVyYWdlbnQnICk7XG5cbnZhciBQYWdlID0gcmVxdWlyZSggJy4vUGFnZS5qc3gnICk7XG5jbGFzcyBSb3V0ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG5cdFx0XHRoYXNTZXJ2ZXJEYXRhOiBmYWxzZSxcblx0XHRcdGluaXRpYWxQYWdlTWFya3VwOiB7XG5cdFx0XHRcdF9faHRtbDogdGhpcy5wcm9wcy5pbml0aWFsUGFnZVxuXHRcdFx0fSxcblx0XHRcdHBvc3RzOiBbXVxuXHRcdH1cblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdHVybFJvdXRlciggJyonLCBmdW5jdGlvbiAoIGN0eCApIHtcblx0XHRcdHZhciBwYXRoTmFtZSA9IGN0eC5wYXRobmFtZTtcblx0XHRcdHZhciBzZXBlcmF0b3JBcGVyc2FuZCA9ICcnO1xuXHRcdFx0aWYgKGN0eC5xdWVyeXN0cmluZyl7XG5cdFx0XHRcdHNlcGVyYXRvckFwZXJzYW5kID0gJyYnO1xuXHRcdFx0fVxuXHRcdFx0dmFyIG5ld1F1ZXJ5ID0gJz8nICsgY3R4LnF1ZXJ5c3RyaW5nICsgc2VwZXJhdG9yQXBlcnNhbmQgKyAncmV0dXJuX2luc3RlYWQ9cG9zdHMtanNvbic7XG5cdFx0XHR2YXIgZGF0YVBhdGggPSBwYXRoTmFtZSArIG5ld1F1ZXJ5O1xuXHRcdFx0cmVxdWVzdFxuXHRcdFx0XHQuZ2V0KCBkYXRhUGF0aCApXG5cdFx0XHRcdC5lbmQoIGZ1bmN0aW9uKCBlcnIsIHJlcyApIHtcblx0XHRcdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGVycik7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHZhciByZXR1cm5Qb3N0cyA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuXHRcdFx0XHRcdHNlbGYuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdFx0aGFzU2VydmVyRGF0YTogdHJ1ZSxcblx0XHRcdFx0XHRcdHBvc3RzOiByZXR1cm5Qb3N0c1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKHJldHVyblBvc3RzKTtcblx0XHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHR1cmxSb3V0ZXIoe1xuXHRcdFx0ZGlzcGF0Y2g6IGZhbHNlXG5cdFx0fSk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0aWYgKHRoaXMuc3RhdGUuaGFzU2VydmVyRGF0YSkge1xuXHRcdFx0cmV0dXJuIDxQYWdlIHBvc3RzPXt0aGlzLnN0YXRlLnBvc3RzfSAvPlxuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gPGRpdiBkYW5nZXJvdXNseVNldElubmVySFRNTD17dGhpcy5zdGF0ZS5pbml0aWFsUGFnZU1hcmt1cH0gLz5cblx0XHR9XG5cdH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJvdXRlcjtcbiJdfQ==
