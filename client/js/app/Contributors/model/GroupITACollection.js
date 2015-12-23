'use strict';
(function (This) {
    This.GroupITACollection = Backbone.Collection.extend({
        model: This.GroupITA,
        url: '/rest/groupITA'
    });
})(App.Contributors);