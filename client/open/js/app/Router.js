'use strict';
(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            'Schedule/:name': 'showSchedule',
            'Schedule/:name*path': 'notFound',
//            'Schedule': 'navigateToSchedule',
            '*path': 'notFound'
        },

        initialize: function () {
            this.controller = new This.Controller(); 
            this.controller.start();   
        },
        
        navigateToSchedule: function () {
            this.navigate('Schedule/Dnipro', {trigger: true});
        },

        showSchedule: function (group) {
            this.controller.getCollection(group.replace('+', ' '));
        },

        notFound: function () {
            cs.mediator.publish('error404');
        }
    });
})(App);