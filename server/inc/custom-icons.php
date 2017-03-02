<?php

/**
* Fancy Emoji Icons backend functionality
*/

add_action( 'category_add_form_fields', 'add_feature_group_field', 10, 2 );
function add_feature_group_field( $taxonomy ) {
	var_dump('here');
	// 	global $feature_groups;
	// 	// get current group
	// $feature_group = get_term_meta( $term->term_id, 'feature-group', true );
	//
	// 	?><div class="form-field term-group">
	// 		<label for="featuret-group"><?php _e('Feature Group', 'my_plugin'); ?></label>
	// 		<select class="postform" id="equipment-group" name="feature-group">
		// 			<option value="-1"><?php _e('none', 'my_plugin'); ?></option><?php foreach ($feature_groups as $_group_key => $_group) : ?>
			// 				<option value="<?php echo $_group_key; ?>" class=""><?php echo $_group; ?></option>
			// 			<?php endforeach; ?>
			// 		</select>
			// 	</div><?php
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
