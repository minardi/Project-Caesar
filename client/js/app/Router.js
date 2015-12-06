'use strict';
(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            '': 'groups',
            'Groups*path': 'groups',
            'Locations*path': 'locations'
        },

        initialize: function () {
            cs.mediator.subscribe('ChangedMenu', this.navigation, {}, this);
            cs.mediator.subscribe('RouteToLocations', this.navigateLocations, null, this);
        },
        
        groups: function () {
            cs.subRouters['Groups'] || (cs.subRouters['Groups'] = new App.Groups.Router());
        },
		
        locations: function () {
            cs.subRouters['Locations'] || (cs.subRouters['Locations'] = new App.Locations.Router());
        },

        navigateLocations: function () {
            this.navigate('Locations', {trigger: true});
        },

        navigation: function (pathname) {
            this.navigate(pathname, {trigger: true});
        }
    });
})(App);