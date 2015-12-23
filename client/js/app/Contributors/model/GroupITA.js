'use strict';
(function (This) {
    This.GroupITA = Backbone.Model.extend({
        defaults: function () {
            return {
                _id: '',
                group: '',
                team: ''
            }
        }
    });
})(App.Contributors);