<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Kraske-react-2016
 */

get_header(); ?>

<div id="content" class="site-content">
<?php if ( ! is_singular() ){ ?>
	<h1 class="rollup-title"> ~ TODO ~ </h1>
<?php }


if ( have_posts() ) :

	/* Start the Loop */
	while ( have_posts() ) : the_post();
		if ( is_singular() ){
			// Pages and posts use the same "single" template
			get_template_part( 'server/template-parts/content/single');
		} else {
			get_template_part( 'server/template-parts/content/rollup');
		}
	endwhile;

	the_posts_navigation();

else :

	get_template_part( 'template-parts/content', 'none' );

endif; ?>

</div><!-- #content -->

<?php
get_footer();
