'use strict';
(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            'Locations': 'showLocations',
            'Locations*path': 'notFound'
        },

        initialize: function () {
            this.controller = new This.Controller();

            Backbone.history.loadUrl(Backbone.history.fragment);
        },

        showLocations: function () {
            this.controller.showAll();
        },

        notFound: function () {
            cs.mediator.publish('notFound');
        }
    });
})(App.Locations);