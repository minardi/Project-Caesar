'use strict';
(function (This) {
    This.Controller = (function () {
        function Constructor () {
            var loginView = new This.LoginView();
            
            cs.router.navigate('/login');
            $('.content').html(loginView.render().$el);
            
            cs.mediator.subscribe('tryLogin', function (params) {
                Backbone.ajax({
                    url: 'login',
                    data: 'user=' + params.login + '&password=' + params.password,
                    success: function(response){
                        if (JSON.parse(response).result === true) {
                            cs.mediator.publish('loginSuccess');
                            //alert('Logged in successfully');
                            //cs.router.navigate('/', {trigger: true});
                        } else {
                            //alert('Invalid login or password');
                        }
                    }
                });
            });
            
            return this;
        }
        
        return Constructor;
    })();
})(App.Login);