'use strict';
(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            'Schedule/Groups/:name': 'showGroupSchedule',
            'Schedule/Groups': 'showAllSchedule',
            'Schedule': 'navigateToSchedule',
            '': 'navigateToSchedule'
        },

        initialize: function () {
            this.controller = new This.Controller(); 
            this.controller.start();   
        },
        
        navigateToSchedule: function () {
            this.navigate('Schedule/Groups', {trigger: true});
        },

        showGroupSchedule: function (group) {
            this.controller.getCollection(group.replace('+', ' '));
        },

        showAllSchedule: function () {
            this.controller.getCollection('');
        }
    });
})(App);