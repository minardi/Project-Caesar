'use strict';
(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            'Contributors': 'showContributors',
            'Contributors/QC': 'showQCContributors',
            'Contributors/JS': 'showJSContributors',
            'Contributors*path': 'notFound'
        },

        initialize: function () {
            this.controller = new This.Controller();

            cs.mediator.subscribe('show', this.navigateTo, {}, this);
            Backbone.history.loadUrl(Backbone.history.fragment);
        },

        navigateTo: function (url) {
            this.navigate(url);
        },

        showContributors: function () {
            cs.mediator.publish('ShowContributors');
        },

        showQCContributors: function () {
            cs.mediator.publish('ShowQCContributors');
        },

        showJSContributors: function () {
            cs.mediator.publish('ShowJSContributors');
        },

        notFound: function () {
            cs.mediator.publish('notFound');
        }
    });
})(App.Contributors);