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
		contentElement = React.createElement(Rollup, null);
	} else if (numberOfPosts === 1) {
		contentElement = React.createElement(Single, null);
	} else {
		contentElement = React.createElement(None, null);
	}

	return React.createElement(
		'div',
		null,
		React.createElement(HeaderSkipLink, null),
		React.createElement(Header, null),
		contentElement,
		React.createElement(Footer, null)
	);
};

module.exports = Page;

},{"./content/none.jsx":2,"./content/rollup.jsx":3,"./content/single.jsx":4,"./footer.jsx":5,"./header.jsx":6,"./misc/header-skip-link.jsx":8,"react":"react"}],2:[function(require,module,exports){
'use strict';

var React = require('react');

var None = function None(props) {
	return React.createElement(
		'div',
		null,
		'Hey this is this no-posts template'
	);
};

module.exports = None;

},{"react":"react"}],3:[function(require,module,exports){
'use strict';

var React = require('react');

var Rollup = function Rollup(props) {
	return React.createElement(
		'div',
		null,
		'Hey this is the Rollup template'
	);
};

module.exports = Rollup;

},{"react":"react"}],4:[function(require,module,exports){
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

},{"react":"react"}],5:[function(require,module,exports){
'use strict';

var React = require('react');

var Footer = function Footer(props) {
	return React.createElement(
		'div',
		null,
		'Hey this is is the footer template'
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

},{"react":"react"}],7:[function(require,module,exports){
'use strict';

/**
 * Main entry point for react components
 */

var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('./router.jsx');

var reactRoot = document.getElementById('page');
ReactDOM.render(React.createElement(Router, { initialPage: reactRoot.innerHTML }), reactRoot);

},{"./router.jsx":9,"react":"react","react-dom":"react-dom"}],8:[function(require,module,exports){
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

},{"./Page.jsx":1,"page":"page","react":"react","superagent":"superagent"}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvY29tcG9uZW50cy9QYWdlLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2NvbnRlbnQvbm9uZS5qc3giLCJjbGllbnQvY29tcG9uZW50cy9jb250ZW50L3JvbGx1cC5qc3giLCJjbGllbnQvY29tcG9uZW50cy9jb250ZW50L3NpbmdsZS5qc3giLCJjbGllbnQvY29tcG9uZW50cy9mb290ZXIuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvaGVhZGVyLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2luZGV4LmpzeCIsImNsaWVudC9jb21wb25lbnRzL21pc2MvaGVhZGVyLXNraXAtbGluay5qc3giLCJjbGllbnQvY29tcG9uZW50cy9yb3V0ZXIuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFJLFFBQVEsUUFBUSxPQUFSLENBQVI7O0FBRUosSUFBSSxTQUFTLFFBQVEsY0FBUixDQUFUO0FBQ0osSUFBSSxpQkFBaUIsUUFBUSw2QkFBUixDQUFqQjtBQUNKLElBQUksU0FBUyxRQUFRLHNCQUFSLENBQVQ7QUFDSixJQUFJLFNBQVMsUUFBUSxzQkFBUixDQUFUO0FBQ0osSUFBSSxPQUFPLFFBQVEsb0JBQVIsQ0FBUDtBQUNKLElBQUksU0FBUyxRQUFRLGNBQVIsQ0FBVDs7QUFFSixJQUFNLE9BQU8sU0FBUCxJQUFPLENBQUMsS0FBRCxFQUFXO0FBQ3ZCLEtBQUksZ0JBQWdCLE1BQU0sS0FBTixDQUFZLE1BQVosQ0FERztBQUV2QixLQUFJLGNBQUosQ0FGdUI7QUFHdkIsS0FBSSxnQkFBZ0IsQ0FBaEIsRUFBbUI7QUFDdEIsbUJBQWlCLG9CQUFDLE1BQUQsT0FBakIsQ0FEc0I7RUFBdkIsTUFFTyxJQUFJLGtCQUFrQixDQUFsQixFQUFxQjtBQUMvQixtQkFBaUIsb0JBQUMsTUFBRCxPQUFqQixDQUQrQjtFQUF6QixN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QUFPLElBQVAsQ0FEZTs7QUFHbkIsYUFBVyxHQUFYLEVBQWdCLFVBQVcsR0FBWCxFQUFpQjtBQUNoQyxRQUFJLFdBQVcsSUFBSSxRQUFKLENBRGlCO0FBRWhDLFFBQUksV0FBVyxJQUFJLFdBQUosR0FBa0IsMkJBQWxCLENBRmlCO0FBR2hDLFFBQUksV0FBVyxXQUFXLEdBQVgsR0FBaUIsUUFBakIsQ0FIaUI7QUFJaEMsWUFDRSxHQURGLENBQ08sUUFEUCxFQUVFLEdBRkYsQ0FFTyxVQUFVLEdBQVYsRUFBZSxHQUFmLEVBQXFCO0FBQzFCLFNBQUksR0FBSixFQUFTO0FBQ1IsY0FBUSxLQUFSLENBQWMsR0FBZCxFQURRO0FBRVIsYUFGUTtNQUFUO0FBSUEsU0FBSSxjQUFjLEtBQUssS0FBTCxDQUFXLElBQUksSUFBSixDQUF6QixDQUxzQjtBQU0xQixVQUFLLFFBQUwsQ0FBYztBQUNiLHFCQUFlLElBQWY7QUFDQSxhQUFPLFdBQVA7TUFGRCxFQU4wQjtBQVUxQixhQUFRLEdBQVIsQ0FBWSxXQUFaLEVBVjBCO0tBQXJCLENBRlAsQ0FKZ0M7SUFBakIsQ0FBaEIsQ0FIbUI7O0FBdUJuQixhQUFVO0FBQ1QsY0FBVSxLQUFWO0lBREQsRUF2Qm1COzs7OzJCQTRCWDtBQUNSLE9BQUksS0FBSyxLQUFMLENBQVcsYUFBWCxFQUEwQjtBQUM3QixXQUFPLG9CQUFDLElBQUQsSUFBTSxPQUFPLEtBQUssS0FBTCxDQUFXLEtBQVgsRUFBYixDQUFQLENBRDZCO0lBQTlCLE1BRU87QUFDTixXQUFPLDZCQUFLLHlCQUF5QixLQUFLLEtBQUwsQ0FBVyxpQkFBWCxFQUE5QixDQUFQLENBRE07SUFGUDs7OztRQTFDSTtFQUFlLE1BQU0sU0FBTjs7QUFtRHJCLE9BQU8sT0FBUCxHQUFpQixNQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgSGVhZGVyID0gcmVxdWlyZSgnLi9oZWFkZXIuanN4Jyk7XG52YXIgSGVhZGVyU2tpcExpbmsgPSByZXF1aXJlKCcuL21pc2MvaGVhZGVyLXNraXAtbGluay5qc3gnKTtcbnZhciBSb2xsdXAgPSByZXF1aXJlKCcuL2NvbnRlbnQvcm9sbHVwLmpzeCcpO1xudmFyIFNpbmdsZSA9IHJlcXVpcmUoJy4vY29udGVudC9zaW5nbGUuanN4Jyk7XG52YXIgTm9uZSA9IHJlcXVpcmUoJy4vY29udGVudC9ub25lLmpzeCcpO1xudmFyIEZvb3RlciA9IHJlcXVpcmUoJy4vZm9vdGVyLmpzeCcpO1xuXG5jb25zdCBQYWdlID0gKHByb3BzKSA9PiB7XG5cdHZhciBudW1iZXJPZlBvc3RzID0gcHJvcHMucG9zdHMubGVuZ3RoO1xuXHR2YXIgY29udGVudEVsZW1lbnQ7XG5cdGlmIChudW1iZXJPZlBvc3RzID4gMSkge1xuXHRcdGNvbnRlbnRFbGVtZW50ID0gPFJvbGx1cCAvPjtcblx0fSBlbHNlIGlmIChudW1iZXJPZlBvc3RzID09PSAxKSB7XG5cdFx0Y29udGVudEVsZW1lbnQgPSA8U2luZ2xlIC8+O1xuXHR9IGVsc2Uge1xuXHRcdGNvbnRlbnRFbGVtZW50ID0gPE5vbmUgLz47XG5cdH1cblxuXHRyZXR1cm4gKFxuXHRcdDxkaXY+XG5cdFx0XHQ8SGVhZGVyU2tpcExpbmsgLz5cblx0XHRcdDxIZWFkZXIgLz5cblx0XHRcdHtjb250ZW50RWxlbWVudH1cblx0XHRcdDxGb290ZXIgLz5cblx0XHQ8L2Rpdj5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgTm9uZSA9IChwcm9wcykgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdDxkaXY+XG5cdFx0SGV5IHRoaXMgaXMgdGhpcyBuby1wb3N0cyB0ZW1wbGF0ZVxuXHRcdDwvZGl2PlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE5vbmU7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBSb2xsdXAgPSAocHJvcHMpID0+IHtcblx0cmV0dXJuIChcblx0XHQ8ZGl2PlxuXHRcdEhleSB0aGlzIGlzIHRoZSBSb2xsdXAgdGVtcGxhdGVcblx0XHQ8L2Rpdj5cblx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSb2xsdXA7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBTaW5nbGUgPSAocHJvcHMpID0+IHtcblx0cmV0dXJuIChcblx0XHQ8ZGl2PiBUaGlzIGlzIGEgc2luZ2xlIHBvc3QgPC9kaXY+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2luZ2xlO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgRm9vdGVyID0gKHByb3BzKSA9PiB7XG5cdHJldHVybiAoXG5cdFx0PGRpdj5cblx0XHRIZXkgdGhpcyBpcyBpcyB0aGUgZm9vdGVyIHRlbXBsYXRlXG5cdFx0PC9kaXY+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRm9vdGVyO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgSGVhZGVyID0gKHByb3BzKSA9PiB7XG5cdHJldHVybiAoXG5cdFx0PGhlYWRlciBpZD1cIm1hc3RoZWFkXCIgY2xhc3NOYW1lPVwic2l0ZS1oZWFkZXJcIiByb2xlPVwiYmFubmVyXCI+XG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNpdGUtYnJhbmRpbmdcIj5cblx0XHRcdFx0KipCUkFORElORyBHT0VTIEhFUkUqKlxuXHRcdFx0PC9kaXY+XG5cblx0XHRcdDxuYXYgaWQ9XCJzaXRlLW5hdmlnYXRpb25cIiBjbGFzc05hbWU9XCJtYWluLW5hdmlnYXRpb25cIiByb2xlPVwibmF2aWdhdGlvblwiPlxuXHRcdFx0XHQ8YnV0dG9uIGNsYXNzTmFtZT1cIm1lbnUtdG9nZ2xlXCIgYXJpYS1jb250cm9scz1cInByaW1hcnktbWVudVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPjwvYnV0dG9uPlxuXHRcdFx0XHRcdCoqTUVOVSBHT0VTIEhFUkUqKlxuXHRcdFx0PC9uYXY+XG5cdFx0PC9oZWFkZXI+XG5cdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyO1xuIiwiLyoqXG4gKiBNYWluIGVudHJ5IHBvaW50IGZvciByZWFjdCBjb21wb25lbnRzXG4gKi9cblxudmFyIFJlYWN0ID0gcmVxdWlyZSggJ3JlYWN0JyApO1xudmFyIFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG52YXIgUm91dGVyID0gcmVxdWlyZSggJy4vcm91dGVyLmpzeCcgKTtcblxudmFyIHJlYWN0Um9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAncGFnZScgKVxuUmVhY3RET00ucmVuZGVyKDxSb3V0ZXIgaW5pdGlhbFBhZ2U9e3JlYWN0Um9vdC5pbm5lckhUTUx9IC8+LCByZWFjdFJvb3QpO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgSGVhZGVyU2tpcExpbmsgPSAocHJvcHMpID0+IHtcblx0cmV0dXJuIChcblx0XHQ8YSBjbGFzc05hbWU9XCJza2lwLWxpbmsgc2NyZWVuLXJlYWRlci10ZXh0XCIgaHJlZj1cIiNtYWluXCI+U2tpcCB0byBjb250ZW50PC9hPlxuXHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlclNraXBMaW5rO1xuIiwiLyoqXG4gKiBXcmFwcGVyIGNvbXBvbmVudCBmb3IgUmVhY3QgQXBwbGljYXRpb24gd2hpY2ggbWFuYWdlcyBzdGF0ZSB2aWEgdGhlXG4gKiB3b3JkcHJlc3MgVVJMLiBVc2luZyB0aGUgJ3BhZ2UnIGxpYnJhcnkgaW4gbnBtIHdlIGNhbiBoaWphY2sgbm9ybWFsIGxpbmtcbiAqIGV4ZWN1dGlvbiBhbmQgaW5zdGVhZCB1c2UgdGhlIGV2ZW50IHRvIGdldCB0aGUgbmV3IGRhdGEgZm9yIFJlYWN0IHRvIGNvbnN1bWVcbiAqIGFsbCB0aGUgd2hpbGUgdXBkYXRpbmcgdGhlIGN1cnJlbnQgdXJsIHVzaW5nIHRoZSBIaXN0b3J5IEFQSSB0byBtYWtlIGl0XG4gKiBhcHBlYXIgdGhhdCB5b3UgaGF2ZSBtb3ZlZCB0byBhIG5ldyBwYWdlXG4gKi9cblxudmFyIFJlYWN0ID0gcmVxdWlyZSggJ3JlYWN0JyApO1xudmFyIHVybFJvdXRlciA9IHJlcXVpcmUoICdwYWdlJyApO1xudmFyIHJlcXVlc3QgPSByZXF1aXJlKCAnc3VwZXJhZ2VudCcgKTtcblxudmFyIFBhZ2UgPSByZXF1aXJlKCAnLi9QYWdlLmpzeCcgKTtcbmNsYXNzIFJvdXRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcblx0XHRcdGhhc1NlcnZlckRhdGE6IGZhbHNlLFxuXHRcdFx0aW5pdGlhbFBhZ2VNYXJrdXA6IHtcblx0XHRcdFx0X19odG1sOiB0aGlzLnByb3BzLmluaXRpYWxQYWdlXG5cdFx0XHR9LFxuXHRcdFx0cG9zdHM6IFtdXG5cdFx0fVxuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFx0dXJsUm91dGVyKCAnKicsIGZ1bmN0aW9uICggY3R4ICkge1xuXHRcdFx0dmFyIHBhdGhOYW1lID0gY3R4LnBhdGhuYW1lO1xuXHRcdFx0dmFyIG5ld1F1ZXJ5ID0gY3R4LnF1ZXJ5c3RyaW5nICsgJ3JldHVybl9pbnN0ZWFkPXBvc3RzLWpzb24nO1xuXHRcdFx0dmFyIGRhdGFQYXRoID0gcGF0aE5hbWUgKyAnPycgKyBuZXdRdWVyeTtcblx0XHRcdHJlcXVlc3Rcblx0XHRcdFx0LmdldCggZGF0YVBhdGggKVxuXHRcdFx0XHQuZW5kKCBmdW5jdGlvbiggZXJyLCByZXMgKSB7XG5cdFx0XHRcdFx0aWYgKGVycikge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnIpO1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR2YXIgcmV0dXJuUG9zdHMgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcblx0XHRcdFx0XHRzZWxmLnNldFN0YXRlKHtcblx0XHRcdFx0XHRcdGhhc1NlcnZlckRhdGE6IHRydWUsXG5cdFx0XHRcdFx0XHRwb3N0czogcmV0dXJuUG9zdHNcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhyZXR1cm5Qb3N0cyk7XG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0dXJsUm91dGVyKHtcblx0XHRcdGRpc3BhdGNoOiBmYWxzZVxuXHRcdH0pO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdGlmICh0aGlzLnN0YXRlLmhhc1NlcnZlckRhdGEpIHtcblx0XHRcdHJldHVybiA8UGFnZSBwb3N0cz17dGhpcy5zdGF0ZS5wb3N0c30gLz5cblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIDxkaXYgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3RoaXMuc3RhdGUuaW5pdGlhbFBhZ2VNYXJrdXB9IC8+XG5cdFx0fVxuXHR9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSb3V0ZXI7XG4iXX0=
