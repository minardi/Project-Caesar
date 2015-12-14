'use strict';
(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            'Schedule/:weekStart': 'showWeekSchedule',
            'Schedule/edit': 'editSchedule'
        },

        initialize: function () {
            this.controller = new This.Controller();

            Backbone.history.loadUrl(Backbone.history.fragment);
        },
        
        showWeekSchedule: function (weekStart) {
            this.controller.showSchedule(weekStart)
        },

        editSchedule: function () {
            this.controller.editSchedule();
        }
    });
})(App.Schedule);