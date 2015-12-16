'use strict';
var App = {},
    collections = {},
    cs = {},
    templates = {};

$(function () {
    var controller;

    collections.events = new App.EventCollection();
    collections.groups = new App.GroupCollection();

    collections.groups.fetch({success: main});

    function main () {
        cs.mediator = new Mediator();
        cs.router = new App.Router();

        Backbone.history.start({pushState: true, root: '/open/'});
    }    
});