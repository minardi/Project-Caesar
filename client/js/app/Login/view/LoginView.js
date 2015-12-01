'use strict';
(function (This) {
    This.LoginView = Backbone.View.extend({
        initialize: function () {},

        render: function () {
            this.$el.html('LOG IN');

            return this;
        }
    });
})(App.Login);