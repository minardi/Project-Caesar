'use strict';
var App = {
	    Groups: {},
        Cookies: {},
        Login: {}
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
    cs.currentUser = new App.User({});
    
    Backbone.history.start({pushState: true});
    
    cs.cookiesController = new App.Cookies.Controller();
});
