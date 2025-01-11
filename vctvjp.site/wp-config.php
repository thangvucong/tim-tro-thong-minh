<?php
# BEGIN WP Cache by 10Web
define( 'WP_CACHE', true );
define( 'TWO_PLUGIN_DIR_CACHE', '/www/wwwroot/vctvjp.site/wp-content/plugins/tenweb-speed-optimizer/' );
# END WP Cache by 10Web
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'sql_vctvjp_site' );

/** Database username */
define( 'DB_USER', 'sql_vctvjp_site' );

/** Database password */
define( 'DB_PASSWORD', 'b3a4707b3c0ad' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

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
define( 'AUTH_KEY',         ';U{TPzE-ikHxa53J4kps%.<Z1%gQ #3ZIRtsBZ=!XH7$oGkKQfQScq>j&Oez.6&k' );
define( 'SECURE_AUTH_KEY',  '-O9cNgp_Zacd%V7U9.GL,}3!DN-M).$+i-c4Ag~tz#m(J)-WLB[Y16g~^mpT*z(J' );
define( 'LOGGED_IN_KEY',    'rfYD*EbFy9-x(OCqSYu5wkcVxI2[,R6:R9EDC&){LYTZUPe=6gTfRhyD$neP,b/~' );
define( 'NONCE_KEY',        'T_yC8D4!~AsHuM]b5<=Xz%,zYpbP`S^I=x>L+%rhsES- vydG(169,)Ums|Hr9XP' );
define( 'AUTH_SALT',        'dAJ+)u7~-%6/alGD9[?yb;307w=sVnu6kjBP8PW(zdNFTU4Cs@UbUVvW~US2FdcC' );
define( 'SECURE_AUTH_SALT', 'hE/Dt2nq%#UxAV,yOm{qS6hmU0{g&bj?~b!QAzcsmR1W-N[_Dbbi^14Z/[5&bc/L' );
define( 'LOGGED_IN_SALT',   'BY[:^}l!Ot:1C0q3G[}LH8*+8eOztzHgLV;<Xn )W4XL:+#V80.4{g3%{p2_qdA}' );
define( 'NONCE_SALT',       'A0B*]9`Dw,y1+Xa~v]HM$e~eA?fIT]J5R5?.?B5YJ?xZ~iyH<aB3R9Y01u0nzMvo' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_3e470a_';

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
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
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
