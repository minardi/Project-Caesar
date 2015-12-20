'use strict';
(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            'Contributors': 'showContributors',
            'Contributors/qc': 'showQCContributors',
            'Contributors/js': 'showJSContributors',
            'Contributors*path': 'notFound'
        },

        initialize: function () {
            this.controller = new This.Controller();
            cs.mediator.subscribe('ShowQCGroup', this.navigateQC, {}, this);
            cs.mediator.subscribe('ShowJSGroup', this.navigateJS, {}, this);
            Backbone.history.loadUrl(Backbone.history.fragment);
        },

        navigateQC: function () {
            this.navigate('Contributors/qc');
        },

        navigateJS: function () {
            this.navigate('Contributors/js');
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