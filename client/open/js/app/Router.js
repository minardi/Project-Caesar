'use strict';
(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            '': 'navigateSchedule',
            'Schedule': 'schedule'
        },

        initialize: function () {
        },
        
        navigateSchedule: function () {
            this.navigate('Schedule', {trigger: true});
        },

        schedule: function () {
            cs.subRouters['Schedule'] || (cs.subRouters['Schedule'] = new App.Schedule.Router());
        }
    });
})(App);