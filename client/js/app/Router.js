'use strict';
(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            '': 'groups',
            'Groups*path': 'groups',
            '/login': 'login',
            'groups/:location': 'showGroupsInLocation',
        },

        initialize: function () {
            cs.subRouters['Login'] = new App.Login.Router();
        },
		
        groups: function () {
            cs.subRouters['Groups'] || (cs.subRouters['Groups'] = new App.Groups.Router());
        },
        
        login: function () {
            cs.subRouters['Login'] || (cs.subRouters['Login'] = new App.Login.Router());
        },
		
		showGroupsInLocation: function(location) {
			cs.subRouters['Groups'] || (cs.subRouters['Groups'] = new App.Groups.Router());
			var groupRouter = cs.subRouters['Groups'];
			groupRouter.controller.showGroupsInLocation(location);
		}

    });
})(App);