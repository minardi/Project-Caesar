'use strict';
(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            '': 'showAll',
            'Groups': 'showAll',
			'Groups/:location': 'showInLocation',
        },

        initialize: function () {
            this.controller = new App.Groups.Controller();
            this.controller.start();
			
            Backbone.history.loadUrl('#' + Backbone.history.fragment);
        },

        showAll: function () {
			this.controller.showAll();
        },
		
		showInLocation: function(location) {
			this.controller.showInLocation(location);
		}
    });
})(App.Groups);




