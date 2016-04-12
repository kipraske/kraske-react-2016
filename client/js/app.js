(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var React = require('react');

var Header = require('./header.jsx');
var Rollup = require('./content/rollup.jsx');
var Single = require('./content/single.jsx');
var None = require('./content/none.jsx');
var Footer = require('./header.jsx');

var Page = function Page(posts) {
	var numberOfPosts = posts.length;
	React.createElement(Header, null);
	if (posts.length > 1) {
		React.createElement(Rollup, null);
	} else if (posts.length === 1) {
		React.createElement(Single, null);
	} else {
		React.createElement(None, null);
	}
	React.createElement(Footer, null);
};

module.exports = Page;

},{"./content/none.jsx":2,"./content/rollup.jsx":3,"./content/single.jsx":4,"./header.jsx":5,"react":"react"}],2:[function(require,module,exports){
'use strict';

var React = require('react');

var None = function None(props) {
	React.createElement(
		'div',
		null,
		'Hey this is this no-posts template'
	);
};

module.exports = None;

},{"react":"react"}],3:[function(require,module,exports){
'use strict';

var React = require('react');

var None = function None(props) {
	React.createElement(
		'div',
		null,
		'Hey this is this no-posts template'
	);
};

module.exports = None;

},{"react":"react"}],4:[function(require,module,exports){
'use strict';

var React = require('react');

var Single = function Single(props) {
		React.createElement(
				'div',
				null,
				' This is a single post '
		);
};

module.exports = Single;

},{"react":"react"}],5:[function(require,module,exports){
"use strict";

},{}],6:[function(require,module,exports){
'use strict';

/**
 * Main entry point for react components
 */

var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('./router.jsx');
ReactDOM.render(React.createElement(Router, null), document.getElementById('page'));

},{"./router.jsx":7,"react":"react","react-dom":"react-dom"}],7:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *
 */

var React = require('react');
var urlRouter = require('page');
var request = require('superagent');

var Page = require('./Page.jsx');

var Router = function (_React$Component) {
	_inherits(Router, _React$Component);

	function Router() {
		_classCallCheck(this, Router);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Router).apply(this, arguments));
	}

	_createClass(Router, [{
		key: 'getInitialState',
		value: function getInitialState() {
			return {
				posts: []
			};
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {

			var self = this;

			// page( '*', function ( ctx ) {
			// 	if ( ctx.state.pageData ) {
			// 		self.setState({ component: <Content data={ ctx.state.pageData } bodyClass="page" /> });
			// 	} else {
			// 		var admin = 'wp-admin';
			// 		var slug = ctx.pathname;
			//
			// 		if ( slug.indexOf( admin ) > -1 ) {
			// 			document.location.href = ctx.path;
			// 			return;
			// 		}
			//
			// 		if(slug.substr(-1) == '/') {
			// 			slug = slug.substr(0, slug.length - 1);
			// 		}
			// 		var part = slug.substring(slug.lastIndexOf('/') + 1);
			// 		var url = "/wp-json/posts/?type[]=page&filter[name]=" + part;
			// 		request
			// 			.get( url )
			// 			.end( function( err, res ) {
			// 				data = JSON.parse( res.text );
			// 				ctx.state.pageData = data;
			// 				ctx.save();
			// 				self.setState({ component: <Content data={ data } bodyClass="page" /> });
			// 			});
			// 	}
			// });

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
					self.setState({ posts: returnPosts });
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
			return React.createElement(Page, { posts: this.state.posts });
		}
	}]);

	return Router;
}(React.Component);

