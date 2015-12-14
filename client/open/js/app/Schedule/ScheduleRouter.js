'use strict';
(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            'Schedule': 'showSchedule',
            'Schedule/Groups/:name': 'showSchedule'
        },

        initialize: function () {
            this.controller = new This.Controller();    
            Backbone.history.loadUrl(Backbone.history.fragment);
        },

        navigateToSchedule: function () {
            this.navigate('Schedule/Groups', {trigger: true});
        },

        choseGroup: function () {
            console.log('chose group');
        },

        showSchedule: function (group) {
            this.controller.showWeekSchedule(group);
        }
    });
})(App.Schedule);