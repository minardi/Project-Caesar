'use strict';
var App = {
        Groups: {},
        Notifications: {}
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
    cs.messanger = new App.Notifications.Controller();

    cs.subRouters = {};
    cs.router = new App.Router();
    
    Backbone.history.start({pushState: true});
});
