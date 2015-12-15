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
        Messenger: {},
        Common: {},
        Schedule: {},
        Employee: {},
        Contributors: {}
    },
    collections = {},
    cs = {},
    templates = {};

Backbone.Model.prototype.idAttribute = "_id";

$(function () {
    collections.groups = new App.Groups.GroupCollection();
    collections.locations = new App.Locations.LocationCollection();
    collections.events = new App.Schedule.EventCollection();
    collections.offices = new App.Schedule.OfficeCollection();
    collections.rooms = new App.Schedule.RoomCollection();
    collections.contributors = new App.Contributors.ContributorCollection();

    collections.groups.fetch({success: function () {
        collections.locations.fetch({success: main})
    }});
    collections.events.fetch();
    collections.offices.fetch();
    collections.rooms.fetch();
    
    function main () {
        cs.mediator = new Mediator();
        cs.messenger = new App.Messenger.Controller();
        cs.messenger.start();
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
    }
});