module.exports = Router;

},{"./Page.jsx":1,"page":"page","react":"react","superagent":"superagent"}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvY29tcG9uZW50cy9QYWdlLmpzeCIsImNsaWVudC9jb21wb25lbnRzL2NvbnRlbnQvbm9uZS5qc3giLCJjbGllbnQvY29tcG9uZW50cy9jb250ZW50L3JvbGx1cC5qc3giLCJjbGllbnQvY29tcG9uZW50cy9jb250ZW50L3NpbmdsZS5qc3giLCJjbGllbnQvY29tcG9uZW50cy9oZWFkZXIuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvaW5kZXguanN4IiwiY2xpZW50L2NvbXBvbmVudHMvcm91dGVyLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxRQUFRLFFBQVEsT0FBUixDQUFSOztBQUVKLElBQUksU0FBUyxRQUFRLGNBQVIsQ0FBVDtBQUNKLElBQUksU0FBUyxRQUFRLHNCQUFSLENBQVQ7QUFDSixJQUFJLFNBQVMsUUFBUSxzQkFBUixDQUFUO0FBQ0osSUFBSSxPQUFPLFFBQVEsb0JBQVIsQ0FBUDtBQUNKLElBQUksU0FBUyxRQUFRLGNBQVIsQ0FBVDs7QUFFSixJQUFNLE9BQU8sU0FBUCxJQUFPLENBQUMsS0FBRCxFQUFXO0FBQ3ZCLEtBQUksZ0JBQWdCLE1BQU0sTUFBTixDQURHO0FBRXZCLHFCQUFDLE1BQUQsUUFGdUI7QUFHdkIsS0FBSSxNQUFNLE1BQU4sR0FBZSxDQUFmLEVBQWtCO0FBQ3JCLHNCQUFDLE1BQUQsUUFEcUI7RUFBdEIsTUFFTyxJQUFJLE1BQU0sTUFBTixLQUFpQixDQUFqQixFQUFvQjtBQUM5QixzQkFBQyxNQUFELFFBRDhCO0VBQXhCLE1BRUE7QUFDTixzQkFBQyxJQUFELFFBRE07RUFGQTtBQUtQLHFCQUFDLE1BQUQsUUFWdUI7Q0FBWDs7QUFhYixPQUFPLE9BQVAsR0FBaUIsSUFBakI7Ozs7O0FDckJBLElBQUksUUFBUSxRQUFRLE9BQVIsQ0FBUjs7QUFFSixJQUFNLE9BQU8sU0FBUCxJQUFPLENBQUMsS0FBRCxFQUFXO0FBQ3ZCOzs7O0dBRHVCO0NBQVg7O0FBTWIsT0FBTyxPQUFQLEdBQWlCLElBQWpCOzs7OztBQ1JBLElBQUksUUFBUSxRQUFRLE9BQVIsQ0FBUjs7QUFFSixJQUFNLE9BQU8sU0FBUCxJQUFPLENBQUMsS0FBRCxFQUFXO0FBQ3ZCOzs7O0dBRHVCO0NBQVg7O0FBTWIsT0FBTyxPQUFQLEdBQWlCLElBQWpCOzs7OztBQ1JBLElBQUksUUFBUSxRQUFRLE9BQVIsQ0FBUjs7QUFFSixJQUFNLFNBQVMsU0FBVCxNQUFTLENBQUMsS0FBRCxFQUFXO0FBQ3hCOzs7O0lBRHdCO0NBQVg7O0FBSWYsT0FBTyxPQUFQLEdBQWlCLE1BQWpCOzs7QUNOQTtBQUNBOzs7Ozs7OztBQ0dBLElBQUksUUFBUSxRQUFTLE9BQVQsQ0FBUjtBQUNKLElBQUksV0FBVyxRQUFRLFdBQVIsQ0FBWDtBQUNKLElBQUksU0FBUyxRQUFTLGNBQVQsQ0FBVDtBQUNKLFNBQVMsTUFBVCxDQUNDLG9CQUFDLE1BQUQsT0FERCxFQUNhLFNBQVMsY0FBVCxDQUF5QixNQUF6QixDQURiOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0hBLElBQUksUUFBUSxRQUFTLE9BQVQsQ0FBUjtBQUNKLElBQUksWUFBWSxRQUFTLE1BQVQsQ0FBWjtBQUNKLElBQUksVUFBVSxRQUFTLFlBQVQsQ0FBVjs7QUFFSixJQUFJLE9BQU8sUUFBUyxZQUFULENBQVA7O0lBQ0U7Ozs7Ozs7Ozs7O29DQUVhO0FBQ2pCLFVBQU87QUFDTixXQUFPLEVBQVA7SUFERCxDQURpQjs7OztzQ0FNRTs7QUFFbkIsT0FBSSxPQUFPLElBQVA7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUZlLFlBZ0NuQixDQUFXLEdBQVgsRUFBZ0IsVUFBVyxHQUFYLEVBQWlCO0FBQ2hDLFFBQUksV0FBVyxJQUFJLFFBQUosQ0FEaUI7QUFFaEMsUUFBSSxXQUFXLElBQUksV0FBSixHQUFrQiwyQkFBbEIsQ0FGaUI7QUFHaEMsUUFBSSxXQUFXLFdBQVcsR0FBWCxHQUFpQixRQUFqQixDQUhpQjtBQUloQyxZQUNFLEdBREYsQ0FDTyxRQURQLEVBRUUsR0FGRixDQUVPLFVBQVUsR0FBVixFQUFlLEdBQWYsRUFBcUI7QUFDMUIsU0FBSSxHQUFKLEVBQVM7QUFDUixjQUFRLEtBQVIsQ0FBYyxHQUFkLEVBRFE7QUFFUixhQUZRO01BQVQ7QUFJQSxTQUFJLGNBQWMsS0FBSyxLQUFMLENBQVcsSUFBSSxJQUFKLENBQXpCLENBTHNCO0FBTTFCLFVBQUssUUFBTCxDQUFjLEVBQUMsT0FBTyxXQUFQLEVBQWYsRUFOMEI7QUFPMUIsYUFBUSxHQUFSLENBQVksV0FBWixFQVAwQjtLQUFyQixDQUZQLENBSmdDO0lBQWpCLENBQWhCLENBaENtQjs7QUFpRG5CLGFBQVU7QUFDVCxjQUFVLEtBQVY7SUFERCxFQWpEbUI7Ozs7MkJBc0RYO0FBQ1IsVUFDQyxvQkFBQyxJQUFELElBQU0sT0FBTyxLQUFLLEtBQUwsQ0FBVyxLQUFYLEVBQWIsQ0FERCxDQURROzs7O1FBOURKO0VBQWUsTUFBTSxTQUFOOztBQXNFckIsT0FBTyxPQUFQLEdBQWlCLE1BQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBIZWFkZXIgPSByZXF1aXJlKCcuL2hlYWRlci5qc3gnKTtcbnZhciBSb2xsdXAgPSByZXF1aXJlKCcuL2NvbnRlbnQvcm9sbHVwLmpzeCcpO1xudmFyIFNpbmdsZSA9IHJlcXVpcmUoJy4vY29udGVudC9zaW5nbGUuanN4Jyk7XG52YXIgTm9uZSA9IHJlcXVpcmUoJy4vY29udGVudC9ub25lLmpzeCcpO1xudmFyIEZvb3RlciA9IHJlcXVpcmUoJy4vaGVhZGVyLmpzeCcpO1xuXG5jb25zdCBQYWdlID0gKHBvc3RzKSA9PiB7XG5cdHZhciBudW1iZXJPZlBvc3RzID0gcG9zdHMubGVuZ3RoO1xuXHQ8SGVhZGVyIC8+XG5cdGlmIChwb3N0cy5sZW5ndGggPiAxKSB7XG5cdFx0PFJvbGx1cCAvPlxuXHR9IGVsc2UgaWYgKHBvc3RzLmxlbmd0aCA9PT0gMSkge1xuXHRcdDxTaW5nbGUgLz5cblx0fSBlbHNlIHtcblx0XHQ8Tm9uZSAvPlxuXHR9XG5cdDxGb290ZXIgLz5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuY29uc3QgTm9uZSA9IChwcm9wcykgPT4ge1xuXHQ8ZGl2PlxuXHRcdEhleSB0aGlzIGlzIHRoaXMgbm8tcG9zdHMgdGVtcGxhdGVcblx0PC9kaXY+XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTm9uZTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbmNvbnN0IE5vbmUgPSAocHJvcHMpID0+IHtcblx0PGRpdj5cblx0XHRIZXkgdGhpcyBpcyB0aGlzIG5vLXBvc3RzIHRlbXBsYXRlXG5cdDwvZGl2PlxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE5vbmU7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBTaW5nbGUgPSAocHJvcHMpID0+IHtcblx0XHQ8ZGl2PiBUaGlzIGlzIGEgc2luZ2xlIHBvc3QgPC9kaXY+XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2luZ2xlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJaUlzSW1acGJHVWlPaUpvWldGa1pYSXVhbk40SWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2x0ZGZRPT0iLCIvKipcbiAqIE1haW4gZW50cnkgcG9pbnQgZm9yIHJlYWN0IGNvbXBvbmVudHNcbiAqL1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCAncmVhY3QnICk7XG52YXIgUmVhY3RET00gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcbnZhciBSb3V0ZXIgPSByZXF1aXJlKCAnLi9yb3V0ZXIuanN4JyApO1xuUmVhY3RET00ucmVuZGVyKFxuXHQ8Um91dGVyIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ3BhZ2UnIClcbik7XG4iLCIvKipcbiAqXG4gKi9cblxudmFyIFJlYWN0ID0gcmVxdWlyZSggJ3JlYWN0JyApO1xudmFyIHVybFJvdXRlciA9IHJlcXVpcmUoICdwYWdlJyApO1xudmFyIHJlcXVlc3QgPSByZXF1aXJlKCAnc3VwZXJhZ2VudCcgKTtcblxudmFyIFBhZ2UgPSByZXF1aXJlKCAnLi9QYWdlLmpzeCcgKTtcbmNsYXNzIFJvdXRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cblx0Z2V0SW5pdGlhbFN0YXRlKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRwb3N0czogW11cblx0XHR9O1xuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHQvLyBwYWdlKCAnKicsIGZ1bmN0aW9uICggY3R4ICkge1xuXHRcdC8vIFx0aWYgKCBjdHguc3RhdGUucGFnZURhdGEgKSB7XG5cdFx0Ly8gXHRcdHNlbGYuc2V0U3RhdGUoeyBjb21wb25lbnQ6IDxDb250ZW50IGRhdGE9eyBjdHguc3RhdGUucGFnZURhdGEgfSBib2R5Q2xhc3M9XCJwYWdlXCIgLz4gfSk7XG5cdFx0Ly8gXHR9IGVsc2Uge1xuXHRcdC8vIFx0XHR2YXIgYWRtaW4gPSAnd3AtYWRtaW4nO1xuXHRcdC8vIFx0XHR2YXIgc2x1ZyA9IGN0eC5wYXRobmFtZTtcblx0XHQvL1xuXHRcdC8vIFx0XHRpZiAoIHNsdWcuaW5kZXhPZiggYWRtaW4gKSA+IC0xICkge1xuXHRcdC8vIFx0XHRcdGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSBjdHgucGF0aDtcblx0XHQvLyBcdFx0XHRyZXR1cm47XG5cdFx0Ly8gXHRcdH1cblx0XHQvL1xuXHRcdC8vIFx0XHRpZihzbHVnLnN1YnN0cigtMSkgPT0gJy8nKSB7XG5cdFx0Ly8gXHRcdFx0c2x1ZyA9IHNsdWcuc3Vic3RyKDAsIHNsdWcubGVuZ3RoIC0gMSk7XG5cdFx0Ly8gXHRcdH1cblx0XHQvLyBcdFx0dmFyIHBhcnQgPSBzbHVnLnN1YnN0cmluZyhzbHVnLmxhc3RJbmRleE9mKCcvJykgKyAxKTtcblx0XHQvLyBcdFx0dmFyIHVybCA9IFwiL3dwLWpzb24vcG9zdHMvP3R5cGVbXT1wYWdlJmZpbHRlcltuYW1lXT1cIiArIHBhcnQ7XG5cdFx0Ly8gXHRcdHJlcXVlc3Rcblx0XHQvLyBcdFx0XHQuZ2V0KCB1cmwgKVxuXHRcdC8vIFx0XHRcdC5lbmQoIGZ1bmN0aW9uKCBlcnIsIHJlcyApIHtcblx0XHQvLyBcdFx0XHRcdGRhdGEgPSBKU09OLnBhcnNlKCByZXMudGV4dCApO1xuXHRcdC8vIFx0XHRcdFx0Y3R4LnN0YXRlLnBhZ2VEYXRhID0gZGF0YTtcblx0XHQvLyBcdFx0XHRcdGN0eC5zYXZlKCk7XG5cdFx0Ly8gXHRcdFx0XHRzZWxmLnNldFN0YXRlKHsgY29tcG9uZW50OiA8Q29udGVudCBkYXRhPXsgZGF0YSB9IGJvZHlDbGFzcz1cInBhZ2VcIiAvPiB9KTtcblx0XHQvLyBcdFx0XHR9KTtcblx0XHQvLyBcdH1cblx0XHQvLyB9KTtcblxuXHRcdHVybFJvdXRlciggJyonLCBmdW5jdGlvbiAoIGN0eCApIHtcblx0XHRcdHZhciBwYXRoTmFtZSA9IGN0eC5wYXRobmFtZTtcblx0XHRcdHZhciBuZXdRdWVyeSA9IGN0eC5xdWVyeXN0cmluZyArICdyZXR1cm5faW5zdGVhZD1wb3N0cy1qc29uJztcblx0XHRcdHZhciBkYXRhUGF0aCA9IHBhdGhOYW1lICsgJz8nICsgbmV3UXVlcnk7XG5cdFx0XHRyZXF1ZXN0XG5cdFx0XHRcdC5nZXQoIGRhdGFQYXRoIClcblx0XHRcdFx0LmVuZCggZnVuY3Rpb24oIGVyciwgcmVzICkge1xuXHRcdFx0XHRcdGlmIChlcnIpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dmFyIHJldHVyblBvc3RzID0gSlNPTi5wYXJzZShyZXMudGV4dCk7XG5cdFx0XHRcdFx0c2VsZi5zZXRTdGF0ZSh7cG9zdHM6IHJldHVyblBvc3RzfSk7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2cocmV0dXJuUG9zdHMpO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdHVybFJvdXRlcih7XG5cdFx0XHRkaXNwYXRjaDogZmFsc2Vcblx0XHR9KTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PFBhZ2UgcG9zdHM9e3RoaXMuc3RhdGUucG9zdHN9IC8+XG5cdFx0KTtcblx0fVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gUm91dGVyO1xuIl19
