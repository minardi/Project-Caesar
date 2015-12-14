'use strict';
var App = {
        Menu: {},
        Groups: {},
        Cookies: {},
        Users: {},
        Session: {},
        Error: {},
        Locations: {},
        Filter: {},
        Messanger: {},
        Common: {},
        Schedule: {}
    },
    collections = {},
    cs = {},
    templates = {};

Backbone.Model.prototype.idAttribute = "_id";

$(function () {
    collections.groups = new App.Groups.GroupCollection();
    collections.locations = new App.Locations.LocationCollection();
    collections.events = new App.Schedule.EventCollection();
    
    collections.groups.fetch({success: function () {
        collections.locations.fetch({success: main})
    }});
    collections.events.fetch();

    function main () {
        cs.mediator = new Mediator();
        cs.messanger = new App.Messanger.Controller();
        cs.messanger.start();
        cs.subRouters = {};
        cs.router = new App.Router();
        cs.cookiesController = new App.Cookies.Controller();
        cs.sessionController = new App.Session.Controller();
        cs.menu = new App.Menu.Controller();
        cs.notFound = new App.Error.Controller();
        cs.mediator.subscribe('sessionContinued', function () {
            Backbone.history.start({pushState: true});
        });
        
        cs.mediator.publish('continueSessionRequired');   

        // temporary solution
        $('#right-navig').on('click', function () {
            cs.mediator.publish('scheduleRequired', 'Schedule/' + moment().day('Monday').format('MM-DD-YYYY'));
        });
    }
});
