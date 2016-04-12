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

// TODO - this is a great proof of concept that we can get the data over...
// but we need to sanitize this output before sending over the wall to the
// client

function hijack_main_loop_to_return_instead( $query ) {
	if ( ! array_key_exists ( 'return_instead' , $query->query_vars ) || ! $query->is_main_query() ) {
		return;
	}

	$return_type = $query->query_vars['return_instead'];
	if ( $return_type === 'posts-json' ){

		// at pre-get-posts we haven't actually gotten the posts from the db yet
		// So we need to manually fetch them here:
		$return_query = new WP_Query($query->query);

		echo json_encode($return_query->posts);
		die();
	}
}
add_action( 'pre_get_posts', 'hijack_main_loop_to_return_instead' );
