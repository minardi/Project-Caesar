'use strict';
(function (This) {
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
        },

        validation: {
            name: {
              required: true,
              range: [2, 10],
              msg: 'Please enter a valid email'
            },
            startDate: {
                startDate: true,
                msg: 'Select data'
            },
            location: {
                location: true,
                msg: 'Select location'
            },
            status: {
                status: true,
                msg: 'Select status'
            }                   
        }

        // validate: function(attributes) {
        //     if ( !attributes.name ) {
        //         console.log('Every group must have a name.');
        //     };
        //     if ( !attributes.startDate ) {
        //         console.log('Every group must have a Start Date.');
        //     };
        // }
    });
})(App.Groups);