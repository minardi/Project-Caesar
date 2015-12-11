'use strict';
(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            '': 'groups',
            'Groups*path': 'groups',
            'Locations*path': 'locations',
            'Schedule*path': 'schedule',
            '*path': 'notFound'
        },

        initialize: function () {
            cs.mediator.subscribe('SelectedMenu', this.navigation, {}, this);
            cs.mediator.subscribe('RouteToLocations', this.navigateLocations, null, this);
            cs.mediator.subscribe('scheduleRequired', this.navigation, {}, this);
        },
        
        groups: function () {
            cs.subRouters['Groups'] || (cs.subRouters['Groups'] = new App.Groups.Router());
        },
        
        locations: function () {
            cs.subRouters['Locations'] || (cs.subRouters['Locations'] = new App.Locations.Router());
        },
        
        schedule: function () {
            cs.subRouters['Schedule'] || (cs.subRouters['Schedule'] = new App.Schedule.Router());
        },

        navigateLocations: function () {
            this.navigate('Locations', {trigger: true});
        },

        navigation: function (pathname) {
            this.navigate(pathname, {trigger: true});
        },

        notFound: function () {
            cs.mediator.publish('notFound');
        }
    });
})(App);