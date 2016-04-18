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
			if (!colorPaletteRegex.test(pageContainer.className)) {
				newClassList = pageContainer.className + ' ' + newPalette;
			} else {
				newClassList = pageContainer.className.replace(/color-palette-\d/, newPalette);
			}
			pageContainer.className = newClassList;
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			//this.postPaintUpdatePaletteClass();
		}
	}, {
		key: 'componentWillUpdate',
		value: function componentWillUpdate() {
			//this.postPaintUpdatePaletteClass();
		}
	}, {
		key: 'render',
		value: function render() {

			// If we passed in intial page html instead of a post object render
			// that instead of the "real" react app
			if (typeof this.props.posts === 'undefined' && this.props.initialPage) {
				var intialPageHTML = { __html: this.props.initialPage };
				return React.createElement('div', { id: 'page', ref: 'pageContainer', className: this.props.pageClass, dangerouslySetInnerHTML: intialPageHTML });
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
				{ id: 'page', ref: 'pageContainer', className: this.props.pageClass },
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
			if (this.state.hasServerData) {
				return React.createElement(Page, { posts: this.state.posts, pageClass: this.state.bodyClass });
			} else {
				return React.createElement(Page, { initialPage: this.props.initialPage, pageClass: this.props.initialBodyClass });
			}
		}
	}]);

	return Router;
}(React.Component);

