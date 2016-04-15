<?php

return array(
	id => get_the_id(),
	author => get_the_author(),
	permalink => esc_url( get_permalink() ),
	post_type => get_post_type(),
	css_class => esc_attr( get_post_class() ),
	content => wp_kses_post( apply_filters( 'the_content', get_the_content() ) ),
	date => get_the_date(),
	excerpt => esc_html( get_the_excerpt() ),
	title => esc_html( get_the_title() ),
	// TODO - really these are both pretty inefficent. Let's get rid of these
	// on a later iteration
	template_tags => array(
		posted_on => kraske_react_2016_posted_on(),
		entry_footer => kraske_react_2016_entry_footer()
	),
);
