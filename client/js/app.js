(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

module.exports = {};

},{}],2:[function(require,module,exports){
'use strict';

/**
 * Main entry point for react components
 */

var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('./router.jsx');
ReactDOM.render(React.createElement(Router, null), document.getElementById('main'));

},{"./router.jsx":3,"react":"react","react-dom":"react-dom"}],3:[function(require,module,exports){
'use strict';

/**
 *
 */

var React = require('react');
var page = require('page');
var request = require('superagent');

var Content = require('./content/content.jsx');

var Router = React.createClass({
	displayName: 'Router',


	componentDidMount: function componentDidMount() {

		var self = this;

		// page( '/', function ( ctx ) {
		// 	var data,
		// 		slug = ctx.params.slug,
		// 		url = "/wp-json/posts";
		// 	request
		// 		.get( url )
		// 		.end( function( err, res ) {
		// 			data = JSON.parse( res.text );
		// 			self.setState({ component: <Content data={ data } bodyClass="index" /> });
		// 		});
		// });
		//
		// page( '/:year/:month/:day/:slug', function ( ctx ) {
		// 	var data,
		// 		slug = ctx.params.slug,
		// 		url = "/wp-json/posts/?filter[name]=" + slug;
		// 	request
		// 		.get( url )
		// 		.end( function( err, res ) {
		// 			data = JSON.parse( res.text );
		// 			self.setState({ component: <Content data={ data } bodyClass="single" /> });
		// 		});
		// });
		//
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

		page('*', function (ctx) {
			var pathName = ctx.pathname;
			var newQuery = ctx.querystring + 'return_instead=posts-json';
			var dataPath = pathName + '?' + newQuery;
			request.get(dataPath).end(function (err, res) {
				if (err) {
					console.error(err);
					return;
				}
				var return_posts = JSON.parse(res.text);
				console.log(return_posts);
			});
			console.log(dataPath);
		});

		page({
			dispatch: false
		});
	},

	getInitialState: function getInitialState() {
		return { component: React.createElement('div', null) };
	},

	render: function render() {
		return this.state.component;
	}

});

module.exports = Router;

},{"./content/content.jsx":1,"page":"page","react":"react","superagent":"superagent"}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvY29tcG9uZW50cy9jb250ZW50L2NvbnRlbnQuanN4IiwiY2xpZW50L2NvbXBvbmVudHMvaW5kZXguanN4IiwiY2xpZW50L2NvbXBvbmVudHMvcm91dGVyLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsT0FBTyxPQUFQLEdBQWlCLEVBQWpCOzs7Ozs7Ozs7QUNJQSxJQUFJLFFBQVEsUUFBUyxPQUFULENBQVI7QUFDSixJQUFJLFdBQVcsUUFBUSxXQUFSLENBQVg7QUFDSixJQUFJLFNBQVMsUUFBUyxjQUFULENBQVQ7QUFDSixTQUFTLE1BQVQsQ0FDQyxvQkFBQyxNQUFELE9BREQsRUFDYSxTQUFTLGNBQVQsQ0FBeUIsTUFBekIsQ0FEYjs7Ozs7Ozs7O0FDSEEsSUFBSSxRQUFRLFFBQVMsT0FBVCxDQUFSO0FBQ0osSUFBSSxPQUFPLFFBQVMsTUFBVCxDQUFQO0FBQ0osSUFBSSxVQUFVLFFBQVMsWUFBVCxDQUFWOztBQUVKLElBQUksVUFBVSxRQUFTLHVCQUFULENBQVY7O0FBRUosSUFBSSxTQUFTLE1BQU0sV0FBTixDQUFrQjs7OztBQUU5QixvQkFBbUIsNkJBQVc7O0FBRTdCLE1BQUksT0FBTyxJQUFQOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFGeUIsTUF3RDdCLENBQU0sR0FBTixFQUFXLFVBQVcsR0FBWCxFQUFpQjtBQUMzQixPQUFJLFdBQVcsSUFBSSxRQUFKLENBRFk7QUFFM0IsT0FBSSxXQUFXLElBQUksV0FBSixHQUFrQiwyQkFBbEIsQ0FGWTtBQUczQixPQUFJLFdBQVcsV0FBVyxHQUFYLEdBQWlCLFFBQWpCLENBSFk7QUFJM0IsV0FDRSxHQURGLENBQ08sUUFEUCxFQUVFLEdBRkYsQ0FFTyxVQUFVLEdBQVYsRUFBZSxHQUFmLEVBQXFCO0FBQzFCLFFBQUksR0FBSixFQUFTO0FBQ1IsYUFBUSxLQUFSLENBQWMsR0FBZCxFQURRO0FBRVIsWUFGUTtLQUFUO0FBSUEsUUFBSSxlQUFlLEtBQUssS0FBTCxDQUFXLElBQUksSUFBSixDQUExQixDQUxzQjtBQU0xQixZQUFRLEdBQVIsQ0FBWSxZQUFaLEVBTjBCO0lBQXJCLENBRlAsQ0FKMkI7QUFjM0IsV0FBUSxHQUFSLENBQVksUUFBWixFQWQyQjtHQUFqQixDQUFYLENBeEQ2Qjs7QUF5RTdCLE9BQUs7QUFDSixhQUFVLEtBQVY7R0FERCxFQXpFNkI7RUFBWDs7QUErRW5CLGtCQUFpQiwyQkFBVztBQUMzQixTQUFPLEVBQUUsV0FBVyxnQ0FBWCxFQUFULENBRDJCO0VBQVg7O0FBSWpCLFNBQVEsa0JBQVc7QUFDbEIsU0FBTyxLQUFLLEtBQUwsQ0FBVyxTQUFYLENBRFc7RUFBWDs7Q0FyRkksQ0FBVDs7QUEyRkosT0FBTyxPQUFQLEdBQWlCLE1BQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0ge1xuXHRcbn1cbiIsIi8qKlxuICogTWFpbiBlbnRyeSBwb2ludCBmb3IgcmVhY3QgY29tcG9uZW50c1xuICovXG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoICdyZWFjdCcgKTtcbnZhciBSZWFjdERPTSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xudmFyIFJvdXRlciA9IHJlcXVpcmUoICcuL3JvdXRlci5qc3gnICk7XG5SZWFjdERPTS5yZW5kZXIoXG5cdDxSb3V0ZXIgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnbWFpbicgKVxuKTtcbiIsIi8qKlxuICpcbiAqL1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCAncmVhY3QnICk7XG52YXIgcGFnZSA9IHJlcXVpcmUoICdwYWdlJyApO1xudmFyIHJlcXVlc3QgPSByZXF1aXJlKCAnc3VwZXJhZ2VudCcgKTtcblxudmFyIENvbnRlbnQgPSByZXF1aXJlKCAnLi9jb250ZW50L2NvbnRlbnQuanN4JyApO1xuXG52YXIgUm91dGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG5cdGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcblxuXHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdC8vIHBhZ2UoICcvJywgZnVuY3Rpb24gKCBjdHggKSB7XG5cdFx0Ly8gXHR2YXIgZGF0YSxcblx0XHQvLyBcdFx0c2x1ZyA9IGN0eC5wYXJhbXMuc2x1Zyxcblx0XHQvLyBcdFx0dXJsID0gXCIvd3AtanNvbi9wb3N0c1wiO1xuXHRcdC8vIFx0cmVxdWVzdFxuXHRcdC8vIFx0XHQuZ2V0KCB1cmwgKVxuXHRcdC8vIFx0XHQuZW5kKCBmdW5jdGlvbiggZXJyLCByZXMgKSB7XG5cdFx0Ly8gXHRcdFx0ZGF0YSA9IEpTT04ucGFyc2UoIHJlcy50ZXh0ICk7XG5cdFx0Ly8gXHRcdFx0c2VsZi5zZXRTdGF0ZSh7IGNvbXBvbmVudDogPENvbnRlbnQgZGF0YT17IGRhdGEgfSBib2R5Q2xhc3M9XCJpbmRleFwiIC8+IH0pO1xuXHRcdC8vIFx0XHR9KTtcblx0XHQvLyB9KTtcblx0XHQvL1xuXHRcdC8vIHBhZ2UoICcvOnllYXIvOm1vbnRoLzpkYXkvOnNsdWcnLCBmdW5jdGlvbiAoIGN0eCApIHtcblx0XHQvLyBcdHZhciBkYXRhLFxuXHRcdC8vIFx0XHRzbHVnID0gY3R4LnBhcmFtcy5zbHVnLFxuXHRcdC8vIFx0XHR1cmwgPSBcIi93cC1qc29uL3Bvc3RzLz9maWx0ZXJbbmFtZV09XCIgKyBzbHVnO1xuXHRcdC8vIFx0cmVxdWVzdFxuXHRcdC8vIFx0XHQuZ2V0KCB1cmwgKVxuXHRcdC8vIFx0XHQuZW5kKCBmdW5jdGlvbiggZXJyLCByZXMgKSB7XG5cdFx0Ly8gXHRcdFx0ZGF0YSA9IEpTT04ucGFyc2UoIHJlcy50ZXh0ICk7XG5cdFx0Ly8gXHRcdFx0c2VsZi5zZXRTdGF0ZSh7IGNvbXBvbmVudDogPENvbnRlbnQgZGF0YT17IGRhdGEgfSBib2R5Q2xhc3M9XCJzaW5nbGVcIiAvPiB9KTtcblx0XHQvLyBcdFx0fSk7XG5cdFx0Ly8gfSk7XG5cdFx0Ly9cblx0XHQvLyBwYWdlKCAnKicsIGZ1bmN0aW9uICggY3R4ICkge1xuXHRcdC8vIFx0aWYgKCBjdHguc3RhdGUucGFnZURhdGEgKSB7XG5cdFx0Ly8gXHRcdHNlbGYuc2V0U3RhdGUoeyBjb21wb25lbnQ6IDxDb250ZW50IGRhdGE9eyBjdHguc3RhdGUucGFnZURhdGEgfSBib2R5Q2xhc3M9XCJwYWdlXCIgLz4gfSk7XG5cdFx0Ly8gXHR9IGVsc2Uge1xuXHRcdC8vIFx0XHR2YXIgYWRtaW4gPSAnd3AtYWRtaW4nO1xuXHRcdC8vIFx0XHR2YXIgc2x1ZyA9IGN0eC5wYXRobmFtZTtcblx0XHQvL1xuXHRcdC8vIFx0XHRpZiAoIHNsdWcuaW5kZXhPZiggYWRtaW4gKSA+IC0xICkge1xuXHRcdC8vIFx0XHRcdGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSBjdHgucGF0aDtcblx0XHQvLyBcdFx0XHRyZXR1cm47XG5cdFx0Ly8gXHRcdH1cblx0XHQvL1xuXHRcdC8vIFx0XHRpZihzbHVnLnN1YnN0cigtMSkgPT0gJy8nKSB7XG5cdFx0Ly8gXHRcdFx0c2x1ZyA9IHNsdWcuc3Vic3RyKDAsIHNsdWcubGVuZ3RoIC0gMSk7XG5cdFx0Ly8gXHRcdH1cblx0XHQvLyBcdFx0dmFyIHBhcnQgPSBzbHVnLnN1YnN0cmluZyhzbHVnLmxhc3RJbmRleE9mKCcvJykgKyAxKTtcblx0XHQvLyBcdFx0dmFyIHVybCA9IFwiL3dwLWpzb24vcG9zdHMvP3R5cGVbXT1wYWdlJmZpbHRlcltuYW1lXT1cIiArIHBhcnQ7XG5cdFx0Ly8gXHRcdHJlcXVlc3Rcblx0XHQvLyBcdFx0XHQuZ2V0KCB1cmwgKVxuXHRcdC8vIFx0XHRcdC5lbmQoIGZ1bmN0aW9uKCBlcnIsIHJlcyApIHtcblx0XHQvLyBcdFx0XHRcdGRhdGEgPSBKU09OLnBhcnNlKCByZXMudGV4dCApO1xuXHRcdC8vIFx0XHRcdFx0Y3R4LnN0YXRlLnBhZ2VEYXRhID0gZGF0YTtcblx0XHQvLyBcdFx0XHRcdGN0eC5zYXZlKCk7XG5cdFx0Ly8gXHRcdFx0XHRzZWxmLnNldFN0YXRlKHsgY29tcG9uZW50OiA8Q29udGVudCBkYXRhPXsgZGF0YSB9IGJvZHlDbGFzcz1cInBhZ2VcIiAvPiB9KTtcblx0XHQvLyBcdFx0XHR9KTtcblx0XHQvLyBcdH1cblx0XHQvLyB9KTtcblxuXHRcdHBhZ2UoICcqJywgZnVuY3Rpb24gKCBjdHggKSB7XG5cdFx0XHR2YXIgcGF0aE5hbWUgPSBjdHgucGF0aG5hbWU7XG5cdFx0XHR2YXIgbmV3UXVlcnkgPSBjdHgucXVlcnlzdHJpbmcgKyAncmV0dXJuX2luc3RlYWQ9cG9zdHMtanNvbic7XG5cdFx0XHR2YXIgZGF0YVBhdGggPSBwYXRoTmFtZSArICc/JyArIG5ld1F1ZXJ5O1xuXHRcdFx0cmVxdWVzdFxuXHRcdFx0XHQuZ2V0KCBkYXRhUGF0aCApXG5cdFx0XHRcdC5lbmQoIGZ1bmN0aW9uKCBlcnIsIHJlcyApIHtcblx0XHRcdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGVycik7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHZhciByZXR1cm5fcG9zdHMgPSBKU09OLnBhcnNlKHJlcy50ZXh0KTtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhyZXR1cm5fcG9zdHMpO1xuXHRcdFx0XHR9KTtcblx0XHRcdGNvbnNvbGUubG9nKGRhdGFQYXRoKTtcblx0XHR9KTtcblxuXHRcdHBhZ2Uoe1xuXHRcdFx0ZGlzcGF0Y2g6IGZhbHNlXG5cdFx0fSk7XG5cblx0fSxcblxuXHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB7IGNvbXBvbmVudDogPGRpdiAvPiB9O1xuXHR9LFxuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUuY29tcG9uZW50O1xuXHR9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJvdXRlcjtcbiJdfQ==
