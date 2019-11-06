/*global drupalSettings: false, Handlebars: false */
( function( $ ) {
    var $container = $( ".api-store__subscriptions" );
	var urlToCall = "/api_store/subscriptions?_format=json&lang=";
    if ( $container.length === 0 ) {
		if ( $( ".api-store__sandboxsubscriptions" ).length === 0){
			return;	
		}
        else{
			$container = $( ".api-store__sandboxsubscriptions" );
			urlToCall = "/api_store/sandbox_subscriptions?_format=json&lang="
		}
    }

    Handlebars.registerHelper( "ifSubscribedToTenant", function( applications, options ) {
        if ( applications.length === 0 ) {
            return options.inverse( this );
        }

        return options.fn( this );
    } );

    Handlebars.registerHelper( "formatDate", function( dateString ) {
        return new Handlebars.SafeString(
            dateString.split( "T" )[ 0 ]
        );
    } );

    Handlebars.registerHelper( "ifSelfLink", function( link, options ) {
        if ( link.rel !== "self_new" ) {
            return options.inverse( this );
        }

        return options.fn( this );
    } );

    Handlebars.registerHelper( "ifIsNotPending", function( status, options ) {
        if ( status === "pending" ) {
            return options.inverse( this );
        }

        return options.fn( this );
    } );

    var isKeycloakUser = ( typeof drupalSettings.keycloak !== "undefined" );

    if ( isKeycloakUser ) {
        $.ajax( {
            url: urlToCall + wb.lang,
            dataType: "json",

            success: function( json ) {
                var html, $html, i, tenant,
                    hasSubscriptions = false,
                    tenants = json.tenants,
                    len = tenants.length;

                for ( i = 0; i < len; i += 1 ) {
                    tenant = tenants[ i ];

                    if ( tenant.applications.applications.length > 0 ) {
                        hasSubscriptions = true;
                        break;
                    }
                }

                if ( !hasSubscriptions ) {
                    // No subscriptions
                    $( ".api-store__no-subscriptions" ).show();
                    $container.hide();
                } else {
                    // Show subscription(s)
                    html = Handlebars.templates.subscriptions( json );
                    $html = $( html );

                    $( "#output" ).html( $html );

                    $container.show();
                }
            },

            error: function() {
                $( ".api-store__subscription-error" ).show();
            }
        } );
    }
}( jQuery ) );
