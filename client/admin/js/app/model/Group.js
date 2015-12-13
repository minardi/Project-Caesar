'use strict';
(function (This) {
    This.Group = Backbone.Model.extend({
        urlRoot: '/rest/group',
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

        validation: {
            name: {
                required: true,
                minLength: 2,
                msg: 'Please enter a Group Name'
            }                 
        },

        parse: function(data) {
            data.startDate = new Date(data.startDate).toISOString().slice(0, 10);
            data.finishDate = new Date(data.finishDate).toISOString().slice(0, 10);
            
            return data;
        }
    });
})(App.Admin.Models);