'use strict';
(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            '': 'groups',
            'Groups*path': 'groups',
            'Locations*path': 'locations'
        },

        initialize: function () {
            cs.mediator.subscribe('RouteToLocations', this.navigateLocations, null, this);
            cs.mediator.subscribe('RouteToLocationGroups', this.navigateGroups, null, this);
        },
        
        groups: function () {
            cs.subRouters['Groups'] || (cs.subRouters['Groups'] = new App.Groups.Router());
        },
		
        locations: function () {
            cs.subRouters['Locations'] || (cs.subRouters['Locations'] = new App.Locations.Router());
        },

        navigateGroups: function (path) {
            this.navigate(path, {trigger: true});
        },

        navigateLocations: function () {
            this.navigate('Locations', {trigger: true});
        }
    });
})(App);