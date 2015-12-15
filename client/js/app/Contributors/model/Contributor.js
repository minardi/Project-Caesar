'use strict';
(function (This) {
    This.Contributor = Backbone.Model.extend({
        defaults: function () {
            return {
                id: '',
                name: '',
                lastName: '',
                team: ''
            }
        }
    });
})(App.Contributors);