<?php
/**
 * Template part for displaying posts.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package _s
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('rollup-item'); ?>>
	<header class="entry-header">
		<?php the_title( sprintf( '<h2 class="entry-title"><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ), '</a></h2>' ); ?>

		<?php if ( 'post' === get_post_type() ) : ?>
			<?php echo kraske_react_2016_posted_on(); ?>
		<?php endif; ?>
	</header><!-- .entry-header -->

	<div class="entry-cat-icon" title="category-icon">&#x1F3B6</div>
	<div class="entry-summary">
		<?php the_excerpt(); ?>
	</div><!-- .entry-summary -->
</article><!-- #post-## -->
