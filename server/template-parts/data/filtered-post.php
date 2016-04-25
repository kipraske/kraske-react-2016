<?php

return array(
	id => get_the_id(),
	author => get_the_author(),
	permalink => esc_url( get_permalink() ),
	post_type => get_post_type(),
	css_class => esc_attr( join( ' ', get_post_class() ) ),
	content => wp_kses_post( apply_filters( 'the_content', get_the_content() ) ),
	date => get_the_date(),
	excerpt => esc_html( get_the_excerpt() ),
	title => esc_html( get_the_title() ),
	template_tags => array(
		category => array(
			'icon' => kraske_react_2016_get_category_icon(),
			'list' => kraske_react_2016_category_list(),
		),
		posted_on => kraske_react_2016_posted_on(),
		comments => kraske_react_2016_get_comments_template(),
	),
);
