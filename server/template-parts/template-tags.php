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
	$time_string = '<time class="entry-date published updated" datetime="%s">%s</time>';

	$time_string = sprintf( $time_string,
		esc_attr( get_the_date( 'c' ) ),
		esc_html( get_the_date() )
	);

	return $time_string;

}
endif;

/**
 * Returns a formatted category list. A story of...
 *
 * @param $class is the param of body_class
 */
function kraske_react_2016_category_list(){
	$categories = get_the_category();
	$category_link_list = array();
	foreach ($categories as $category){
		$category_name = $category->name;
		$category_link = get_category_link( $category->term_id );
		$category_link_list[] = "<a href='$category_link'>$category_name</a>";
	}
	$link_list_text = implode(' & ', $category_link_list);

	return "A story about $link_list_text...";
}

/**
* One day taxononomies may have meta, but for now let's just hardcode this in thered
*/
function kraske_react_2016_get_category_icon( ){
	$categories = get_the_category();
	$category = $categories[0]; // just make an icon for the first one

	// Note the icon font just uses another font for the old unicode symbols
	// so to keep the same size use the newer unicode blocks (1Fxxx)
	$unicodeCatMap = array(
		'uncategorized' => '&#x1F40C', // it's a snail
		'harmonica'     => '&#x1F3B6',
		'ukulele'       => '&#x1F3B6',
		'flute'         => '&#x1F3B6',
		'web-dev'       => '&#x1F4BB',
		'excercise'     => '&#x1F3CB',
		'board-games'   => '&#x1F3B2',
		'video-games'   => '&#x1F3AE',
	);

	$icon_html_code = $unicodeCatMap[$category->slug];
	$category_link = get_category_link( $category->term_id );

	return "<a href='$category_link' title='$category->name' > $icon_html_code </a>";
}

/**
 * String output version of the archive title wp function
 *
 */
function kraske_react_2016_archive_title(){
	ob_start();
	the_archive_title();
	return ob_get_clean();
}

/**
 * String output version of the primary menu output
 */
function kraske_react_2016_get_primary_menu(){
	ob_start();
	wp_nav_menu( array( 'theme_location' => 'primary', 'menu_id' => 'primary-menu' ) );
	return ob_get_clean();
}

/**
 * String output version of the entire comments template
 */
function kraske_react_2016_get_comments_template(){
	ob_start();
	comments_template();
	return ob_get_clean();
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
