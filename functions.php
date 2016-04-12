<?php
/**
 * This is the old _s functions.php. TODO - split it up and remove what we don't need
 */

if ( ! function_exists( 'kraske_react_2016_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function kraske_react_2016_setup() {
	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on Kraske-react-2016, use a find and replace
	 * to change 'kraske-react-2016' to the name of your theme in all the template files.
	 */
	load_theme_textdomain( 'kraske-react-2016', get_template_directory() . '/client/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => esc_html__( 'Primary', 'kraske-react-2016' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

	// Set up the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( 'kraske_react_2016_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );
}
endif;
add_action( 'after_setup_theme', 'kraske_react_2016_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function kraske_react_2016_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'kraske_react_2016_content_width', 640 );
}
add_action( 'after_setup_theme', 'kraske_react_2016_content_width', 0 );

/**
 * Enqueue scripts and styles.
 */
function kraske_react_2016_scripts() {
	wp_enqueue_style( 'kraske-react-2016-style', get_stylesheet_uri() );

	wp_enqueue_script( 'kraske-react-2016-components', get_template_directory_uri() . '/client/components/app.js', array(), '20151215', true );

	wp_enqueue_script( 'kraske-react-2016-navigation', get_template_directory_uri() . '/client/static/js/navigation.js', array(), '20151215', true );

	wp_enqueue_script( 'kraske-react-2016-skip-link-focus-fix', get_template_directory_uri() . '/client/static/js/skip-link-focus-fix.js', array(), '20151215', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'kraske_react_2016_scripts' );

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/server/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/server/inc/extras.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/server/inc/customizer.php';


/**
 * Hijack the main loop to get data instead of html
 */
require get_template_directory() . '/server/inc/return-instead.php';
