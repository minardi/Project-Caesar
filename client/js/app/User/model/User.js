'use strict';
(function (This) {
    This.User = Backbone.Model.extend({
    defaults: {
        name: '',
        surname: '',
        role: '',
        city: '',
        country: ''
    },
    initialize: function (params) {},
    validation: {
        name: [
            {
                required: true,
                msg: 'User\'s name is required'
            }
        ],
        surname: [
            {
                required: true,
                msg: 'User\'s surname is required'
            }
        ],
        role: [
            {
                required: true,
                msg: 'User\'s role is required'
            }, 
            {
                oneOf: ['teacher', 'coordinator', 'administrator', 'student'],
                msg: 'User\'s role specified wrong'
            }
        ],
        city: [
            {
                required: true,
                msg: 'User\'s city is required'
            }
        ],
        country: [
            {
                required: true,
                msg: 'Users\'s country is required'
            }
        ]
    }
});
})(App);