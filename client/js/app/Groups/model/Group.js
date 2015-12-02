'use strict';
(function (This) {
    This.Group = Backbone.Model.extend({
        urlRoot: '/group',
		
        defaults: function () {
            return {
                title: '',
                startDate: '',
                finishDate: '',
                location: '',
                direction: '',
                status: ''
            };
        },

        validation: {
            title: [
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
                    required: true,
                    msg: 'Field cannot be empty'
                }
            ],
            finishDate: [
                {
                    required: true,
                    msg: 'Field cannot be empty'
                }                
            ],
            location: [
                {
                    required: true,
                    msg: 'Field cannot be empty'
                }                
            ],    
            direction: [
                {
                    required: true,
                    msg: 'Field cannot be empty'
                }                
            ],    
            status: [
                {
                    required: true,
                    msg: 'Field cannot be empty'
                }                
            ]                
        }
    });
})(App.Groups);