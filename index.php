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

get_header();
$template = kraske_react_2016_get_template();
?>

<main id="content" class="site-content">

<?php if ($template.type !== 'single') { ?>
	<h1 class="rollup-title"><?php echo $template['title'] ?></h1>
<?php }

if ( have_posts() ) :

	/* Start the Loop */
	while ( have_posts() ) : the_post();

	switch ($template['type']) {
		case 'menu':
			get_template_part( 'server/template-parts/content/menu');
			break;
		case 'rollup':
			get_template_part( 'server/template-parts/content/rollup');
			break;
		case 'single':
			get_template_part( 'server/template-parts/content/single');
	}

endwhile;

	the_posts_navigation();

else :

	get_template_part( 'server/template-parts/content/none' );

endif; ?>

</main><!-- #content -->

<?php
get_footer();
