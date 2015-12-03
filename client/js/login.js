'use strict';
$(function () {
    $('#loginButton').on('click', function () {
        Backbone.ajax({
            url: 'login',
            data: 'user=' + $('#login').val() + '&password=' + md5($('#password').val()),
            success: function (response) {
                if (JSON.parse(response).result === true) {
                    Cookies.set('loggedIn', true);
                    Cookies.set('sessionID', JSON.parse(response).sessionID);
                    window.location.reload();
                } else {
                    alert('WRONG');
                }
            }
        });
    }); 
});
