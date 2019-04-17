/* global drupalSettings: false */
( function( $ ) {
    // Bail if we're not under domain cookie
    if ( !(/api\.canada\.ca$/).test( window.location.hostname ) ) {
        return;
    }

    // Bail if we're on the splash page
    if ( drupalSettings.path.isFront === true ) {
        return;
    }

    var cookieName = "GCAPIStoreLoggedInState",
    
        lang = wb.lang,

        isSSOUser = function() {
            return !( typeof drupalSettings.keycloak === "undefined" );
        },

        userIsLoggedInSSO = function() {
            return getCookie( cookieName ) === "true";
        },

        userIsLoggedInDrupal = function() {
            return drupalSettings.user.uid !== 0;
        },

        getCookie = function( name ) {
            var cookies = document.cookie.split( ";" ),
                len = cookies.length,
                value = null,
                i,
                cpair;

            for ( i = 0; i < len; i += 1 ) {
                cpair = cookies[ i ].split( "=" );

                if ( $.trim( cpair[ 0 ] ) === name ) {
                    value = cpair[ 1 ];
                    break;
                }
            }

            return value;
        };

        if ( isSSOUser() ) {
            $( "html" ).addClass( "api-store--logged-in" );
        } else {
            $( "html" ).addClass( "api-store--logged-out" );
        }

        if ( userIsLoggedInSSO() && !userIsLoggedInDrupal() ) {
            // Log user into Drupal
            window.location = "/" + lang + "/user";
        }
        
        if ( !userIsLoggedInSSO() && isSSOUser() ) {
            // Log user out
            window.location = "/" + lang + "/user/logout";
        }
}( jQuery ) );
