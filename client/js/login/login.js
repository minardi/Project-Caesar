'use strict';

// --------------------------------------------------------
// test accounts:
// minnie : maw         - coordinator       
// quirk : quick        - teacher           
// alba : dumby         - administrator     
// ----------------------------------------------------------
var App = {
        Messenger: {}
    },
    templates = {},
    sessionLength = 30,
    messenger;
        
$(function () {
    messenger = new App.Messenger.Controller();
    messenger.start();
    
    $('#loginButton').on('click', tryLogin); 
    $('.form-control').keydown(function (event) {
        $(this).val($(this).val().replace(' ', ''));
        if (event.which === 13) {
            tryLogin();
        }
        if (event.which === 27) {
            $(this).val('');
        }
    });
    
    function tryLogin () {
        var login = $('#login').val(),
            password = $('#password').val();
            
        if (check(login, password)) {
            Backbone.ajax({
            url: 'login',
            data: 'user=' + $('#login').val().toLowerCase() + '&password=' + md5($('#password').val()),
            success: function (response) {
                if (JSON.parse(response).success) {
                    Cookies.set('loggedIn', true, {expires: moment().add(sessionLength, 'm').toDate()});
                    Cookies.set('sessionID', JSON.parse(response).sessionID, {expires: moment().add(sessionLength, 'm').toDate()});
                    window.location.reload();
                } else {
                    messenger.showError('Incorrect login or password. Please try again');
                }
            }
        });
        } else {
            $('#password').val('');
        }
        
    }
    
    function check (login, password) {
        var minLength = 4;
        
        if ((login.indexOf(' ') > 0) || (password.indexOf(' ') > 0)) {
            messenger.showError('Incorrect login or password. Please try again');
            return false;
        }
        
        if ((login === '') && (password === '')) {
            messenger.showError('Please enter login and password');
            return false;
        }
        
        if ((login === '') || (password === '')) {
            messenger.showError('Login and Password should be filled');
            return false;
        }
        
        if ((login.length < minLength) || (password.length < minLength)) {
            messenger.showError('Minimum fields\' length is ' + minLength);
            return false;
        }
        
        return true;
    }
    
    $(".close").click(function(){
        $("#loginFailed").alert("close");
    });
});
