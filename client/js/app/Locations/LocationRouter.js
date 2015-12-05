'use strict';
(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            'Locations': 'showLocations'
        },

        initialize: function () {
            this.controller = new This.Controller();

            Backbone.history.loadUrl(Backbone.history.fragment);
        },

        showLocations: function () {
            this.controller.showAll();
        }
    });
})(App.Locations);