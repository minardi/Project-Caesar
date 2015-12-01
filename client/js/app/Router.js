'use strict';
(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            '': 'groups',
            'Groups*path': 'groups',
            'login': 'logins'
        },

        initialize: function () {
        },
		
        groups: function () {
            cs.subRouters['Groups'] || (cs.subRouters['Groups'] = new App.Groups.Router());
        },
        
        logins: function () {
            cs.subRouters['Login'] || (cs.subRouters['Login'] = new App.Login.Router());
        }
    });
})(App);