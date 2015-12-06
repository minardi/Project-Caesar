'use strict';
(function (This) {
    This.Locations = Backbone.Collection.extend({
        model: App.Admin.Models.Location,
        url: '/dbLocations'
    });

    This.Groups = Backbone.Collection.extend({
        model: App.Admin.Models.Group,
        url: '/groups'
    });
})(App.Admin.Collections);