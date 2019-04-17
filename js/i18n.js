( function( window ) {
    var apiStore = window.apiStore || {},

    i18n = {
        en: {
            "subscriptions.subscription": "Subscription",
            "subscriptions.apiTitle": "API title",
            "subscriptions.key": "Key",
            "subscriptions.status": "Status",
            "subscriptions.createdDate": "Created date"
        },

        fr: {
            "subscriptions.subscription": "Abonnement",
            "subscriptions.apiTitle": "Titre",
            "subscriptions.key": "Clé",
            "subscriptions.status": "Statut",
            "subscriptions.createdDate": "Date de création"
        }
    };

    apiStore.i18n = function( key, lang ) {
        return i18n[ lang ][ key ];
    }

    window.apiStore = apiStore;
}( window ) );
