'use strict';
var App = {
	    Groups: {},
        Cookies: {},
        Users: {},
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
    cs.currentUser = new App.Users.User({
        name: 'Quirinus',
        lastName: 'Quirrell',
        role: App.Users.Roles.TEACHER,
        city: 'London',
        country: 'United Kingdom'
    });
    cs.cookiesController = new App.Cookies.Controller();
    
    Backbone.history.start({pushState: true});
    
    cs.cookiesController.checkLogged();
});
