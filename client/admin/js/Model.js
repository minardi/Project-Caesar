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

    This.Group = Backbone.Model.extend({
        urlRoot: '/group',
        defaults: function () {
            return {
                name: '',
                direction: '',
                location: '',
                startDate: '',
                finishDate: '',
                status: '',
                teachers: [],
                experts: [],
                students: []
            };
        },

        parse: function(data) {
            data.startDate = new Date(data.startDate).toISOString().slice(0, 10);
            data.finishDate = new Date(data.finishDate).toISOString().slice(0, 10);
            return data;
        }
    });

    This.User = Backbone.Model.extend({
        urlRoot: '/user',
        defaults: function () {
            return {
                name: '',
                lastName: '',
                role: '',
                locationCity: '',
                locationCountry: '',
                login: ''
            };
        }
    });
})(App.Admin.Models);