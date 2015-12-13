'use strict';
(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            '': 'schedule',
            'Schedule*path': 'schedule'
        },

        initialize: function () {
            console.log('Init router');
        },
        
        schedule: function () {
            console.log('Schedule router');
//            cs.subRouters['Schedule'] || (cs.subRouters['Schedule'] = new App.Schedule.Router());
        }
    });
})(App);