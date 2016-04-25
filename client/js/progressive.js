/**
 * Module to determine whether to load up react or not
 */

var useJS = true;

if (typeof window.requestAnimationFrame !== 'function' ) {
	useJS = false;
}

module.exports = useJS;
