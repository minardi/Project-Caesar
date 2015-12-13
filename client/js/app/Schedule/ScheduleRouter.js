'use strict';
(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            'Schedule': 'showSchedule',
            'Schedule/edit': 'editSchedule'
        },

        initialize: function () {
            this.controller = new This.Controller();

            Backbone.history.loadUrl(Backbone.history.fragment);
        },

        showSchedule: function () {
            this.controller.showSchedule();
        },

        editSchedule: function () {
            this.controller.editSchedule();
        }
    });
})(App.Schedule);