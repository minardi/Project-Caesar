'use strict';
(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            'Schedule/:week': 'showWeekSchedule'
        },

        initialize: function () {
            this.controller = new This.Controller();

            Backbone.history.loadUrl(Backbone.history.fragment);
        },
        
        showWeekSchedule: function (week) {
            this.controller.showSchedule(week);
        }
    });
})(App.Schedule);