<?php
/**
 * Custom functions that act independently of the theme templates.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package Kraske-react-2016
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function kraske_react_2016_body_classes( $classes ) {
	// Globally adds 'site' to whenever body_classes is called
	$classes[] = 'site';

	// Adds a class of group-blog to blogs with more than 1 published author.
	if ( is_multi_author() ) {
		$classes[] = 'group-blog';
	}

	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}

	// Adds a random color palette class on load.
	$rand = rand( 1, 4);
	$palette_class = 'color-palette-' . $rand;
	$classes[] = $palette_class;

	return $classes;
}
add_filter( 'body_class', 'kraske_react_2016_body_classes' );
