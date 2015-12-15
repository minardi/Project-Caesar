'use strict';
(function (This) {
    This.LocationCollection = Backbone.Collection.extend({
        model: This.Location,
        url: '/rest/dbLocations',
        findByCity: function (cityName) {
            this.forEach(function (location) {
                if (location.get('city') == cityName) {
                    return location;
                }
            });
        }
    });
})(App.Locations);