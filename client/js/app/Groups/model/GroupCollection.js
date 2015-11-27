'use strict';
(function (This) {
    This.GroupCollection = Backbone.Collection.extend({
        model: This.Group,
        url: '/group'
    });
})(App.Groups);
