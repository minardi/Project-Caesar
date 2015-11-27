'use strict';
(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            '': 'getGroups',
            'Groups': 'getGroups'
        },

        initialize: function () {
            this.controller = new App.Groups.Controller();
            this.controller.start();
        },

        getGroups: function () {
        }
    });
})(App.Groups);




