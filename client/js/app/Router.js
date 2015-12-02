'use strict';
(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            '': 'groups',
            'Groups*path': 'groups',
			'groups/:location': 'showGroupsInLocation',
        },

        initialize: function () {
        },
		
        groups: function () {
            cs.subRouters['Groups'] || (cs.subRouters['Groups'] = new App.Groups.Router());
        },
		
		showGroupsInLocation: function(location) {
			cs.subRouters['Groups'] || (cs.subRouters['Groups'] = new App.Groups.Router());
			var groupRouter = cs.subRouters['Groups'];
			groupRouter.controller.showGroupsInLocation(location);
		}

    });
})(App);