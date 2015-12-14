'use strict';
(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            'Schedule/:weekStart/:group': 'showWeekSchedule',
            'Schedule/edit': 'editSchedule',
            'Schedule': 'showSchedule'
        },

        initialize: function () {
            this.controller = new This.Controller();

            Backbone.history.loadUrl(Backbone.history.fragment);
        },
        
        showWeekSchedule: function (weekStart, group) {
            this.controller.showSchedule(weekStart, group)
        },

        editSchedule: function () {
            this.controller.editSchedule();
        },
        
        showSchedule: function () {
            cs.mediator.publish('scheduleRequired', 'Schedule/' + 
                moment().day('Monday').format('MM-DD-YYYY') + '/all');
        }
    });
})(App.Schedule);