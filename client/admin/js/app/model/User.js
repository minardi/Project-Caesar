'use strict';
(function (This) {
    This.User = Backbone.Model.extend({
        urlRoot: '/user',
        defaults: function () {
            return {
                name: '',
                lastName: '',
                role: '',
                locationCity: '',
                locationCountry: '',
                login: '',
                password: ''
            };
        }
    });
})(App.Admin.Models);