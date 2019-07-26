if ( drupalSettings.path.isFront === true ) {
    if ( /^\/en\/?$/.test( window.location.pathname ) ) {
       window.location.pathname = "/en/homepage";
    }

    if ( /^\/fr\/?$/.test( window.location.pathname ) ) {
        window.location.pathname = "/fr/accueil";
    }
}
