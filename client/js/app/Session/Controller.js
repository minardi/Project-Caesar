'use strict';
(function (This) {
    This.Controller = (function () {
        function Constructor () {
            var currentSessionView;
            
            cs.mediator.subscribe('continueSessionRequired', function () {
                Backbone.ajax({
                    url: 'continueSession',
                    data: 'id=' + App.Cookies.Controller.get('sessionID'),
                    success: loginSuccess
                });
            });
            
            function loginSuccess (response) {
                if (JSON.parse(response).result === true) {   
                    cs.currentUser = new App.Users.User(JSON.parse(response).recognizedUser);
                    currentSessionView = new This.CurrentSessionView({
                        model: cs.currentUser.toJSON()
                    });
                    $('.user-account').html(currentSessionView.render().$el);
                    // cs.mediator.publish('sessionContinued');
                } else {
                    // some notification??
                }
            }
            
            // todo: subscribe mediator for logoutRequired
            // to send ajax on server and remove session id from db
            
            return this;
        }
        
        return Constructor;
    })();
})(App.Session);