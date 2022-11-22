<?php
/** Enable W3 Total Cache */
define('WP_CACHE', true); // Added by W3 Total Cache

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
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'dbs9193896' );

/** Database username */
define( 'DB_USER', 'dbu2674332' );

/** Database password */
define( 'DB_PASSWORD', 'DHJSDH348$%^fDJOfmnoeF' );

/** Database hostname */
define( 'DB_HOST', 'db5010871004.hosting-data.io' );

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
define( 'AUTH_KEY',         'Vj6<7:.BjW(ICuszgsbtb/^ZDq^HjNu=`m+5#5)_c[Sp,8~4LY(31?,8Up?2`)5n' );
define( 'SECURE_AUTH_KEY',  '4J8~C_=Ug#5d7uQ&HL*|_;gE42 VzO1YjU3 /2#?.fT3KM_SLWm?6xZg$TZGk[3/' );
define( 'LOGGED_IN_KEY',    'Z,j(R239|}1%Cm{8~xXit>(*?oA&AI lrn%KXS<>i{<TU~bXi51mod$@JUED9>(E' );
define( 'NONCE_KEY',        '!!X7UgIVQ7c8p>BR@_z2Cu;;)feA2 Nd^}~2k`(?Ah|3|]btBp+ZtQk_!Jss((&|' );
define( 'AUTH_SALT',        'w7!>:)@ylg>jR~EIO,$[??yS2UZ+MFRQ5;9?$t/ybI:3eAe0dH7zsfP2Furp7auB' );
define( 'SECURE_AUTH_SALT', '9&x2^#!UP0>`JivkP&GHTnm&v,M&OHT;a&+oGu)9IviExEV7jQ7}7&[!}^JbCI{,' );
define( 'LOGGED_IN_SALT',   'Q9Iq+m<Yf)#P^bf&+vg(U-3w$Gq&`7Z s|Oa4)^0Z>_woLut^IU=v]JoB3Gqj#_N' );
define( 'NONCE_SALT',       'qaPLj}hEaxl%#Sl7ZJkr]}_tx#ni4) 1SmO5ow:~WMDR^=>>HgyZ_4PR!+H@RoQ^' );

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
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */
define( 'WP_MEMORY_LIMIT', '256M' );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
