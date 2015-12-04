'use strict';
(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
//            '': 'showLocations',
            'Locations': 'showLocations'
        },

        initialize: function () {
            this.controller = new This.Controller();
//            this.controller.start();

            Backbone.history.loadUrl(Backbone.history.fragment);
        },

        showLocations: function () {
            this.controller.showAll();
        }
    });
})(App.Locations);