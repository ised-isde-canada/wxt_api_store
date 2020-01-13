(function($) {

    //added by Franck Binard on January 2020, handler for support ticket form
    $('#submitSupportRequest').click(function(event) {

        event.preventDefault()


        $.ajax({
                url: '/rest/session/token'
            })
            .done(function(token, textStatus, jqXHR) {
                let user = ('user' in drupalSettings && 'uid' in drupalSettings.user) ? drupalSettings.user.uid : 'unknown user'

                let data = {
                    summary: $('#issueSummary').val(),
                    description: $('#issueDescription').val(),
                    email: $('#issueCreatorEmail').val(),
                    user
                }

                let errorMessage = $('#supportRequestFailMessage').val()

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
                        window.location.replace(`/${wb.lang}/SupportSuccess`)
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        $('#errorFrmSupport').show()

                    })

            })


    })


}(jQuery))
