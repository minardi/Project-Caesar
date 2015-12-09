'use strict';
(function (This) {
    This.Location = Backbone.Model.extend({
        urlRoot: '/dbLocations',
        
        defaults: function () {
            return {
                city: '',
                country: ''
            };
        },

        validation: {
            city: [
                {
                    required: true,
                    msg: 'Field cannot be empty'
                }
            ],
            country: [
                {
                    required: true,
                    msg: 'Field cannot be empty'
                }
            ]               
        }
    });
})(App.Locations);