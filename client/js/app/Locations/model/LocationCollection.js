'use strict';
(function (This) {
    This.LocationCollection = Backbone.Collection.extend({
        model: This.Location,
        url: '/dbLocations'
    });
})(App.Locations);