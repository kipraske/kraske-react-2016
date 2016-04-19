<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Kraske-react-2016
 */

?>

		<footer id="colophon" class="site-footer" role="contentinfo">
			<div class="site-info">
				<?php
					$wordpress_link = '<a href="' . esc_url( __( 'https://wordpress.org/', 'kraske-react-2016' ) ) . '"> Wordpress </a>';
					$react_link = '<a href="' . esc_url( __( 'https://facebook.github.io/react/', 'kraske-react-2016' ) ) . '"> React.js </a>';
					printf( __("Copyright © Kristofer Raske 2016. Powered by %s and %s"), $wordpress_link, $react_link);
				?>
			</div><!-- .site-info -->
		</footer><!-- #colophon -->
	</div><!-- #page -->
</div><!-- #app-root -->

<?php wp_footer(); ?>

</body>
</html>
