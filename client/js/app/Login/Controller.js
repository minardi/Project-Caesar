'use strict';
(function (This) {
    This.Controller = (function () {
        function Constructor () {
            var loginView = new This.LoginView(),
                loginSuccessView = new This.LoginSuccessView({
                    model: {}
                });;
            
            cs.mediator.subscribe('loginRequired', function () {
                $('.content').html(loginView.render().$el);
                cs.router.navigate('/login');
            });
            
            cs.mediator.subscribe('tryLoginOccured', function (params) {
                Backbone.ajax({
                    url: 'login',
                    data: 'user=' + params.login + '&password=' + params.password,
                    success: loginSuccess
                });
            });
            
            cs.mediator.subscribe('loginSuccessed', function (params) {
                $('.user-account').html(loginSuccessView.render({
                    model: cs.currentUser.toJSON()
                }).$el);
            });
            
            cs.mediator.subscribe('continueSessionRequired', function (params) {
                Backbone.ajax({
                    url: 'continueSession',
                    data: 'id=' + params.sessionID,
                    success: loginSuccess
                });
            });
            
            function loginSuccess (response) {
                if (JSON.parse(response).result === true) {   
                    cs.currentUser = new App.Users.User(JSON.parse(response).recognizedUser);
                    cs.mediator.publish('loginSuccessed');
                    //cs.router.navigate('/', {trigger: true});
                } else {
                    //alert('Invalid login or password');
                }
            }
            
            return this;
        }
        
        return Constructor;
    })();
})(App.Login);