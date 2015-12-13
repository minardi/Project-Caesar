'use strict';
var App = {
        Schedule: {}
    },
    collections = {},
    cs = {},
    templates = {};

$(function () {
    var controller;

    collections.events = new App.Schedule.EventCollection();
    collections.groups = new App.Schedule.GroupCollection();

    collections.groups.fetch({success: main});

    function main () {
        cs.mediator = new Mediator();
    //    cs.subRouters = {};
    //    cs.router = new App.Router();
        controller = new App.Schedule.Controller();
        controller.showWeekSchedule();

        Backbone.history.start({pushState: true});
    }    
});