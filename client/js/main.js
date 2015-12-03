'use strict';
var App = {
        Groups: {},
        Messanger: {}
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
    cs.messanger = new App.Messanger.Controller();

    cs.subRouters = {};
    cs.router = new App.Router();
    
    Backbone.history.start({pushState: true});
});
