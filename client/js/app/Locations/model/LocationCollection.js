'use strict';
(function (This) {
    This.LocationCollection = Backbone.Collection.extend({
        model: This.Location,
        url: '/rest/dbLocations'
    });
})(App.Locations);