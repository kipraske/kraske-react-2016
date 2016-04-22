<?php
/**
 * Template part for displaying our menu-as-a-page
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Kraske-react-2016
 */
?>

<nav id="site-navigation" class="main-navigation" role="navigation">
	<?php get_search_form() ?>
	<?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_id' => 'primary-menu' ) ); ?>
</nav><!-- #site-navigation -->
