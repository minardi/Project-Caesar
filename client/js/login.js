'use strict';

// --------------------------------------------------------
// test accounts:
// minnie : maw         - coordinator       
// quirk : quick        - teacher           
// alba : dumby         - administrator     
// --------------------------------------------------------

$(function () {
    $('#loginButton').on('click', tryLogin); 
    $('.form-control').keydown(function (event) {
        if (event.which === 13) {
            tryLogin();
        }
    });
    
    function tryLogin () {
        Backbone.ajax({
            url: 'login',
            data: 'user=' + $('#login').val() + '&password=' + md5($('#password').val()),
            success: function (response) {
                if (JSON.parse(response).success) {
                    Cookies.set('loggedIn', true);
                    Cookies.set('sessionID', JSON.parse(response).sessionID);
                    window.location.reload();
                } else {
                    $('#loginFailed').show();
                }
            }
        });
    }
    
    $(".close").click(function(){
        $("#loginFailed").alert("close");
    });
});
