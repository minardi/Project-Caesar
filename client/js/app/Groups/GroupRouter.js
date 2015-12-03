'use strict';
(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            '': 'getGroups',
            'groups': 'getGroups',
			'groups/:location': 'showGroupsInLocation',
        },

        initialize: function () {
            this.controller = new App.Groups.Controller();
            this.controller.start();
        },

        getGroups: function () {
			console.log('Get groups');
        },
		
		showGroupsInLocation: function(location) {
			console.log('show groups in ' + location + '!');
		}
    });
})(App.Groups);




