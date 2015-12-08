'use strict';

var inheritanceRouter = Backbone.Router.extend({
	navigateToSelected: function (url) {
		this.navigate(url);
	},
});