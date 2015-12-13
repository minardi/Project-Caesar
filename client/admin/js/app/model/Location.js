'use strict';
(function (This) {
    This.Location = Backbone.Model.extend({
        defaults: function () {
            return {
                city: '',
                country: ''
            };
        }
    });
})(App.Admin.Models);