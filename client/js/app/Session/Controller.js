'use strict';
(function (This) {
    This.Controller = (function () {
        function Constructor () {
            var currentSessionView;
            
            cs.mediator.subscribe('continueSessionRequired', function () {
                Backbone.ajax({
                    url: '/continueSession',
                    data: 'id=' + App.Cookies.Controller.get('sessionID'),
                    success: loginSuccess
                });
            });
            
            cs.mediator.subscribe('logoutRequired', function () {
                Backbone.ajax({
                    url: 'logout',
                    data: 'sessionID=' + cs.currentUser.getSessionID(),
                    success: logoutSuccess
                });
            });

            function loginSuccess (response) {
                if (JSON.parse(response).success) {   
                    cs.currentUser = new App.Users.User(JSON.parse(response).recognizedUser);
                    currentSessionView = new This.CurrentSessionView({
                        model: cs.currentUser.toJSON()
                    });
                    $('.user-account').html(currentSessionView.render().$el);
                    cs.mediator.publish('sessionContinued');
                } else {
                    cs.cookiesController.clearAll();
                    window.location.href = '/';
                }
            }
            
            function logoutSuccess (response) {
                if (JSON.parse(response).success) { 
                    cs.currentUser = undefined;
                }
            }
            
            return this;
        }
        
        return Constructor;
    })();
})(App.Session);