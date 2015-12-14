'use strict';
(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            'open/': 'navigateSchedule',
            'Schedule': 'schedule'
        },

        initialize: function () {
            console.log('Init router');
        },
        
        navigateSchedule: function () {
            this.navigate('Schedule', {trigger: true});
        },

        schedule: function () {
            console.log('Schedule router');
            cs.subRouters['Schedule'] || (cs.subRouters['Schedule'] = new App.Schedule.Router());
        }
    });
})(App);