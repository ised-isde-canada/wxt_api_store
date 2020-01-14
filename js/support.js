(function($) {

    //added by Franck Binard on January 2020, handler for support ticket form
    //sends a support request to APICan

    let tokenFetchFail = function(jqXHR, textStatus, errorThrown) {
        $('#errorFrmSupport').show()
    }


    $('#submitSupportRequest').click(function(event) {
        event.preventDefault()
        let data = {
            summary: $('#issueSummary').val(),
            description: $('#issueDescription').val(),
            email: $('#issueCreatorEmail').val()
        }
        if (data.summary.length < 1) return false
        if (data.description.length < 1) return false
        if (data.email.length < 1) return false


        //check if there's a validation error on the
        //client side
        if ($("#errors-default").length > 0) {
            return
        }

        //need an X-CSRF client
        $.ajax({
                url: '/rest/session/token'
            })
            .fail(tokenFetchFail)
            .done(function(token, textStatus, jqXHR) {

                data.user = ('user' in drupalSettings && 'uid' in drupalSettings.user) ? drupalSettings.user.uid : 'unknown user'
                let settings = {
                    dataType: 'json',
                    url: "/api_store/jira_submission?_format=json&lang=",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'X-CSRF-TOKEN': token
                    },
                    data: JSON.stringify(data)
                }

                $.ajax(settings)
                    .done(function(data, textStatus, jqXHR) {
                        window.location.replace(`/${wb.lang}/supportsuccess`)
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        $('#errorFrmSupport').show()
                    })

            })


    })


}(jQuery))
