/*global Handlebars: false, wb: false*/
( function( apiStore ) {
    var i18n = apiStore.i18n,
        lang = wb.lang;

    Handlebars.registerHelper( "i18n", function( key ) {
        return i18n( key, lang );
    } );
}( window.apiStore ) );
