'use strict';
(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            'open*': 'showSchedule',
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
//            this.controller.showGroups();
        },

        showSchedule: function (group) {
            this.controller.showSchedule(group);
        }
    });
})(App.Schedule);