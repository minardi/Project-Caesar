'use strict';
(function (This) {
    This.ContributorCollection = Backbone.Collection.extend({
        model: This.Contributor,
        url: '/rest/contributors'
    });
})(App.Contributors);