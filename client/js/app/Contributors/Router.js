'use strict';
(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            'Contributors': 'showContributors',
            'Contributors*path': 'notFound'
        },

        initialize: function () {
            this.controller = new This.Controller();

            Backbone.history.loadUrl(Backbone.history.fragment);
        },

        showContributors: function () {
            cs.mediator.publish('ShowContributors');
        },

        notFound: function () {
            cs.mediator.publish('notFound');
        }
    });
})(App.Contributors);