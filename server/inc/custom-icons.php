<?php

/**
* Fancy Emoji Icons backend functionality
*/


add_action( 'category_add_form_fields', 'add_emoji_icon_field', 10, 2 );
function add_emoji_icon_field( $taxonomy ) {
?>
	<div class="form-field term-emoji-wrap">
		<label for="term-emoji"><?php _e( 'Display Emoji', 'my_plugin' ); ?></label>
		<input name="term-emoji" id="category-emoji" value="<?php esc_attr( $emoji ) ?>" >
	</div>
<?php
}

add_action( 'category_edit_form_fields', 'edit_emoji_icon_field', 10, 2 );
function edit_emoji_icon_field( $term, $taxonomy ) {
	$emoji = get_term_meta( $term->term_id, 'term-emoji', true );
	?>
	<tr class="form-field term-emoji-wrap">
		<th scope="row"><label for="feature-group"><?php _e( 'Display Emoji', 'my_plugin' ); ?></label></th>
		<td><input name="term-emoji" id="category-emoji" value="<?php echo esc_attr( $emoji ) ?>" ></td>
	</tr>
<?php
}

add_action( 'created_category', 'save_category_emoji_meta', 10, 2 );
add_action( 'edit_category', 'save_category_emoji_meta', 10, 2 );
function save_category_emoji_meta( $term_id, $tt_id ) {
	if ( isset( $_POST['term-emoji'] ) && '' !== $_POST['term-emoji'] ) {
		$emoji = sanitize_title( $_POST['term-emoji'] );
		$test = update_term_meta( $term_id, 'term-emoji', $emoji );
	}
}

// -----------------
// Displaying the column
//
add_filter( 'manage_edit-category_columns', 'add_category_emoji_column' );

function add_category_emoji_column( $columns ) {
	$columns['term_emoji'] = __( 'Display Emoji', 'my_plugin' );
	return $columns;
}

add_filter( 'manage_category_custom_column', 'add_category_emoji_column_content', 10, 3 );
function add_category_emoji_column_content( $content, $column_name, $term_id ) {

	if ( $column_name !== 'term_emoji' ){
		return $content;
	}

	$term_id = absint( $term_id );
	$emoji = get_term_meta( $term_id, 'term-emoji', true );

	if ( ! empty( $emoji ) ) {
		$content .= esc_html( $emoji );
	}

	return $content;
}
