'use strict';
(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            '': 'groups',
            'Groups*path': 'groups',
            '/login': 'login'
        },

        initialize: function () {
            cs.mediator.subscribe('loginRequired', this.login);
        },
		
        groups: function () {
            cs.subRouters['Groups'] || (cs.subRouters['Groups'] = new App.Groups.Router());
        },
        
        login: function () {
            cs.subRouters['Login'] || (cs.subRouters['Login'] = new App.Login.Router());
        }
    });
})(App);