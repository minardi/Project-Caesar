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
            name: [
                {
                    required: true,
                    msg: 'Field cannot be empty'
                },
                {
                    maxLength: 15,
                    msg: 'Max length is 15 symbols'
                },
                {
                    minLength: 9,
                    msg: 'Min length is 2 symbols'
                }
            ],
            startDate: [
                {
                    startDate: true,
                    msg: 'Select data'
                }
            ],
            location: [
                {
                    location: true,
                    msg: 'Select location'
                }
            ],
            status: [
                {
                    status: true,
                    msg: 'Select status'
                }                
            ]    
        }
    });
})(App.Groups);