'use strict';
(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            '': 'groups',
            'Groups*path': 'groups'
        },

        initialize: function () {
        },
		
        groups: function () {
            cs.subRouters['Groups'] || (cs.subRouters['Groups'] = new App.Groups.Router());
        }
    });
})(App);