'use strict';
(function (This) {
    This.Location = Backbone.Model.extend({
        urlRoot: '/rest/dbLocations',
        
        defaults: function () {
            return {
                city: '',
                country: ''
            };
        }
    });
})(App.Locations);