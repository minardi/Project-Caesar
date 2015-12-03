'use strict';
var App = {
	    Groups: {},
	    Locations: {}      
	    Messanger: {}  
    },
    collections = {},
    cs = {},
    templates = {};

Backbone.Model.prototype.idAttribute = "_id";

$(function () {
	collections.groups = new App.Groups.GroupCollection();
	collections.locations = new App.Locations.LocationCollection();

   _.each(collections, function (collection) {
        collection.fetch();
    });
    
    cs.mediator = new Mediator();
    cs.messanger = new App.Messanger.Controller();

    cs.subRouters = {};
    cs.router = new App.Router();
    
    Backbone.history.start({pushState: true});
});
