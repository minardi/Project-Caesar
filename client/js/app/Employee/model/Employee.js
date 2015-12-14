'use strict';
(function (This)  {
    This.Employee = Backbone.Model.extend({
        defaults: {
            name: '',
            lastName: '',
            role: App.Users.Roles.GUEST,
            location: {
                city: '',
                country: ''
            }
        },
        initialize: function (params) {
            var key;
            for (key in params) {
                if (key in Object.keys(this)) {
                    this[key] = params[key];
                }
            }
        }
    });
})(App.Employee);