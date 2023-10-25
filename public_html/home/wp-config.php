<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'degime_wp2' );

/** Database username */
define( 'DB_USER', 'degime_wp2' );

/** Database password */
define( 'DB_PASSWORD', 'Y,3xJkaKzftDJ(B4]J*60.]7' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '8VI4wQm7aJbCYC43Lz84sggt5F10whg1HOxHsi7fS5DJ0JXiCRtaW4E3yR6yPuVO');
define('SECURE_AUTH_KEY',  'wDid3N6LcV4WoyfDmSR16URH6kgD7zeND3xyIrsC6QNjMrqLVYKTT1KXilldHpmZ');
define('LOGGED_IN_KEY',    'UvavRhnMUHI86xOTyKA5wzO80M6Bmjlwo3wRw52uspi355CKZOnKeVvVBecfcUfh');
define('NONCE_KEY',        'gSsGSdiYmTwQ9IOaRZHIHvGor2UjTddW1tw2pEfouEwnwuWgux9kKIuL8HtAmlIN');
define('AUTH_SALT',        'IlGEXlnUzpyuNJxhr1HwMMVyxHmScD3EcuoSRwgyzAfOFVrgezBu7U4g0u5tRmMq');
define('SECURE_AUTH_SALT', 'A21FHw7QmEaTfydrcn9Fd6zCgberI9JD13vhH1J7crRFzk20IcLhyeyV9xsCVTx7');
define('LOGGED_IN_SALT',   'f6PWm69nx6aoCsbC1ry7aImJCQXPsJeyxB6lMEy0YAjdalWX8011cMJlcXqTmX8n');
define('NONCE_SALT',       '10bFA6k8zguIqh3dDWNR1y6wPrU7EQK8kLI8tMcuDC08TiCkULQ7MWt5yUN2y2is');

/**
 * Other customizations.
 */
define('WP_TEMP_DIR',dirname(__FILE__).'/wp-content/uploads');


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
