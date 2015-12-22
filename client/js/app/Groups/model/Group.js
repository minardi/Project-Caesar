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
                teachers: [],
                experts: [],
                students: []
            };
        },

        parse: function(data) {
            data.startDate = new Date(data.startDate).toISOString().slice(0, 10);
            data.finishDate = new Date(data.finishDate).toISOString().slice(0, 10);
            return data;
        },

        validation: {
            name: {
                required: true,
                minLength: 2,
                msg: 'Please enter a Group Name'
            }                 
        }
    });
})(App.Groups);