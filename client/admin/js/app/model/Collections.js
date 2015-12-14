'use strict';
(function (This) {
    This.Locations = Backbone.Collection.extend({
        model: App.Admin.Models.Location,
        url: '/rest/dbLocations'
    });

    This.Groups = Backbone.Collection.extend({
        model: App.Admin.Models.Group,
        url: '/rest/groups'
    });

    This.Users = Backbone.Collection.extend({
        model: App.Admin.Models.User,
        url: '/users'
    });
})(App.Admin.Collections);