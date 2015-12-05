'use strict';
(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            '': 'showAll',
            'Groups': 'showAll',
            'Groups/:location': 'showInLocation',
            'Groups/current': 'showCurrentGroups',
            'Groups/future': 'showFutureGroups',
            'Groups/finished': 'showFinishedGroups'
        },

        initialize: function () {
            this.controller = new App.Groups.Controller();
            this.controller.start();

            /*URL navigation*/
            cs.mediator.subscribe('currentGroups', this.navigateCurrentGroups, {}, this);
            cs.mediator.subscribe('futureGroups', this.navigateFutureGroups, {}, this);
            cs.mediator.subscribe('finishedGroups', this.navigateFinishedGroups, {}, this);

            cs.mediator.subscribe('RouteToLocationGroups', this.navigateToLocationGroups, {}, this);
            
            Backbone.history.loadUrl(Backbone.history.fragment);
        },

        navigateCurrentGroups: function () {
            this.navigate('Groups/current');
        },

        navigateFutureGroups: function () {
            this.navigate('Groups/future');
        },

        navigateFinishedGroups: function () {
            this.navigate('Groups/finished');
        },

        navigateToLocationGroups: function(url) {
            this.navigate(url, {trigger: true});
        },

        showCurrentGroups: function () {
            cs.mediator.publish('currentGroupsView');
        },

        showFutureGroups: function () {
            cs.mediator.publish('futureGroupsView');
        },

        showFinishedGroups: function () {
            cs.mediator.publish('finishedGroupsView');
        },

        showAll: function () {
            this.controller.showAll();
        },
        
        showInLocation: function(location) {
            this.controller.showInLocation(location);
        }
    });
})(App.Groups);




