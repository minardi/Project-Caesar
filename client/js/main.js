'use strict';
var App = {
	    Groups: {}
    },
    collections = {},
	cs = {},
    templates = {};

$(function () {
	collections.groups = new App.Groups.GroupCollection();
    
   _.each(collections, function (collection) {
        collection.fetch();
	});
	
	cs.mediator = new Mediator();
    cs.subRouters = {};
    cs.router = new App.Router();
	
	Backbone.history.start({pushState: true});
});
