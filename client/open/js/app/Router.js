'use strict';
(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            'Schedule/:name': 'showSchedule',
            'Schedule/:name*path': 'notFound',
            '*path': 'notFound'
        },

        initialize: function () {
            this.controller = new This.Controller(); 
            this.controller.start();   
        },
        
        showSchedule: function (group) {
            this.controller.getCollection(group.replace('+', ' '));
        },

        notFound: function () {
            cs.mediator.publish('error404');
        }
    });
})(App);