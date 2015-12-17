'use strict';
(function (This)  {
    This.Router = modifiedRouter.extend({
        routes: {
            '': 'redirectToMy',
            'Groups': 'showAllCurrentGroups',
            'Groups/current': 'showAllCurrentGroups',
            'Groups/future': 'showFutureGroups',
            'Groups/finished': 'showFinishedGroups',
            'Groups/my': 'showMyGroups',
            'Groups/my/finished': 'showMyFinished',
            'Groups/my/future': 'showMyFuture',
            'Groups/:location': 'showInLocation',
            'Groups*path': 'notFound'
        },

        initialize: function () {
            this.controller = new App.Groups.Controller(collections.groups);
            this.controller.start();

            /*URL navigation*/
            cs.mediator.subscribe('currentGroups', this.navigateToSelected, {}, this);
            cs.mediator.subscribe('futureGroups', this.navigateToSelected, {}, this);
            cs.mediator.subscribe('finishedGroups', this.navigateToSelected, {}, this);

            cs.mediator.subscribe('RouteToLocationGroups', this.navigateToLocationGroups, {}, this);
            
            Backbone.history.loadUrl(Backbone.history.fragment);
        },

        redirectToMy: function () {
            this.navigate('Groups/my', {trigger: true});
        },

        showFutureGroups: function () {
            cs.mediator.publish('futureGroupsView');
        },

        showFinishedGroups: function () {
            cs.mediator.publish('finishedGroupsView');
        },

        showAllCurrentGroups: function () {
            cs.mediator.publish('showAll');
        },

        showInLocation: function (location) {
            cs.mediator.publish('showInLocation', location);
        },

        showMyGroups: function () {
            cs.mediator.publish('showMy', 'current');
        },

        showMyFinished: function () {
            cs.mediator.publish('showMy', 'finished');
        },

        showMyFuture: function () {
            cs.mediator.publish('showMy', 'future');
        },

        notFound: function () {
            cs.mediator.publish('notFound');
        }
    });
})(App.Groups);




