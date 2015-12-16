'use strict';
var App = {},
    collections = {},
    cs = {},
    templates = {};

$(function () {
    collections.events = new App.EventCollection();
    collections.groups = new App.GroupCollection();
    collections.locations = new App.LocationCollection();

    collections.groups.fetch({success: function () {
        collections.locations.fetch({success: main})
    }});

    function main () {
        cs.mediator = new Mediator();
        cs.router = new App.Router();
        cs.error404 = new App.ErrorController();

        Backbone.history.start({pushState: true, root: '/open/'});
    }    
});