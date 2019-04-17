/* global drupalSettings: false, Handlebars: false */
( function( $ ) {
    var $apiTopContainer = $( ".api-top-container" ),
        $navbar = $( "#navbar" ).first(),
        popInQueue = [],
        popInQueueRunning = false,
        $output = $( ".api-listing" ),
        $apiRows, currentView,

        /**
         * The views currently supported by WET.
         *
         * "name" is the classname added to the <html> element by the WET framework (ex: "mediumview")
         * "prefix" is the 'size' fragment of grid columns for that view (ex: the "md" in "col-md-3" for mediumview)
         * "nb" is a convenient way of targeting, for example, "views smaller than mediumview" (i.e.: view.nb < 3)
         */
        views = [
            {
                "name": "xxsmallview",
                "prefix": null,
                "nb": 0
            },

            {
                "name": "xsmallview",
                "prefix": "xs",
                "nb": 1
            },

            {
                "name": "smallview",
                "prefix": "sm",
                "nb": 2
            },

            {
                "name": "mediumview",
                "prefix": "md",
                "nb": 3
            },

            {
                "name": "largeview",
                "prefix": "lg",
                "nb": 4
            },

            {
                "name": "xlargeview",
                "prefix": null,
                "nb": 5
            },

            {
                "name": "xxlargeview",
                "prefix": null,
                "nb": 6
            }
        ],

        popin = function() {
            var len = popInQueue.length,
                elm;

            if ( len === 0 ) {
                popInQueueRunning = false;
                return;
            }

            popInQueueRunning = true;

            elm = popInQueue.shift();
            elm.classList.add( "ised-pop-in" );
            elm.classList.remove( "api--hidden" );
            elm.classList.remove( "queued" );

            setTimeout( popin, 100 );

            setTimeout( function() {
                elm.classList.add( "api--visible" );
                elm.classList.remove( "ised-pop-in" );
            }, 1000 );
        },

        equalHeights = function( $_apiRows ) {
            var rows = [],
                nbApis = $_apiRows.length,
                apisPerRow = 12 / numberOfSpanningCols( $_apiRows.eq( 0 ) ),
                nbRows = Math.ceil( nbApis / apisPerRow ),
                $apis, i, j, len, sliceIndex, tallestNameHeight, tallestDescriptionHeight, tallestOwnerHeight,

                maxHeight = function( i, elm ) {
                    var nameHeight, descriptionHeight, ownerHeight,
                        $api = $( elm );

                    $api.find( ".api" ).data( "rowNb", i );
                    nameHeight = $api.find( ".api-name" ).outerHeight();
                    descriptionHeight = $api.find( ".api-description" ).outerHeight();
                    ownerHeight = $api.find( ".api-owner" ).outerHeight();

                    if ( nameHeight > tallestNameHeight ) {
                        tallestNameHeight = nameHeight;
                    }

                    if ( descriptionHeight > tallestDescriptionHeight ) {
                        tallestDescriptionHeight = descriptionHeight;
                    }

                    if ( ownerHeight > tallestOwnerHeight ) {
                        tallestOwnerHeight = ownerHeight;
                    }
                };

            // Reset the containers to their natural height so we can recalculate the proper min-heights
            $_apiRows.find( ".api-name, .api-description, .api-owner" ).css( "min-height", 0 );

            // Divide APIs into specific rows
            for ( j = 0; j < nbRows; j += 1 ) {
                sliceIndex = j * apisPerRow;

                rows.push( $_apiRows.slice( sliceIndex, Math.min( sliceIndex + apisPerRow, nbApis ) ) );
            }

            // For every row, make sure that the title, description, footers are the same height
            for ( i = 0, len = rows.length; i < len; i += 1 ) {
                $apis = rows[ i ];
                tallestNameHeight = 0;
                tallestDescriptionHeight = 0;
                tallestOwnerHeight = 0;

                $apis.each( maxHeight );

                $apis.find( ".api-name" ).css( "min-height", tallestNameHeight + "px" );
                $apis.find( ".api-description" ).css( "min-height", tallestDescriptionHeight + "px" );
                $apis.find( ".api-owner" ).css( "min-height", tallestOwnerHeight + "px" );
            }
        },

        revealScroll = function() {
            $apiRows.each( function() {
                var $row = $( this ),
                    $apis;

                if ( $row.offset().top - window.pageYOffset < window.innerHeight - 100 ) {
                    $apis = $row.find( ".api" ).not( ".ised-pop-in, .queued, .api--visible" ).addClass( "queued" );
                    popInQueue = popInQueue.concat( $apis.toArray() );

                    if ( !popInQueueRunning && popInQueue.length > 0 ) {
                        popin();
                    }
                }
            } );
        },

        getApisByTenant = function() {
                $.ajax( {
                    url: "/api_store/api_listing?_format=json&lang=" + wb.lang,
                    dataType: "json",
                    success: showApis
                } );
        },

        cacheOriginalHeights = function( $apis ) {
            $apis.each( function() {
                var $api = $( this ),
                    currentHeight = $api.outerHeight();

                $api.data( "height", currentHeight );
            } );
        },

        showApis = function( json ) {
            var html = Handlebars.templates[ "api-listing" ]( json ),
                $html = $( html ),
                $apisDescriptions;

            $html.addClass( "wb-tables" );

            $output.html( $html );

            $apisDescriptions = $output.find( ".api-description" );

            // Cache original heights
            cacheOriginalHeights( $apisDescriptions );

            $apisDescriptions.outerHeight( 200 );

            $apiRows = $output.find( ".api-row" );

            $output.find( ".wb-tables" ).on( "wb-ready.wb-tables", function() {
                var $filterContainer = $( "#apis_filter" ),
                    $filterInput = $filterContainer.find( "[type='search']" ).clone( true ),
                    labelText = ( wb.lang === "en" ) ? "Filter API listing:" : "Filtrer les APIs : ",
                    $label = $( "<label>" + labelText + "</label>" );

                $label.append( $filterInput );

                $filterContainer.html( $label );

                $( window ).on( "scroll", revealScroll );
            } );

            $output.find( ".wb-tables" ).trigger( "wb-init.wb-tables" );

            // Reveal APIs that are in-view after filtering
            $output.find( "#apis" ).on( "search.dt", revealScroll );

            revealScroll();
            equalHeights( $( "#apis .api-row" ) );
        },

        /**
         * Get which view is currently active
         *
         * @returns Object
         */
        getCurrentView = function() {
            var view, len, i, $html = $( "html" );

            len = views.length;

            for ( i = 0; i < len; i += 1 ) {
                view = views[ i ];

                if ( $html.hasClass( view.name ) ) {
                    break;
                }
            }

            return view;
        },


        /**
         * Given a grid element, figure out how many columns it spans
         * This depends on which view the browser is currently displaying (mobile/desktop/etc)
         *
         * @returns Number
         */
        numberOfSpanningCols = function( $elm ) {
            var columnNumberExtractor,
                classes = $elm.attr( "class" ),
                nbCols = 12,
                matches, view, viewPrefix, i;

            // In xxsmallview, all grid cells span 12 columns
            if ( currentView.name === "xxsmallview" ) {
                return nbCols;
            }

            for ( i = currentView.nb; i >= 1; i -= 1 ) {
                view = views[ i ];
                viewPrefix = view.prefix;

                if ( viewPrefix !== null ) {
                    columnNumberExtractor = new RegExp( "\\b" + viewPrefix + "-([0-9]+)\\b" );
                    matches = columnNumberExtractor.exec( classes );

                    if ( matches !== null ) {
                        nbCols = parseInt( matches[ 1 ], 10 );
                        break;
                    }
                }
            }

            return nbCols;
        };

    // Only run the following code if there's a container for it...
    if ( $output.length !== 0 ) {
        currentView = getCurrentView();

        /**
         * Update our "currentView" flag and re-map the dovs
         * when the browser window is resized to a different size
         */
        wb.doc.on( wb.resizeEvents, function() {
            var newView = getCurrentView();

            if ( currentView.nb !== newView.nb ) {
                currentView = newView;

                equalHeights( $( "#apis .api-row" ) );
            }
        } );

        // After the DataTable gets re-drawn, reveal new APIs if necessary
        // and recalculate the api heights
        //
        // Docs: https://datatables.net/reference/event/draw
        wb.doc.on( "draw.dt", ".wb-tables", function() {
            equalHeights( $( "#apis .api-row" ) );
            revealScroll();
        } );

        // Move our top container higher up the page
        $navbar.after( $apiTopContainer );

        // Fetch data from API
        getApisByTenant();
    }
}( jQuery ) );
