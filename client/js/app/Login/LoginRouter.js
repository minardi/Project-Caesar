'use strict';
(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            '/login': 'showLoginPage'
        },

        initialize: function () {
            var controller = new This.Controller();
        },

        showLoginPage: function () {
        }
    });
})(App.Login);