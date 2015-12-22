'use strict';
(function (This)  {
    This.Router = modifiedRouter.extend({
        routes: {
            '': 'redirectToMyLocation',
            'Groups': 'showAllCurrentGroups',
            'Groups/': 'showAllCurrentGroups',
            'Groups/current': 'showAllCurrentGroups',
            'Groups/future': 'showFutureGroups',
            'Groups/finished': 'showFinishedGroups',
            'Groups/my': 'showMyGroups',
            'Groups/my/finished': 'showMyFinished',
            'Groups/my/current': 'showMyGroups',
            'Groups/my/future': 'showMyFuture',
            'Groups/:location': 'showInLocation',
            'Groups/:location/current': 'showInLocation',
            'Groups/:location/finished': 'showFinishedInLocation',
            'Groups/:location/future': 'showFutureInLocation',
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

        redirectToMyLocation: function () {
            var userLocation = cs.currentUser.getLocation();

            this.navigate('Groups/' + userLocation['city'], {trigger: true});
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
            cs.mediator.publish('showInLocation', location, 'current');
        },

        showFinishedInLocation: function (location) {
            cs.mediator.publish('showInLocation', location, 'finished');
        },

        showFutureInLocation: function (location) {
            cs.mediator.publish('showInLocation', location, 'future');
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




