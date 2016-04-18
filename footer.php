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
				<a href="<?php echo esc_url( __( 'https://wordpress.org/', 'kraske-react-2016' ) ); ?>"><?php printf( esc_html__( 'Proudly powered by %s', 'kraske-react-2016' ), 'WordPress' ); ?></a>
				<span class="sep"> | </span>
				<?php printf( esc_html__( 'Theme: %1$s by %2$s.', 'kraske-react-2016' ), 'kraske-react-2016', '<a href="http://underscores.me/" rel="designer">Me</a>' ); ?>
			</div><!-- .site-info -->
		</footer><!-- #colophon -->
	</div><!-- #page -->
</div><!-- #app-root -->

<?php wp_footer(); ?>

</body>
</html>
