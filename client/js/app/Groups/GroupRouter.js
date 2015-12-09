'use strict';
(function (This)  {
    This.Router = modifiedRouter.extend({
        routes: {
            '': 'showCurrentGroups',
            'Groups': 'showAllCurrentGroups',
            'Groups/current': 'showCurrentGroups',
            'Groups/future': 'showFutureGroups',
            'Groups/finished': 'showFinishedGroups',
            'Groups/:location': 'showInLocation'
        },

        initialize: function () {
            this.controller = new App.Groups.Controller();
            this.controller.start();

            /*URL navigation*/
            cs.mediator.subscribe('currentGroups', this.navigateToSelected, {}, this);
            cs.mediator.subscribe('futureGroups', this.navigateToSelected, {}, this);
            cs.mediator.subscribe('finishedGroups', this.navigateToSelected, {}, this);
            
            Backbone.history.loadUrl(Backbone.history.fragment);
        },

        showCurrentGroups: function () {
            cs.mediator.publish(
                cs.currentUser.hasRoleOf('Teacher') ? 'showMy' : 'currentGroupsView');
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

        showInLocation: function(location) {
            cs.mediator.publish('showInLocation', location);
        }
    });
})(App.Groups);




