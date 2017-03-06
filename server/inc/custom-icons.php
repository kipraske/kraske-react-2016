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
	$emoji = get_term_meta( $term->term_id, 'category-emoji', true );
	?>
	<tr class="form-field term-emoji-wrap">
		<th scope="row"><label for="feature-group"><?php _e( 'Display Emoji', 'my_plugin' ); ?></label></th>
		<td><input name="term-emoji" id="category-emoji" value="<?php esc_attr( $emoji ) ?>" ></td>
	</tr>
<?php
}

		add_action( 'edit_category', 'save_feature_meta', 10, 2 );
		function save_feature_meta( $term_id, $tt_id ){
			var_dump( 'succss' );
			// if( isset( $_POST['feature-group'] ) && '' !== $_POST['feature-group'] ){
			//     $group = sanitize_title( $_POST['feature-group'] );
			//     add_term_meta( $term_id, 'feature-group', $group, true );
			// }
		}


		// -----------------
		// Displaying the column
		//
		add_filter('manage_edit-category_columns', 'add_feature_group_column' );

		function add_feature_group_column( $columns ){
			$columns['feature_group'] = __( 'Group', 'my_plugin' );
			return $columns;
		}

		add_filter('manage_category_custom_column', 'add_feature_group_column_content', 10, 3 );

		function add_feature_group_column_content( $content, $column_name, $term_id ){
			global $feature_groups;

			if( $column_name !== 'feature_group' ){
				return $content;
			}

			$term_id = absint( $term_id );
			$feature_group = get_term_meta( $term_id, 'feature-group', true );

			if( !empty( $feature_group ) ){
				$content .= esc_attr( $feature_groups[ $feature_group ] );
			}

			return $content;
		}
