<?php
/**
* The key to doing link routing on the server-side with basic wordpress urls.
* If we have a query var of ?return_instead then we will hijack the normal
* wordpress flow and dump the main loop posts into the client as json.
*
* This is a quick and dirty alternative to using the WP API, but it avoids
* having to map client routes for internal links
*/

function add_query_vars_filter( $vars ){
	$vars[] = 'return_instead';
	return $vars;
}
add_filter( 'query_vars', 'add_query_vars_filter' );

function hijack_main_loop_to_return_instead( $query ) {
	// At pre-get posts some of the query-related globals have not yet been
	// initialized which messes up some of the wp functions if you try to use them
	// here.
	//
	// TODO - update the frontend primary and post navigation to use the WP REST
	// API instead of resorting to hacking the wordpress globals
	global $wp_query;
	global $paged;

	if ( ! array_key_exists ( 'return_instead' , $query->query_vars ) || ! $query->is_main_query() ) {
		return;
	}

	$return_type = $query->query_vars['return_instead'];
	if ( $return_type === 'posts-json' ){

		// at pre-get-posts we haven't actually gotten the posts from the db yet
		// So we need to manually fetch them here and set any globals that need it
		$wp_query = new WP_Query($query->query);
		$paged = get_query_var('paged');

		$filtered_posts = array();
		while ( have_posts() ) {
			the_post();
			$filtered_posts[] = require( get_template_directory() . '/server/template-parts/data/filtered-post.php');
		}

		$return_data = array(
			template => kraske_react_2016_get_template(),
			// primary_menu => kraske_react_2016_get_primary_menu(),
			post_nav => get_the_posts_navigation(),
			body_class => kraske_react_2016_body_class_str(),
			posts => $filtered_posts,
		);

		echo json_encode($return_data);
		die();
	}
}
add_action( 'pre_get_posts', 'hijack_main_loop_to_return_instead' );
