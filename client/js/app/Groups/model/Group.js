'use strict';
(function (This) {
    This.Group = Backbone.Model.extend({
        urlRoot: '/group',
        
        defaults: function () {
            return {
                name: '',
                direction: '',
                locationCity: '',
                startDate: '',
                finishDate: '',
                status: '',
                teacher: [],
                experts: [],
                students: []
            };
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
            locationCity: [
                {
                    locationCity: true,
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