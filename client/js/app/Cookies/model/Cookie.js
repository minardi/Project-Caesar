'use strict';
(function (This) {
    This.Cookie = Backbone.Model.extend({
        defaults: {
            key: '',
            value: ''
        },
        initialize: function (params) {}
    });
})(App.Cookies);