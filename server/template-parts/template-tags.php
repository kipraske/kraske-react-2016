<?php
/**
 * Custom template tags for this theme because we need to be able to send these
 * via JSON we need to ensure that these return the HTML instead of echoing them
 *
 * So these also are normal template tags that I will need returned instead of echoed.
 *
 * @package Kraske-react-2016
 */

if ( ! function_exists( 'kraske_react_2016_posted_on' ) ) :
/**
 * Prints HTML with meta information for the current post-date/time and author.
 */
function kraske_react_2016_posted_on() {
	$time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
	if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
		$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
	}

	$time_string = sprintf( $time_string,
		esc_attr( get_the_date( 'c' ) ),
		esc_html( get_the_date() ),
		esc_attr( get_the_modified_date( 'c' ) ),
		esc_html( get_the_modified_date() )
	);

	$posted_on = sprintf(
		esc_html_x( 'Posted on %s', 'post date', 'kraske-react-2016' ),
		'<a href="' . esc_url( get_permalink() ) . '" rel="bookmark">' . $time_string . '</a>'
	);

	$byline = sprintf(
		esc_html_x( 'by %s', 'post author', 'kraske-react-2016' ),
		'<span class="author vcard"><a class="url fn n" href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '">' . esc_html( get_the_author() ) . '</a></span>'
	);

	return '<span class="posted-on">' . $posted_on . '</span><span class="byline"> ' . $byline . '</span>'; // WPCS: XSS OK.

}
endif;

/**
 * Returns a formatted category list. A story of...
 *
 * @param $class is the param of body_class
 */
function kraske_react_2016_category_list(){
	$categories = get_categories();
	$category_link_list = array();
	foreach ($categories as $category){
		$category_name = $category->name;
		$category_link = get_category_link( $category->term_id );
		$category_link_list[] = "<a href='$category_link'>$category_name</a>";
	}
	$link_list_text = implode(' & ', $category_link_list);

	return "<div class='post-category'> A story about $link_list_text...</div>";
}

/**
 * Returns the results of body_class() rather than echoing it
 *
 * @param $class is the param of body_class
 */
function kraske_react_2016_body_class_str($class){
	$body_classes = get_body_class($class);
	return implode(' ', $body_classes);
}
