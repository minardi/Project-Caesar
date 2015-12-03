'use strict';
(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            '': 'groups',
            'Groups*path': 'groups',
            'Locations*path': 'locations',
			'groups/:location': 'showGroupsInLocation',
        },

        initialize: function () {
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
        
		showGroupsInLocation: function(location) {
			cs.subRouters['Groups'] || (cs.subRouters['Groups'] = new App.Groups.Router());
			var groupRouter = cs.subRouters['Groups'];
			groupRouter.controller.showGroupsInLocation(location);
		}
    });
})(App);