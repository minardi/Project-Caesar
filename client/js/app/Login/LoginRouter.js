'use strict';
(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {},

        initialize: function () {
            (new This.Controller());
        }
    });
})(App.Login);