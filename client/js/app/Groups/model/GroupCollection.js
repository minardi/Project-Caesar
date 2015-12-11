'use strict';
(function (This) {
    This.GroupCollection = Backbone.Collection.extend({
        model: This.Group,
        url: '/rest/groups'
    });
})(App.Groups);
