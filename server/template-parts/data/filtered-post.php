<?php

return array(
	ID => get_the_id(),
	author => get_the_author(),
	post_content => wp_kses_post( apply_filters('the_content', get_the_content() ) ),
	post_date => $post->post_date,
	post_excerpt => esc_html( get_the_excerpt() ),
	post_title => esc_html( get_the_title() ),
);