module.exports = Router;

},{"./Page.jsx":1,"page":"page","react":"react","superagent":"superagent"}]},{},[9])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvY29tcG9uZW50cy9QYWdlLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2NvbnRlbnQvZW50cnkvZm9vdGVyLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2NvbnRlbnQvZW50cnkvaGVhZGVyLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2NvbnRlbnQvbm9uZS5qc3giLCJjbGllbnQvY29tcG9uZW50cy9jb250ZW50L3JvbGx1cC5qc3giLCJjbGllbnQvY29tcG9uZW50cy9jb250ZW50L3NpbmdsZS5qc3giLCJjbGllbnQvY29tcG9uZW50cy9mb290ZXIuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvaGVhZGVyLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2luZGV4LmpzeCIsImNsaWVudC9jb21wb25lbnRzL21pc2MvaGVhZGVyLXNraXAtbGluay5qc3giLCJjbGllbnQvY29tcG9uZW50cy9yb3V0ZXIuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQ0FBLElBQUksUUFBUSxRQUFRLE9BQVIsQ0FBUjs7QUFFSixJQUFJLFNBQVMsUUFBUSxjQUFSLENBQVQ7QUFDSixJQUFJLGlCQUFpQixRQUFRLDZCQUFSLENBQWpCO0FBQ0osSUFBSSxTQUFTLFFBQVEsc0JBQVIsQ0FBVDtBQUNKLElBQUksU0FBUyxRQUFRLHNCQUFSLENBQVQ7QUFDSixJQUFJLE9BQU8sUUFBUSxvQkFBUixDQUFQO0FBQ0osSUFBSSxTQUFTLFFBQVEsY0FBUixDQUFUOzs7Ozs7OztJQU9FOzs7QUFFTCxVQUZLLElBRUwsQ0FBWSxLQUFaLEVBQWtCO3dCQUZiLE1BRWE7O3FFQUZiLGlCQUdFLFFBRFc7O0FBRWpCLFFBQUssS0FBTCxHQUFhO0FBQ1osaUJBQWMsaUJBQWQ7R0FERCxDQUZpQjs7RUFBbEI7Ozs7O2NBRks7OzBDQVVrQjtBQUN0QixPQUFNLGFBQWEsQ0FBYixDQURnQjtBQUV0QixPQUFNLGFBQWEsQ0FBYixDQUZnQjtBQUd0QixPQUFJLFVBQVUsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLE1BQWlCLGFBQWEsVUFBYixHQUEwQixDQUExQixDQUFqQixHQUFnRCxVQUFoRCxDQUFyQixDQUhrQjtBQUl0QixVQUFPLG1CQUFtQixPQUFuQixDQUplOzs7O2dEQU9NO0FBQzVCLE9BQUksYUFBYSxLQUFLLHFCQUFMLEVBQWIsQ0FEd0I7QUFFNUIsT0FBSSxnQkFBZ0IsS0FBSyxJQUFMLENBQVUsYUFBVixDQUZRO0FBRzVCLE9BQUksb0JBQW9CLGtCQUFwQixDQUh3QjtBQUk1QixPQUFJLFlBQUosQ0FKNEI7QUFLNUIsT0FBSSxDQUFDLGtCQUFrQixJQUFsQixDQUF1QixjQUFjLFNBQWQsQ0FBeEIsRUFBa0Q7QUFDckQsbUJBQWUsY0FBYyxTQUFkLEdBQTBCLEdBQTFCLEdBQWdDLFVBQWhDLENBRHNDO0lBQXRELE1BRU87QUFDTixtQkFBZSxjQUFjLFNBQWQsQ0FBd0IsT0FBeEIsQ0FBZ0Msa0JBQWhDLEVBQW9ELFVBQXBELENBQWYsQ0FETTtJQUZQO0FBS0EsaUJBQWMsU0FBZCxHQUEwQixZQUExQixDQVY0Qjs7OztzQ0FhVjs7Ozs7d0NBSUU7Ozs7OzJCQUliOzs7O0FBSVAsT0FBSSxPQUFPLEtBQUssS0FBTCxDQUFXLEtBQVgsS0FBcUIsV0FBNUIsSUFBMkMsS0FBSyxLQUFMLENBQVcsV0FBWCxFQUF1QjtBQUNyRSxRQUFJLGlCQUFpQixFQUFDLFFBQVEsS0FBSyxLQUFMLENBQVcsV0FBWCxFQUExQixDQURpRTtBQUVyRSxXQUFPLDZCQUFLLElBQUcsTUFBSCxFQUFVLEtBQUksZUFBSixFQUFvQixXQUFXLEtBQUssS0FBTCxDQUFXLFNBQVgsRUFBc0IseUJBQXlCLGNBQXpCLEVBQXBFLENBQVAsQ0FGcUU7SUFBdEU7OztBQUpPLE9BVUgsZ0JBQWdCLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsTUFBakIsQ0FWYjtBQVdQLE9BQUksY0FBSixDQVhPO0FBWVAsT0FBSSxnQkFBZ0IsQ0FBaEIsRUFBbUI7QUFDdEIscUJBQWlCLEVBQWpCLENBRHNCOzs7Ozs7QUFFdEIsMEJBQWlCLEtBQUssS0FBTCxDQUFXLEtBQVgsMEJBQWpCLG9HQUFrQztVQUF6QixtQkFBeUI7O0FBQ2pDLHFCQUFlLElBQWYsQ0FBb0Isb0JBQUMsTUFBRCxJQUFRLE1BQU0sSUFBTixFQUFZLEtBQUssS0FBSyxFQUFMLEVBQXpCLENBQXBCLEVBRGlDO01BQWxDOzs7Ozs7Ozs7Ozs7OztLQUZzQjtJQUF2QixNQUtPLElBQUksa0JBQWtCLENBQWxCLEVBQXFCO0FBQy9CLFFBQUksUUFBTyxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLENBQWpCLENBQVAsQ0FEMkI7QUFFL0IscUJBQWlCLG9CQUFDLE1BQUQsSUFBUSxNQUFNLEtBQU4sRUFBUixDQUFqQixDQUYrQjtJQUF6QixNQUdBO0FBQ04scUJBQWlCLG9CQUFDLElBQUQsT0FBakIsQ0FETTtJQUhBOztBQU9QLFVBQ0M7O01BQUssSUFBRyxNQUFILEVBQVUsS0FBSSxlQUFKLEVBQW9CLFdBQVcsS0FBSyxLQUFMLENBQVcsU0FBWCxFQUE5QztJQUNDLG9CQUFDLGNBQUQsT0FERDtJQUVDLG9CQUFDLE1BQUQsT0FGRDtJQUdDOztPQUFLLElBQUcsU0FBSCxFQUFhLFdBQVUsY0FBVixFQUFsQjtLQUNDOztRQUFLLElBQUcsU0FBSCxFQUFhLFdBQVUsY0FBVixFQUFsQjtNQUNDOztTQUFNLElBQUcsTUFBSCxFQUFVLFdBQVUsV0FBVixFQUFzQixNQUFLLE1BQUwsRUFBdEM7T0FDQyxjQUREO09BREQ7TUFERDtLQUhEO0lBVUMsb0JBQUMsTUFBRCxPQVZEO0lBREQsQ0F4Qk87Ozs7UUF0Q0g7RUFBYSxNQUFNLFNBQU47O0FBK0VuQixPQUFPLE9BQVAsR0FBaUIsSUFBakI7Ozs7Ozs7O0FDMUZBLElBQUksUUFBUSxRQUFRLE9BQVIsQ0FBUjs7QUFFSixJQUFNLFNBQVMsU0FBVCxNQUFTLENBQUMsS0FBRCxFQUFXO0FBQ3pCLFFBQ0M7O0lBQVEsV0FBVSxjQUFWLEVBQVI7O0VBREQsQ0FEeUI7Q0FBWDs7QUFRZixPQUFPLE9BQVAsR0FBaUIsTUFBakI7Ozs7O0FDYkEsSUFBSSxRQUFRLFFBQVEsT0FBUixDQUFSOztBQUVKLElBQU0sU0FBUyxTQUFULE1BQVMsQ0FBQyxLQUFELEVBQVc7QUFDekIsS0FBSSxTQUFKLENBRHlCO0FBRXpCLEtBQUksTUFBTSxTQUFOLEtBQW9CLE1BQXBCLEVBQTJCO0FBQzlCLE1BQUksV0FBVyxFQUFDLFFBQVEsTUFBTSxJQUFOLEVBQXBCLENBRDBCO0FBRTlCLGNBQ0MsNkJBQUssV0FBVSxZQUFWLEVBQXVCLHlCQUF5QixRQUF6QixFQUE1QixDQURELENBRjhCO0VBQS9COztBQU9BLFFBQ0M7O0lBQVEsV0FBVSxjQUFWLEVBQVI7RUFDQzs7S0FBSSxXQUFVLGFBQVYsRUFBSjtHQUE0Qjs7TUFBRyxNQUFNLE1BQU0sU0FBTixFQUFUO0lBQTJCLE1BQU0sS0FBTjtJQUF2RDtHQUREO0VBRUUsU0FGRjtFQURELENBVHlCO0NBQVg7O0FBaUJmLE9BQU8sT0FBUCxHQUFpQixNQUFqQjs7Ozs7OztBQ2pCQSxJQUFJLFFBQVEsUUFBUSxPQUFSLENBQVI7O0FBRUosSUFBTSxPQUFPLFNBQVAsSUFBTyxDQUFDLEtBQUQsRUFBVztBQUN2QixRQUNDOztJQUFTLFdBQVUsc0JBQVYsRUFBVDtFQUNDOztLQUFRLFdBQVUsYUFBVixFQUFSO0dBQ0M7O01BQUksV0FBVSxZQUFWLEVBQUo7O0lBREQ7R0FERDtFQUtDOztLQUFLLFdBQVUsY0FBVixFQUFMOztHQUxEO0VBREQsQ0FEdUI7Q0FBWDs7QUFjYixPQUFPLE9BQVAsR0FBaUIsSUFBakI7Ozs7O0FDbEJBLElBQUksUUFBUSxRQUFRLE9BQVIsQ0FBUjtBQUNKLElBQUksUUFBUTtBQUNYLFNBQVMsUUFBUSxvQkFBUixDQUFUO0FBQ0EsU0FBUyxRQUFRLG9CQUFSLENBQVQ7Q0FGRzs7QUFLSixJQUFNLFNBQVMsU0FBVCxNQUFTLENBQUMsS0FBRCxFQUFXO0FBQ3pCLEtBQUksY0FBYyxFQUFDLFFBQVEsTUFBTSxJQUFOLENBQVcsT0FBWCxFQUF2QixDQURxQjs7QUFHekIsUUFDQzs7SUFBUyxJQUFJLE1BQU0sSUFBTixDQUFXLEVBQVgsRUFBZSxXQUFXLE1BQU0sSUFBTixDQUFXLFNBQVgsRUFBdkM7RUFDQyxvQkFBQyxNQUFNLE1BQVA7QUFDQyxVQUFPLE1BQU0sSUFBTixDQUFXLEtBQVg7QUFDUCxjQUFXLE1BQU0sSUFBTixDQUFXLFNBQVg7QUFDWCxTQUFNLE1BQU0sSUFBTixDQUFXLGFBQVgsQ0FBeUIsU0FBekI7QUFDTixjQUFXLE1BQU0sSUFBTixDQUFXLFNBQVgsRUFKWixDQUREO0VBTUMsNkJBQUssV0FBVSxlQUFWLEVBQTBCLHlCQUF5QixXQUF6QixFQUEvQixDQU5EO0VBREQsQ0FIeUI7Q0FBWDs7QUFlZixPQUFPLE9BQVAsR0FBaUIsTUFBakI7Ozs7O0FDckJBLElBQUksUUFBUSxRQUFRLE9BQVIsQ0FBUjtBQUNKLElBQUksUUFBUTtBQUNYLFNBQVMsUUFBUSxvQkFBUixDQUFUO0FBQ0EsU0FBUyxRQUFRLG9CQUFSLENBQVQ7Q0FGRzs7QUFLSixJQUFNLFNBQVMsU0FBVCxNQUFTLENBQUMsS0FBRCxFQUFXO0FBQ3pCLEtBQUksY0FBYyxFQUFDLFFBQVEsTUFBTSxJQUFOLENBQVcsT0FBWCxFQUF2QixDQURxQjtBQUV6QixRQUNDOztJQUFTLElBQUksTUFBTSxJQUFOLENBQVcsRUFBWCxFQUFlLFdBQVcsTUFBTSxJQUFOLENBQVcsU0FBWCxFQUF2QztFQUNDLG9CQUFDLE1BQU0sTUFBUDtBQUNDLFVBQU8sTUFBTSxJQUFOLENBQVcsS0FBWDtBQUNQLGNBQVcsTUFBTSxJQUFOLENBQVcsU0FBWDtBQUNYLFNBQU0sTUFBTSxJQUFOLENBQVcsYUFBWCxDQUF5QixTQUF6QjtBQUNOLGNBQVcsTUFBTSxJQUFOLENBQVcsU0FBWCxFQUpaLENBREQ7RUFPQyw2QkFBSyxXQUFVLGVBQVYsRUFBMEIseUJBQXlCLFdBQXpCLEVBQS9CLENBUEQ7RUFTQyxvQkFBQyxNQUFNLE1BQVAsT0FURDtFQURELENBRnlCO0NBQVg7O0FBaUJmLE9BQU8sT0FBUCxHQUFpQixNQUFqQjs7Ozs7QUN2QkEsSUFBSSxRQUFRLFFBQVEsT0FBUixDQUFSOztBQUVKLElBQU0sU0FBUyxTQUFULE1BQVMsQ0FBQyxLQUFELEVBQVc7QUFDekIsUUFDQzs7SUFBUSxJQUFHLFVBQUgsRUFBYyxXQUFVLGFBQVYsRUFBd0IsTUFBSyxhQUFMLEVBQTlDO0VBQ0M7O0tBQUssV0FBVSxXQUFWLEVBQUw7O0dBREQ7RUFERCxDQUR5QjtDQUFYOztBQVVmLE9BQU8sT0FBUCxHQUFpQixNQUFqQjs7Ozs7QUNaQSxJQUFJLFFBQVEsUUFBUSxPQUFSLENBQVI7O0FBRUosSUFBTSxTQUFTLFNBQVQsTUFBUyxDQUFDLEtBQUQsRUFBVztBQUN6QixRQUNDOztJQUFRLElBQUcsVUFBSCxFQUFjLFdBQVUsYUFBVixFQUF3QixNQUFLLFFBQUwsRUFBOUM7RUFDQzs7S0FBSyxXQUFVLFdBQVYsRUFBTDtHQUNBOztNQUFHLE1BQUssR0FBTCxFQUFTLEtBQUksTUFBSixFQUFaO0lBQ0MsNkJBQUssS0FBSSx5RUFBSixFQUE4RSxLQUFJLFdBQUosRUFBbkYsQ0FERDtJQURBO0dBREQ7RUFPQzs7S0FBSyxJQUFHLGlCQUFILEVBQXFCLFdBQVUsaUJBQVYsRUFBNEIsTUFBSyxZQUFMLEVBQXREO0dBQ0MsZ0NBQVEsV0FBVSxhQUFWLEVBQXdCLGlCQUFjLGNBQWQsRUFBNkIsaUJBQWMsT0FBZCxFQUE3RCxDQUREO0dBRUU7O01BQUssV0FBVSx3QkFBVixFQUFMOztJQUZGO0dBR0U7O01BQU0sV0FBVSxhQUFWLEVBQU47O0lBSEY7R0FQRDtFQURELENBRHlCO0NBQVg7O0FBa0JmLE9BQU8sT0FBUCxHQUFpQixNQUFqQjs7Ozs7Ozs7O0FDaEJBLElBQUksUUFBUSxRQUFTLE9BQVQsQ0FBUjtBQUNKLElBQUksV0FBVyxRQUFRLFdBQVIsQ0FBWDtBQUNKLElBQUksU0FBUyxRQUFTLGNBQVQsQ0FBVDs7QUFFSixJQUFJLFlBQVksU0FBUyxjQUFULENBQXlCLFVBQXpCLENBQVo7QUFDSixJQUFJLFdBQVcsU0FBUyxjQUFULENBQXlCLE1BQXpCLENBQVg7QUFDSixTQUFTLE1BQVQsQ0FBZ0Isb0JBQUMsTUFBRCxJQUFRLGFBQWEsU0FBUyxTQUFULEVBQW9CLGtCQUFrQixTQUFTLFNBQVQsRUFBM0QsQ0FBaEIsRUFBa0csU0FBbEc7Ozs7O0FDVkEsSUFBSSxRQUFRLFFBQVEsT0FBUixDQUFSOztBQUVKLElBQU0saUJBQWlCLFNBQWpCLGNBQWlCLENBQUMsS0FBRCxFQUFXO0FBQ2pDLFFBQ0M7O0lBQUcsV0FBVSw4QkFBVixFQUF5QyxNQUFLLE9BQUwsRUFBNUM7O0VBREQsQ0FEaUM7Q0FBWDs7QUFNdkIsT0FBTyxPQUFQLEdBQWlCLGNBQWpCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQSxJQUFJLFFBQVEsUUFBUyxPQUFULENBQVI7QUFDSixJQUFJLFlBQVksUUFBUyxNQUFULENBQVo7QUFDSixJQUFJLFVBQVUsUUFBUyxZQUFULENBQVY7O0FBRUosSUFBSSxPQUFPLFFBQVMsWUFBVCxDQUFQOztJQUNFOzs7QUFFTCxVQUZLLE1BRUwsQ0FBWSxLQUFaLEVBQW1CO3dCQUZkLFFBRWM7O3FFQUZkLG1CQUdFLFFBRFk7O0FBRWhCLFFBQUssS0FBTCxHQUFhO0FBQ2Qsa0JBQWUsS0FBZjtBQUNBLFVBQU8sRUFBUDtHQUZDLENBRmdCOztFQUFuQjs7Y0FGSzs7c0NBVWU7QUFDbkIsT0FBSSxPQUFPLElBQVAsQ0FEZTs7QUFHbkIsYUFBVyxHQUFYLEVBQWdCLFVBQVcsR0FBWCxFQUFpQjtBQUNoQyxRQUFJLFdBQVcsSUFBSSxRQUFKLENBRGlCO0FBRWhDLFFBQUksb0JBQW9CLEVBQXBCLENBRjRCO0FBR2hDLFFBQUksSUFBSSxXQUFKLEVBQWdCO0FBQ25CLHlCQUFvQixHQUFwQixDQURtQjtLQUFwQjtBQUdBLFFBQUksV0FBVyxNQUFNLElBQUksV0FBSixHQUFrQixpQkFBeEIsR0FBNEMsMkJBQTVDLENBTmlCO0FBT2hDLFFBQUksV0FBVyxXQUFXLFFBQVgsQ0FQaUI7QUFRaEMsWUFDRSxHQURGLENBQ08sUUFEUCxFQUVFLEdBRkYsQ0FFTyxVQUFVLEdBQVYsRUFBZSxHQUFmLEVBQXFCO0FBQzFCLFNBQUksR0FBSixFQUFTO0FBQ1IsY0FBUSxLQUFSLENBQWMsR0FBZCxFQURRO0FBRVIsYUFGUTtNQUFUO0FBSUEsU0FBSSxPQUFPLEtBQUssS0FBTCxDQUFXLElBQUksSUFBSixDQUFsQixDQUxzQjtBQU0xQixVQUFLLFFBQUwsQ0FBYztBQUNiLHFCQUFlLElBQWY7QUFDQSxhQUFPLEtBQUssS0FBTDtBQUNQLGlCQUFXLEtBQUssVUFBTDtNQUhaLEVBTjBCO0FBVzFCLGFBQVEsR0FBUixDQUFZLElBQVosRUFYMEI7S0FBckIsQ0FGUCxDQVJnQztJQUFqQixDQUFoQixDQUhtQjs7QUE0Qm5CLGFBQVU7QUFDVCxjQUFVLEtBQVY7SUFERCxFQTVCbUI7Ozs7MkJBaUNYO0FBQ1IsT0FBSSxLQUFLLEtBQUwsQ0FBVyxhQUFYLEVBQTBCO0FBQzdCLFdBQU8sb0JBQUMsSUFBRCxJQUFNLE9BQU8sS0FBSyxLQUFMLENBQVcsS0FBWCxFQUFrQixXQUFXLEtBQUssS0FBTCxDQUFXLFNBQVgsRUFBMUMsQ0FBUCxDQUQ2QjtJQUE5QixNQUVPO0FBQ04sV0FBTyxvQkFBQyxJQUFELElBQU0sYUFBYSxLQUFLLEtBQUwsQ0FBVyxXQUFYLEVBQXdCLFdBQVcsS0FBSyxLQUFMLENBQVcsZ0JBQVgsRUFBdEQsQ0FBUCxDQURNO0lBRlA7Ozs7UUE1Q0k7RUFBZSxNQUFNLFNBQU47O0FBcURyQixPQUFPLE9BQVAsR0FBaUIsTUFBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIEhlYWRlciA9IHJlcXVpcmUoJy4vaGVhZGVyLmpzeCcpO1xudmFyIEhlYWRlclNraXBMaW5rID0gcmVxdWlyZSgnLi9taXNjL2hlYWRlci1za2lwLWxpbmsuanN4Jyk7XG52YXIgUm9sbHVwID0gcmVxdWlyZSgnLi9jb250ZW50L3JvbGx1cC5qc3gnKTtcbnZhciBTaW5nbGUgPSByZXF1aXJlKCcuL2NvbnRlbnQvc2luZ2xlLmpzeCcpO1xudmFyIE5vbmUgPSByZXF1aXJlKCcuL2NvbnRlbnQvbm9uZS5qc3gnKTtcbnZhciBGb290ZXIgPSByZXF1aXJlKCcuL2Zvb3Rlci5qc3gnKTtcblxuLyoqXG4gKiBNYWluIFBhZ2UgQ29tcG9uZW50XG4gKlxuICogQWxzbyBjb250cm9scyB0aGUgZmFuY3kgY29sb3IgdG9nZ2xlIG9uIHBhZ2UgZWxlbWVudHNcbiAqL1xuY2xhc3MgUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnN0YXRlID0ge1xuXHRcdFx0Y29sb3JQYWxldHRlOiAnY29sb3ItcGFsZXR0ZS0xJ1xuXHRcdH1cblx0fVxuXG5cdC8vIFVwZGF0ZSBSYW5kb20gQ29sb3IgU2NoZW1lXG5cdGdldFJhbmRvbVBhbGV0dGVDbGFzcygpe1xuXHRcdGNvbnN0IG1pblBhbGV0dGUgPSAxO1xuXHRcdGNvbnN0IG1heFBhbGV0dGUgPSA0O1xuXHRcdGxldCByYW5kSW50ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heFBhbGV0dGUgLSBtaW5QYWxldHRlICsgMSkgKyBtaW5QYWxldHRlKTtcblx0XHRyZXR1cm4gJ2NvbG9yLXBhbGV0dGUtJyArIHJhbmRJbnQ7XG5cdH1cblxuXHRwb3N0UGFpbnRVcGRhdGVQYWxldHRlQ2xhc3MoKXtcblx0XHR2YXIgbmV3UGFsZXR0ZSA9IHRoaXMuZ2V0UmFuZG9tUGFsZXR0ZUNsYXNzKCk7XG5cdFx0dmFyIHBhZ2VDb250YWluZXIgPSB0aGlzLnJlZnMucGFnZUNvbnRhaW5lcjtcblx0XHR2YXIgY29sb3JQYWxldHRlUmVnZXggPSAvY29sb3ItcGFsZXR0ZS1cXGQvO1xuXHRcdHZhciBuZXdDbGFzc0xpc3Q7XG5cdFx0aWYgKCFjb2xvclBhbGV0dGVSZWdleC50ZXN0KHBhZ2VDb250YWluZXIuY2xhc3NOYW1lKSkge1xuXHRcdFx0bmV3Q2xhc3NMaXN0ID0gcGFnZUNvbnRhaW5lci5jbGFzc05hbWUgKyAnICcgKyBuZXdQYWxldHRlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRuZXdDbGFzc0xpc3QgPSBwYWdlQ29udGFpbmVyLmNsYXNzTmFtZS5yZXBsYWNlKC9jb2xvci1wYWxldHRlLVxcZC8sIG5ld1BhbGV0dGUpO1xuXHRcdH1cblx0XHRwYWdlQ29udGFpbmVyLmNsYXNzTmFtZSA9IG5ld0NsYXNzTGlzdDtcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0Ly90aGlzLnBvc3RQYWludFVwZGF0ZVBhbGV0dGVDbGFzcygpO1xuXHR9XG5cblx0Y29tcG9uZW50V2lsbFVwZGF0ZSgpe1xuXHRcdC8vdGhpcy5wb3N0UGFpbnRVcGRhdGVQYWxldHRlQ2xhc3MoKTtcblx0fVxuXG5cdHJlbmRlcigpe1xuXG5cdFx0Ly8gSWYgd2UgcGFzc2VkIGluIGludGlhbCBwYWdlIGh0bWwgaW5zdGVhZCBvZiBhIHBvc3Qgb2JqZWN0IHJlbmRlclxuXHRcdC8vIHRoYXQgaW5zdGVhZCBvZiB0aGUgXCJyZWFsXCIgcmVhY3QgYXBwXG5cdFx0aWYgKHR5cGVvZiB0aGlzLnByb3BzLnBvc3RzID09PSAndW5kZWZpbmVkJyAmJiB0aGlzLnByb3BzLmluaXRpYWxQYWdlKXtcblx0XHRcdHZhciBpbnRpYWxQYWdlSFRNTCA9IHtfX2h0bWw6IHRoaXMucHJvcHMuaW5pdGlhbFBhZ2V9O1xuXHRcdFx0cmV0dXJuIDxkaXYgaWQ9XCJwYWdlXCIgcmVmPVwicGFnZUNvbnRhaW5lclwiIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5wYWdlQ2xhc3N9IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtpbnRpYWxQYWdlSFRNTH0gLz5cblx0XHR9XG5cblx0XHQvLyBUaGlzIGlzIHRoZSBub3JtYWwgcG9zdC1yZW5kZXJlciByZWFjdCBhcHBzXG5cdFx0dmFyIG51bWJlck9mUG9zdHMgPSB0aGlzLnByb3BzLnBvc3RzLmxlbmd0aDtcblx0XHR2YXIgY29udGVudEVsZW1lbnQ7XG5cdFx0aWYgKG51bWJlck9mUG9zdHMgPiAxKSB7XG5cdFx0XHRjb250ZW50RWxlbWVudCA9IFtdO1xuXHRcdFx0Zm9yIChsZXQgcG9zdCBvZiB0aGlzLnByb3BzLnBvc3RzKXtcblx0XHRcdFx0Y29udGVudEVsZW1lbnQucHVzaCg8Um9sbHVwIHBvc3Q9e3Bvc3R9IGtleT17cG9zdC5pZH0vPik7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChudW1iZXJPZlBvc3RzID09PSAxKSB7XG5cdFx0XHRsZXQgcG9zdCA9IHRoaXMucHJvcHMucG9zdHNbMF07XG5cdFx0XHRjb250ZW50RWxlbWVudCA9IDxTaW5nbGUgcG9zdD17cG9zdH0vPjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29udGVudEVsZW1lbnQgPSA8Tm9uZSAvPjtcblx0XHR9XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBpZD1cInBhZ2VcIiByZWY9XCJwYWdlQ29udGFpbmVyXCIgY2xhc3NOYW1lPXt0aGlzLnByb3BzLnBhZ2VDbGFzc30+XG5cdFx0XHRcdDxIZWFkZXJTa2lwTGluayAvPlxuXHRcdFx0XHQ8SGVhZGVyIC8+XG5cdFx0XHRcdDxkaXYgaWQ9XCJjb250ZW50XCIgY2xhc3NOYW1lPVwic2l0ZS1jb250ZW50XCI+XG5cdFx0XHRcdFx0PGRpdiBpZD1cInByaW1hcnlcIiBjbGFzc05hbWU9XCJjb250ZW50LWFyZWFcIj5cblx0XHRcdFx0XHRcdDxtYWluIGlkPVwibWFpblwiIGNsYXNzTmFtZT1cInNpdGUtbWFpblwiIHJvbGU9XCJtYWluXCI+XG5cdFx0XHRcdFx0XHR7Y29udGVudEVsZW1lbnR9XG5cdFx0XHRcdFx0XHQ8L21haW4+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8Rm9vdGVyIC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZTtcbiIsIi8vIFRPRE8gLSBwcm9iYWJseSBuZWVkZWQgdG8gaW1wbGVtZW50IGNvbW1lbnRzIGxhdGVyLCBidXQgYXQgdGhlIG1vbWVudFxuLy8gbGV0J3Mgbm90IHVzZSB0aGlzIGZvciBub3dcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgRm9vdGVyID0gKHByb3BzKSA9PiB7XG5cdHJldHVybihcblx0XHQ8Zm9vdGVyIGNsYXNzTmFtZT1cImVudHJ5LWZvb3RlclwiPlxuXHRcdFx0KiogQ29tbWVudHMgYW5kIFN0dWZmIEdvIGhlcmUgZXZlbnR1YWxseSAqKlxuXHRcdDwvZm9vdGVyPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZvb3RlcjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IEhlYWRlciA9IChwcm9wcykgPT4ge1xuXHR2YXIgZW50cnlNZXRhO1xuXHRpZiAocHJvcHMucG9zdF90eXBlID09PSAncG9zdCcpe1xuXHRcdHZhciBtZXRhSFRNTCA9IHtfX2h0bWw6IHByb3BzLm1ldGF9O1xuXHRcdGVudHJ5TWV0YSA9IChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZW50cnktbWV0YVwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXttZXRhSFRNTH0gPjwvZGl2PlxuXHRcdClcblx0fVxuXG5cdHJldHVybihcblx0XHQ8aGVhZGVyIGNsYXNzTkFtZT1cImVudHJ5LWhlYWRlclwiPlxuXHRcdFx0PGgyIGNsYXNzTmFtZT1cImVudHJ5LXRpdGxlXCI+PGEgaHJlZj17cHJvcHMucGVybWFsaW5rfT57cHJvcHMudGl0bGV9PC9hPjwvaDI+XG5cdFx0XHR7ZW50cnlNZXRhfVxuXHRcdDwvaGVhZGVyPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlcjtcbiIsIi8vIFRPRE8gLSBuZWVkIHRoaXMgdGVtcGxhdGUgZmxlc2hlZCBvdXQgdG9vXG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IE5vbmUgPSAocHJvcHMpID0+IHtcblx0cmV0dXJuIChcblx0XHQ8c2VjdGlvbiBjbGFzc05hbWU9XCJuby1yZXN1bHRzIG5vdC1mb3VuZFwiPlxuXHRcdFx0PGhlYWRlciBjbGFzc05hbWU9XCJwYWdlLWhlYWRlclwiPlxuXHRcdFx0XHQ8aDEgY2xhc3NOYW1lPVwicGFnZS10aXRsZVwiPiBOb3RoaW5nIEZvdW5kIDwvaDE+XG5cdFx0XHQ8L2hlYWRlcj5cblxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYWdlLWNvbnRlbnRcIj5cblx0XHRcdFx0KiogVEhFUkUgSVNOJ1QgQU5ZIFBPU1RTIGRvIHlvdSB3YW50IHRvIHNlYXJjaD8gKipcblx0XHRcdDwvZGl2PlxuXHRcdDwvc2VjdGlvbj5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBOb25lO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBFbnRyeSA9IHtcblx0SGVhZGVyIDogcmVxdWlyZSgnLi9lbnRyeS9oZWFkZXIuanN4JyksXG5cdEZvb3RlciA6IHJlcXVpcmUoJy4vZW50cnkvZm9vdGVyLmpzeCcpLFxufVxuXG5jb25zdCBSb2xsdXAgPSAocHJvcHMpID0+IHtcblx0dmFyIGV4Y2VycHRIVE1MID0ge19faHRtbDogcHJvcHMucG9zdC5leGNlcnB0fTtcblxuXHRyZXR1cm4gKFxuXHRcdDxhcnRpY2xlIGlkPXtwcm9wcy5wb3N0LmlkfSBjbGFzc05hbWU9e3Byb3BzLnBvc3QuY3NzX2NsYXNzfT5cblx0XHRcdDxFbnRyeS5IZWFkZXJcblx0XHRcdFx0dGl0bGU9e3Byb3BzLnBvc3QudGl0bGV9XG5cdFx0XHRcdHBlcm1hbGluaz17cHJvcHMucG9zdC5wZXJtYWxpbmt9XG5cdFx0XHRcdG1ldGE9e3Byb3BzLnBvc3QudGVtcGxhdGVfdGFncy5wb3N0ZWRfb259XG5cdFx0XHRcdHBvc3RfdHlwZT17cHJvcHMucG9zdC5wb3N0X3R5cGV9Lz5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZW50cnktc3VtbWFyeVwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtleGNlcnB0SFRNTH0+PC9kaXY+XG5cdFx0PC9hcnRpY2xlPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJvbGx1cDtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgRW50cnkgPSB7XG5cdEhlYWRlciA6IHJlcXVpcmUoJy4vZW50cnkvaGVhZGVyLmpzeCcpLFxuXHRGb290ZXIgOiByZXF1aXJlKCcuL2VudHJ5L2Zvb3Rlci5qc3gnKSxcbn1cblxuY29uc3QgU2luZ2xlID0gKHByb3BzKSA9PiB7XG5cdHZhciBjb250ZW50SFRNTCA9IHtfX2h0bWw6IHByb3BzLnBvc3QuY29udGVudH07XG5cdHJldHVybiAoXG5cdFx0PGFydGljbGUgaWQ9e3Byb3BzLnBvc3QuaWR9IGNsYXNzTmFtZT17cHJvcHMucG9zdC5jc3NfY2xhc3N9PlxuXHRcdFx0PEVudHJ5LkhlYWRlclxuXHRcdFx0XHR0aXRsZT17cHJvcHMucG9zdC50aXRsZX1cblx0XHRcdFx0cGVybWFsaW5rPXtwcm9wcy5wb3N0LnBlcm1hbGlua31cblx0XHRcdFx0bWV0YT17cHJvcHMucG9zdC50ZW1wbGF0ZV90YWdzLnBvc3RlZF9vbn1cblx0XHRcdFx0cG9zdF90eXBlPXtwcm9wcy5wb3N0LnBvc3RfdHlwZX0vPlxuXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImVudHJ5LWNvbnRlbnRcIiBkYW5nZXJvdXNseVNldElubmVySFRNTD17Y29udGVudEhUTUx9PjwvZGl2PlxuXG5cdFx0XHQ8RW50cnkuRm9vdGVyIC8+XG5cdFx0PC9hcnRpY2xlPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNpbmdsZTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IEZvb3RlciA9IChwcm9wcykgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdDxmb290ZXIgaWQ9XCJjb2xvcGhvblwiIGNsYXNzTmFtZT1cInNpdGUtZm9vdGVyXCIgcm9sZT1cImNvbnRlbnRpbmZvXCI+XG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNpdGUtaW5mb1wiPlxuXHRcdFx0XHQqKkhFUkUgSVMgVEhFIEZPT1RFUioqXG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L2Zvb3Rlcj5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGb290ZXI7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBIZWFkZXIgPSAocHJvcHMpID0+IHtcblx0cmV0dXJuIChcblx0XHQ8aGVhZGVyIGlkPVwibWFzdGhlYWRcIiBjbGFzc05hbWU9XCJzaXRlLWhlYWRlclwiIHJvbGU9XCJiYW5uZXJcIj5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2l0ZS1sb2dvXCI+XG5cdFx0XHQ8YSBocmVmPVwiL1wiIHJlbD1cImhvbWVcIj5cblx0XHRcdFx0PGltZyBzcmM9XCIvd3AtY29udGVudC90aGVtZXMva3Jhc2tlLXJlYWN0LTIwMTYvY2xpZW50L3N0YXRpYy9hc3NldHMvc2l0ZS1sb2dvLnBuZ1wiIGFsdD1cIlNpdGUgTG9nb1wiIC8+XG5cdFx0XHQ8L2E+XG5cdFx0XHQ8L2Rpdj5cblxuXHRcdFx0PG5hdiBpZD1cInNpdGUtbmF2aWdhdGlvblwiIGNsYXNzTmFtZT1cIm1haW4tbmF2aWdhdGlvblwiIHJvbGU9XCJuYXZpZ2F0aW9uXCI+XG5cdFx0XHRcdDxidXR0b24gY2xhc3NOYW1lPVwibWVudS10b2dnbGVcIiBhcmlhLWNvbnRyb2xzPVwicHJpbWFyeS1tZW51XCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+PC9idXR0b24+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZW51LXByaW1hcnktY29udGFpbmVyXCI+ICoqTUVOVSBHT0VTIEhFUkUqKiA8L2Rpdj5cblx0XHRcdFx0XHQ8Zm9ybSBjbGFzc05hbWU9XCJzZWFyY2gtZm9ybVwiPiAqKlNFQVJDSEZPUk0gR09FUyBIRVJFKiogPC9mb3JtPlxuXHRcdFx0PC9uYXY+XG5cdFx0PC9oZWFkZXI+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyO1xuIiwiLyoqXG4gKiBNYWluIGVudHJ5IHBvaW50IGZvciByZWFjdCBjb21wb25lbnRzXG4gKi9cblxudmFyIFJlYWN0ID0gcmVxdWlyZSggJ3JlYWN0JyApO1xudmFyIFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG52YXIgUm91dGVyID0gcmVxdWlyZSggJy4vcm91dGVyLmpzeCcgKTtcblxudmFyIHJlYWN0Um9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnYXBwLXJvb3QnICk7XG52YXIgcGFnZVJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ3BhZ2UnICk7XG5SZWFjdERPTS5yZW5kZXIoPFJvdXRlciBpbml0aWFsUGFnZT17cGFnZVJvb3QuaW5uZXJIVE1MfSBpbml0aWFsQm9keUNsYXNzPXtwYWdlUm9vdC5jbGFzc05hbWV9Lz4sIHJlYWN0Um9vdCk7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBIZWFkZXJTa2lwTGluayA9IChwcm9wcykgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdDxhIGNsYXNzTmFtZT1cInNraXAtbGluayBzY3JlZW4tcmVhZGVyLXRleHRcIiBocmVmPVwiI21haW5cIj5Ta2lwIHRvIGNvbnRlbnQ8L2E+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyU2tpcExpbms7XG4iLCIvKipcbiAqIFdyYXBwZXIgY29tcG9uZW50IGZvciBSZWFjdCBBcHBsaWNhdGlvbiB3aGljaCBtYW5hZ2VzIHN0YXRlIHZpYSB0aGVcbiAqIHdvcmRwcmVzcyBVUkwuIFVzaW5nIHRoZSAncGFnZScgbGlicmFyeSBpbiBucG0gd2UgY2FuIGhpamFjayBub3JtYWwgbGlua1xuICogZXhlY3V0aW9uIGFuZCBpbnN0ZWFkIHVzZSB0aGUgZXZlbnQgdG8gZ2V0IHRoZSBuZXcgZGF0YSBmb3IgUmVhY3QgdG8gY29uc3VtZVxuICogYWxsIHRoZSB3aGlsZSB1cGRhdGluZyB0aGUgY3VycmVudCB1cmwgdXNpbmcgdGhlIEhpc3RvcnkgQVBJIHRvIG1ha2UgaXRcbiAqIGFwcGVhciB0aGF0IHlvdSBoYXZlIG1vdmVkIHRvIGEgbmV3IHBhZ2VcbiAqL1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCAncmVhY3QnICk7XG52YXIgdXJsUm91dGVyID0gcmVxdWlyZSggJ3BhZ2UnICk7XG52YXIgcmVxdWVzdCA9IHJlcXVpcmUoICdzdXBlcmFnZW50JyApO1xuXG52YXIgUGFnZSA9IHJlcXVpcmUoICcuL1BhZ2UuanN4JyApO1xuY2xhc3MgUm91dGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuXHRcdFx0aGFzU2VydmVyRGF0YTogZmFsc2UsXG5cdFx0XHRwb3N0czogW11cblx0XHR9XG5cdH1cblxuXHRjb21wb25lbnREaWRNb3VudCgpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHR1cmxSb3V0ZXIoICcqJywgZnVuY3Rpb24gKCBjdHggKSB7XG5cdFx0XHR2YXIgcGF0aE5hbWUgPSBjdHgucGF0aG5hbWU7XG5cdFx0XHR2YXIgc2VwZXJhdG9yQXBlcnNhbmQgPSAnJztcblx0XHRcdGlmIChjdHgucXVlcnlzdHJpbmcpe1xuXHRcdFx0XHRzZXBlcmF0b3JBcGVyc2FuZCA9ICcmJztcblx0XHRcdH1cblx0XHRcdHZhciBuZXdRdWVyeSA9ICc/JyArIGN0eC5xdWVyeXN0cmluZyArIHNlcGVyYXRvckFwZXJzYW5kICsgJ3JldHVybl9pbnN0ZWFkPXBvc3RzLWpzb24nO1xuXHRcdFx0dmFyIGRhdGFQYXRoID0gcGF0aE5hbWUgKyBuZXdRdWVyeTtcblx0XHRcdHJlcXVlc3Rcblx0XHRcdFx0LmdldCggZGF0YVBhdGggKVxuXHRcdFx0XHQuZW5kKCBmdW5jdGlvbiggZXJyLCByZXMgKSB7XG5cdFx0XHRcdFx0aWYgKGVycikge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnIpO1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR2YXIgZGF0YSA9IEpTT04ucGFyc2UocmVzLnRleHQpO1xuXHRcdFx0XHRcdHNlbGYuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdFx0aGFzU2VydmVyRGF0YTogdHJ1ZSxcblx0XHRcdFx0XHRcdHBvc3RzOiBkYXRhLnBvc3RzLFxuXHRcdFx0XHRcdFx0Ym9keUNsYXNzOiBkYXRhLmJvZHlfY2xhc3Ncblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcblx0XHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHR1cmxSb3V0ZXIoe1xuXHRcdFx0ZGlzcGF0Y2g6IGZhbHNlXG5cdFx0fSk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0aWYgKHRoaXMuc3RhdGUuaGFzU2VydmVyRGF0YSkge1xuXHRcdFx0cmV0dXJuIDxQYWdlIHBvc3RzPXt0aGlzLnN0YXRlLnBvc3RzfSBwYWdlQ2xhc3M9e3RoaXMuc3RhdGUuYm9keUNsYXNzfS8+XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiA8UGFnZSBpbml0aWFsUGFnZT17dGhpcy5wcm9wcy5pbml0aWFsUGFnZX0gcGFnZUNsYXNzPXt0aGlzLnByb3BzLmluaXRpYWxCb2R5Q2xhc3N9Lz5cblx0XHR9XG5cdH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJvdXRlcjtcbiJdfQ==
