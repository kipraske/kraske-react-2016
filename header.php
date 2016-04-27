<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Kraske-react-2016
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
<link href='https://fonts.googleapis.com/css?family=Source+Serif+Pro:700,400' rel='stylesheet' type='text/css'>

<?php wp_head(); ?>
</head>

<body>
<div id="app-root">
	<div id="page" <?php body_class() ?> >
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'kraske-react-2016' ); ?></a>

	<header id="masthead" class="site-header" role="banner">
		<div class="site-logo">
			<a href="<?php echo esc_url( home_url( '/menu' ) ); ?>" title="Menu">
				<img src="<?php echo get_template_directory_uri() . '/client/static/assets/site-logo.png'?>" alt="Site Logo">
			</a>
		</div>

	</header><!-- #masthead -->
