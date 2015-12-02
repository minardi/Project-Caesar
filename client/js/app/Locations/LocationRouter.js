'use strict';
(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            '': 'showLocations',
            'Locations': 'showLocations'
        },

        initialize: function () {
            this.controller = new App.Locations.Controller();
            this.controller.start();

            cs.mediator.subscribe('RouteToLocations', this.navigateLocations, null, this);

            Backbone.history.loadUrl(Backbone.history.fragment);
        },

        showLocations: function () {
            this.controller.showAll();
        }
    });
})(App.Locations);