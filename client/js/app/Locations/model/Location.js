'use strict';
(function (This) {
    This.Location = Backbone.Model.extend({
        urlRoot: '/dbLocations',
		
        defaults: function () {
            return {
                name: ''
            };
        },

        validation: {
            name: [
                {
                    required: true,
                    msg: 'Field cannot be empty'
                },
                {
                    maxLength: 20,
                    msg: 'Max length is 20 symbols'
                },
                {
                    minLength: 9,
                    msg: 'Min length is 2 symbols'
                }
            ]   
        }
    });
})(App.Locations);