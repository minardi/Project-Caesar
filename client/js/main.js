'use strict';
var App = {
	    Groups: {},
        Cookies: {},
        Users: {},
        Login: {},
	    Locations: {}        
    },
    collections = {},
	cs = {},
    templates = {};

$(function () {
	collections.groups = new App.Groups.GroupCollection();
	collections.locations = new App.Locations.LocationCollection();

   _.each(collections, function (collection) {
        collection.fetch();
	});
	
	cs.mediator = new Mediator();
    cs.subRouters = {};
    cs.router = new App.Router();
    cs.cookiesController = new App.Cookies.Controller();
    
    Backbone.history.start({pushState: true});
    
    cs.cookiesController.checkLogged();
});
